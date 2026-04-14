'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface FilterBarProps {
  status: string
  participantType: string
  search: string
}

export function FilterBar({ status, participantType, search }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
        />
      </div>

      {/* Status filter */}
      <select
        value={status}
        onChange={(e) => updateFilter('status', e.target.value)}
        className="py-2 pl-3 pr-8 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Type filter */}
      <select
        value={participantType}
        onChange={(e) => updateFilter('type', e.target.value)}
        className="py-2 pl-3 pr-8 text-sm rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] cursor-pointer"
      >
        <option value="">All Types</option>
        <option value="single">Single</option>
        <option value="facilitator">Facilitator</option>
        <option value="minister">Minister</option>
        <option value="guest">Guest</option>
      </select>

      {/* CSV export */}
      <a
        href={`/api/admin/registrations?format=csv${status ? `&status=${status}` : ''}${participantType ? `&type=${participantType}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-white text-gray-600 hover:bg-[var(--color-surface)] transition-colors whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export CSV
      </a>
    </div>
  )
}
