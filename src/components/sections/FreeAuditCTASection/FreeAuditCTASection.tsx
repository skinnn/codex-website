import Link from 'next/link'
import './FreeAuditCTASection.css'

interface FreeAuditCTASectionProps {
  heading?: string
  description?: string
}

export default function FreeAuditCTASection({
  heading = 'Get a Free SEO Audit',
  description = "Find out what's holding your website back. No strings attached — just actionable insights you can use right away.",
}: FreeAuditCTASectionProps) {
  return (
    <section className="free-audit">
      <div className="container">
        <div className="free-audit__card">
          <div className="free-audit__content">
            <h2 className="free-audit__heading">{heading}</h2>
            <p className="free-audit__desc">{description}</p>
          </div>
          <Link href="/contact?type=seo-audit" className="btn-primary free-audit__btn">
            Request Free Audit
          </Link>
        </div>
      </div>
    </section>
  )
}
