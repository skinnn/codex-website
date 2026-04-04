'use client'

import { useState, useEffect } from 'react'
import './CosmicBadge.css'

export default function CosmicBadge({ bucketSlug }: { bucketSlug: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('cosmic-badge-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <a
      href={`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`}
      target="_blank"
      rel="noopener noreferrer"
      className="cosmic-badge"
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleDismiss()
        }}
        className="cosmic-badge__dismiss"
        aria-label="Dismiss badge"
      >
        ×
      </button>
      <img
        src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
        alt="Cosmic Logo"
        width={20}
        height={20}
      />
      Built with Cosmic
    </a>
  )
}
