'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 'loco',
    title: 'Loco Studio',
    tagline: "Creator tools for India's gaming-streaming platform",
    description:
      "Built the creator-facing product layer — streaming tools, analytics, and monetization features that helped creators manage and grow their presence on India's gaming streaming platform.",
    image: '/images/project-images/loco-project.jpg',
    tags: ['B2C', 'Growth', 'Streaming'],
    metric: '~2M+ creators on platform',
    href: '/work',
  },
  {
    id: 'cricket',
    title: 'Cricket.com',
    tagline: 'RMG onboarding & funnel conversion',
    description:
      "Led UX and product improvements to the onboarding funnel for Cricket.com's real-money gaming app — a data-driven redesign that measurably improved conversion and reduced drop-off.",
    image: '/images/project-images/cricket-project.jpg',
    tags: ['B2C', 'RMG', 'Growth'],
    metric: '+22% conversion · −18% drop-off',
    href: '/work',
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    tagline: 'Internal tooling for product & growth teams',
    description:
      'Designed and shipped an internal analytics dashboard that consolidated fragmented data sources, enabling faster decision-making across product and growth teams.',
    image: '/images/project-images/dashboard-project.jpg',
    tags: ['Internal Tools', 'Data', 'Ops'],
    metric: 'Adopted across 3 teams',
    href: '/work',
  },
]

export default function SupportingWork() {
  return (
    <section className="py-28 max-w-6xl mx-auto px-4 sm:px-6">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-header mb-4">Other Systems I&apos;ve Shipped</p>
        <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight max-w-lg">
          Beyond PokerBoss.
        </h2>
        <p className="text-text-secondary mt-3 max-w-xl">
          Supporting projects that show range — growth, creator tools, internal ops.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
          >
            <Link
              href={project.href}
              className="group flex flex-col bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden card-glow hover:-translate-y-1 transition-all duration-300 h-full"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary/70 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">{project.description}</p>
                <div className="pt-2 text-accent-blue text-xs font-semibold">{project.metric}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium hover:gap-3 transition-all duration-200"
        >
          View full case studies
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>

    </section>
  )
}
