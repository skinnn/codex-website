import TestimonialCard from '@/src/components/common/TestimonialCard/TestimonialCard'
import LoadMoreGrid from '@/src/components/common/LoadMoreGrid/LoadMoreGrid'
import type { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  label?: string
  title?: string
  subtitle?: string
  pageSize?: number
  className?: string
}

export default function TestimonialsSection({
  testimonials,
  label = 'Client Love',
  title = 'What Our Clients Say',
  subtitle = "Don't just take our word for it — hear from the people we've worked with.",
  pageSize = 5,
  className = '',
}: TestimonialsSectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">{label}</p>
        <h2 className="section-title" style={{ margin: '0 auto' }}>{title}</h2>
        <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>{subtitle}</p>
      </div>
      <div className="container" style={{ marginTop: 'var(--space-16)' }}>
        {testimonials.length > 0 ? (
          <LoadMoreGrid
            pageSize={pageSize}
            gridClass="grid-2"
            loadMoreLabel="Show More"
            showButton={true}
            infiniteScroll={true}
            emptyMessage="No testimonials available."
          >
            {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
          </LoadMoreGrid>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No testimonials available.</p>
        )}
      </div>
    </section>
  )
}
