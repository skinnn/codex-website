import Link from 'next/link'
import type { DesignProject } from '@/types'

interface DesignProjectCardProps {
  project: DesignProject
}

export default function DesignProjectCard({ project }: DesignProjectCardProps) {
  const { metadata } = project

  return (
    <Link href={`/design/${project.slug}`} className="card">
      {metadata.featured_image && (
        <img
          src={`${metadata.featured_image.imgix_url}?w=800&h=440&fit=crop&auto=format,compress`}
          alt={project.title}
          className="card-image"
          width={400}
          height={220}
        />
      )}
      <div className="card-body">
        {metadata.design_category && (
          <span className="badge" style={{ marginBottom: 'var(--space-2)', display: 'inline-block' }}>
            {metadata.design_category.value}
          </span>
        )}
        <h3 className="card-title">{project.title}</h3>
        {metadata.subtitle && <p className="card-text">{metadata.subtitle}</p>}
        {metadata.tools_used && metadata.tools_used.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
            {metadata.tools_used.map((tool, i) => (
              <span key={i} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', background: 'var(--color-bg)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
