import { seoDefaults } from '@/src/config/seo-defaults'
import type { Metadata } from 'next'
import PageHeroSection from '@/src/components/sections/PageHeroSection/PageHeroSection'
import SchemaMarkup from '@/src/components/seo/SchemaMarkup'
import { generateSEOMetadata } from '@/src/components/seo/SEOHead'
import { getTeamMembers, getSiteSettings, getSEOByPage } from '@/lib/cosmic'
import TechStack from '@/src/components/common/TechStack/TechStack'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOByPage('About')
  return generateSEOMetadata(seo, seoDefaults.about)
}

export default async function AboutPage() {
  const [team, settings, seo] = await Promise.all([getTeamMembers(), getSiteSettings(), getSEOByPage('About')])
  const techs = settings?.metadata.technologies || []

  return (
    <>
      <SchemaMarkup seo={seo} pageName="About" />
      <PageHeroSection title="About CodeX" subtitle="Founded in 2019. Developers and designers passionate about building exceptional digital products." />

      {/* Story */}
      <section className="section">
        <div className="container" style={{ maxWidth: '48rem' }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-6)' }}>Our Story</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' }}>
            CodeX was founded with a simple belief: great software is built when technical excellence meets genuine client partnership. Since {settings?.metadata.established_year || 2019}, we&apos;ve delivered 20+ projects for clients across industries — from white-label betting platforms to ad tech solutions serving billions of impressions.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
            We&apos;re not a 200-person agency. We&apos;re a small, senior team — every project gets hands-on attention from people who actually write the code and push the pixels. No juniors, no subcontractors. When you work with CodeX, you work with us.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="section section--alt">
        <div className="container">
          <p className="section-label">Our Team</p>
          <h2 className="section-title">The people behind the code and the design.</h2>
          <div className="grid-2" style={{ marginTop: 'var(--space-12)', maxWidth: '42rem' }}>
            {team.map((member) => (
              <div key={member.id} className="card" style={{ cursor: 'default' }}>
                {member.metadata.photo && (
                  <img src={`${member.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`} alt={member.metadata.name} width={300} height={300} className="card-image" style={{ height: '280px' }} />
                )}
                <div className="card-body">
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '2px' }}>{member.metadata.name}</h3>
                  <p style={{ color: 'var(--brand-400)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-4)' }}>{member.metadata.role}</p>
                  {member.metadata.bio && <p className="card-text">{member.metadata.bio}</p>}
                  <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                    {member.metadata.email && <a href={`mailto:${member.metadata.email}`} className="link-accent">Email</a>}
                    {member.metadata.linkedin && <a href={member.metadata.linkedin} target="_blank" rel="noopener noreferrer" className="link-accent">LinkedIn</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <TechStack />
    </>
  )
}
