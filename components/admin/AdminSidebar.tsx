'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    href: '/admin/registrations',
    label: 'Registrations',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-[var(--color-border)] h-full">
      <nav className="p-3 space-y-1 pt-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
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
    </aside>
  )
}

