import Link from 'next/link'
import type { Service } from '@/types'
import './ServiceCard.css'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const icon = service.metadata.icon || '⚡'

  return (
    <Link href={`/services/${service.slug}`} className="service-card">
      <span className="service-card__icon">{icon}</span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.metadata.description}</p>
      <span className="service-card__arrow">→</span>
    </Link>
  )
}
