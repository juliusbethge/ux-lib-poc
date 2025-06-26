import { useState, type ReactNode } from "react"
import { Card, CardContent } from "./ui/card"
import { CodeIcon } from "lucide-react"
import { Button } from "./ui/button"
import { TypeScriptIcon } from "./icons/typescript-icon"
import { CSSIcon } from "./icons/css-icon"
import { cn } from "@/lib/utils"

export function ManualInstallCodeCard({
  filePath,
  children,
}: {
  filePath: string
  children: ReactNode
}) {
  const Icon = getIcon(filePath)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="not-content bg-code p-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center border-b border-input py-1 px-3">
          <Icon className="size-4 text-muted-foreground mr-2" />
          <div className="font-mono text-muted-foreground">{filePath}</div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-muted-foreground"
            onClick={() => setIsExpanded(e => !e)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            !isExpanded && "max-h-52",
          )}
        >
          {children}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-code via-code/70 to-transparent via-70% h-16 text-muted-foreground text-sm"
            >
              Expand
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getIcon(filePath: string) {
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
    return TypeScriptIcon
  }
  if (filePath.endsWith(".css")) {
    return CSSIcon
  }
  return CodeIcon
}
