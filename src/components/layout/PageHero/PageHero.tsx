import './PageHero.css'
import type { ReactNode } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
  animation?: ReactNode
}

export default function PageHero({ title, subtitle, animation }: PageHeroProps) {
  const hasAnimation = !!animation

  return (
    <section className={`page-hero ${hasAnimation ? 'page-hero--animated' : ''}`}>
      {animation}
      <div className="container page-hero__content">
        {title && <h1 className="page-hero__title">{title}</h1>}
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
