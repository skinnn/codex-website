import type { Metadata } from 'next'
import Link from 'next/link'
import { cosmic } from '@/lib/cosmic'
import PageHero from '@/src/components/layout/PageHero/PageHero'

export const metadata: Metadata = {
  title: 'Blog | CodeX',
  description: 'Insights on web development, UI/UX design, SEO, and digital strategy from the CodeX team.',
}

interface BlogPost {
  slug: string
  title: string
  metadata: {
    excerpt?: string
    featured_image?: { imgix_url: string }
    published_date?: string
    author?: string
  }
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .limit(10)
      .props(['slug', 'title', 'metadata', 'type'])
      .depth(1)
    return response.objects as BlogPost[]
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <PageHero title="Blog" subtitle="Insights on web development, design, SEO, and building digital products." />
      <section className="section">
        <div className="container" style={{ maxWidth: '48rem' }}>
          {posts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card" style={{ display: 'flex', gap: 'var(--space-6)', padding: 'var(--space-6)', flexWrap: 'wrap' }}>
                  {post.metadata.featured_image && (
                    <img
                      src={`${post.metadata.featured_image.imgix_url}?w=300&h=200&fit=crop&auto=format,compress`}
                      alt={post.title}
                      style={{ width: '200px', height: '130px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    {post.metadata.published_date && (
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                        {new Date(post.metadata.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>{post.title}</h2>
                    {post.metadata.excerpt && (
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{post.metadata.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>Blog posts coming soon.</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>We&apos;re working on sharing our insights. Stay tuned.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
