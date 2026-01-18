import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DocsPage from './pages/DocsPage'
import ApiPage from './pages/ApiPage'
import ExamplesPage from './pages/ExamplesPage'
import { updateSEO, seoMetadata } from '@/lib/seo'

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    // Update SEO based on current route
    const pathname = location.pathname
    let seoKey: keyof typeof seoMetadata = 'home'

    if (pathname === '/docs') seoKey = 'docs'
    else if (pathname === '/api') seoKey = 'api'
    else if (pathname === '/examples') seoKey = 'examples'

    updateSEO(seoMetadata[seoKey])
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="quantam-ui-theme">
      <AppContent />
    </ThemeProvider>
  )
}

export default App
