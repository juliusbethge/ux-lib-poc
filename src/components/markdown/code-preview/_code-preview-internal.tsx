import {
  lazy,
  Suspense,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from "react"
import { createPortal } from "react-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2Icon } from "lucide-react"
import cssContent from "@db-ux/core-components/build/styles/relative.css?raw"

const IframePreview = ({ children }: { children: ReactNode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      const doc = iframe.contentDocument
      if (doc) {
        doc.head.innerHTML = ""
        doc.body.innerHTML = ""

        const styleEl = doc.createElement("style")
        styleEl.textContent = cssContent
        doc.head.appendChild(styleEl)

        const rootEl = doc.createElement("div")
        doc.body.appendChild(rootEl)

        doc.body.style.margin = "0"
        doc.body.style.height = "100%"
        rootEl.style.height = "100%"
        rootEl.style.display = "flex"
        rootEl.style.alignItems = "center"
        rootEl.style.justifyContent = "center"
        rootEl.style.padding = "1rem"

        setMountNode(rootEl)
      }
    }

    if (
      iframe.contentDocument &&
      iframe.contentDocument.readyState === "complete"
    ) {
      handleLoad()
    } else {
      iframe.addEventListener("load", handleLoad)
    }

    return () => {
      iframe.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Component Preview"
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}

export type Demo = "tabs/basic" | "badges/basic"

export function CodePreviewInternal({
  demo,
  children,
}: {
  demo: Demo
  children: ReactNode
}) {
  const componentName = demo.split("/")[0]
  const Component = getComponent(componentName, demo.split("/")[1])

  return (
    <Tabs
      defaultValue="preview"
      className="not-content db-ux-components-styles"
    >
      <TabsList className="w-full">
        <TabsTrigger value="preview" className="flex-grow-0">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-grow-0">
          Code
        </TabsTrigger>
      </TabsList>
      <Card className="no-scrollbar h-[450px] overflow-y-auto rounded-lg bg-transparent p-0">
        <CardContent className="h-full p-0">
          <TabsContent value="preview" className="h-full">
            <IframePreview>
              <Suspense
                fallback={<Loader2Icon className="size-16 animate-spin" />}
              >
                <Component />
              </Suspense>
            </IframePreview>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            {children}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}

function getComponent(component: string, demo: string) {
  return lazy(async () => {
    const module = await import(
      `../../../registry/new-york/examples/${component}/${demo}.tsx`
    )
    const namedExport = Object.keys(module).find(
      key => typeof module[key] === "function",
    )
    return {
      default:
        module.default ?? (namedExport ? module[namedExport] : undefined),
    }
  })
}
