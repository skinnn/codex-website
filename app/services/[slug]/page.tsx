import { getServiceBySlug } from '@/lib/cosmic'
import MarkdownRenderer from '@/src/components/common/MarkdownRenderer/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found — CodeX' }
  return { title: `${service.title} — CodeX`, description: service.metadata?.description || '' }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const icon = service.metadata?.icon || '🛠️'
  const description = service.metadata?.description || ''
  const content = service.metadata?.content || ''
  const featuredImage = service.metadata?.featured_image

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '56rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
          <Link href="/" className="link-accent">Home</Link>
          <span>/</span>
          <Link href="/services" className="link-accent">Services</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>{service.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <span style={{ fontSize: 'var(--font-size-5xl)', display: 'block', marginBottom: 'var(--space-4)' }}>{icon}</span>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>{service.title}</h1>
          <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{description}</p>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div style={{ marginBottom: 'var(--space-12)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={service.title}
              width={800}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}

        {content && <MarkdownRenderer content={content} />}

        {/* Back */}
        <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/services" className="link-accent">← Back to Services</Link>
        </div>
      </div>
    </div>
  )
}
