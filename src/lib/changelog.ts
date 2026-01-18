export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  changes: string[]
  type: 'feature' | 'bugfix' | 'improvement'
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.1.1',
    date: 'January 18, 2025',
    title: 'Step Naming for Better Debugging',
    description: 'Added step naming feature to provide better error context and debugging information in complex pipelines.',
    changes: [
      'New `.name()` method to assign labels to steps',
      'Step names appear in error messages for clearer debugging',
      'Step name available in context object via `context.stepName`',
      'Improved error messages with "(at step \'stepName\')" suffix',
      'Better visibility into which step failed in multi-step pipelines',
    ],
    type: 'feature',
  },
  {
    version: '0.1.0',
    date: 'January 15, 2025',
    title: 'Initial Release',
    description: 'Core features for building reliable async workflows with retries, timeouts, and cancellation.',
    changes: [
      'Fluent API for composing async pipelines',
      'Sequential step execution with data flow',
      'Parallel execution with `.parallel()`',
      'Automatic retries with exponential backoff',
      'Global and per-step timeout enforcement',
      'AbortController integration for cancellation',
      'Batch processing with `.runMany()` and concurrency control',
      'Centralized error handling',
      'Type-safe with full TypeScript support',
    ],
    type: 'feature',
  },
]

export const getChangelogColor = (type: ChangelogEntry['type']): string => {
  switch (type) {
    case 'feature':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'improvement':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'bugfix':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
