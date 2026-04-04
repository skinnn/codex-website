'use client'

import { useEffect, useRef } from 'react'
import './ProcessSteps.css'

const steps = [
  { number: '01', title: 'Discovery', description: 'We learn about your business, goals, and users. No assumptions — just questions and listening.', icon: '🔍' },
  { number: '02', title: 'Strategy & Design', description: 'Wireframes, UI mockups, and a clear technical plan before a single line of code is written.', icon: '🎨' },
  { number: '03', title: 'Development', description: 'Clean, tested, production-ready code. Regular demos so you see progress, not surprises.', icon: '⚡' },
  { number: '04', title: 'Launch & QA', description: 'Rigorous testing, performance optimization, and a smooth deployment to production.', icon: '🚀' },
  { number: '05', title: 'Support & Growth', description: 'Post-launch monitoring, iterations, and ongoing support as your product evolves.', icon: '📈' },
]

export default function ProcessSteps() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const rect = track.getBoundingClientRect()
      const viewportH = window.innerHeight
      // Finish progress 30% earlier by multiplying by 1.3
      const progress = Math.max(0, Math.min(1, ((viewportH - rect.top) / (viewportH + rect.height)) * 1.3))
      track.style.setProperty('--progress', String(progress))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="process">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <p className="section-label">How We Work</p>
          <h2 className="section-title" style={{ margin: '0 auto' }}>Our Process</h2>
          <p className="section-subtitle" style={{ margin: 'var(--space-4) auto 0' }}>
            No pitch decks, no fluff — just a clear path from idea to launch.
          </p>
        </div>

        <div className="process__track" ref={trackRef}>
          {/* Animated progress line */}
          <div className="process__line">
            <div className="process__line-fill" />
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className="process__step" style={{ '--step-index': i } as React.CSSProperties}>
              <div className="process__step-marker">
                <span className="process__step-icon">{step.icon}</span>
              </div>
              <div className="process__step-content">
                <span className="process__step-number">{step.number}</span>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
