/**
 * SEO Defaults — Fallback metadata for each page.
 *
 * These are only used when CosmicJS doesn't return SEO data for a page.
 * To update live SEO, edit the SEO Metadata objects in the CosmicJS dashboard.
 */

import { Metadata } from 'next'

// export interface SEODefaults {
//   title: string
//   description: string
// }

type PageKey = 'home' | 'projects' | 'design' | 'caseStudies' | 'services' | 'about' | 'contact' | 'blog'

export const seoDefaults: Record<PageKey, Metadata> = {
  home: {
    title: 'CodeX — Web Development, UI/UX Design, Consulting and Digital Strategy Agency',
    description: 'CodeX is a digital agency specializing in web development, UI/UX design, and digital strategy. We turn ambitious ideas into exceptional digital experiences.',
    icons: {
      icon: '/favicon.svg',
      shortcut: '/shortcut.svg',
      apple: '/favicon.svg',
      // other: {
      //   rel: 'apple-touch-icon-precomposed',
      //   url: '/apple-touch-icon-precomposed.png',
      // },
    },
  },
  projects: {
    title: 'Projects | CodeX',
    description: 'Explore our portfolio of web apps, platforms, and digital products built for clients across industries.',
  },
  design: {
    title: 'Design Projects | CodeX',
    description: 'Explore our UI/UX design, branding, and dashboard design work.',
  },
  caseStudies: {
    title: 'Case Studies | CodeX',
    description: 'Real projects, real results. Dive into the details of our most impactful work.',
  },
  services: {
    title: 'Services | CodeX',
    description: 'End-to-end digital solutions — from strategy and design to development and launch.',
  },
  about: {
    title: 'About CodeX | Our Team & Story',
    description: 'Meet the team behind CodeX. Founded in 2019, we build exceptional digital products.',
  },
  contact: {
    title: 'Contact | CodeX',
    description: 'Get in touch with CodeX. Let\u2019s discuss your next project.',
  },
  blog: {
    title: 'Blog | CodeX',
    description: 'Insights on web development, UI/UX design, SEO, and digital strategy from the CodeX team.',
  },
}
