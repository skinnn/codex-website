'use client'

import { useEffect, useRef, useState } from 'react'
import './CarouselHero.css'

interface ProjectItem {
  title: string
  imageUrl: string
  slug: string
  category?: string
}

interface CarouselHeroProps {
  projects?: ProjectItem[]
  /** Base URL path for project links (default: '/projects') */
  basePath?: string
  /** Auto-rotation speed in degrees per frame (default: 0.12) */
  speed?: number
  /** How much mouse movement slows rotation, 0-1 (default: 0.3) */
  mouseSlowdown?: number
  /** How long to pause auto-rotation after user scroll, in ms (default: 2000) */
  scrollPauseMs?: number
}

export default function CarouselHero({
  projects = [],
  basePath = '/projects',
  speed = 0.12,
  mouseSlowdown = 0.3,
  scrollPauseMs = 2000,
}: CarouselHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const mouseMovingRef = useRef(false)
  const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollPausedRef = useRef(false)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animFrameRef = useRef<number>(0)
  const [zoomingSlug, setZoomingSlug] = useState<string | null>(null)

  const items: ProjectItem[] = projects.length > 0
    ? [...projects]
    : Array.from({ length: 10 }, (_, i) => ({ title: `Project ${i + 1}`, imageUrl: '', slug: `project-${i + 1}` }))

  while (items.length < 8) {
    items.push(...items.slice(0, 8 - items.length))
  }

  const cardCount = items.length

  // Responsive radius — use smaller radius on smaller screens to keep cards visible
  const getRadius = () => {
    if (typeof window === 'undefined') return 420
    const w = window.innerWidth
    if (w > 1400) return 520
    if (w > 1024) return 420
    if (w > 768) return 340
    if (w > 480) return 260
    return 200
  }

  const [radius, setRadius] = useState(420)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ring = container.querySelector('.carousel__ring') as HTMLElement
    if (!ring) return

    // Responsive radius
    setRadius(getRadius())

    // Scale ring to fit container height
    const updateScale = () => {
      const h = container.clientHeight
      // Cards are ~155px tall, need ~350px for comfortable display
      const scale = Math.min(1, h / 350)
      ring.style.setProperty('--carousel-scale', String(scale))
      setRadius(getRadius())
    }
    updateScale()

    const handleResize = () => updateScale()
    window.addEventListener('resize', handleResize)

    // Mouse move slowdown
    const handleMouseMove = () => {
      mouseMovingRef.current = true
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)
      mouseTimerRef.current = setTimeout(() => { mouseMovingRef.current = false }, 200)
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Scroll/wheel to rotate manually
    const handleWheel = (e: WheelEvent) => {
      // Use deltaX for horizontal scroll, fall back to deltaY
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      rotationRef.current += delta * 0.15

      // Pause auto-rotation
      scrollPausedRef.current = true
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => {
        scrollPausedRef.current = false
      }, scrollPauseMs)

      e.preventDefault()
    }
    container.addEventListener('wheel', handleWheel, { passive: false })

    // Touch swipe support
    let touchStartX = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0]!.clientX
    }
    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0]!.clientX - touchStartX
      rotationRef.current -= dx * 0.3
      touchStartX = e.touches[0]!.clientX

      scrollPausedRef.current = true
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = setTimeout(() => {
        scrollPausedRef.current = false
      }, scrollPauseMs)
    }
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })

    let currentSpeed = speed // actual speed applied each frame (lerped)
    let targetSpeed = speed   // what we're easing toward

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)

      if (zoomingSlug) return

      // Determine target speed
      if (scrollPausedRef.current) {
        targetSpeed = 0
      } else {
        const slow = mouseMovingRef.current ? (1 - mouseSlowdown) : 1
        targetSpeed = speed * slow
      }

      // Lerp current speed toward target (inertia)
      currentSpeed += (targetSpeed - currentSpeed) * 0.03

      rotationRef.current += currentSpeed
      ring.style.transform = `rotateY(${rotationRef.current}deg)`
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [speed, mouseSlowdown, scrollPauseMs, zoomingSlug])

  const handleCardClick = (slug: string) => {
    if (zoomingSlug) return
    setZoomingSlug(slug)
    setTimeout(() => {
      window.location.href = `${basePath}/${slug}`
    }, 800)
  }

  return (
    <div ref={containerRef} className="carousel">
      {/* Background */}
      <div className="carousel__bg">
        <div className="carousel__grid" />
        <div className="carousel__glow carousel__glow--1" />
        <div className="carousel__glow carousel__glow--2" />
        <div className="carousel__glow carousel__glow--3" />
      </div>

      {/* 3D ring */}
      <div className="carousel__scene">
        <div className="carousel__ring">
          {items.map((item, i) => {
            const angle = (360 / cardCount) * i
            const isZooming = zoomingSlug === item.slug
            const isFading = zoomingSlug !== null && !isZooming

            return (
              <div
                key={`${item.slug}-${i}`}
                className={`carousel__card ${isZooming ? 'carousel__card--zoom' : ''} ${isFading ? 'carousel__card--fade' : ''}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleCardClick(item.slug)}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="carousel__card-image"
                    draggable={false}
                  />
                ) : (
                  <div className="carousel__card-placeholder" style={{ background: `hsl(${220 + i * 15}, 30%, 12%)` }} />
                )}
                {item.category && (
                  <span className="carousel__card-badge">{item.category}</span>
                )}
                <div className="carousel__card-overlay">
                  <span className="carousel__card-title">{item.title}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="carousel__hint">
        <span>← Scroll to browse →</span>
      </div>
    </div>
  )
}
