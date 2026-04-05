import { getServices, getTeamMembers, getTestimonials, getCaseStudies, getFeaturedProjects, getSiteSettings } from '@/lib/cosmic'
import {
  HeroSection,
  ServicesSection,
  FeaturedProjectsSection,
  CaseStudiesSection,
  TestimonialsSection,
  TeamSection,
  ContactCTASection,
  CompanyStatsSection,
  ProcessStepsSection,
  FreeAuditCTASection,
} from '@/src/components/sections'

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
      <ServicesSection services={services} />

      {/* <TrustedByClients /> */}

      <FreeAuditCTASection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <ProcessStepsSection />
      <CompanyStatsSection />
      <TestimonialsSection testimonials={testimonials} />
      <TeamSection teamMembers={teamMembers} />
      <FreeAuditCTASection />
      <ContactCTASection siteSettings={siteSettings} />
    </>
  )
}
