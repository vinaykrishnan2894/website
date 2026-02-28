import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import SystemDiagram from './SystemDiagram'
import ProblemSolutionCards from './ProblemSolutionCards'

const screenshots = [
  '/images/pokerboss/IMG_8203.PNG',
  '/images/pokerboss/IMG_8204.PNG',
  '/images/pokerboss/IMG_8205.PNG',
  '/images/pokerboss/IMG_8206.PNG',
  '/images/pokerboss/IMG_8207.PNG',
  '/images/pokerboss/IMG_8209.PNG',
]

const ownership = [
  'Product vision, strategy & roadmap (0 → launch)',
  'PRDs across Unity client, SmartFox real-time backend, web admin portal',
  'Back-office product: support, risk, finance, dispute tooling',
  'Chip economy design: types, sinks/sources, controls, abuse prevention',
  'Cross-functional execution: engineering, design, QA, legal, marketing',
  'Launch planning: soft launch → hard launch readiness',
  'Metrics, instrumentation, operational feedback loops',
]

const techStack = ['Unity', 'SmartFox', 'React/Next.js', 'Tailwind', 'shadcn/ui', 'Node.js']

const impact = [
  'Shipped a full multiplayer poker ecosystem from 0 → soft launch',
  'Admin portal reduced manual ops load across support, risk, and finance teams',
  'Server-authoritative validation improved table stability and fairness',
  'Configurable club controls enabled operators to self-serve game management',
]

const personas = ['Players', 'Club Operators', 'Agents & Admins']

export default function PokerBossCase() {
  return (
    <div className="border border-accent-blue/20 rounded-3xl overflow-hidden bg-white/[0.02]">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-white/[0.06] bg-gradient-to-br from-accent-blue/10 via-transparent to-transparent">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="gold">⭐ FLAGSHIP PROJECT</Badge>
              <Badge variant="blue">0→1 Build</Badge>
              <Badge variant="subtle">2023 – 2026</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/pokerboss/pokerboss-logo-image.png"
                  alt="PokerBoss logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-text-primary">PokerBoss</h2>
                <p className="text-text-secondary mt-1">Baazi Games · Senior Product Manager</p>
              </div>
            </div>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              A club-based real-money poker ecosystem built from scratch: mobile client +
              real-time multiplayer backend + back-office control plane.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-16">
        {/* Why it exists */}
        <div>
          <p className="section-header mb-4">The Problem</p>
          <p className="text-text-secondary leading-relaxed text-lg max-w-3xl">
            The real challenge in poker isn&apos;t the game — it&apos;s the business operating
            system. PokerBoss was built to be that OS: trustworthy, configurable, scalable
            infrastructure for clubs, agents, and operators to run private poker communities.
          </p>
        </div>

        {/* Who uses it */}
        <div>
          <p className="section-header mb-4">Who Uses It</p>
          <div className="flex flex-wrap gap-3">
            {personas.map((p) => (
              <div key={p} className="px-5 py-3 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-semibold">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* What I owned */}
        <div>
          <p className="section-header mb-4">What I Owned</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ownership.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Diagram */}
        <SystemDiagram />

        {/* Screenshots */}
        <div>
          <p className="section-header mb-6">App Screens</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {screenshots.map((src, i) => (
              <div key={i} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-white/[0.06]">
                <Image
                  src={src}
                  alt={`PokerBoss screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Problem → Solution Cards */}
        <ProblemSolutionCards />

        {/* Impact */}
        <div>
          <p className="section-header mb-4">Impact</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {impact.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                <div className="text-green-400 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <p className="section-header mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06] text-text-primary text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
