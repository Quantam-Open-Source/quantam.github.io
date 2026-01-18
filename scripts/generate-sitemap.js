#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '../dist')

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

const SITE_URL = 'https://openquantam.gridrr.com' // Update to your actual domain

const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/docs', changefreq: 'weekly', priority: 0.9 },
  { path: '/api', changefreq: 'weekly', priority: 0.9 },
  { path: '/examples', changefreq: 'monthly', priority: 0.8 },
]

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent)
console.log('✓ Generated sitemap.xml')

// Generate robots.txt
const robotsContent = `# Quantam Site Robots Configuration
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optional, adjust as needed)
Crawl-delay: 1`

fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent)
console.log('✓ Generated robots.txt')

// Generate .htaccess for Apache (optional, for URL rewrites)
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache control headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType application/json "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>`

fs.writeFileSync(path.join(distDir, '.htaccess'), htaccessContent)
console.log('✓ Generated .htaccess')
