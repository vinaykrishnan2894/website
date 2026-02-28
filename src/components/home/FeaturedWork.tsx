import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'

const projects = [
  {
    id: 'pokerboss',
    title: 'PokerBoss',
    tagline: 'Club-based Poker OS, built 0→1',
    description:
      'A full multiplayer poker ecosystem — mobile client, real-time backend, and an ops control plane for clubs, agents, and admins. Every layer designed, shipped, and iterated on from scratch.',
    image: '/images/pokerboss/IMG_8203.PNG',
    tags: ['0→1 Build', 'Gaming', 'B2B'],
    featured: true,
    href: '/work',
  },
  {
    id: 'loco-studio',
    title: 'Loco Studio',
    tagline: "Creator tools for India's gaming-streaming platform",
    description:
      "Built the creator-facing product layer at Loco — streaming tools, analytics, and monetization features that helped creators manage and grow their presence on India's gaming streaming platform.",
    image: '/images/project-images/loco-project.jpg',
    tags: ['B2C', 'Growth', 'Streaming'],
    featured: false,
    href: '/work',
  },
  {
    id: 'cricket',
    title: 'Cricket.com',
    tagline: 'RMG onboarding & funnel conversion',
    description:
      'Led UX and product improvements to the onboarding funnel for Cricket.com\'s real-money gaming app — data-driven redesign that improved conversion rate by 22% and reduced drop-off by 18%.',
    image: '/images/project-images/cricket-project.jpg',
    tags: ['B2C', 'Growth', 'RMG'],
    featured: false,
    href: '/work',
  },
]

export default function FeaturedWork() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        label="Featured Work"
        title="Products I've Shipped"
        subtitle="From 0→1 builds to growth at scale — here's where I've left a mark."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <Link
            key={project.id}
            href={project.href}
            className={`group relative flex flex-col bg-white/5 border border-white/[0.06] rounded-2xl overflow-hidden card-glow transition-all duration-300 hover:-translate-y-1 ${
              i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden ${i === 0 ? 'h-56' : 'h-44'}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 via-transparent to-transparent" />
              {project.featured && (
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">⭐ FEATURED</Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="subtle">{tag}</Badge>
                ))}
              </div>
              <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-accent-blue text-sm font-medium">{project.tagline}</p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-accent-blue text-sm font-medium pt-2">
                View case study
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
