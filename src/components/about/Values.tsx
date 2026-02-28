const values = [
  {
    title: 'Systems over features',
    description: 'I think in feedback loops, not task lists.',
    icon: '🔄',
    detail:
      'Features are outputs. Systems are what create durable product value. I design for how things connect — not just what gets built.',
  },
  {
    title: 'Trust is the product',
    description: "In real-time systems, fairness and reliability aren't features. They're the product.",
    icon: '🛡️',
    detail:
      'Every design decision in PokerBoss came back to one question: would players trust this? Trust is hard to build and easy to destroy.',
  },
  {
    title: 'Complexity is a gift',
    description: 'The messiest problems are where the most interesting PM work lives.',
    icon: '🧩',
    detail:
      'Easy problems attract generic solutions. Hard problems are where PM judgment creates disproportionate value. I lean in.',
  },
  {
    title: 'Ship to learn',
    description: 'A soft launch teaches you more than 6 months of planning.',
    icon: '🚀',
    detail:
      'Conviction without evidence is just a guess. I ship to validate, measure relentlessly, and iterate fast.',
  },
]

export default function Values() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <p className="section-header mb-10">What I Believe</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-white/5 border border-white/[0.06] rounded-2xl p-6 card-glow transition-all duration-300 space-y-3"
          >
            <div className="text-3xl">{value.icon}</div>
            <h3 className="text-lg font-bold text-text-primary">{value.title}</h3>
            <p className="text-accent-blue text-sm font-medium italic">&ldquo;{value.description}&rdquo;</p>
            <p className="text-text-secondary text-sm leading-relaxed">{value.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
