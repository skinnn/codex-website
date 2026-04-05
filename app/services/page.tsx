import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/src/components/common/ServiceCard/ServiceCard'
import PageHeroSection from '@/src/components/sections/PageHeroSection/PageHeroSection'
import { CompanyStatsSection, ProcessStepsSection, FreeAuditCTASection } from '@/src/components/sections'
import { seoDefaults } from '@/src/config/seo-defaults'
import type { Metadata } from 'next'

export const metadata: Metadata = seoDefaults.services

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHeroSection title="What We Offer" subtitle="Angular, React, Next.js, React Native — we build with the tools that fit, not the ones that are trendy." />

      <CompanyStatsSection />

      <section className="section">
        <div className="container">
          {services.length > 0 ? (
            <div className="grid-4">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No services available yet.</p>
          )}
        </div>
      </section>

      <ProcessStepsSection />
      <FreeAuditCTASection />
      {/* <TrustedByClients /> */}
    </>
  )
}
