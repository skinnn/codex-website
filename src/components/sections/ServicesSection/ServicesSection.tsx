import Link from 'next/link'
import ServiceCard from '@/src/components/common/ServiceCard/ServiceCard'
import type { Service } from '@/types'

interface ServicesSectionProps {
  services: Service[]
  label?: string
  title?: string
  subtitle?: string
  showViewAll?: boolean
  className?: string
}

export default function ServicesSection({
  services,
  label = 'What We Do',
  title = 'Our Services',
  subtitle = 'Angular, React, Next.js, React Native — we build with the tools that fit, not the ones that are trendy.',
  showViewAll = true,
  className = '',
}: ServicesSectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">{label}</p>
        <h2 className="section-title" style={{ margin: '0 auto' }}>{title}</h2>
        <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>{subtitle}</p>
      </div>
      <div className="container" style={{ marginTop: 'var(--space-12)' }}>
        {services.length > 0 ? (
          <div className="grid-4">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No services available.</p>
        )}
        {showViewAll && (
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
            <Link href="/services" className="link-accent">View all services →</Link>
          </div>
        )}
      </div>
    </section>
  )
}
