'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import './LoadMoreGrid.css'

interface LoadMoreGridProps {
  /** All items to paginate through */
  children: ReactNode[]
  /** Number of items to show initially and per load (default: 6) */
  pageSize?: number
  /** CSS class for the grid container (default: 'grid-3') */
  gridClass?: string
  /** Label for the load more button */
  loadMoreLabel?: string
  /** Show load more button (set false for infinite-scroll only) */
  showButton?: boolean
  /** Enable infinite scroll (default: true) */
  infiniteScroll?: boolean
  /** Empty state message */
  emptyMessage?: string
}

export default function LoadMoreGrid({
  children,
  pageSize = 6,
  gridClass = 'grid-3',
  loadMoreLabel = 'Load More',
  showButton = true,
  infiniteScroll = true,
  emptyMessage = 'Nothing to show.',
}: LoadMoreGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const total = children.length
  const hasMore = visibleCount < total
  const visibleItems = children.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + pageSize, total))
  }

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!infiniteScroll || !hasMore) return

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, total))
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [infiniteScroll, hasMore, visibleCount, pageSize, total])

  if (total === 0) {
    return <p className="load-more-grid__empty">{emptyMessage}</p>
  }

  return (
    <>
      <div className={gridClass}>
        {visibleItems}
      </div>

      {hasMore && (
        <div className="load-more-grid__footer">
          {/* Infinite scroll sentinel */}
          {infiniteScroll && <div ref={sentinelRef} className="load-more-grid__sentinel" />}

          {/* Manual button */}
          {showButton && (
            <button onClick={loadMore} className="btn-secondary load-more-grid__btn">
              {loadMoreLabel}
              <span className="load-more-grid__count">
                {visibleCount} / {total}
              </span>
            </button>
          )}
        </div>
      )}
    </>
  )
}
