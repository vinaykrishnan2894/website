const skills = [
  'Product Strategy',
  'Roadmapping',
  'PRDs',
  'Real-time Systems',
  'Data Analytics',
  'A/B Testing',
  'Unity (collab)',
  'React/Next.js (back-office)',
  'SQL',
  'Mixpanel',
  'Figma',
  'JIRA',
  'Sprint Planning',
  'GTM',
]

export default function SkillsStrip() {
  return (
    <section className="py-16 border-y border-white/[0.06] bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="section-header mb-8 text-center">Skills & Tools</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/[0.06] text-text-secondary text-sm hover:border-accent-blue/30 hover:text-text-primary transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
