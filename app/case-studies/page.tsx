import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/src/components/common/CaseStudyCard/CaseStudyCard'
import LoadMoreGrid from '@/src/components/common/LoadMoreGrid/LoadMoreGrid'
import CarouselHero from '@/src/components/animations/CarouselHero/CarouselHero'
import AvailabilityBadge from '@/src/components/common/AvailabilityBadge/AvailabilityBadge'
import { seoDefaults } from '@/src/config/seo-defaults'
import { displayConfig } from '@/src/config/display'
import type { Metadata } from 'next'
import TechStack from '@/src/components/common/TechStack/TechStack'

export const metadata: Metadata = seoDefaults.caseStudies

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  const carouselItems = caseStudies.map((cs) => ({
    title: cs.title,
    imageUrl: cs.metadata.featured_image ? `${cs.metadata.featured_image.imgix_url}?w=500&h=300&fit=crop&auto=format,compress` : '',
    slug: cs.slug,
    category: cs.metadata.client_name || '',
  }))

  return (
    <>
      <section style={{ position: 'relative', minHeight: '50vh', overflow: 'hidden' }}>
        <CarouselHero projects={carouselItems} basePath="/case-studies" speed={0.05} mouseSlowdown={0.3} />
      </section>

      <section className="section" style={{ paddingBottom: 'var(--space-8)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AvailabilityBadge />
          <p className="section-label" style={{ marginTop: 'var(--space-6)' }}>Our Work</p>
          <h1 className="section-title" style={{ margin: '0 auto' }}>Case Studies</h1>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            Dive into the details of our most impactful projects. Every case study tells the story of a real partnership and measurable results.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <LoadMoreGrid pageSize={displayConfig.gridPageSize} gridClass="grid-2" emptyMessage="No case studies available yet.">
            {caseStudies.map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />)}
          </LoadMoreGrid>
        </div>
      </section>

      <TechStack />
    </>
  )
}
