import Link from 'next/link'
import type { CaseStudy } from '@/types'
import './CaseStudyCard.css'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { subtitle, featured_image, client_name, services_used, results } = caseStudy.metadata

  return (
    <Link href={`/case-studies/${caseStudy.slug}`} className="cs-card">
      {featured_image && (
        <div className="cs-card__image-wrap">
          <img
            src={`${featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={caseStudy.title}
            width={400}
            height={225}
            className="cs-card__image"
          />
        </div>
      )}
      <div className="cs-card__body">
        <span className="cs-card__client">{client_name}</span>
        <h3 className="cs-card__title">{caseStudy.title}</h3>
        {subtitle && <p className="cs-card__subtitle">{subtitle}</p>}

        {services_used && services_used.length > 0 && (
          <div className="cs-card__tags">
            {services_used.map((svc) => (
              <span key={svc.id} className="cs-card__tag">
                {svc.metadata?.icon || ''} {svc.title}
              </span>
            ))}
          </div>
        )}

        {results && results.length > 0 && (
          <div className="cs-card__results">
            {results.slice(0, 3).map((result, index) => (
              <div key={index} className="cs-card__result">
                <p className="cs-card__result-value">{result.value}</p>
                <p className="cs-card__result-label">{result.metric}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
