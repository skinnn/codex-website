import Link from 'next/link'
import { getServices, getTeamMembers, getTestimonials, getCaseStudies, getFeaturedProjects, getSiteSettings } from '@/lib/cosmic'
import HeroSection from '@/src/components/layout/HeroSection/HeroSection'
import ServiceCard from '@/src/components/common/ServiceCard/ServiceCard'
import TeamCard from '@/src/components/common/TeamCard/TeamCard'
import CompanyStats from '@/src/components/common/CompanyStats/CompanyStats'
import TestimonialCard from '@/src/components/common/TestimonialCard/TestimonialCard'
import CaseStudyCard from '@/src/components/common/CaseStudyCard/CaseStudyCard'
import ProjectCard from '@/src/components/common/ProjectCard/ProjectCard'
import TrustedByClients from '@/src/components/common/TrustedByClients/TrustedByClients'
import ProcessSteps from '@/src/components/common/ProcessSteps/ProcessSteps'
import FreeAuditCTA from '@/src/components/common/FreeAuditCTA/FreeAuditCTA'
import LoadMoreGrid from '@/src/components/common/LoadMoreGrid/LoadMoreGrid'

export default async function HomePage() {
  const [services, teamMembers, testimonials, caseStudies, featuredProjects, siteSettings] = await Promise.all([
    getServices(),
    getTeamMembers(),
    getTestimonials(),
    getCaseStudies(),
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      <HeroSection />

      {/* Services */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label">What We Do</p>
          <h2 className="section-title" style={{ margin: '0 auto' }}>Our Services</h2>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            Angular, React, Next.js, React Native — we build with the tools that fit, not the ones that are trendy.
          </p>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-12)' }}>
          {services.length > 0 ? (
            <div className="grid-4">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No services available.</p>
          )}
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
            <Link href="/services" className="link-accent">View all services →</Link>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      {/* <TrustedByClients /> */}

      {/* Free SEO Audit CTA */}
      <FreeAuditCTA />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <div>
                <p className="section-label">Our Work</p>
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Selected projects we&apos;re proud of.</p>
              </div>
              <Link href="/projects" className="link-accent">All Projects →</Link>
            </div>
            <div className="grid-3">
              {featuredProjects.slice(0, 6).map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label">Results</p>
          <h2 className="section-title" style={{ margin: '0 auto' }}>Case Studies</h2>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            Real projects, real results. See how we&apos;ve helped our clients achieve their goals.
          </p>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-16)' }}>
          {caseStudies.length > 0 ? (
            <div className="grid-2">{caseStudies.slice(0, 4).map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />)}</div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No case studies available.</p>
          )}
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
            <Link href="/case-studies" className="link-accent">View all case studies →</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps />

      {/* Company Stats */}
      <CompanyStats />

      {/* Testimonials */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label">Client Love</p>
          <h2 className="section-title" style={{ margin: '0 auto' }}>What Our Clients Say</h2>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            Don&apos;t just take our word for it — hear from the people we&apos;ve worked with.
          </p>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-16)' }}>
          {testimonials.length > 0 ? (
            <LoadMoreGrid 
              pageSize={5} 
              gridClass="grid-2" 
              loadMoreLabel="Show More"
              showButton={true}
              infiniteScroll={true}
              emptyMessage="No testimonials available."
            >
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </LoadMoreGrid>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No testimonials available.</p>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="section section--alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label">Our Team</p>
          <h2 className="section-title" style={{ margin: '0 auto' }}>Meet the People Behind CodeX</h2>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            A small but mighty team of builders, designers, and strategists.
          </p>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-16)' }}>
          {teamMembers.length > 0 ? (
            <div className="grid-2" style={{ maxWidth: '42rem', margin: '0 auto' }}>
              {teamMembers.map((m) => <TeamCard key={m.id} member={m} />)}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No team members available.</p>
          )}
        </div>
      </section>

      {/* Free SEO Audit CTA */}
      <FreeAuditCTA />

      {/* Final CTA */}
      <section className="section">
        <div className="container" style={{ maxWidth: '56rem', textAlign: 'center' }}>
          <div style={{
            padding: 'var(--space-12)',
            borderRadius: 'var(--radius-3xl)',
            background: 'linear-gradient(135deg, rgba(13,154,126,0.1), var(--color-bg-card), rgba(20,184,152,0.1))',
            border: '1px solid var(--color-border)',
          }}>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>
              Let&apos;s talk about your next project
            </h2>
            <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-secondary)', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
              No pitch decks, no fluff — just a conversation about what you need and how we can help.
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
    </>
  )
}
