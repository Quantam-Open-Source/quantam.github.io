import { Book, Code, Zap, Clock, XCircle, Database } from 'lucide-react'

export interface DocSection {
  id: string
  title: string
  icon: typeof Book
}

export const DOC_SECTIONS: DocSection[] = [
  { id: 'install', title: 'Install', icon: Book },
  { id: 'quickstart', title: 'Quick Start', icon: Zap },
  { id: 'concepts', title: 'Core Concepts', icon: Code },
  { id: 'step-naming', title: 'Step Naming', icon: Code },
  { id: 'error-handling', title: 'Error Handling', icon: XCircle },
  { id: 'cancellation', title: 'Cancellation', icon: Clock },
  { id: 'batch', title: 'Batch Processing', icon: Database },
]

export const INSTALLATION_COMMANDS = {
  npm: 'npm install quantam-async',
} as const

export const INSTALL_ICONS = {
  npm: { bg: 'bg-red-100', text: 'text-red-600', label: 'npm' },
} as const
