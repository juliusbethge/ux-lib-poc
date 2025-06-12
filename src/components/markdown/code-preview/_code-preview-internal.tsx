import { lazy, Suspense, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Demo } from "./code-preview.astro"

export function CodePreviewInternal({
  demo,
  children,
}: {
  demo: Demo
  children: ReactNode
}) {
  const Component = getComponent(demo.split("/")[0], demo.split("/")[1])

  return (
    <Tabs defaultValue="preview" className="not-content">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <Card className="h-[450px] overflow-y-auto p-0 rounded-lg no-scrollbar bg-transparent">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex items-center justify-center h-full p-4 [&_input]:max-w-xs"
          >
            {/* TODO: Add fallback */}
            <Suspense>
              <Component />
            </Suspense>
          </TabsContent>
          {/* TODO: The code is making a weird pop in where it zooms to the correct size right when you open it */}
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
      `../../../registry/examples/${component}/${demo}.tsx`
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
