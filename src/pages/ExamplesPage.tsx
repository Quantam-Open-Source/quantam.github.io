import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CodeBlock } from '@/components/CodeBlock'
import { Menu, Copy } from 'lucide-react'
import { EXAMPLES, DIFFICULTY_COLORS } from '@/lib/examples'

const KEY_POINT_DESCRIPTIONS: Record<string, string> = {
  'Sequential Processing': 'Data flows through each step in order, with the output of one step becoming the input to the next.',
  'Error Resilience': 'Automatic retries with exponential backoff ensure temporary failures don\'t break the pipeline.',
  'Parallel Execution': 'Multiple operations run concurrently, significantly reducing total execution time.',
  'Timeout Control': 'Per-step timeouts prevent individual operations from blocking the entire pipeline.',
  'Retry Strategy': 'Configurable retry attempts with exponential backoff for handling transient failures.',
  'Global Timeout': 'Overall timeout prevents the pipeline from running indefinitely.',
  'Concurrency Control': 'Control the number of concurrent operations to balance performance and resource usage.',
  'Scalable Processing': 'Efficiently process large datasets without overwhelming system resources.',
  'AbortController': 'Use standard AbortController API to cancel long-running operations.',
  'Graceful Cleanup': 'Properly handle cancellation and clean up resources when pipelines are aborted.',
  'Type Safety': 'Leverage TypeScript interfaces for type-safe data transformations.',
  'Data Validation': 'Validate and enrich data at each stage of the transformation pipeline.',
}

function ExampleSidebar({
  mobileMenuOpen,
  onSelect,
  onMenuToggle,
  selectedId,
}: {
  mobileMenuOpen: boolean
  onSelect: (id: string) => void
  onMenuToggle: () => void
  selectedId: string
}) {
  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b">
        <div className="container px-4 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onMenuToggle}
            className="w-full justify-start"
          >
            <Menu className="mr-2 h-4 w-4" />
            {mobileMenuOpen ? 'Hide Examples' : 'Show Examples'}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80`}>
        <div className="lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold mb-4">Examples</h2>
          <nav className="space-y-2">
            {EXAMPLES.map((example) => {
              const Icon = example.icon
              return (
                <button
                  key={example.id}
                  onClick={() => {
                    onSelect(example.id)
                    onMenuToggle()
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedId === example.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-card-foreground border-border hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{example.title}</div>
                      <div className="text-xs opacity-70 mt-1 line-clamp-2">{example.description}</div>
                      <Badge className={`mt-2 text-xs ${DIFFICULTY_COLORS[example.difficulty]}`}>
                        {example.difficulty}
                      </Badge>
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

function ExampleContent({ example }: { example: (typeof EXAMPLES)[0] | null }) {
  if (!example) {
    return <div className="p-8 text-center text-muted-foreground">Select an example to view</div>
  }

  const IconComponent = example.icon

  return (
    <motion.div
      key={example.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <example.icon className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">{example.title}</h1>
          <Badge className={DIFFICULTY_COLORS[example.difficulty]}>
            {example.difficulty}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">{example.description}</p>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Code</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(example.code)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Code
          </Button>
        </div>
        <CodeBlock>{example.code}</CodeBlock>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Concepts</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {example.keyPoints.map((point) => (
            <Card key={point}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{point}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {KEY_POINT_DESCRIPTIONS[point] || point}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState(EXAMPLES[0]?.id || '')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentExample = EXAMPLES.find((ex) => ex.id === selectedExample)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex gap-4 sm:gap-8">
          <ExampleSidebar
            mobileMenuOpen={mobileMenuOpen}
            selectedId={selectedExample}
            onSelect={setSelectedExample}
            onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <ScrollArea className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)]">
              <div className="max-w-4xl pb-8">
                <ExampleContent example={currentExample || null} />
              </div>
            </ScrollArea>
          </main>
        </div>
      </div>
    </div>
  )
}
