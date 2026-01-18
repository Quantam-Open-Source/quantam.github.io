import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Github, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigation = [
  { name: 'Docs', href: '/docs' },
  { name: 'API', href: '/api' },
  { name: 'Examples', href: '/examples' },
  { name: 'Changelog', href: '/changelog' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="Quantam" 
              className="h-10 w-auto"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 ${
                  isActive ? 'text-foreground' : 'text-foreground/60'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub */}
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/BYRON-lang/Quantam-Async"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>

          {/* NPM */}
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.npmjs.com/package/quantam-async"
              target="_blank"
              rel="noreferrer"
            >
              <Package className="h-4 w-4" />
              <span className="sr-only">NPM</span>
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <img 
                       src="/logo.svg" 
                       alt="Quantam" 
                       className="h-12 w-auto"
                     />
                   </div>
                 </div>
                
                <nav className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive ? 'bg-accent text-accent-foreground' : 'text-foreground/60'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>

                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" className="justify-start" asChild>
                    <a
                      href="https://github.com/BYRON-lang/Quantam-Async"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <a
                      href="https://www.npmjs.com/package/quantam-async"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      NPM
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
