import Link from 'next/link'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { metadata } = project

  return (
    <Link href={`/projects/${project.slug}`} className="card">
      {metadata.featured_image && (
        <img
          src={`${metadata.featured_image.imgix_url}?w=800&h=440&fit=crop&auto=format,compress`}
          alt={project.title}
          className="card-image"
          width={400}
          height={220}
          loading="lazy"
        />
      )}
      <div className="card-body">
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
          {metadata.category && <span className="badge">{metadata.category.value}</span>}
          {metadata.is_featured && <span className="badge badge--green">Featured</span>}
        </div>
        <h3 className="card-title">{project.title}</h3>
        {metadata.subtitle && <p className="card-text">{metadata.subtitle}</p>}
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
          {metadata.client_name}
        </p>
      </div>
    </Link>
  )
}
