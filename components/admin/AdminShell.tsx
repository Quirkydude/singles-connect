'use client'

import { useState, useCallback } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)]">
      <AdminHeader onMenuToggle={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Sidebar — drawer on mobile, always visible on md+ */}
        <div
          className={[
            'fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-out md:static md:translate-x-0 md:z-auto',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <AdminSidebar onClose={closeSidebar} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
