import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* Heart icon mirroring the banner */}
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-bold text-[var(--color-primary)] leading-none">
              Singles Connect
            </span>
            <span className="block text-xs text-[var(--color-muted)] leading-none mt-0.5">
              Conference 2026
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            HOME
          </Link>
          <a
            href="#details"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            EVENTS
          </a>
        </nav>

        {/* CTA */}
        <Link
          href="/register"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 shadow-md shadow-[var(--color-accent)]/30"
          style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="hidden sm:inline">REGISTER NOW</span>
          <span className="sm:hidden">REGISTER</span>
        </Link>
      </div>

      {/* Area badge bar */}
      <div className="text-center py-1 text-xs font-medium text-white/90"
        style={{ background: 'linear-gradient(90deg, #3b0764, #5a0080, #3b0764)' }}>
        {CONFERENCE.church} · {CONFERENCE.area} · {CONFERENCE.dateShort}
      </div>
    </header>
  )
}
