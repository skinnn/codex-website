'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>Something went wrong</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '28rem', margin: '0 auto var(--space-8)' }}>An unexpected error occurred. Please try again.</p>
        <button onClick={() => reset()} className="btn-primary">Try Again</button>
      </div>
    </div>
  )
}
