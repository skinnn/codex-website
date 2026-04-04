import { seoDefaults } from '@/src/config/seo-defaults'
import { displayConfig } from '@/src/config/display'
import type { Metadata } from 'next'
import DesignProjectCard from '@/src/components/common/DesignProjectCard/DesignProjectCard'
import LoadMoreGrid from '@/src/components/common/LoadMoreGrid/LoadMoreGrid'
import CarouselHero from '@/src/components/animations/CarouselHero/CarouselHero'
import AvailabilityBadge from '@/src/components/common/AvailabilityBadge/AvailabilityBadge'
import SchemaMarkup from '@/src/components/seo/SchemaMarkup'
import { generateSEOMetadata } from '@/src/components/seo/SEOHead'
import { getDesignProjects, getSEOByPage } from '@/lib/cosmic'
import TechStack from '@/src/components/common/TechStack/TechStack'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOByPage('Design Projects')
  return generateSEOMetadata(seo, seoDefaults.design)
}

export default async function DesignPage() {
  const [projects, seo] = await Promise.all([getDesignProjects(), getSEOByPage('Design Projects')])

  const carouselItems = projects.map((p) => ({
    title: p.title,
    imageUrl: p.metadata.featured_image ? `${p.metadata.featured_image.imgix_url}?w=500&h=300&fit=crop&auto=format,compress` : '',
    slug: p.slug,
    category: p.metadata.design_category?.value || '',
  }))

  return (
    <>
      <SchemaMarkup seo={seo} pageName="Design Projects" />

      <section style={{ position: 'relative', minHeight: '50vh', overflow: 'hidden' }}>
        <CarouselHero projects={carouselItems} basePath="/design" speed={0.05} mouseSlowdown={0.3} />
      </section>

      <section className="section" style={{ paddingBottom: 'var(--space-8)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AvailabilityBadge />
          <p className="section-label" style={{ marginTop: 'var(--space-6)' }}>Our Work</p>
          <h1 className="section-title" style={{ margin: '0 auto' }}>Design Projects</h1>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            UI/UX, branding, dashboards, and mobile design.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <LoadMoreGrid pageSize={displayConfig.gridPageSize} emptyMessage="No design projects available.">
            {projects.map((p) => <DesignProjectCard key={p.id} project={p} />)}
          </LoadMoreGrid>
        </div>
      </section>

      <TechStack />
    </>
  )
}
