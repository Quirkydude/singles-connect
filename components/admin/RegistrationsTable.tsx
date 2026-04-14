'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

interface Registration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  participantType: string
  venue: string | null
  status: string
  confirmationRef: string | null
  createdAt: string | Date
}

interface RegistrationsTableProps {
  registrations: Registration[]
}

export function RegistrationsTable({ registrations }: RegistrationsTableProps) {
  if (registrations.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm">No registrations found</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table — hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Contact</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Venue</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-[var(--color-surface)] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{reg.firstName} {reg.lastName}</p>
                  {reg.confirmationRef && (
                    <p className="text-xs text-[var(--color-primary)] font-mono">{reg.confirmationRef}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-600 text-xs">{reg.email}</p>
                  <p className="text-gray-500 text-xs">{reg.phone}</p>
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">{reg.participantType}</td>
                <td className="px-4 py-3 text-gray-600">{reg.venue ?? '—'}</td>
                <td className="px-4 py-3">
                  <Badge status={reg.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                  {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/registrations/${reg.id}`}
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline font-medium"
                  >
                    View
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list — shown on mobile only */}
      <div className="md:hidden divide-y divide-[var(--color-border)]">
        {registrations.map((reg) => (
          <Link
            key={reg.id}
            href={`/admin/registrations/${reg.id}`}
            className="flex items-start gap-3 px-4 py-4 hover:bg-[var(--color-surface)] transition-colors active:bg-[var(--color-surface)]"
          >
            {/* Avatar circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {reg.firstName[0]}{reg.lastName[0]}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {reg.firstName} {reg.lastName}
                </p>
                <Badge status={reg.status} />
              </div>
              {reg.confirmationRef && (
                <p className="text-xs font-mono text-[var(--color-primary)] mb-1">{reg.confirmationRef}</p>
              )}
              <p className="text-xs text-gray-500 truncate">{reg.email}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span className="capitalize">{reg.participantType}</span>
                {reg.venue && (
                  <>
                    <span>·</span>
                    <span>{reg.venue}</span>
                  </>
                )}
                <span>·</span>
                <span>
                  {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <svg className="w-4 h-4 text-gray-300 shrink-0 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  )
}
