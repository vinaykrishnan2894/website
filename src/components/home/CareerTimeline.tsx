'use client'

import { motion } from 'framer-motion'

const roles = [
  {
    company: 'PokerBoss',
    role: 'Senior Product Manager — Lead',
    period: '2022 – Present',
    type: '0→1 Build',
    highlights: [
      'Built entire product from concept to launch',
      'Designed chip economy, club ops, and compliance systems',
      'Shipped multiplayer poker client for iOS & Android',
      'Owned PRD, roadmap, sprint cadence, and stakeholder alignment',
    ],
    accent: 'accent-blue',
  },
  {
    company: 'Loco',
    role: 'Product Manager — Creator Studio',
    period: '2021 – 2022',
    type: 'Growth',
    highlights: [
      'Built creator tooling for India\'s gaming streaming platform',
      'Shipped analytics dashboard, monetisation features',
      'Worked across growth, retention, and creator acquisition',
    ],
    accent: 'accent-blue',
  },
  {
    company: 'Cricket.com',
    role: 'Product Manager — Growth & Onboarding',
    period: '2020 – 2021',
    type: 'RMG · B2C',
    highlights: [
      'Led UX redesign of RMG onboarding funnel',
      '+22% conversion rate improvement',
      '−18% funnel drop-off',
      'Data-driven iteration across 3 A/B test cycles',
    ],
    accent: 'accent-blue',
  },
  {
    company: 'Earlier',
    role: 'PM / Associate PM',
    period: '2018 – 2020',
    type: 'Foundation',
    highlights: [
      'B2C consumer product work across fintech and e-commerce adjacent domains',
      'Built core PM skills: user research, PRDs, stakeholder management',
    ],
    accent: 'accent-blue',
  },
]

export default function CareerTimeline() {
  return (
    <section className="py-28 max-w-6xl mx-auto px-4 sm:px-6">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <p className="section-header mb-4">Career</p>
        <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight">
          The arc, in brief.
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/40 via-accent-blue/20 to-transparent md:left-[50%]" />

        <div className="space-y-10">
          {roles.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 pl-12 md:pl-0`}
            >
              {/* Dot */}
              <div className="absolute left-2.5 top-5 w-3 h-3 rounded-full bg-accent-blue border-2 border-bg-primary shadow-lg shadow-accent-blue/40 md:left-[calc(50%-6px)]" />

              {/* Card — takes up half width on desktop */}
              <div className={`w-full md:w-[calc(50%-24px)] ${i % 2 === 0 ? 'md:pr-4' : 'md:pl-4'}`}>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-blue/25 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{role.company}</h3>
                      <p className="text-text-secondary text-xs mt-0.5">{role.role}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-accent-blue font-semibold">{role.type}</div>
                      <div className="text-xs text-text-secondary/60 mt-0.5">{role.period}</div>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                        <span className="text-accent-blue mt-0.5 flex-shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer on desktop */}
              <div className="hidden md:block md:w-[calc(50%-24px)]" />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
