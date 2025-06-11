import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ClipboardIcon, TerminalIcon } from "lucide-react"

export function CliCommandCodeInternal({
  commands,
}: {
  commands: {
    label: string
    code: string
  }[]
}) {
  const [selectedTab, setSelectedTab] = useLocalStorage(
    "cli-method",
    commands[0].label,
  )

  function handleCopy() {
    const command = commands.find(cmd => cmd.label === selectedTab)
    if (command) {
      navigator.clipboard
        .writeText(command.code)
        .then(() => {
          console.log("Command copied to clipboard:", command.code)
        })
        .catch(err => {
          console.error("Failed to copy command:", err)
        })
    }
  }

  return (
    <Card className="not-content bg-code p-0">
      <CardContent className="p-0">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="gap-0"
        >
          <div className="flex items-center border-b border-input py-1 px-3">
            <div className="size-4 flex items-center justify-center bg-foreground/70 mr-2">
              <TerminalIcon className="size-3 text-code" />
            </div>
            <TabsList className="font-mono">
              {commands.map((command, index) => (
                <TabsTrigger
                  key={index}
                  value={command.label}
                  className="data-[state=active]:bg-muted/50 data-[state=active]:border-input"
                >
                  {command.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              onClick={handleCopy}
              variant="ghost"
              className="ml-auto text-muted-foreground size-8"
            >
              <ClipboardIcon />
            </Button>
          </div>
          <div>
            {commands.map(command => (
              <TabsContent
                key={command.label}
                value={command.label}
                className="overflow-x-auto text-muted-foreground px-4 py-3.5 no-scrollbar"
              >
                <pre>
                  <code>{command.code}</code>
                </pre>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
