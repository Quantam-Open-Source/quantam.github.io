import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu } from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

interface DocsLayoutProps {
  sections: Section[]
  activeSection: string
  onSectionChange: (id: string) => void
  children: ReactNode
}

export function DocsLayout({
  sections,
  activeSection,
  onSectionChange,
  children,
}: DocsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-background border-b">
        <div className="container px-4 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full justify-start"
          >
            <Menu className="mr-2 h-4 w-4" />
            {mobileMenuOpen ? 'Hide Navigation' : 'Show Navigation'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex gap-4 sm:gap-8">
          {/* Sidebar */}
          <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64`}>
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        onSectionChange(section.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium truncate">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-12rem)]">
              <ScrollArea className="h-full">
                <div className="max-w-4xl pb-8">
                  {children}
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
