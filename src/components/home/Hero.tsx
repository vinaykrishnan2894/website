import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-blue/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <Badge variant="blue">Senior Product Manager</Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-text-primary tracking-tight leading-tight">
                Vinay
                <br />
                <span className="gradient-text">Krishnan</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
                I build product systems that people trust — from real-time
                multiplayer engines to club ops platforms. I&apos;m drawn to the
                messy, high-stakes problems where the UX, the architecture, and
                the business model all have to work together.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/work" variant="primary" size="lg">
                See My Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button
                href="/Vinay_Krishnan_Resume.pdf"
                variant="outline"
                size="lg"
                target="_blank"
                download="Vinay_Krishnan_Resume.pdf"
              >
                Download Resume
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-black text-text-primary">6+</div>
                <div className="text-text-secondary text-sm mt-0.5">Years Experience</div>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div>
                <div className="text-3xl font-black text-text-primary">3+</div>
                <div className="text-text-secondary text-sm mt-0.5">Products Shipped</div>
              </div>
              <div className="w-px bg-white/[0.06]" />
              <div>
                <div className="text-3xl font-black text-text-primary">0→1</div>
                <div className="text-text-secondary text-sm mt-0.5">PokerBoss Build</div>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="relative flex-shrink-0">
            {/* Experience badge */}
            <div className="absolute -top-4 -right-4 z-10 bg-accent-blue text-white rounded-2xl px-4 py-3 shadow-lg shadow-accent-blue/25">
              <div className="text-2xl font-black leading-none">6+</div>
              <div className="text-xs font-medium mt-0.5 opacity-90">Years</div>
            </div>

            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/20 to-transparent blur-xl" />
              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Vinay Krishnan — Senior Product Manager"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
