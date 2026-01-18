import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/SectionHeader'
import { CHANGELOG, getChangelogColor } from '@/lib/changelog'

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 sm:py-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Changelog"
            description="Track the evolution of Quantam with detailed release notes and updates."
            animate={true}
          />

          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            {CHANGELOG.map((entry, index) => (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl font-bold">
                            v{entry.version}
                          </CardTitle>
                          <Badge
                            className={`capitalize font-semibold border ${getChangelogColor(entry.type)}`}
                            variant="outline"
                          >
                            {entry.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          Released on {entry.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {entry.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-foreground">
                        What's Changed:
                      </h4>
                      <ul className="space-y-2">
                        {entry.changes.map((change, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-primary font-bold mt-0.5 flex-shrink-0">•</span>
                            <span className="text-sm text-muted-foreground">
                              {change}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground">
              For more details, visit our{' '}
              <a
                href="https://github.com/quantam/quantam-async"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                GitHub repository
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
