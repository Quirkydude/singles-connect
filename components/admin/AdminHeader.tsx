'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

interface AdminHeaderProps {
  onMenuToggle?: () => void
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header
      className="text-white shadow-lg shrink-0"
      style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Brand */}
        <Link href="/admin/registrations" className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-sm font-bold leading-none block">Admin Panel</span>
            <span className="text-white/40 text-xs leading-none truncate block">{CONFERENCE.area}</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <Link href="/" className="text-white/50 hover:text-white text-xs transition-colors hidden sm:block whitespace-nowrap">
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/10 transition-colors min-h-[36px]"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

