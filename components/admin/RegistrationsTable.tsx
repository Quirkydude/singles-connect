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
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
            <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Email</th>
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
              <td className="px-4 py-3 text-gray-600">{reg.email}</td>
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
  )
}
