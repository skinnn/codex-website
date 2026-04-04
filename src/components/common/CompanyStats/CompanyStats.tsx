'use client'

import { useEffect, useRef, useState } from 'react'
import './CompanyStats.css'

const stats = [
  { value: '8+', label: 'Years Experience', numericValue: 8 },
  { value: '20+', label: 'Projects Delivered', numericValue: 20 },
  { value: '4', label: 'Core Services', numericValue: 4 },
  { value: '3+', label: 'Yrs Avg. Client Retention', numericValue: 3 },
  { value: '100%', label: 'Client Satisfaction', numericValue: 100 },
  { value: '5', label: 'Countries Served', numericValue: 5 },
]

function AnimatedStat({ value, numericValue, label }: { value: string; numericValue: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          const duration = 3500 // 3.5 seconds
          const startTime = Date.now()
          const startValue = 0
          const endValue = numericValue

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Ease out cubic for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress)
            
            setDisplayValue(currentValue)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(endValue)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [numericValue, hasAnimated])

  // Reconstruct the display string with suffix/prefix
  const formatValue = () => {
    if (value.includes('%')) return `${displayValue}%`
    if (value.includes('+')) return `${displayValue}+`
    return displayValue.toString()
  }

  return (
    <div ref={itemRef} className="company-stats__item">
      <p className="company-stats__value">{formatValue()}</p>
      <p className="company-stats__label">{label}</p>
    </div>
  )
}

export default function CompanyStats() {
  return (
    <section className="company-stats">
      <div className="container">
        <div className="company-stats__grid">
          {stats.map((stat) => (
            <AnimatedStat 
              key={stat.label} 
              value={stat.value} 
              numericValue={stat.numericValue} 
              label={stat.label} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
