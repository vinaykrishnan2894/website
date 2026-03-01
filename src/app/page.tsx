import HeroScene from "@/components/home/HeroScene"
import CredibilityReveal from "@/components/home/CredibilityReveal"
import HowIBuild from "@/components/home/HowIBuild"
import PokerBossChapters from "@/components/home/PokerBossChapters"
import SupportingWork from "@/components/home/SupportingWork"
import PhilosophySection from "@/components/home/PhilosophySection"
import CareerTimeline from "@/components/home/CareerTimeline"
import ClosingScene from "@/components/home/ClosingScene"

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <CredibilityReveal />
      <HowIBuild />
      <PokerBossChapters />
      <SupportingWork />
      <PhilosophySection />
      <CareerTimeline />
      <ClosingScene />
    </>
  )
}
