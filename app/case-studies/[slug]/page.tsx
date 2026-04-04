import { getCaseStudyBySlug } from '@/lib/cosmic'
import MarkdownRenderer from '@/src/components/common/MarkdownRenderer/MarkdownRenderer'
import ResultsMetric from '@/src/components/common/ResultsMetric/ResultsMetric'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return { title: 'Case Study Not Found — CodeX' }
  return { title: `${cs.title} — CodeX`, description: cs.metadata?.subtitle || '' }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  const { subtitle, content, featured_image, client_name, services_used, results, published_date } = caseStudy.metadata

  const formattedDate = published_date
    ? new Date(published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '56rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
          <Link href="/" className="link-accent">Home</Link>
          <span>/</span>
          <Link href="/case-studies" className="link-accent">Case Studies</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{caseStudy.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>{client_name}</span>
            {formattedDate && (
              <>
                <span style={{ color: 'var(--color-text-faint)' }}>•</span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{formattedDate}</span>
              </>
            )}
          </div>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', lineHeight: 'var(--line-height-tight)' }}>{caseStudy.title}</h1>
          {subtitle && <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{subtitle}</p>}
        </div>

        {/* Featured Image */}
        {featured_image && (
          <div style={{ marginBottom: 'var(--space-12)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
            <img src={`${featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`} alt={caseStudy.title} width={800} height={400} style={{ width: '100%', height: 'auto' }} />
          </div>
        )}

        {/* Results */}
        {results && results.length > 0 && (
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2 className="section-label" style={{ marginBottom: 'var(--space-6)' }}>Key Results</h2>
            <div className="grid-3">
              {results.map((result, index) => <ResultsMetric key={index} result={result} />)}
            </div>
          </div>
        )}

        {content && <MarkdownRenderer content={content} />}

        {/* Services Used */}
        {services_used && services_used.length > 0 && (
          <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
            <h2 className="section-label" style={{ marginBottom: 'var(--space-6)' }}>Services Used</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {services_used.map((svc) => (
                <span key={svc.id} className="badge">{svc.metadata?.icon || ''} {svc.title}</span>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/case-studies" className="link-accent">← Back to Case Studies</Link>
        </div>
      </div>
    </div>
  )
}
