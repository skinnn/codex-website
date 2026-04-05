import Link from 'next/link'
import ProjectCard from '@/src/components/common/ProjectCard/ProjectCard'
import type { Project } from '@/types'

interface FeaturedProjectsSectionProps {
  projects: Project[]
  label?: string
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
  className?: string
}

export default function FeaturedProjectsSection({
  projects,
  label = 'Our Work',
  title = 'Featured Projects',
  subtitle = "Selected projects we're proud of.",
  showViewAll = true,
  limit = 6,
  className = '',
}: FeaturedProjectsSectionProps) {
  if (projects.length === 0) return null

  return (
    <section className={`section section--alt ${className}`.trim()}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <p className="section-label">{label}</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
          {showViewAll && <Link href="/projects" className="link-accent">All Projects →</Link>}
        </div>
        <div className="grid-3">
          {projects.slice(0, limit).map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
