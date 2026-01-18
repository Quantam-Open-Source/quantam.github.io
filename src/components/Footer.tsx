import { NavLink } from 'react-router-dom'
import { Github, Package } from 'lucide-react'

const currentYear = new Date().getFullYear()

const FOOTER_LINKS = [
  {
    title: 'Resources',
    links: [
      { label: 'GitHub', href: 'https://github.com/BYRON-lang/Quantam-Async' },
      { label: 'npm Package', href: 'https://www.npmjs.com/package/quantam-async' },
      { label: 'Issues', href: 'https://github.com/BYRON-lang/Quantam-Async/issues' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discussions', href: 'https://github.com/BYRON-lang/Quantam-Async/discussions' },
      { label: 'Contributing', href: 'https://github.com/BYRON-lang/Quantam-Async/blob/main/CONTRIBUTING.md' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Examples', href: '/examples' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="mb-4">
              <img src="/logo.svg" alt="Quantam" className="h-14 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lightweight async workflow engine for building reliable task pipelines with retries, parallel execution, and cancellation.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/BYRON-lang/Quantam-Async"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/quantam-async"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">npm</span>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => {
                  const isInternal = link.href.startsWith('/')
                  const className = "text-sm text-muted-foreground hover:text-foreground transition-colors"
                  
                  if (isInternal) {
                    return (
                      <li key={link.label}>
                        <NavLink to={link.href} className={className}>
                          {link.label}
                        </NavLink>
                      </li>
                    )
                  }

                  return (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Quantam Async. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://github.com/BYRON-lang/Quantam-Async/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                MIT License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
