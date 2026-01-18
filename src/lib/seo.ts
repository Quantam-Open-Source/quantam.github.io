/**
 * SEO metadata management for each page
 */

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const SITE_URL = 'https://openquantam.gridrr.com' // Update this to your actual domain

export const seoMetadata: Record<string, SEOMetadata> = {
  home: {
    title: 'Quantam - Async Workflow Engine',
    description:
      'A lightweight async workflow engine for composing, running, and controlling complex task pipelines with retries, parallelism, timeouts, and cancellation.',
    keywords: ['async', 'workflow', 'pipeline', 'retry', 'timeout', 'cancellation', 'parallel', 'orchestration'],
    ogTitle: 'Quantam - Async Workflow Engine',
    ogDescription:
      'A lightweight async workflow engine for composing, running, and controlling complex task pipelines with retries, parallelism, timeouts, and cancellation.',
    canonical: `${SITE_URL}/`,
  },
  docs: {
    title: 'Documentation - Quantam',
    description:
      'Complete documentation for Quantam async workflow engine. Learn installation, quick start, core concepts, error handling, cancellation, and batch processing.',
    keywords: ['documentation', 'guide', 'tutorial', 'async', 'workflow'],
    ogTitle: 'Documentation - Quantam',
    ogDescription:
      'Learn how to use Quantam with our comprehensive documentation covering installation, concepts, and patterns.',
    canonical: `${SITE_URL}/docs`,
  },
  api: {
    title: 'API Reference - Quantam',
    description:
      'Complete API reference for Quantam. Explore all methods including quantam(), step(), parallel(), retry(), timeout(), and more.',
    keywords: ['API', 'reference', 'documentation', 'methods', 'typescript'],
    ogTitle: 'API Reference - Quantam',
    ogDescription: 'Explore the complete Quantam API with method signatures, type definitions, and examples.',
    canonical: `${SITE_URL}/api`,
  },
  examples: {
    title: 'Examples - Quantam',
    description:
      'Real-world code examples for Quantam async workflow engine. Learn patterns for data pipelines, parallel fetching, error handling, batch processing, and more.',
    keywords: ['examples', 'code', 'patterns', 'tutorial', 'async', 'workflow'],
    ogTitle: 'Examples - Quantam',
    ogDescription:
      'Explore practical examples and patterns for building async workflows with Quantam.',
    canonical: `${SITE_URL}/examples`,
  },
}

/**
 * Update document head with SEO metadata
 */
export function updateSEO(metadata: SEOMetadata) {
  // Title
  document.title = metadata.title

  // Update or create meta tags
  updateMetaTag('name', 'description', metadata.description)
  updateMetaTag('name', 'keywords', metadata.keywords?.join(', ') || '')

  // Open Graph
  if (metadata.ogTitle) updateMetaTag('property', 'og:title', metadata.ogTitle)
  if (metadata.ogDescription) updateMetaTag('property', 'og:description', metadata.ogDescription)
  if (metadata.ogImage) updateMetaTag('property', 'og:image', metadata.ogImage)
  if (metadata.canonical) updateMetaTag('rel', 'canonical', metadata.canonical)

  // Twitter Card
  updateMetaTag('name', 'twitter:card', 'summary_large_image')
  updateMetaTag('name', 'twitter:title', metadata.ogTitle || metadata.title)
  updateMetaTag('name', 'twitter:description', metadata.ogDescription || metadata.description)

  // Noindex if needed
  if (metadata.noindex) {
    updateMetaTag('name', 'robots', 'noindex')
  }
}

function updateMetaTag(
  attribute: 'name' | 'property' | 'rel',
  name: string,
  content: string
) {
  if (!content) return

  let tag = document.querySelector(
    attribute === 'rel' ? `link[rel="${name}"]` : `meta[${attribute}="${name}"]`
  ) as HTMLMetaElement | HTMLLinkElement

  if (!tag) {
    tag = document.createElement(attribute === 'rel' ? 'link' : 'meta')
    if (attribute === 'rel') {
      ;(tag as HTMLLinkElement).rel = name
    } else {
      tag.setAttribute(attribute, name)
    }
    document.head.appendChild(tag)
  }

  if (attribute === 'rel') {
    ;(tag as HTMLLinkElement).href = content
  } else {
    ;(tag as HTMLMetaElement).content = content
  }
}

/**
 * List of all routes for sitemap generation
 */
export const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/docs', changefreq: 'weekly', priority: 0.9 },
  { path: '/api', changefreq: 'weekly', priority: 0.9 },
  { path: '/examples', changefreq: 'monthly', priority: 0.8 },
]
