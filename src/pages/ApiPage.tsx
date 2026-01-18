import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CodeBlock } from '@/components/CodeBlock'
import { SectionHeader } from '@/components/SectionHeader'
import {
  Code,
  Zap,
  Shield,
  Database,
  Clock,
  Globe,
  FileText,
} from 'lucide-react'

interface ApiMethod {
  name: string
  description: string
  icon: React.ReactNode
  example: string
}

const API_METHODS: ApiMethod[] = [
  {
    name: 'quantam()',
    description: 'Creates a new pipeline builder.',
    icon: <Code className="h-5 w-5" />,
    example: `import { quantam } from 'quantam-async'

const flow = quantam()`,
  },
  {
    name: '.step(fn)',
    description: 'Adds a single async step that receives the previous output and returns the next input.',
    icon: <Globe className="h-5 w-5" />,
    example: `flow.step(async (input) => {
  const output = await doWork(input)
  return output
})`,
  },
  {
    name: '.parallel(fns)',
    description: 'Runs multiple steps concurrently. All functions receive the same input. Results are collected in an array.',
    icon: <Zap className="h-5 w-5" />,
    example: `flow.parallel([
  async (input) => fetchProfile(input),
  async (input) => fetchSettings(input),
  async (input) => fetchOrders(input),
])`,
  },
  {
    name: '.retry(count, delayMs?)',
    description: 'Retries the previous step on failure with exponential backoff. Optional initial delay in milliseconds.',
    icon: <Shield className="h-5 w-5" />,
    example: `flow
  .step(riskyOperation)
  .retry(3, 100)`,
  },
  {
    name: '.timeout(ms)',
    description: 'Sets a timeout for the entire pipeline. If execution exceeds this duration, the pipeline is cancelled.',
    icon: <Clock className="h-5 w-5" />,
    example: `flow.timeout(5000)`,
  },
  {
    name: '.stepTimeout(ms)',
    description: 'Sets a timeout for only the most recent step. Useful for enforcing SLAs on individual operations.',
    icon: <Clock className="h-5 w-5" />,
    example: `flow
  .step(fetchUser)
  .stepTimeout(200)`,
  },
  {
    name: '.withSignal(signal)',
    description: 'Binds an AbortSignal to the flow. The flow can be cancelled by calling abort() on the signal.',
    icon: <Shield className="h-5 w-5" />,
    example: `const controller = new AbortController()

const flow = quantam()
  .withSignal(controller.signal)
  .step(longTask)

controller.abort()`,
  },
  {
    name: '.run(input, options?)',
    description: 'Executes the pipeline with the given input. Returns a Promise that resolves with the final output.',
    icon: <Database className="h-5 w-5" />,
    example: `const result = await flow.run(data)

// With options
const result = await flow.run(data, {
  signal: abortSignal
})`,
  },
  {
    name: '.runMany(inputs, options?)',
    description: 'Executes the same pipeline for many inputs in parallel with configurable concurrency.',
    icon: <Database className="h-5 w-5" />,
    example: `const inputs = Array.from({ length: 100000 }, (_, i) => i)

const results = await flow.runMany(inputs, {
  concurrency: 512
})`,
  },
]

const TYPE_DEFINITIONS = [
  {
    name: 'Flow<T>',
    description: 'The main pipeline builder interface.',
    code: `interface Flow<T> {
  step<U>(fn: (input: T) => Promise<U>): Flow<U>
  parallel<U>(
    fns: Array<(input: T) => Promise<U>>
  ): Flow<U[]>
  retry(count: number, delayMs?: number): Flow<T>
  timeout(ms: number): Flow<T>
  stepTimeout(ms: number): Flow<T>
  withSignal(signal: AbortSignal): Flow<T>
  run(input: unknown, options?: RunOptions): Promise<T>
  runMany(
    inputs: unknown[],
    options?: RunManyOptions
  ): Promise<T[]>
}`,
  },
  {
    name: 'RunOptions',
    description: 'Options for running a flow.',
    code: `interface RunOptions {
  signal?: AbortSignal
}`,
  },
  {
    name: 'RunManyOptions',
    description: 'Options for batch processing.',
    code: `interface RunManyOptions {
  concurrency?: number  // Default: 512
}`,
  },
]

const PATTERNS = [
  {
    title: 'Building a data processing pipeline',
    description: 'Sequential processing with error resilience',
    code: `async function processUserData(userId: string) {
  return await quantam()
    .step(fetchUser)
    .step(enrichWithOrders)
    .step(enrichWithPreferences)
    .retry(2, 100)
    .timeout(10000)
    .run(userId)
}`,
  },
  {
    title: 'Parallel fetch with fallback',
    description: 'Concurrent operations with error handling',
    code: `const result = await quantam()
  .step(fetchUser)
  .parallel([
    async (user) => {
      try {
        return await fetchProfile(user.id)
      } catch {
        return { fallback: true }
      }
    },
    async (user) => fetchOrders(user.id),
  ])
  .run(userId)`,
  },
  {
    title: 'Batch processing with progress',
    description: 'Process multiple items with concurrency control',
    code: `const items = getItems()

const results = await quantam()
  .step(async (item) => {
    const result = await processItem(item)
    logProgress({ item, result })
    return result
  })
  .runMany(items, { concurrency: 16 })`,
  },
]

// API Methods Section
function ApiMethodsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Methods</h2>
      <div className="grid gap-6">
        {API_METHODS.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {method.icon}
                  <code className="text-lg font-mono">{method.name}</code>
                </CardTitle>
                <CardDescription className="text-base">
                  {method.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock>{method.example}</CodeBlock>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Type Definitions Section
function TypeDefinitionsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <FileText className="h-6 w-6" />
        Type Definitions
      </h2>
      <div className="grid gap-6">
        {TYPE_DEFINITIONS.map((type) => (
          <Card key={type.name} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-mono">{type.name}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>{type.code}</CodeBlock>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Common Patterns Section
function CommonPatternsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Common Patterns</h2>
      <div className="grid gap-6">
        {PATTERNS.map((pattern) => (
          <Card key={pattern.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{pattern.title}</CardTitle>
              <CardDescription>{pattern.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock>{pattern.code}</CodeBlock>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="max-w-4xl mx-auto pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header */}
              <SectionHeader
                title="API Reference"
                description="Complete reference for the Quantam API. All methods are chainable and return a flow object."
                animate={false}
              />

              {/* API Methods */}
              <ApiMethodsSection />

              <Separator />

              {/* Type Definitions */}
              <TypeDefinitionsSection />

              <Separator />

              {/* Common Patterns */}
              <CommonPatternsSection />
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
