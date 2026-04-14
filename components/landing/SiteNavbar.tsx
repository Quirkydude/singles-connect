'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMenuOpen(false)}>
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="leading-tight min-w-0">
              <span className="block text-xs sm:text-sm font-bold text-[var(--color-primary)] leading-none truncate">
                Singles Connect
              </span>
              <span className="block text-[10px] sm:text-xs text-[var(--color-muted)] leading-none mt-0.5 truncate">
                Conference 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              HOME
            </Link>
            <a
              href="#details"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              EVENTS
            </a>
            <Link
              href="/my-registration"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              MY RESERVATION
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Register CTA (always visible) */}
            <Link
              href="/register"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 sm:px-4 text-xs sm:text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-md shadow-[var(--color-accent)]/30 whitespace-nowrap"
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
              className="md:hidden p-2 rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Area badge bar */}
        <div
          className="py-1 px-4 text-center text-[10px] sm:text-xs font-medium text-white/90 tracking-wide truncate"
          style={{ background: 'linear-gradient(90deg, #3b0764, #5a0080, #3b0764)' }}
        >
          {CONFERENCE.church} · {CONFERENCE.area} · {CONFERENCE.dateShort}
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav
            className="md:hidden border-t border-[var(--color-border)] bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <a
                href="#details"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Events & Details
              </a>
              <Link
                href="/my-registration"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View My Reservation
              </Link>
              <div className="pt-2 pb-1">
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Reserve Your Spot
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
