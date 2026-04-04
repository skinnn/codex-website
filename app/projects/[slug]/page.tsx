import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/cosmic'
import MarkdownRenderer from '@/src/components/common/MarkdownRenderer/MarkdownRenderer'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | CodeX`,
    description: project.metadata.subtitle || `Project: ${project.title}`,
    openGraph: project.metadata.featured_image ? { images: [{ url: project.metadata.featured_image.imgix_url }] } : undefined,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const { metadata } = project

  return (
    <>
      <section className="section" style={{ paddingBottom: 'var(--space-12)', background: 'var(--color-bg-muted)' }}>
        <div className="container">
          <Link href="/projects" className="link-accent" style={{ display: 'inline-block', marginBottom: 'var(--space-6)' }}>
            ← Back to Projects
          </Link>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            {metadata.category && <span className="badge">{metadata.category.value}</span>}
          </div>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-2)' }}>{project.title}</h1>
          {metadata.subtitle && <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>{metadata.subtitle}</p>}
          <div style={{ display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>Client</span>
              <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)' }}>{metadata.client_name}</p>
            </div>
            {metadata.completed_date && (
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>Completed</span>
                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)' }}>
                  {new Date(metadata.completed_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            )}
            {metadata.project_url && (
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>Website</span>
                <a href={metadata.project_url} target="_blank" rel="noopener noreferrer" className="link-accent" style={{ display: 'block', fontWeight: 'var(--font-weight-semibold)' }}>
                  Visit Site →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {metadata.featured_image && (
        <div className="container" style={{ marginTop: 'calc(var(--space-8) * -1)' }}>
          <img src={`${metadata.featured_image.imgix_url}?w=1200&h=560&fit=crop&auto=format,compress`} alt={project.title} width={1200} height={560} style={{ borderRadius: 'var(--radius-xl)', width: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {metadata.tech_stack && metadata.tech_stack.length > 0 && (
        <section className="container" style={{ paddingTop: 'var(--space-12)' }}>
          <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 'var(--space-3)' }}>Tech Stack</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {metadata.tech_stack.map((tech, i) => <span key={i} className="badge">{tech}</span>)}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container" style={{ maxWidth: '48rem' }}>
          <MarkdownRenderer content={metadata.content} />
        </div>
      </section>

      {metadata.gallery && metadata.gallery.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-8)' }}>Gallery</h3>
            <div className="grid-3">
              {metadata.gallery.map((img, i) => (
                <img key={i} src={`${img.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`} alt={`${project.title} gallery ${i + 1}`} width={600} height={400} style={{ borderRadius: 'var(--radius-lg)', width: '100%', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
