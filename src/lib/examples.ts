import { Database, Zap, Shield, Code, Clock, Globe } from 'lucide-react'

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Example {
  id: string
  title: string
  description: string
  icon: typeof Database
  difficulty: Difficulty
  code: string
  keyPoints: string[]
}

export const EXAMPLES: Example[] = [
  {
    id: 'user-enrichment',
    title: 'User Enrichment Pipeline',
    description: 'Fetch user data, enrich with orders and preferences, with retries.',
    icon: Globe,
    difficulty: 'Beginner',
    keyPoints: ['Sequential Processing', 'Error Resilience'],
    code: `import { quantam } from 'quantam-async'

async function fetchUser(userId: string) {
  const res = await fetch(\`/api/users/\${userId}\`)
  return res.json()
}

async function enrichWithOrders(user: any) {
  const res = await fetch(\`/api/orders?user=\${user.id}\`)
  const orders = await res.json()
  return { ...user, orders }
}

async function enrichWithPrefs(user: any) {
  const res = await fetch(\`/api/prefs?user=\${user.id}\`)
  const prefs = await res.json()
  return { ...user, preferences: prefs }
}

async function getUserProfile(userId: string) {
  try {
    const profile = await quantam()
      .step(fetchUser)
      .step(enrichWithOrders)
      .step(enrichWithPrefs)
      .retry(2, 100)
      .timeout(5000)
      .run(userId)

    console.log('Profile:', profile)
    return profile
  } catch (error) {
    console.error('Failed to fetch profile:', error)
  }
}`,
  },
  {
    id: 'parallel-fetch',
    title: 'Parallel Data Fetching',
    description: 'Fetch multiple data sources in parallel with error handling.',
    icon: Zap,
    difficulty: 'Intermediate',
    keyPoints: ['Parallel Execution', 'Timeout Control'],
    code: `import { quantam } from 'quantam-async'

async function fetchProfile(userId: string) {
  const res = await fetch(\`/api/profile/\${userId}\`)
  return res.json()
}

async function fetchAnalytics(userId: string) {
  const res = await fetch(\`/api/analytics/\${userId}\`)
  return res.json()
}

async function fetchNotifications(userId: string) {
  const res = await fetch(\`/api/notifications/\${userId}\`)
  return res.json()
}

async function buildDashboard(userId: string) {
  const [profile, analytics, notifications] = await quantam()
    .step(async (id) => id)
    .parallel([fetchProfile, fetchAnalytics, fetchNotifications])
    .stepTimeout(3000)
    .run(userId)

  return {
    profile,
    analytics,
    notifications,
    loadedAt: new Date(),
  }
}`,
  },
  {
    id: 'error-handling',
    title: 'Error Handling & Retries',
    description: 'Handle errors gracefully with automatic retry and exponential backoff.',
    icon: Shield,
    difficulty: 'Intermediate',
    keyPoints: ['Retry Strategy', 'Global Timeout'],
    code: `import { quantam } from 'quantam-async'

async function unreliableApiCall(data: any) {
  if (Math.random() > 0.7) {
    throw new Error('Temporary network error')
  }
  return { success: true, data }
}

async function processWithRetry(data: any) {
  try {
    const result = await quantam()
      .step(unreliableApiCall)
      .retry(3, 100)
      .timeout(5000)
      .run(data)

    console.log('Success after retries:', result)
    return result
  } catch (error) {
    console.error('Failed after all retries:', error.message)
  }
}`,
  },
  {
    id: 'batch-processing',
    title: 'Batch Processing',
    description: 'Process large datasets efficiently with concurrency control.',
    icon: Database,
    difficulty: 'Advanced',
    keyPoints: ['Concurrency Control', 'Scalable Processing'],
    code: `import { quantam } from 'quantam-async'

async function processImage(imageId: string) {
  const res = await fetch(\`/api/process?id=\${imageId}\`)
  return res.json()
}

async function processBatch(imageIds: string[]) {
  const startTime = Date.now()

  const results = await quantam()
    .step(processImage)
    .runMany(imageIds, {
      concurrency: 16,
    })

  const duration = Date.now() - startTime

  console.log(
    \`Processed \${imageIds.length} images in \${duration}ms\`
  )
  return results
}

const ids = Array.from({ length: 1000 }, (_, i) => \`img-\${i}\`)
const results = await processBatch(ids)`,
  },
  {
    id: 'cancellation',
    title: 'Pipeline Cancellation',
    description: 'Cancel long-running pipelines when they are no longer needed.',
    icon: Clock,
    difficulty: 'Advanced',
    keyPoints: ['AbortController', 'Graceful Cleanup'],
    code: `import { quantam } from 'quantam-async'

async function longRunningTask(data: any) {
  await new Promise(resolve => setTimeout(resolve, 10000))
  return { processed: data }
}

async function withCancellation() {
  const controller = new AbortController()

  const promise = quantam()
    .step(longRunningTask)
    .run(someData, { signal: controller.signal })

  setTimeout(() => {
    console.log('Cancelling pipeline...')
    controller.abort()
  }, 2000)

  try {
    const result = await promise
    console.log('Completed:', result)
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Pipeline was cancelled')
    } else {
      console.error('Pipeline failed:', error)
    }
  }
}`,
  },
  {
    id: 'data-transformation',
    title: 'Data Transformation Pipeline',
    description: 'Transform data through multiple processing stages with validation.',
    icon: Code,
    difficulty: 'Advanced',
    keyPoints: ['Type Safety', 'Data Validation'],
    code: `import { quantam } from 'quantam-async'

  interface RawData {
  csv: string
  }

  interface ParsedData {
  rows: any[]
  }

  interface ValidatedData {
  rows: any[]
  isValid: boolean
  }

  async function parseCSV(raw: RawData): Promise<ParsedData> {
  const rows = raw.csv.split('\\n').map(line =>
   line.split(',').reduce((obj, val, i) => ({
     ...obj,
     [i]: val.trim(),
   }), {})
  )
  return { rows }
  }

  async function validateData(parsed: ParsedData): Promise<ValidatedData> {
  const isValid = parsed.rows.every(row => {
   return Object.values(row).every(v => v !== '')
  })
  return { ...parsed, isValid }
  }

  async function enrich(validated: ValidatedData): Promise<any> {
  return {
   ...validated,
   enrichedAt: new Date(),
   rowCount: validated.rows.length,
  }
  }

  async function transformCSV(csvData: string) {
  return await quantam()
   .step((csv) => ({ csv }))
   .step(parseCSV)
   .step(validateData)
   .step(enrich)
   .run(csvData)
  }`,
  },
  {
    id: 'step-naming',
    title: 'Step Naming for Debugging',
    description: 'Add names to steps for clearer error messages and debugging context.',
    icon: Shield,
    difficulty: 'Beginner',
    keyPoints: ['Error Context', 'Better Debugging'],
    code: `import { quantam } from 'quantam-async'

  async function validateInput(data: any) {
  if (!data.id) throw new Error('Missing ID')
  return data
  }

  async function fetchUserData(data: any) {
  const res = await fetch(\`/api/users/\${data.id}\`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
  }

  async function enrichWithMetadata(user: any) {
  return { ...user, lastUpdated: new Date() }
  }

  async function getUserWithDebugging(userId: string) {
  try {
   const result = await quantam()
     .step(validateInput)
     .name('validateInput')
     .step(fetchUserData)
     .name('fetchUserData')
     .step(enrichWithMetadata)
     .name('enrichWithMetadata')
     .run({ id: userId })
   
   return result
  } catch (error) {
   // Error now includes step name context:
   // Error: Failed to fetch (at step 'fetchUserData')
   console.error('Pipeline failed:', error.message)
  }
  }`,
  },
  ]

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
}
