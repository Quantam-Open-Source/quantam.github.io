/**
 * SEO Configuration for Quantam Site
 * Update this file to manage SEO settings across the site
 */

export const SEO_CONFIG = {
  // Base URL - UPDATE THIS to your actual domain
  siteUrl: 'https://openquantam.gridrr.com',

  // Site information
  siteName: 'Quantam',
  siteTitle: 'Quantam - Async Workflow Engine',
  siteDescription:
    'A lightweight async workflow engine for composing, running, and controlling complex task pipelines with retries, parallelism, timeouts, and cancellation.',

  // Social media
  socialImage: 'https://openquantam.gridrr.com/logo.svg', // SVG logo for social sharing
  twitterHandle: '@quantamdev', // Update with your Twitter handle
  twitterCreator: '@quantamdev',

  // Contact
  authorName: 'Quantam',
  authorUrl: 'https://openquantam.gridrr.com',

  // Organization schema
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quantam',
    url: 'https://openquantam.gridrr.com',
    logo: 'https://openquantam.gridrr.com/logo.svg',
    sameAs: [
      'https://github.com/quantam-open-source',
      'https://npm.com/quantam',
    ],
  },

  // Routes configuration
  routes: [
    {
      path: '/',
      title: 'Quantam - Async Workflow Engine',
      description:
        'A lightweight async workflow engine for composing, running, and controlling complex task pipelines with retries, parallelism, timeouts, and cancellation.',
      keywords: ['async', 'workflow', 'pipeline', 'retry', 'timeout', 'cancellation', 'parallel', 'orchestration'],
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      path: '/docs',
      title: 'Documentation - Quantam',
      description:
        'Complete documentation for Quantam async workflow engine. Learn installation, quick start, core concepts, error handling, cancellation, and batch processing.',
      keywords: ['documentation', 'guide', 'tutorial', 'async', 'workflow'],
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      path: '/api',
      title: 'API Reference - Quantam',
      description:
        'Complete API reference for Quantam. Explore all methods including quantam(), step(), parallel(), retry(), timeout(), and more.',
      keywords: ['API', 'reference', 'documentation', 'methods', 'typescript'],
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      path: '/examples',
      title: 'Examples - Quantam',
      description:
        'Real-world code examples for Quantam async workflow engine. Learn patterns for data pipelines, parallel fetching, error handling, batch processing, and more.',
      keywords: ['examples', 'code', 'patterns', 'tutorial', 'async', 'workflow'],
      changefreq: 'monthly',
      priority: 0.8,
    },
  ],
}

// Structured data schemas
export const jsonLD = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}?search={search_term_string}`,
      },
      query_input: 'required name=search_term_string',
    },
    siteName: 'Quantam',
  },
}
