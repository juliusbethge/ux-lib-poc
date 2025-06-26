import { lazy, Suspense, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2Icon } from "lucide-react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { SERVER_URL } from "astro:env/client"

export type Demo =
  | "loading-swap/basic"
  | "loading-swap/large-component"
  | "action-button/basic"
  | "action-button/default"
  | "action-button/error"
  | "action-button/require-are-you-sure"
  | "number-input/basic"
  | "number-input/form"

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
    <Tabs defaultValue="preview" className="not-content">
      <TabsList className="w-full">
        <TabsTrigger value="preview" className="flex-grow-0">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-grow-0">
          Code
        </TabsTrigger>
        <OpenInV0Button
          url={`${SERVER_URL}/r/${componentName}.json`}
          className="ml-auto"
        />
      </TabsList>
      <Card className="h-[450px] overflow-y-auto p-0 rounded-lg no-scrollbar bg-transparent">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex items-center justify-center h-full p-4 [&_input]:max-w-xs"
          >
            <Suspense
              fallback={<Loader2Icon className="animate-spin size-16" />}
            >
              <Component />
            </Suspense>
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
