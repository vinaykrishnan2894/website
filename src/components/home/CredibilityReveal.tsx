'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    value: '6+',
    label: 'Years of product experience',
    detail: 'Across gaming, streaming, sports & creator economy',
  },
  {
    value: '0→1',
    label: 'Built PokerBoss from scratch',
    detail: 'From whiteboard concept to shipped multiplayer product',
  },
  {
    value: '3+',
    label: 'Major products shipped',
    detail: 'PokerBoss, Loco Studio, Cricket.com RMG',
  },
  {
    value: '4',
    label: 'Domains mastered',
    detail: 'Gaming · Streaming · Sports · Creator tools',
  },
]

export default function CredibilityReveal() {
  return (
    <section className="py-24 border-t border-white/[0.06] bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="section-header text-center mb-16"
        >
          Evidence
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'easeOut' }}
              className="relative group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-blue/25 hover:bg-white/[0.05] transition-all duration-300"
            >
              {/* Subtle top accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

              <div className="text-4xl font-black text-text-primary mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-text-primary mb-2 leading-snug">
                {stat.label}
              </div>
              <div className="text-xs text-text-secondary leading-relaxed">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
