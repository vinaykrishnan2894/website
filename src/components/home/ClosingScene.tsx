'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function ClosingScene() {
  return (
    <section className="relative py-28 overflow-hidden border-t border-white/[0.06] bg-bg-secondary/20">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent-blue/8 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-accent-blue/5 blur-[60px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          Available from March 2026
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-5"
        >
          If you&apos;re building something{' '}
          <span className="gradient-text">hard</span>, let&apos;s talk.
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="text-text-secondary text-lg leading-relaxed mb-10"
        >
          Open to Senior PM roles — remote or Bangalore. I&apos;m drawn to complex consumer products, multiplayer systems, and anything where the product, ops, and monetization layers need to cohere.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
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
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/[0.06]"
        >
          <p className="text-text-secondary/40 text-xs tracking-widest uppercase">
            vinaykrishnan.in · Senior Product Manager
          </p>
        </motion.div>

      </div>
    </section>
  )
}
