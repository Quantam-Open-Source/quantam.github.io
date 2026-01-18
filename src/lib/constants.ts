import { Code, Zap, Shield, Database, Cpu, Globe, Rocket, Database as DatabaseIcon } from 'lucide-react'

// Feature configurations
export const FEATURES = [
  {
    id: 'fluent-api',
    icon: Code,
    title: 'Fluent API',
    description: 'Write async workflows that read like prose with our intuitive chainable API.',
    color: 'text-blue-600',
  },
  {
    id: 'parallel',
    icon: Zap,
    title: 'Parallel Execution',
    description: 'Run multiple steps concurrently with automatic result ordering and error handling.',
    color: 'text-yellow-600',
  },
  {
    id: 'retries',
    icon: Shield,
    title: 'Automatic Retries',
    description: 'Built-in exponential backoff with configurable retry policies for resilient workflows.',
    color: 'text-green-600',
  },
  {
    id: 'batch',
    icon: Database,
    title: 'Batch Processing',
    description: 'Process large datasets efficiently with built-in concurrency control and progress tracking.',
    color: 'text-purple-600',
  },
  {
    id: 'timeout',
    icon: Cpu,
    title: 'Timeout Control',
    description: 'Global and per-step timeout enforcement to prevent hanging operations.',
    color: 'text-red-600',
  },
  {
    id: 'universal',
    icon: Globe,
    title: 'Universal Compatibility',
    description: 'Works with any JavaScript runtime - Node.js, Deno, Bun, or modern browsers.',
    color: 'text-indigo-600',
  },
] as const

// Problem statements
export const PROBLEMS = [
  'Messy Promise chains',
  'Nested try/catch blocks',
  'Manual retry logic',
  'Race conditions',
  'No cancellation support',
  'Lost context between steps',
] as const

// Use cases
export const USE_CASES = [
  {
    id: 'data-pipelines',
    icon: DatabaseIcon,
    title: 'Data Processing Pipelines',
    description: 'ETL jobs, batch processing, and complex data transformation workflows with built-in retry and error handling.',
  },
  {
    id: 'background-jobs',
    icon: Rocket,
    title: 'Background Jobs',
    description: 'Send emails, generate reports, process uploads with timeout and cancellation support.',
  },
  {
    id: 'microservices',
    icon: Globe,
    title: 'Microservice Orchestration',
    description: 'Compose multiple API calls with retry policies and timeout enforcement.',
  },
  {
    id: 'event-driven',
    icon: Zap,
    title: 'Event-Driven Workflows',
    description: 'Chain async operations triggered by events with deterministic, testable flows.',
  },
] as const

// External links
export const EXTERNAL_LINKS = {
  npm: 'https://www.npmjs.com/package/quantam-async',
  github: 'https://github.com/BYRON-lang/Quantam-Async',
  docs: '/docs',
  api: '/api',
  examples: '/examples',
} as const

// Animation variants
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
} as const
