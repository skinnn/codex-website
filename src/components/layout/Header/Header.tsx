'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import './Header.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/design', label: 'Design' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button onClick={toggle} className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [close])

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          {/* Left: burger (mobile only) + logo */}
          <div className="nav__left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nav__burger"
              aria-label="Toggle menu"
            >
              <span className={`nav__burger-line ${isOpen ? 'nav__burger-line--open-1' : ''}`} />
              <span className={`nav__burger-line ${isOpen ? 'nav__burger-line--open-2' : ''}`} />
              <span className={`nav__burger-line ${isOpen ? 'nav__burger-line--open-3' : ''}`} />
            </button>

            <Link href="/" className="nav__logo">
              <img
                src="/assets/company-logo/CodeX-light.svg"
                alt="CodeX"
                className="nav__logo-img nav__logo-img--dark"
                height={28}
              />
              <img
                src="/assets/company-logo/CodeX-dark.svg"
                alt="CodeX"
                className="nav__logo-img nav__logo-img--light"
                height={28}
              />
            </Link>
          </div>

          {/* Center: desktop links */}
          <div className="nav__links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav__link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: theme toggle + CTA */}
          <div className="nav__right">
            <ThemeToggle />
            <Link href="/contact" className="btn-primary nav__cta">
              Get in Touch
            </Link>
          </div>
        </div>
      </nav>

      {/* Drawer overlay */}
      <div className={`drawer-overlay ${isOpen ? 'drawer-overlay--visible' : ''}`} onClick={close} />

      {/* Drawer */}
      <aside className={`drawer ${isOpen ? 'drawer--open' : ''}`}>
        <div className="drawer__header">
          {/* X-logo — swaps via CSS for theme */}
          <Link href="/" onClick={close} className="drawer__logo-link">
            <img
              src="/assets/company-logo/CodeX-light.svg"
              alt="CodeX"
              className="drawer__logo drawer__logo--dark"
              height={28}
            />
            <img
              src="/assets/company-logo/CodeX-dark.svg"
              alt="CodeX"
              className="drawer__logo drawer__logo--light"
              height={28}
            />
          </Link>
          <button onClick={close} className="drawer__close" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="drawer__nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={close} className="drawer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="drawer__footer">
          <Link href="/contact" onClick={close} className="btn-primary drawer__cta">
            Get in Touch
          </Link>
        </div>
      </aside>
    </>
  )
}
