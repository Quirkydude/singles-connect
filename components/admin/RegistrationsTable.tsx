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
      <div className="text-center py-16 px-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(59,7,100,0.08), rgba(219,0,115,0.08))' }}
        >
          <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm font-bold text-gray-400">No registrations found</p>
        <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]" style={{ background: '#faf5ff' }}>
              {['Name', 'Contact', 'Type', 'Venue', 'Status', 'Registered', ''].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-black text-gray-500 text-[10px] uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-[var(--color-surface)] transition-colors group">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                    >
                      {reg.firstName[0]}{reg.lastName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                        {reg.firstName} {reg.lastName}
                      </p>
                      {reg.confirmationRef && (
                        <p className="text-[10px] text-[var(--color-primary)] font-mono font-bold">{reg.confirmationRef}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-gray-600 text-xs font-medium">{reg.email}</p>
                  <p className="text-gray-400 text-xs">{reg.phone}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span className="capitalize text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                    {reg.participantType}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {reg.venue ? (
                    <span
                      className="text-xs font-black text-white px-2.5 py-1 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, #3b0764, #5a0080)' }}
                    >
                      {reg.venue}
                    </span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <Badge status={reg.status} />
                </td>
                <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap font-medium">
                  {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/admin/registrations/${reg.id}`}
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:text-[var(--color-accent)] font-black transition-colors"
                  >
                    View
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-[var(--color-border)]">
        {registrations.map((reg) => (
          <Link
            key={reg.id}
            href={`/admin/registrations/${reg.id}`}
            className="flex items-start gap-3.5 px-4 py-4 hover:bg-[var(--color-surface)] transition-colors active:bg-[var(--color-surface)] group"
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {reg.firstName[0]}{reg.lastName[0]}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-black text-gray-900 text-sm truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {reg.firstName} {reg.lastName}
                </p>
                <Badge status={reg.status} />
              </div>
              {reg.confirmationRef && (
                <p className="text-xs font-mono font-bold text-[var(--color-primary)] mb-1">{reg.confirmationRef}</p>
              )}
              <p className="text-xs text-gray-500 truncate font-medium">{reg.email}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs capitalize text-gray-500 font-semibold">{reg.participantType}</span>
                {reg.venue && (
                  <>
                    <span className="text-gray-300 text-xs">·</span>
                    <span
                      className="text-[10px] font-black text-white px-1.5 py-0.5 rounded"
                      style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                    >
                      {reg.venue}
                    </span>
                  </>
                )}
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-xs text-gray-400 font-medium">
                  {new Date(reg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>

            {/* Chevron */}
            <svg className="w-4 h-4 text-gray-300 shrink-0 mt-2 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  )
}
