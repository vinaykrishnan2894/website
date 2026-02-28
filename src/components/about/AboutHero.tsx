import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="pt-24 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/profile-photo.jpg"
              alt="Vinay Krishnan"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="section-header mb-3">About Me</p>
            <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">
              I build product systems<br className="hidden md:block" /> people trust.
            </h1>
          </div>

          <div className="space-y-4 text-text-secondary leading-relaxed max-w-2xl">
            <p>
              I&apos;m a Senior Product Manager who gravitates toward high-complexity,
              high-stakes product problems — the kind where user experience, system
              architecture, and business mechanics all have to click together perfectly.
              I&apos;ve spent 6+ years building products in competitive, real-time, and
              operationally complex domains: gaming platforms, streaming tools, and poker
              ecosystems.
            </p>
            <p>
              What drives me is simple: I genuinely care about how people experience the
              products I build. I&apos;m not satisfied with shipping features — I want to ship
              systems that feel trustworthy, performant, and human.
            </p>
            <p>
              Outside of work, I play chess, poker, and basketball. I run deep on strategy
              games (Dota 2, Elden Ring). I read about neuroscience, decision theory, and
              body language — because understanding how people think is the most useful
              skill a PM can have. I bring that same curiosity to every product I work on.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
