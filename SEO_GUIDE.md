# SEO & Performance Guide for Quantam Site

This guide covers the SEO improvements and performance optimizations implemented for the Quantam website.

## What's Included

### 1. **Sitemap Generation**
- Automatic `sitemap.xml` generation during build
- Located at `/sitemap.xml` after build
- Includes all main routes with priority and change frequency

### 2. **Robots.txt**
- Automatically generated during build
- Allows all search engines to crawl the site
- References the sitemap for easy discovery

### 3. **Meta Tags & Open Graph**
- Comprehensive SEO meta tags in `index.html`
- Open Graph tags for social media sharing
- Twitter Card support for better Twitter sharing
- Canonical tags to prevent duplicate content

### 4. **Dynamic SEO Management**
- `src/lib/seo.ts` handles dynamic meta tag updates per route
- Automatically updates title, description, and Open Graph tags on page navigation
- Page-specific SEO metadata in `seoMetadata` object

### 5. **Structured Data (JSON-LD)**
- `StructuredData` component for injecting JSON-LD scripts
- Schema.org markup for better search engine understanding
- Organization and WebSite schema support

### 6. **Configuration**
- Centralized SEO configuration in `seo.config.ts`
- Easy to update site-wide SEO settings
- Route-specific metadata

## How to Use

### Update Base URL
1. Open `seo.config.ts`
2. Update `siteUrl` to your actual domain
3. Update `src/lib/seo.ts` to match

### Add OG Image
1. Create an OG image (1200x630px recommended)
2. Place it in `public/og-image.png`
3. Update the image path in `index.html` and `seo.config.ts`

### Customize Twitter Handle
1. Open `seo.config.ts`
2. Update `twitterHandle` and `twitterCreator`

### Add New Routes
1. Add route to `routes` array in `seo.config.ts`
2. Add corresponding metadata in `src/lib/seo.ts` seoMetadata object
3. Update `src/App.tsx` to handle the new route in SEO updates

## Build Process

Run `npm run build` to:
1. Build the site with TypeScript and Vite
2. Generate `sitemap.xml`
3. Generate `robots.txt`
4. Generate `.htaccess` (for Apache servers)

## Performance Optimizations

### Meta Tags
- Preconnect to external resources
- DNS prefetch for CDNs
- Theme color for browser UI

### Caching Headers
The generated `.htaccess` includes cache control headers:
- HTML: 1 hour
- CSS/JS: 1 year (versioned by build)
- Images: 1 year

### SEO Best Practices Implemented
- ✅ Descriptive page titles (50-60 characters)
- ✅ Unique descriptions (150-160 characters)
- ✅ Semantic HTML structure
- ✅ Mobile-friendly viewport meta tag
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Card support
- ✅ Structured data (Schema.org)
- ✅ Proper heading hierarchy
- ✅ Alt text support (ensure images have alt text)

## Monitoring & Tools

### Google Tools
- **Google Search Console**: Submit sitemap and monitor search performance
- **Google PageSpeed Insights**: Check performance metrics
- **Google Mobile-Friendly Test**: Verify mobile compatibility

### Other Tools
- **SEO Checker**: Use various SEO checkers to verify meta tags
- **Rich Result Test**: Validate structured data at schema.org

## Deployment Checklist

Before deploying to production:
- [ ] Update base URL in `seo.config.ts` and `src/lib/seo.ts`
- [ ] Update `siteUrl` in `index.html` OG tags
- [ ] Add OG image to `public/` folder
- [ ] Update Twitter handle in `seo.config.ts`
- [ ] Run `npm run build` to generate sitemap and robots.txt
- [ ] Test meta tags with Facebook and Twitter sharing debuggers
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

## File Structure

```
site/
├── index.html              # Main SEO meta tags
├── seo.config.ts          # Centralized SEO configuration
├── src/
│   ├── lib/
│   │   └── seo.ts         # Dynamic SEO utilities
│   ├── components/
│   │   └── StructuredData.tsx  # JSON-LD component
│   └── App.tsx            # Route-based SEO updates
├── scripts/
│   └── generate-sitemap.js # Sitemap & robots.txt generation
└── dist/
    ├── sitemap.xml        # Generated sitemap
    ├── robots.txt         # Generated robots.txt
    └── .htaccess          # Generated cache headers
```

## Further Improvements

Consider adding:
1. **Breadcrumb navigation** - Help users and search engines understand site structure
2. **Internal linking strategy** - Link related pages together
3. **Image optimization** - Use WebP format with fallbacks
4. **Core Web Vitals monitoring** - Track performance metrics
5. **Analytics** - Integrate Google Analytics or similar
6. **Dynamic sitemap** - Generate based on CMS content if applicable
7. **Hreflang tags** - For multi-language support (if needed)

## Questions?

Refer to:
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
