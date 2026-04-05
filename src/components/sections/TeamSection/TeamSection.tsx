import TeamCard from '@/src/components/common/TeamCard/TeamCard'
import type { TeamMember } from '@/types'

interface TeamSectionProps {
  teamMembers: TeamMember[]
  label?: string
  title?: string
  subtitle?: string
  className?: string
}

export default function TeamSection({
  teamMembers,
  label = 'Our Team',
  title = 'Meet the People Behind CodeX',
  subtitle = 'A small but mighty team of builders, designers, and strategists.',
  className = '',
}: TeamSectionProps) {
  return (
    <section className={`section section--alt ${className}`.trim()}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">{label}</p>
        <h2 className="section-title" style={{ margin: '0 auto' }}>{title}</h2>
        <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>{subtitle}</p>
      </div>
      <div className="container" style={{ marginTop: 'var(--space-16)' }}>
        {teamMembers.length > 0 ? (
          <div className="grid-2" style={{ maxWidth: '42rem', margin: '0 auto' }}>
            {teamMembers.map((m) => <TeamCard key={m.id} member={m} />)}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No team members available.</p>
        )}
      </div>
    </section>
  )
}
