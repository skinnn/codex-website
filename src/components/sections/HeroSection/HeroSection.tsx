import Link from 'next/link'
import GravityWellHero from '@/src/components/animations/GravityWellHero/GravityWellHero'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero">
      <GravityWellHero />

      <div className="hero__content">

        <h1 className="hero__title">
          Crossing Every{' '}
          <span className="gradient-text">&ldquo;X&rdquo;</span>
          {' '}in Your Digital Journey
        </h1>

        <p className="hero__subtitle">
          We build web apps, design interfaces, and grow businesses through SEO —
          <br />
          for companies that want results, not just deliverables.
        </p>

        <div className="hero__actions">
          <Link href="/projects" className="btn-primary">
            View Our Work
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
