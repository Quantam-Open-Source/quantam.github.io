import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DocsPage from './pages/DocsPage'
import ApiPage from './pages/ApiPage'
import ExamplesPage from './pages/ExamplesPage'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="quantam-ui-theme">
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
    </ThemeProvider>
  )
}

export default App
