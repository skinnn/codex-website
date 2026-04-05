import Link from 'next/link'
import CaseStudyCard from '@/src/components/common/CaseStudyCard/CaseStudyCard'
import type { CaseStudy } from '@/types'

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[]
  label?: string
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
  className?: string
}

export default function CaseStudiesSection({
  caseStudies,
  label = 'Results',
  title = 'Case Studies',
  subtitle = "Real projects, real results. See how we've helped our clients achieve their goals.",
  showViewAll = true,
  limit = 4,
  className = '',
}: CaseStudiesSectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">{label}</p>
        <h2 className="section-title" style={{ margin: '0 auto' }}>{title}</h2>
        <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>{subtitle}</p>
      </div>
      <div className="container" style={{ marginTop: 'var(--space-16)' }}>
        {caseStudies.length > 0 ? (
          <div className="grid-2">{caseStudies.slice(0, limit).map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />)}</div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No case studies available.</p>
        )}
        {showViewAll && (
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
            <Link href="/case-studies" className="link-accent">View all case studies →</Link>
          </div>
        )}
      </div>
    </section>
  )
}
