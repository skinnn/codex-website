export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface SelectDropdown {
  key: string
  value: string
}

// Services
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    description: string
    icon?: string
    featured_image?: CosmicFile
    content?: string
  }
}

// Projects
export interface Project extends CosmicObject {
  type: 'projects'
  metadata: {
    subtitle: string
    content: string
    featured_image: CosmicFile
    client_name: string
    project_url: string | null
    tech_stack: string[]
    category: SelectDropdown
    gallery: CosmicFile[]
    completed_date: string
    is_featured: boolean
  }
}

// Design Projects
export interface DesignProject extends CosmicObject {
  type: 'design-projects'
  metadata: {
    subtitle: string
    content: string
    featured_image: CosmicFile
    client_name: string
    figma_url: string
    gallery: CosmicFile[]
    design_category: SelectDropdown
    tools_used: string[]
    completed_date: string
  }
}

// Case Studies
export interface ResultItem {
  metric: string
  value: string
  description?: string
}

export interface CaseStudy extends CosmicObject {
  type: 'case-studies'
  metadata: {
    subtitle?: string
    content: string
    featured_image?: CosmicFile
    client_name: string
    services_used?: Service[]
    results?: ResultItem[]
    published_date?: string
  }
}

// Testimonials
export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    client_name: string
    client_role?: string
    quote: string
    client_photo?: CosmicFile
    rating?: number
    service?: Service
  }
}

// Team Members
export interface TeamMember extends CosmicObject {
  type: 'team-members'
  metadata: {
    name: string
    role: string
    bio?: string
    photo?: CosmicFile
    email?: string
    linkedin?: string
    order?: number
  }
}

// Site Settings
export interface SiteSettings extends CosmicObject {
  type: 'site-settings'
  metadata: {
    company_name: string
    company_logo: CosmicFile
    company_slogan: string
    contact_email: string
    contact_phone: string
    company_address: string
    footer_copyright_text: string
    footer_company_about: string
    established_year?: number
    technologies: string[]
    social_links: {
      linkedin: string
      instagram: string
      github: string
      dribbble: string
      behance: string
    }
  }
}

// SEO Metadata
export interface SEOMetadata extends CosmicObject {
  type: 'seo-metadata'
  metadata: {
    page_identifier: SelectDropdown
    meta_title: string
    meta_description: string
    og_image?: CosmicFile
    og_title?: string | null
    og_description?: string | null
    canonical_url?: string | null
    robots?: SelectDropdown
    keywords?: string
    schema_type?: SelectDropdown
  }
}
