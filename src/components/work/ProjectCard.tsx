import Image from 'next/image'
import Badge from '@/components/ui/Badge'

interface Project {
  title: string
  tagline: string
  role: string
  period: string
  problem: string
  whatIDid: string[]
  impact: string[]
  image: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/5 border border-white/[0.06] rounded-2xl overflow-hidden card-glow transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="subtle">{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
            <span className="text-text-secondary text-xs flex-shrink-0">{project.period}</span>
          </div>
          <p className="text-accent-blue text-sm font-medium">{project.tagline}</p>
          <p className="text-text-secondary text-xs mt-1">{project.role}</p>
        </div>

        <div>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Problem</p>
          <p className="text-text-secondary text-sm leading-relaxed">{project.problem}</p>
        </div>

        <div>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">What I Did</p>
          <ul className="space-y-1.5">
            {project.whatIDid.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-accent-blue mt-1 flex-shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Impact</p>
          <ul className="space-y-1.5">
            {project.impact.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-green-400 mt-1 flex-shrink-0">↑</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
