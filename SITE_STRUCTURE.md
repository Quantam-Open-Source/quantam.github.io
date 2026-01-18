# Quantam Site Structure

This is the marketing and documentation website for the Quantam async workflow engine.

## Directory Structure

```
site/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Main navigation header
│   │   └── Footer.tsx          # Footer with links and info
│   ├── pages/
│   │   ├── HomePage.tsx        # Landing page with features, use cases
│   │   ├── DocsPage.tsx        # Documentation with tabs
│   │   ├── ApiPage.tsx         # Complete API reference
│   │   └── ExamplesPage.tsx    # Code examples with sidebar
│   ├── styles/
│   │   ├── App.css             # Main app layout
│   │   ├── Header.css          # Header navigation styles
│   │   ├── Footer.css          # Footer styles
│   │   ├── HomePage.css        # Hero, features, sections
│   │   ├── DocsPage.css        # Sidebar layout for docs
│   │   ├── ApiPage.css         # API reference styles
│   │   └── ExamplesPage.css    # Examples layout styles
│   ├── App.tsx                 # Main app router
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── README.md                   # Development instructions
```

## Pages

### Home (`/`)
- Hero section with code example
- Problems section (6 problem cards)
- Features section (8 feature cards)
- Use cases section (4 use case cards)
- Comparison table with other approaches
- Call-to-action section

### Docs (`/docs`)
- Sidebar navigation with 6 sections:
  - Install
  - Quick Start
  - Core Concepts
  - Error Handling
  - Cancellation
  - Batch Processing
- Switches between sections with active state
- Code examples in each section

### API (`/api`)
- Complete API reference with all methods:
  - quantam()
  - .step()
  - .parallel()
  - .retry()
  - .timeout()
  - .stepTimeout()
  - .withSignal()
  - .run()
  - .runMany()
- Type definitions section
- Common patterns section

### Examples (`/examples`)
- Sidebar with 6 example categories
- Code examples for:
  - User enrichment pipeline
  - Parallel data fetching
  - Error handling & retries
  - Batch processing
  - Pipeline cancellation
  - Data transformation

## Components

### Header
- Sticky navigation bar
- Logo/brand name
- Navigation links (Docs, API, Examples, GitHub, npm)
- Responsive mobile layout

### Footer
- Resources section (GitHub, npm, Issues)
- Community section
- Copyright information
- Dark background

## Styling

All pages follow a consistent design system:

- **Colors:**
  - Primary: #111827 (dark gray/black)
  - Secondary: #f3f4f6 (light gray)
  - Accent: #10b981 (green)
  - Error: #dc2626 (red)
  - Text: #6b7280 (medium gray)

- **Layout:**
  - Max-width container: 1280px for most pages
  - Sidebar layouts for docs and examples
  - Responsive grid layouts
  - Mobile-first responsive design

- **Typography:**
  - System font stack
  - Clear hierarchy with font sizes
  - Line height: 1.5-1.7 for readability

## Development

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

- ✅ Professional multi-page layout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Sticky navigation header
- ✅ Sidebar navigation for docs and examples
- ✅ Code syntax highlighting (dark theme)
- ✅ SEO-friendly metadata
- ✅ Semantic HTML
- ✅ Accessibility-ready
