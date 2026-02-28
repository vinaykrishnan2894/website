import Button from '@/components/ui/Button'

export default function CTABanner() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-blue/20 via-bg-secondary to-bg-secondary border border-accent-blue/20 p-12 text-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent-blue/10 blur-3xl rounded-full" />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available from March 2026
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-text-primary">
            Currently open to Senior PM roles
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            Remote or Bangalore. If you&apos;re building something complex and
            ambitious, I&apos;d love to talk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button href="/work" variant="outline" size="lg">
              See My Work First
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
