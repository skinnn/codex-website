import type { SiteSettings } from '@/types'

interface ContactCTASectionProps {
  siteSettings: SiteSettings
  title?: string
  subtitle?: string
  className?: string
}

export default function ContactCTASection({
  siteSettings,
  title = "Let's talk about your next project",
  subtitle = 'No pitch decks, no fluff — just a conversation about what you need and how we can help.',
  className = '',
}: ContactCTASectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container" style={{ maxWidth: '56rem', textAlign: 'center' }}>
        <div style={{
          padding: 'var(--space-12)',
          borderRadius: 'var(--radius-3xl)',
          background: 'linear-gradient(135deg, rgba(13,154,126,0.1), var(--color-bg-card), rgba(20,184,152,0.1))',
          border: '1px solid var(--color-border)',
        }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>
            {title}
          </h2>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-secondary)', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {subtitle}
          </p>
          <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <a href={`mailto:${siteSettings.metadata.contact_email}`} className="btn-primary">
              Email Us
            </a>
            <a href={siteSettings.metadata.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
