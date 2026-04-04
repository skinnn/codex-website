import './AvailabilityBadge.css'

interface AvailabilityBadgeProps {
  text?: string
}

export default function AvailabilityBadge({ text = 'Available for new projects' }: AvailabilityBadgeProps) {
  return (
    <div className="availability-badge">
      <span className="availability-badge__dot" />
      <span className="availability-badge__text">{text}</span>
    </div>
  )
}
