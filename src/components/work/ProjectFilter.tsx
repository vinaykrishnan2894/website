'use client'

interface ProjectFilterProps {
  filters: string[]
  active: string
  onChange: (filter: string) => void
}

export default function ProjectFilter({ filters, active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === filter
              ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/25'
              : 'bg-white/5 border border-white/[0.06] text-text-secondary hover:text-text-primary hover:border-accent-blue/20'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
