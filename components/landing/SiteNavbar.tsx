'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-md shadow-purple-900/10'
            : 'bg-white/90 backdrop-blur-sm border-b border-[var(--color-border)]/60',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-purple-900/30 transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="leading-tight min-w-0">
              <span className="block text-xs sm:text-sm font-black text-[var(--color-primary)] leading-none truncate">
                Singles Connect
              </span>
              <span className="block text-[9px] sm:text-[11px] text-[var(--color-muted)] leading-none mt-0.5 truncate font-medium">
                Conference 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              {
                href: '/',
                label: 'HOME',
                icon: (
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                isAnchor: false,
              },
              {
                href: '#details',
                label: 'DETAILS',
                icon: (
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                isAnchor: true,
              },
              {
                href: '#programme',
                label: 'PROGRAMME',
                icon: (
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                isAnchor: true,
              },
              {
                href: '/my-registration',
                label: 'MY RESERVATION',
                icon: (
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                isAnchor: false,
              },
            ].map((item) =>
              item.isAnchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-all tracking-wide"
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-all tracking-wide"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Register CTA */}
            <Link
              href="/register"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-pink-900/30 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>REGISTER</span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <div className="relative w-5 h-5">
                <span
                  className={[
                    'absolute left-0 top-1 block h-0.5 w-5 bg-current rounded-full transition-all duration-200',
                    menuOpen ? 'top-2.5 rotate-45' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-2.5 block h-0.5 w-5 bg-current rounded-full transition-all duration-200',
                    menuOpen ? 'opacity-0 translate-x-2' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-4 block h-0.5 w-5 bg-current rounded-full transition-all duration-200',
                    menuOpen ? 'top-2.5 -rotate-45' : '',
                  ].join(' ')}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Conference info sub-bar */}
        <div
          className="py-1 px-4 text-center text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide truncate"
          style={{ background: 'linear-gradient(90deg, #2d0050, #5a0080, #2d0050)' }}
        >
          {CONFERENCE.church} &nbsp;·&nbsp; {CONFERENCE.area} &nbsp;·&nbsp; {CONFERENCE.dateShort}
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-[var(--color-border)] bg-white/98 backdrop-blur-md">
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                Home
              </Link>
              <a
                href="#details"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Event Details
              </a>
              <a
                href="#programme"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Programme
              </a>
              <Link
                href="/my-registration"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                View My Reservation
              </Link>
              <div className="pt-2 pb-1">
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-sm font-black text-white transition-all hover:opacity-90 shadow-lg shadow-pink-900/30"
                  style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Reserve Your Spot — FREE
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
