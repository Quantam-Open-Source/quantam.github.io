import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string | ReactNode
  centered?: boolean
  animate?: boolean
}

export function SectionHeader({
  title,
  description,
  centered = true,
  animate = true,
}: SectionHeaderProps) {
  const content = (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : ''}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  )
}
