import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import Timeline from '@/components/about/Timeline'
import Values from '@/components/about/Values'

export const metadata: Metadata = {
  title: 'About — Vinay Krishnan',
  description:
    'Senior Product Manager with 6+ years building complex product systems in gaming, streaming, and real-money domains.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <div className="border-t border-white/[0.06]">
        <Timeline />
      </div>
      <div className="border-t border-white/[0.06]">
        <Values />
      </div>
    </>
  )
}
