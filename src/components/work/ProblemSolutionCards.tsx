const problems = [
  {
    problem: 'Real-time Reliability',
    solution: 'Server-authoritative state management, reconnect logic, and session recovery — so a dropped connection never means a lost hand or disputed pot.',
    icon: '⚡',
  },
  {
    problem: 'Dispute Resolution',
    solution: 'Comprehensive hand history logs with action timelines and admin decision tooling — giving support teams everything they need to resolve disputes fairly and fast.',
    icon: '⚖️',
  },
  {
    problem: 'Chip Economy Control',
    solution: 'Designed chip sources/sinks, transfer limits, role-based adjustments, and abuse prevention — keeping the economy honest and operators in control.',
    icon: '🏦',
  },
  {
    problem: 'Back-office Permissions',
    solution: 'Role-based access control across support, risk, finance, and super-admin tiers — right data for the right person, nothing more.',
    icon: '🔐',
  },
  {
    problem: 'Configurable Tables',
    solution: 'Game toggles (Bomb Pot, VPIP tracking, CallTime) with guardrails that prevent broken game states — operators self-serve, devs stay out of the loop.',
    icon: '🎛️',
  },
]

export default function ProblemSolutionCards() {
  return (
    <div className="space-y-4">
      <p className="section-header mb-6">Key Problems → Solutions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map((item) => (
          <div
            key={item.problem}
            className="bg-white/5 border border-white/[0.06] rounded-2xl p-5 hover:border-accent-blue/20 transition-all duration-200"
          >
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-text-primary mb-2">{item.problem}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{item.solution}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
