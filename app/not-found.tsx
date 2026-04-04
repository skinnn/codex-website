import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--space-6)' }}>
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>404 — Page Not Found</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '28rem' }}>It seems the page you are looking for does not exist.</p>
      <Link href="/" className="btn-primary">Return to Home</Link>
    </div>
  )
}
