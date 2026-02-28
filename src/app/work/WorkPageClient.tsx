'use client'

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import PokerBossCase from '@/components/work/PokerBossCase'
import ProjectCard from '@/components/work/ProjectCard'
import ProjectFilter from '@/components/work/ProjectFilter'

const FILTERS = ['All', '0→1 Builds', 'Growth', 'Gaming', 'B2C']

const otherProjects = [
  {
    title: 'Loco Studio',
    tagline: "Creator tools for India's gaming-streaming platform",
    role: 'Product Manager · Loco · Mar 2021 – Nov 2023',
    period: '2021–2023',
    problem:
      "Loco's creator community lacked the tools to manage, understand, and monetize their presence on the platform. Creators were flying blind — no analytics, no scheduling, no clear monetization path.",
    whatIDid: [
      'Built the creator-facing analytics dashboard: real-time viewer counts, demographic insights, content performance metrics',
      'Designed monetization tools: donation flows, revenue tracking, and payout transparency',
      'Led stream scheduling and management feature, reducing creator prep friction',
      'Ran continuous discovery sessions with top creators to prioritize the right problems',
      'Worked cross-functionally with engineering, design, and the creator partnerships team',
    ],
    impact: [
      'Creator retention increased by 35% within 6 months of studio tools launch',
      'Monetization engagement (donations + subscriptions) up 42%',
      'Content quality metrics (stream consistency, avg viewership) improved 28%',
    ],
    image: '/images/project-images/loco-project.jpg',
    tags: ['B2C', 'Growth', 'Streaming'],
  },
  {
    title: 'Cricket.com',
    tagline: 'RMG onboarding & funnel conversion optimization',
    role: 'Product Manager · Head Digital Works · Feb 2024 – 2025',
    period: '2024–2025',
    problem:
      "Cricket.com's real-money gaming product had high acquisition but poor onboarding conversion. Users were dropping off before completing their first deposit — a critical funnel break.",
    whatIDid: [
      'Audited the full onboarding funnel with data and user research — identified 4 key drop-off points',
      'Redesigned KYC and account setup flows to reduce friction and time-to-first-game',
      'Implemented personalized onboarding paths based on cricket knowledge level',
      'Added real-time score and stats integration to drive in-app engagement',
      'Shipped A/B tests across 3 major funnel variants',
    ],
    impact: [
      'Conversion rate improved by 22% in first quarter post-launch',
      'Drop-off rate reduced by 18% at the critical KYC step',
      'Day-7 retention improved by 25% for users who completed new onboarding',
    ],
    image: '/images/project-images/cricket-project.jpg',
    tags: ['B2C', 'Growth', 'RMG'],
  },
  {
    title: 'Streamer Dashboard',
    tagline: 'Analytics platform for Loco content creators',
    role: 'Product Manager · Loco · 2022–2023',
    period: '2022–2023',
    problem:
      'Top streamers on Loco needed deeper performance insights to compete professionally. The existing analytics were too shallow to help them make informed content decisions.',
    whatIDid: [
      'Designed advanced analytics: viewer retention curves, engagement heatmaps, comparative benchmarking',
      'Built revenue and donation analytics with exportable reports',
      'Created audience growth metrics and follower trend analysis',
      'Added competitive benchmarking against similar-tier creators',
    ],
    impact: [
      'Creator platform engagement up 40% among power users',
      'Content optimization rate (A/B stream testing) improved by 32%',
      'Creator revenue tracking adoption reached 78% of monetized creators',
    ],
    image: '/images/project-images/dashboard-project.jpg',
    tags: ['B2C', 'Growth', 'Gaming'],
  },
]

const tagFilters: Record<string, string[]> = {
  All: [],
  '0→1 Builds': ['0→1 Build'],
  Growth: ['Growth'],
  Gaming: ['Gaming'],
  B2C: ['B2C'],
}

export default function WorkPageClient() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects =
    activeFilter === 'All'
      ? otherProjects
      : otherProjects.filter((p) =>
          p.tags.some((tag) => tagFilters[activeFilter]?.includes(tag))
        )

  const showPokerBoss =
    activeFilter === 'All' ||
    tagFilters[activeFilter]?.some((t) =>
      ['0→1 Build', 'Gaming', 'B2B'].includes(t)
    ) ||
    activeFilter === '0→1 Builds' ||
    activeFilter === 'Gaming'

  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        label="Case Studies"
        title="Work"
        subtitle="The products I've built, the problems I've solved, and the systems I've shipped."
      />

      <ProjectFilter
        filters={FILTERS}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* PokerBoss flagship */}
      {showPokerBoss && (
        <div className="mb-16">
          <PokerBossCase />
        </div>
      )}

      {/* Other projects */}
      {filteredProjects.length > 0 && (
        <>
          <h3 className="text-xl font-bold text-text-primary mb-6 mt-4">
            {showPokerBoss ? 'Other Projects' : 'Projects'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </>
      )}

      {!showPokerBoss && filteredProjects.length === 0 && (
        <div className="text-center py-24 text-text-secondary">
          No projects match this filter yet.
        </div>
      )}
    </div>
  )
}
