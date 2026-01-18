import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/CodeBlock'
import { DocsLayout } from '@/components/DocsLayout'
import { SectionHeader } from '@/components/SectionHeader'
import { DOC_SECTIONS, INSTALLATION_COMMANDS, INSTALL_ICONS } from '@/lib/docs'

// Content Components
function InstallContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <SectionHeader
        title="Installation"
        description="Get Quantam up and running in your project with your preferred package manager."
        animate={false}
      />

      <div className="grid gap-4 sm:gap-6">
        {Object.entries(INSTALLATION_COMMANDS).map(([key, command]) => {
          const icons = INSTALL_ICONS[key as keyof typeof INSTALL_ICONS]
          return (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <div className={`h-8 w-8 rounded-lg ${icons.bg} flex items-center justify-center`}>
                    <span className={`${icons.text} font-bold text-sm`}>{icons.label}</span>
                  </div>
                  {icons.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language={key}>{command}</CodeBlock>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}

function QuickStartContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <SectionHeader
        title="Quick Start"
        description="Import the builder, define async steps, and compose them into a pipeline."
        animate={false}
      />

      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Basic Example</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Create a simple workflow with sequential steps:
          </p>
          <CodeBlock>{`import { quantam } from 'quantam-async'

async function fetchUser(id: string) {
  return { id, name: 'Alice' }
}

async function fetchOrders(user: { id: string; name: string }) {
  return { user, orders: [1, 2, 3] }
}

async function enrichData(data: { user: unknown; orders: unknown[] }) {
  return { ...data, enriched: true }
}

const result = await quantam()
  .step(fetchUser)
  .step(fetchOrders)
  .step(enrichData)
  .run('user-123')

console.log(result)
// { user: { id: 'user-123', name: 'Alice' }, orders: [...], enriched: true }`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Adding Retries and Timeouts</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Make your workflow more resilient with automatic retries and timeout enforcement:
          </p>
          <CodeBlock>{`const result = await quantam()
  .step(fetchUser)
  .retry(3, 100)
  .step(fetchOrders)
  .stepTimeout(2000)
  .timeout(5000)
  .run('user-123')`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Parallel Execution</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Run multiple operations concurrently for better performance:
          </p>
          <CodeBlock>{`const result = await quantam()
  .step(fetchUser)
  .parallel([
    async (user) => fetchOrders(user),
    async (user) => fetchProfile(user),
  ])
  .run('user-123')`}</CodeBlock>
        </section>
      </div>
    </motion.div>
  )
}

function ConceptsContent() {
  const concepts = [
    {
      title: 'Flows',
      icon: 'Code',
      description: 'A flow is a sequence of async steps. Create one with quantam().',
      example: 'const flow = quantam()',
    },
    {
      title: 'Steps',
      icon: 'Zap',
      description: 'Steps are async functions that receive the previous step\'s output. Add them with .step().',
      example: `flow.step(async (input) => {
  const output = await doWork(input)
  return output
})`,
    },
    {
      title: 'Data Flow',
      icon: 'Database',
      description: 'Output from one step becomes input to the next. This makes data flow explicit and easy to reason about.',
      example: '',
    },
    {
      title: 'Parallel Execution',
      icon: 'Zap',
      description: 'Multiple steps can run concurrently with .parallel(). Results are collected in an array.',
      example: `flow.parallel([
  async (input) => operation1(input),
  async (input) => operation2(input),
])`,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <SectionHeader
        title="Core Concepts"
        description="Understanding the fundamental building blocks of Quantam workflows."
        animate={false}
      />

      <div className="grid gap-4 sm:gap-6">
        {concepts.map((concept) => (
          <Card key={concept.title}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm sm:text-base">
                {concept.description}
              </CardDescription>
              {concept.example && <CodeBlock>{concept.example}</CodeBlock>}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

function ErrorHandlingContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <SectionHeader
        title="Error Handling"
        description="Centralize error handling instead of scattering try/catch throughout your code."
        animate={false}
      />

      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Try/Catch Pattern</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Catch and handle errors in a centralized way:
          </p>
          <CodeBlock>{`try {
  const result = await quantam()
    .step(fetchUser)
    .step(enrichData)
    .run(userId)

  console.log('Success:', result)
} catch (error) {
  console.error('Pipeline failed:', error)
}`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Accessing Error Context</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Get more information about the error:
          </p>
          <CodeBlock>{`try {
  await flow.run(input)
} catch (error) {
  console.error('Failed:', error.message)
  console.error('Input:', error.input)
}`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Retry Behavior</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Configure retry behavior for failed steps:
          </p>
          <CodeBlock>{`flow.retry(3, 100) // retry 3 times, 100ms initial delay`}</CodeBlock>
        </section>
      </div>
    </motion.div>
  )
}

function CancellationContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <SectionHeader
        title="Cancellation"
        description="Cancel long-running pipelines when they are no longer needed."
        animate={false}
      />

      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">With AbortController</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Use AbortController to cancel the pipeline:
          </p>
          <CodeBlock>{`const controller = new AbortController()

const promise = quantam()
  .step(longTask)
  .run(input, { signal: controller.signal })

// Later, when you want to cancel:
controller.abort()`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">With withSignal()</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Use withSignal() to cancel the pipeline:
          </p>
          <CodeBlock>{`const controller = new AbortController()

const flow = quantam()
  .withSignal(controller.signal)
  .step(longTask)

// Runs will be cancelled if signal is aborted
await flow.run(input)

controller.abort()`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Handling Cancellation</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Catch and handle cancellation errors:
          </p>
          <CodeBlock>{`try {
  await flow.run(input, { signal: abortSignal })
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Pipeline was cancelled')
  }
}`}</CodeBlock>
        </section>
      </div>
    </motion.div>
  )
}

function BatchProcessingContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 sm:space-y-8"
    >
      <SectionHeader
        title="Batch Processing"
        description="Process many inputs efficiently using .runMany() with concurrency control."
        animate={false}
      />

      <div className="space-y-6 sm:space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Basic Batch Processing</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Process multiple inputs in parallel:
          </p>
          <CodeBlock>{`const inputs = Array.from({ length: 100000 }, (_, i) => i)

const results = await quantam()
  .step(processItem)
  .runMany(inputs)`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">With Concurrency Control</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Control the number of concurrent operations:
          </p>
          <CodeBlock>{`const results = await quantam()
  .step(processItem)
  .runMany(inputs, {
    concurrency: 512
  })`}</CodeBlock>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Results</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Get the results of the batch processing:
          </p>
          <CodeBlock>{`const results = await quantam()
  .step(processItem)
  .runMany(inputs)`}</CodeBlock>
        </section>
      </div>
    </motion.div>
  )
}

// Content Renderer
function renderContent(activeSection: string): React.ReactNode {
  switch (activeSection) {
    case 'install':
      return <InstallContent />
    case 'quickstart':
      return <QuickStartContent />
    case 'concepts':
      return <ConceptsContent />
    case 'error-handling':
      return <ErrorHandlingContent />
    case 'cancellation':
      return <CancellationContent />
    case 'batch':
      return <BatchProcessingContent />
    default:
      return <div className="p-8 text-center text-muted-foreground">Section not found</div>
  }
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('install')

  return (
    <DocsLayout
      sections={DOC_SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent(activeSection)}
    </DocsLayout>
  )
}
