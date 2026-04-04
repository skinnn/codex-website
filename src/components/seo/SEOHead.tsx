import type { Metadata } from 'next'
import type { SEOMetadata } from '@/types'

export function generateSEOMetadata(
  seo: SEOMetadata | null,
  fallback: { title: string; description: string }
): Metadata {
  if (!seo) {
    return {
      title: fallback.title,
      description: fallback.description,
    }
  }

  const { metadata } = seo
  const title = metadata.meta_title || fallback.title
  const description = metadata.meta_description || fallback.description

  const result: Metadata = {
    title,
    description,
    keywords: metadata.keywords || undefined,
    robots: metadata.robots?.value || 'index,follow',
    openGraph: {
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
