import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  children: string
  language?: string
  showCopy?: boolean
}

export function CodeBlock({ children, language = 'typescript', showCopy = true }: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(children)
  }

  return (
    <div className="relative rounded-lg bg-muted border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <Badge variant="secondary" className="text-xs">
          {language}
        </Badge>
        {showCopy && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-auto py-1 px-2"
          >
            Copy
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="text-sm font-mono whitespace-pre text-foreground">
            {children}
          </code>
        </pre>
      </div>
    </div>
  )
}
