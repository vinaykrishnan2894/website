'use client'

import { motion } from 'framer-motion'

const tenets = [
  {
    number: '01',
    title: 'Complexity is a feature, not a bug.',
    body: "I gravitate toward products where the hard parts — real-time state, multi-sided operations, regulated economies — are the product. That's where moats get built.",
  },
  {
    number: '02',
    title: 'The PM is the connective tissue.',
    body: "My job isn't to have all the answers. It's to make sure the right people are aligned on the right problems at the right time. Clarity is the deliverable.",
  },
  {
    number: '03',
    title: 'Ship to learn, not to launch.',
    body: "Every release is a hypothesis. I care about what we discover as much as what we deliver. The roadmap is a strategy, not a contract.",
  },
  {
    number: '04',
    title: 'Operators are users too.',
    body: "A product is only as strong as the infrastructure around it. Club managers, agents, admins — if their tools are broken, the consumer experience breaks too.",
  },
]

export default function PhilosophySection() {
  return (
    <section className="py-28 border-t border-white/[0.06] bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="section-header mb-4">PM Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary leading-tight">
            How I think about the work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenets.map((tenet, i) => (
            <motion.div
              key={tenet.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-blue/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Tenet number watermark */}
              <div className="absolute top-5 right-6 text-5xl font-black text-white/[0.04] select-none leading-none">
                {tenet.number}
              </div>

              <div className="relative space-y-3">
                <h3 className="text-base font-bold text-text-primary leading-snug pr-8">
                  {tenet.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {tenet.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
