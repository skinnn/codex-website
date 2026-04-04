import type { Testimonial } from '@/types'
import StarRating from '@/src/components/common/StarRating/StarRating'
import './TestimonialCard.css'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { client_name, client_role, quote, client_photo, rating, service } = testimonial.metadata

  return (
    <div className="testimonial">
      {rating && <StarRating rating={rating} />}
      <blockquote className="testimonial__quote">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="testimonial__footer">
        {client_photo && (
          <img
            src={`${client_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
            alt={client_name}
            width={48}
            height={48}
            className="testimonial__photo"
          />
        )}
        <div>
          <p className="testimonial__name">{client_name}</p>
          {client_role && <p className="testimonial__role">{client_role}</p>}
        </div>
        {service && (
          <span className="testimonial__service">{service.title}</span>
        )}
      </div>
    </div>
  )
}
