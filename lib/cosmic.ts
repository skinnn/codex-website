import { createBucketClient } from '@cosmicjs/sdk'
import type {
  Service,
  Project,
  DesignProject,
  CaseStudy,
  Testimonial,
  TeamMember,
  SiteSettings,
  SEOMetadata,
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch services')
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Service
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch service')
  }
}

// Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(50)
    return (response.objects as Project[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.completed_date || '').getTime()
      const dateB = new Date(b.metadata?.completed_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch projects')
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Project
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch project')
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects', 'metadata.is_featured': true })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(6)
    return response.objects as Project[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch featured projects')
  }
}

// Design Projects
export async function getDesignProjects(): Promise<DesignProject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'design-projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(50)
    return (response.objects as DesignProject[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.completed_date || '').getTime()
      const dateB = new Date(b.metadata?.completed_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch design projects')
  }
}

export async function getDesignProjectBySlug(slug: string): Promise<DesignProject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'design-projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as DesignProject
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch design project')
  }
}

// Case Studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(50)
    return (response.objects as CaseStudy[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch case studies')
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as CaseStudy
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch case study')
  }
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(50)
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch testimonials')
  }
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(50)
    return (response.objects as TeamMember[]).sort(
      (a, b) => (a.metadata?.order ?? 99) - (b.metadata?.order ?? 99)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch team members')
  }
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'site-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as SiteSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      const defaults: SiteSettings = {
        id: 'site-settings',
        slug: 'site-settings',
        title: 'Site Settings',
        type: 'site-settings',
        created_at: '',
        modified_at: '',
        metadata: {
          company_name: 'CodeX',
          company_logo: {
            url: '/assets/company-logo/CodeX-dark.svg',
            imgix_url: '',
          },
          company_slogan: 'Crossing Every "X" in Your Digital Journey',
          contact_email: 'nikola.devbusiness@gmail.com',
          contact_phone: '+381 65 4289534',
          company_address: 'Milentija Popovića 19, Beograd 11070',
          footer_copyright_text: '© 2020–2025 CodeX. All rights reserved.',
          footer_company_about:
            'A digital agency that combines technical excellence with genuine client partnership. We build fast, beautiful, and scalable digital products.',
          technologies: [],
          social_links: {
            linkedin: '',
            instagram: '',
            github: '',
            dribbble: '',
            behance: '',
          },
        },
      }
      return defaults
    }
    throw new Error('Failed to fetch site settings')
  }
}

// SEO Metadata
export async function getSEOByPage(pageKey: string): Promise<SEOMetadata | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'seo-metadata', 'metadata.page_identifier': pageKey })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(1)
    const objects = response.objects as SEOMetadata[]
    if (!objects || objects.length === 0) return null
    return objects[0] ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch SEO metadata')
  }
}
