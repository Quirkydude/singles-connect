'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONFERENCE } from '@/lib/constants'

const navItems = [
  {
    href: '/admin/registrations',
    label: 'Registrations',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 md:w-52 shrink-0 bg-white border-r border-[var(--color-border)] h-full flex flex-col">
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
          <span className="text-sm font-bold text-white">Menu</span>
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

      {/* Nav items */}
      <nav className="p-3 space-y-1 pt-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]',
              ].join(' ')}
              style={isActive ? { background: 'linear-gradient(135deg, #3b0764, #db0073)' } : {}}
            >
              <span className={isActive ? 'text-white' : 'text-gray-400'}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Conference name at bottom of sidebar */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <p className="text-[10px] text-gray-400 leading-snug">{CONFERENCE.name}</p>
        <p className="text-[10px] text-gray-300 mt-0.5">{CONFERENCE.dateShort}</p>
      </div>
    </aside>
  )
}

