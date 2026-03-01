'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const NODE_COUNT = 18
const nodes = [
  { cx: '8%', cy: '15%' }, { cx: '22%', cy: '6%' }, { cx: '38%', cy: '18%' },
  { cx: '55%', cy: '8%' }, { cx: '70%', cy: '20%' }, { cx: '85%', cy: '10%' },
  { cx: '92%', cy: '30%' }, { cx: '80%', cy: '45%' }, { cx: '65%', cy: '55%' },
  { cx: '75%', cy: '70%' }, { cx: '88%', cy: '80%' }, { cx: '60%', cy: '85%' },
  { cx: '45%', cy: '75%' }, { cx: '30%', cy: '88%' }, { cx: '15%', cy: '78%' },
  { cx: '5%', cy: '60%' }, { cx: '12%', cy: '40%' }, { cx: '28%', cy: '50%' },
]
const connections = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],
  [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,2],[0,16],[3,8],
  [4,9],[7,12],[1,17],[5,7],[8,12],
]

function toPercent(val: string) { return val }

export default function HeroScene() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary pt-16">
      {/* Animated SVG background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B7DED" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3B7DED" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Connection lines */}
          {connections.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].cx}
              y1={nodes[a].cy}
              x2={nodes[b].cx}
              y2={nodes[b].cy}
              stroke="rgba(59,125,237,0.18)"
              strokeWidth="0.15"
            />
          ))}
          {/* Nodes */}
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="0.5"
              fill="#3B7DED"
              opacity="0.7"
              style={{
                animation: `pulse-node ${2.5 + (i % 4) * 0.5}s ease-in-out ${(i * 0.18) % 2}s infinite alternate`,
              }}
            />
          ))}
        </svg>
        {/* Ambient glows */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-accent-blue/4 rounded-full blur-[80px]" />
      </div>

      <style jsx>{`
        @keyframes pulse-node {
          from { opacity: 0.4; r: 0.4; }
          to   { opacity: 0.9; r: 0.65; }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Text */}
          <div className="flex-1 space-y-8">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="section-header tracking-widest">Senior Product Manager</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-[1.05]">
                I build product{' '}
                <span className="gradient-text">systems</span>
                <br />
                people trust.
              </h1>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-xl text-text-secondary leading-relaxed max-w-xl"
            >
              6+ years building high-stakes consumer products where UX, systems, and business logic must work together — from real-time multiplayer engines to club ops platforms.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <Button href="/work" variant="primary" size="lg">
                Enter PokerBoss
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-6 bg-gradient-to-b from-transparent to-accent-blue/50" />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent-blue/60"
                  style={{ animation: 'bounce 2s ease-in-out infinite' }}
                />
                <div className="w-px h-6 bg-gradient-to-b from-accent-blue/50 to-transparent" />
              </div>
              <span className="text-text-secondary text-xs tracking-widest uppercase">Scroll to explore</span>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            {/* Experience badge */}
            <div className="absolute -top-4 -right-4 z-10 bg-accent-blue text-white rounded-2xl px-4 py-3 shadow-lg shadow-accent-blue/25">
              <div className="text-2xl font-black leading-none">6+</div>
              <div className="text-xs font-medium mt-0.5 opacity-90">Years</div>
            </div>

            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/20 to-transparent blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Vinay Krishnan — Senior Product Manager"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
