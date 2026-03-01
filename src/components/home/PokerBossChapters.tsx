'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/* ─── Chapter A ─── */
function ChapterOpportunity() {
  return (
    <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="section-header mb-6"
      >
        Chapter A — The Opportunity
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-black text-text-primary mb-6 leading-tight"
      >
        Not just another app.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="text-text-secondary text-lg leading-relaxed"
      >
        PokerBoss was a high-complexity multiplayer ecosystem — requiring product thinking across gameplay, economy, operations, trust, and control. A club-based poker platform that needed to feel like a polished consumer product and run like enterprise software simultaneously.
      </motion.p>
    </div>
  )
}

/* ─── Chapter B ─── */
const challenges = [
  { icon: '🃏', label: 'Player Experience' },
  { icon: '💰', label: 'Chip / Economy Logic' },
  { icon: '⚡', label: 'Real-time Multiplayer' },
  { icon: '🏢', label: 'Back-office Tooling' },
  { icon: '🎲', label: 'Club & Agent Ops' },
  { icon: '🔒', label: 'Compliance & Trust' },
]

function ChapterChallenge() {
  return (
    <div className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="section-header mb-6 text-center"
      >
        Chapter B — The Challenge
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-black text-text-primary mb-12 text-center leading-tight"
      >
        The real complexity.
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-accent-blue/25 transition-all duration-300"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-semibold text-text-primary text-center">{c.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Chapter C ─── */
const layers = [
  { label: 'Player App', desc: 'Mobile-first multiplayer poker client', img: '/images/pokerboss/IMG_8203.PNG' },
  { label: 'Chip Economy', desc: 'Virtual currency, buy-ins, agent flows', img: '/images/pokerboss/IMG_8215.PNG' },
  { label: 'Club Management', desc: 'Club creation, membership, permissions', img: '/images/pokerboss/IMG_8220.PNG' },
  { label: 'Admin / Back-office', desc: 'Operator dashboard, player management', img: '/images/pokerboss/IMG_8225.PNG' },
  { label: 'Compliance / Governance', desc: 'Audit trails, hand histories, trust', img: '/images/pokerboss/IMG_8230.PNG' },
  { label: 'Growth / Launch Systems', desc: 'Onboarding, referrals, GTM execution', img: '/images/pokerboss/IMG_8235.PNG' },
]

function ChapterSystem() {
  return (
    <div className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="section-header mb-6 text-center"
      >
        Chapter C — The System
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-black text-text-primary mb-12 text-center leading-tight"
      >
        6 product layers.{' '}
        <span className="gradient-text">One coherent system.</span>
      </motion.h3>

      <div className="relative space-y-3">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: 'easeOut' }}
            className="relative flex items-center gap-5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-blue/25 hover:bg-white/[0.05] transition-all duration-300 group"
          >
            {/* Layer number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue text-xs font-bold">
              {i + 1}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-text-primary text-sm">{layer.label}</div>
              <div className="text-text-secondary text-xs mt-0.5">{layer.desc}</div>
            </div>

            {/* Screenshot thumbnail */}
            <div className="flex-shrink-0 relative w-14 h-10 rounded-lg overflow-hidden border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
              <Image
                src={layer.img}
                alt={layer.label}
                fill
                className="object-cover"
              />
            </div>

            {/* Connector line going down (except last) */}
            {i < layers.length - 1 && (
              <div className="absolute -bottom-3 left-8 w-px h-3 bg-gradient-to-b from-accent-blue/30 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Chapter D ─── */
const ownership = [
  'Product Vision & Strategy',
  'PRDs & User Stories',
  'Prioritization & Roadmap',
  'Sprint Execution',
  'Cross-functional Alignment',
  'Systems Thinking (App + Ops + Monetization)',
]

function ChapterRole() {
  return (
    <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="section-header mb-6 text-center"
      >
        Chapter D — My Role
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-black text-text-primary mb-12 text-center leading-tight"
      >
        What I owned.
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ownership.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
            <span className="text-text-primary text-sm font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Chapter E ─── */
const outcomes = [
  'A fully playable multiplayer poker client — real-time, stable, club-integrated',
  'A chip economy and agent management system built for scale',
  'Back-office and compliance tooling enabling safe, auditable club operations',
  'Complete 0→1 delivery: from whiteboard to launched product',
]

function ChapterOutcome() {
  return (
    <div className="py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="section-header mb-6"
      >
        Chapter E — The Outcome
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-black text-text-primary mb-12 leading-tight"
      >
        What shipped.
      </motion.h3>

      <div className="space-y-4 mb-14">
        {outcomes.map((outcome, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-text-primary text-base font-medium leading-relaxed"
          >
            <span className="text-accent-blue mr-2">→</span>
            {outcome}
          </motion.div>
        ))}
      </div>

      {/* PokerBoss logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="relative w-48 h-20">
          <Image
            src="/images/pokerboss/pokerboss-logo-image.png"
            alt="PokerBoss"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Main Component ─── */
export default function PokerBossChapters() {
  return (
    <section id="pokerboss" className="relative bg-bg-secondary/20 border-y border-white/[0.06] overflow-hidden">
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/40 to-transparent" />
          <p className="section-header">Featured Case Study</p>
          <div className="h-px flex-1 bg-gradient-to-l from-accent-blue/40 to-transparent" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl md:text-6xl font-black text-text-primary text-center pb-2"
        >
          PokerBoss
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-text-secondary text-center text-sm tracking-widest uppercase mt-2"
        >
          A five-chapter story
        </motion.p>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/[0.04] mt-12" />
      </div>

      <ChapterOpportunity />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/[0.04]" />
      </div>

      <ChapterChallenge />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/[0.04]" />
      </div>

      <ChapterSystem />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/[0.04]" />
      </div>

      <ChapterRole />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-white/[0.04]" />
      </div>

      <ChapterOutcome />
    </section>
  )
}
