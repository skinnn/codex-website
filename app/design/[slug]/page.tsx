import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDesignProjectBySlug } from '@/lib/cosmic'
import MarkdownRenderer from '@/src/components/common/MarkdownRenderer/MarkdownRenderer'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getDesignProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }
  return { title: `${project.title} | CodeX Design`, description: project.metadata.subtitle || project.title }
}

export default async function DesignProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getDesignProjectBySlug(slug)
  if (!project) notFound()

  const { metadata } = project

  return (
    <>
      <section className="section" style={{ paddingBottom: 'var(--space-12)', background: 'var(--color-bg-muted)' }}>
        <div className="container">
          <Link href="/design" className="link-accent" style={{ display: 'inline-block', marginBottom: 'var(--space-6)' }}>
            ← Back to Design
          </Link>
          {metadata.design_category && (
            <span className="badge" style={{ display: 'inline-block', marginBottom: 'var(--space-3)' }}>{metadata.design_category.value}</span>
          )}
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', marginBottom: 'var(--space-2)' }}>{project.title}</h1>
          {metadata.subtitle && <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>{metadata.subtitle}</p>}
          <div style={{ display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            {metadata.client_name && (
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>Client</span>
                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)' }}>{metadata.client_name}</p>
              </div>
            )}
            {metadata.figma_url && (
              <div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)' }}>Figma</span>
                <a href={metadata.figma_url} target="_blank" rel="noopener noreferrer" className="link-accent" style={{ display: 'block', fontWeight: 'var(--font-weight-semibold)' }}>
                  Open in Figma →
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

      {metadata.tools_used && metadata.tools_used.length > 0 && (
        <section className="container" style={{ paddingTop: 'var(--space-12)' }}>
          <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 'var(--space-3)' }}>Tools Used</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {metadata.tools_used.map((tool, i) => <span key={i} className="badge">{tool}</span>)}
          </div>
        </section>
      )}

      {metadata.content && (
        <section className="section">
          <div className="container" style={{ maxWidth: '48rem' }}>
            <MarkdownRenderer content={metadata.content} />
          </div>
        </section>
      )}

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
