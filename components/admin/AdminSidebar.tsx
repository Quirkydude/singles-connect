'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONFERENCE } from '@/lib/constants'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  isExternal?: boolean
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        href: '/admin/dashboard',
        label: 'Dashboard',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Manage',
    items: [
      {
        href: '/admin/registrations',
        label: 'Registrations',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Export',
    items: [
      {
        href: '/api/admin/registrations?format=csv',
        label: 'Export CSV',
        isExternal: true,
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        ),
      },
    ],
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 md:w-56 shrink-0 h-full flex flex-col border-r border-[var(--color-border)] bg-white">
      {/* Mobile header inside sidebar drawer */}
      <div
        className="md:hidden flex items-center justify-between px-4 h-14 border-b border-[var(--color-border)] shrink-0"
        style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-sm font-black text-white">Menu</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav groups */}
      <nav className="p-3 flex-1 space-y-5 pt-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = !item.isExternal && pathname.startsWith(item.href)

                if (item.isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-500 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <span className="text-gray-400">{item.icon}</span>
                      {item.label}
                    </a>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={[
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all',
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]',
                    ].join(' ')}
                    style={isActive ? { background: 'linear-gradient(135deg, #3b0764, #db0073)' } : {}}
                  >
                    <span className={isActive ? 'text-white' : 'text-gray-400'}>{item.icon}</span>
                    {item.label}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
          >
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-gray-700 leading-none truncate">{CONFERENCE.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-none">{CONFERENCE.dateShort}</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[var(--color-primary)] transition-colors font-semibold"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View public site
        </Link>
      </div>
    </aside>
  )
}
