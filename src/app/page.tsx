import Hero from '@/components/home/Hero'
import FeaturedWork from '@/components/home/FeaturedWork'
import SkillsStrip from '@/components/home/SkillsStrip'
import CTABanner from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsStrip />
      <FeaturedWork />
      <CTABanner />
    </>
  )
}
