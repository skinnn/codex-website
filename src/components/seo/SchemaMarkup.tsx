import type { SEOMetadata } from '@/types'

interface SchemaMarkupProps {
  seo: SEOMetadata | null
  pageName: string
}

export default function SchemaMarkup({ seo, pageName }: SchemaMarkupProps) {
  if (!seo) return null

  const schemaType = seo.metadata.schema_type?.value || 'WebPage'
  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: seo.metadata.meta_title,
    description: seo.metadata.meta_description,
    url: seo.metadata.canonical_url || undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
