import { seoDefaults } from '@/src/config/seo-defaults'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import CodeMorphHero from '@/src/components/animations/CodeMorphHero/CodeMorphHero'
import AvailabilityBadge from '@/src/components/common/AvailabilityBadge/AvailabilityBadge'
import SchemaMarkup from '@/src/components/seo/SchemaMarkup'
import { generateSEOMetadata } from '@/src/components/seo/SEOHead'
import { getSiteSettings, getSEOByPage } from '@/lib/cosmic'
import ContactForm from '@/src/components/forms/ContactForm/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOByPage('Contact')
  return generateSEOMetadata(seo, seoDefaults.contact)
}

export default async function ContactPage() {
  const [settings, seo] = await Promise.all([getSiteSettings(), getSEOByPage('Contact')])
  const email = settings?.metadata.contact_email || 'contact@codex.com'
  const phone = settings?.metadata.contact_phone || ''
  const social = settings?.metadata.social_links

  return (
    <>
      <SchemaMarkup seo={seo} pageName="Contact" />

      <section style={{ position: 'relative', minHeight: '45vh', overflow: 'hidden' }}>
        <CodeMorphHero text="Get in Touch" morphDelay={0.5} morphDuration={1.6} scale={2} />
      </section>

      <section style={{ paddingBottom: 'var(--space-8)', textAlign: 'center' }}>
        <div className="container">
          <AvailabilityBadge />
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            Have a project in mind? Let&apos;s talk about how we can help.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '48rem' }}>
          <div className="grid-2" style={{ gap: 'var(--space-12)' }}>
            {/* Contact Info */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-6)' }}>Contact Information</h3>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 'var(--space-1)' }}>Email</p>
                <a href={`mailto:${email}`} className="link-accent" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>{email}</a>
              </div>
              {phone && (
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 'var(--space-1)' }}>Phone</p>
                  <a href={`tel:${phone}`} className="link-accent" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>{phone}</a>
                </div>
              )}
              {social && (
                <div>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', marginBottom: 'var(--space-2)' }}>Social</p>
                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="link-accent">LinkedIn</a>}
                    {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="link-accent">GitHub</a>}
                    {social.dribbble && <a href={social.dribbble} target="_blank" rel="noopener noreferrer" className="link-accent">Dribbble</a>}
                    {social.behance && <a href={social.behance} target="_blank" rel="noopener noreferrer" className="link-accent">Behance</a>}
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <Suspense fallback={<div className="card" style={{ padding: 'var(--space-8)' }}>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
