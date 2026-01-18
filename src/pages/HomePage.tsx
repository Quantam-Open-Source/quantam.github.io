import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/CodeBlock'
import { SectionHeader } from '@/components/SectionHeader'
import { FEATURES, PROBLEMS, USE_CASES, EXTERNAL_LINKS, ANIMATION_VARIANTS } from '@/lib/constants'

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="container relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...ANIMATION_VARIANTS.fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              Version 0.1.1 - Now Available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Async workflows for{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                any backend stack
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Quantam is a lightweight async workflow engine for building reliable task pipelines with retries,
              parallel execution, timeouts, and cancellation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <NavLink to={EXTERNAL_LINKS.docs}>
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </NavLink>
            <Button variant="outline" size="lg" asChild>
              <a href={EXTERNAL_LINKS.npm} target="_blank" rel="noreferrer">
                View on npm
                <Package className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <p className="text-sm text-muted-foreground">
              Deterministic flows, simple API, and ready for batch workloads.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 mx-auto max-w-2xl text-left"
          >
            <div className="relative rounded-xl bg-muted p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <CodeBlock showCopy={false}>
                {`const result = await quantam()
  .step(fetchUser)
  .step(enrichUserData)
  .parallel([saveCache, logAnalytics])
  .retry(3)
  .timeout(5000)
  .run(userId)`}
              </CodeBlock>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Problems Section
function ProblemsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="The Problem"
          description="Writing reliable async code is hard. Without a framework, you end up with:"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.container}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((problem) => (
              <motion.div key={problem} variants={ANIMATION_VARIANTS.item}>
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                        <span className="text-destructive font-bold">×</span>
                      </div>
                      <h3 className="font-semibold text-foreground">{problem}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Quantam"
          description="Replace messy async code with a clean, powerful fluent API designed for production workloads."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.container}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const IconComponent = feature.icon
              return (
                <motion.div key={feature.id} variants={ANIMATION_VARIANTS.item}>
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${feature.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Use Cases Section
function UseCasesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Perfect for" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.container}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {USE_CASES.map((useCase) => {
              const IconComponent = useCase.icon
              return (
                <motion.div key={useCase.id} variants={ANIMATION_VARIANTS.item}>
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {useCase.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      
      <div className="container relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center text-primary-foreground"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Ready to simplify your async code?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join developers building reliable, scalable async workflows with Quantam. Get started in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to={EXTERNAL_LINKS.docs}>
              <Button size="lg" variant="secondary" className="group min-w-48">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </NavLink>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 min-w-48"
              asChild
            >
              <a href={EXTERNAL_LINKS.github} target="_blank" rel="noreferrer">
                <Rocket className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          <div className="mt-12 text-sm text-primary-foreground/70">
            <p>Deterministic flows • Type-safe • Production-ready</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemsSection />
      <FeaturesSection />
      <UseCasesSection />
      <CTASection />
    </div>
  )
}
