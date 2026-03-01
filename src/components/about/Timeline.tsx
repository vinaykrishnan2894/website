const timeline = [
  {
    role: 'Senior Product Manager',
    company: 'Baazi Games (PokerBoss)',
    period: '2023 – 2026',
    description:
      'Built PokerBoss from 0 → launch: full multiplayer poker ecosystem spanning mobile client, real-time backend, and back-office control plane.',
    current: true,
  },
  {
    role: 'Product Manager',
    company: 'Head Digital Works (Cricket.com)',
    period: 'Feb 2024 – 2025',
    description:
      "Led onboarding and funnel optimization for Cricket.com's real-money gaming app — improved conversion by 22%, reduced drop-off by 18%.",
    current: false,
  },
  {
    role: 'Product Manager',
    company: 'Loco',
    period: 'Mar 2021 – Nov 2023',
    description:
      "Built Loco Studio — the creator-facing product layer including streaming tools, analytics dashboard, and monetization features for India's gaming streaming platform.",
    current: false,
  },
  {
    role: 'Business Development Manager',
    company: 'Rheo',
    period: 'Mar 2020 – Mar 2021',
    description:
      'Early-stage BD role at a video-first social platform. Drove creator acquisition and partnership programs.',
    current: false,
  },
  {
    role: 'Management Trainee',
    company: 'Livspace',
    period: 'Jul 2019 – Feb 2020',
    description:
      'Rotational program across operations, design, and sales at India\'s leading interior design platform.',
    current: false,
  },
]

export default function Timeline() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <p className="section-header mb-10">Career Timeline</p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-white/[0.06]" />

        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div key={i} className="relative flex gap-8 md:gap-12">
              {/* Dot */}
              <div className="relative flex-shrink-0 flex items-start">
                <div className={`w-9 h-9 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center z-10 ${
                  item.current
                    ? 'border-accent-blue bg-accent-blue/20'
                    : 'border-white/10 bg-bg-primary'
                }`}>
                  {item.current && (
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 pb-8 ${i < timeline.length - 1 ? '' : ''}`}>
                <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
                  item.current
                    ? 'bg-accent-blue/5 border-accent-blue/20'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-text-primary">{item.role}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                      item.current
                        ? 'bg-accent-blue/15 text-accent-blue'
                        : 'bg-white/5 text-text-secondary'
                    }`}>
                      {item.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-3 font-medium">{item.company}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
