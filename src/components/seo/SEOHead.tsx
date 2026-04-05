import type { Metadata } from 'next'
import type { SEOMetadata } from '@/types'

export function generateSEOMetadata(
  seo: SEOMetadata | null,
  fallback: Metadata
): Metadata {
  if (!seo) {
    return {
      title: fallback.title,
      description: fallback.description,
    }
  }

  const { metadata } = seo
  const title = metadata.meta_title || (typeof fallback.title === 'string' ? fallback.title : undefined)
  const description = metadata.meta_description || (typeof fallback.description === 'string' ? fallback.description : undefined)

  const result: Metadata = {
    title,
    description,
    keywords: metadata.keywords || undefined,
    robots: metadata.robots?.value || 'index,follow',
    openGraph: {
      type: 'website',
      title: metadata.og_title || title,
      description: metadata.og_description || description,
      images: metadata.og_image ? [{ url: metadata.og_image.imgix_url }] : undefined,
    },
  }

  if (metadata.canonical_url) {
    result.alternates = { canonical: metadata.canonical_url }
  }

  return result
}
