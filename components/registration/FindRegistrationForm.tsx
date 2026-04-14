'use client'

import { useState } from 'react'
import { GENDERS, PARTICIPANT_TYPES, VENUES } from '@/lib/constants'

interface RegistrationResult {
  id: string
  firstName: string
  lastName: string
  middleName?: string | null
  gender: string
  phone: string
  email: string
  participantType: string
  title?: string | null
  venue?: string | null
  status: string
  confirmationRef?: string | null
  area: string
  region: string
  createdAt: string
}

function fieldLabel(value: string | undefined | null, options: { value: string; label: string }[]) {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export function FindRegistrationForm() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RegistrationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Detect whether the user entered a phone number or a booking/confirmation ref.
      // A booking ref looks like "SCC2026-0001" or is a cuid (starts with 'c' + alphanumeric).
      // Phone numbers are digit-heavy (may include +, spaces, dashes but are mostly numeric).
      const looksLikeRef = /^[A-Za-z]{2,}/.test(trimmed) || trimmed.length > 20
      const params = new URLSearchParams(
        looksLikeRef ? { ref: trimmed } : { phone: trimmed }
      )
      const res = await fetch(`/api/my-registration?${params.toString()}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setResult(data)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const venue = VENUES.find((v) => v.value === result?.venue)

  return (
    <div className="space-y-6">
      {/* Search form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number or Booking Reference
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 0241234567 or SCC2026-0001"
              className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-colors bg-white"
              autoComplete="tel"
              inputMode="search"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            Enter the phone number you registered with, or the booking reference from your SMS.
          </p>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
          {/* Status header */}
          <div
            className="px-5 py-4 flex items-center justify-between gap-3"
            style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764)' }}
          >
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-0.5">Reservation Found</p>
              <p className="text-white font-black text-lg leading-tight">
                {result.firstName} {result.lastName}
              </p>
            </div>
            <span
              className={[
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold capitalize shrink-0',
                statusStyles[result.status] ?? 'bg-gray-100 text-gray-700 border-gray-200',
              ].join(' ')}
            >
              {result.status}
            </span>
          </div>

          {/* Booking ID / Confirmation ref */}
          <div className="px-5 py-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wide mb-0.5">Booking ID</p>
              <p className="font-mono text-sm font-semibold text-[var(--color-primary)] break-all">{result.id}</p>
            </div>
            {result.confirmationRef && (
              <div className="flex-1">
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-0.5">Confirmation Ref</p>
                <p className="font-mono text-sm font-bold text-green-700">{result.confirmationRef}</p>
              </div>
            )}
          </div>

          {/* Personal details */}
          <div className="px-5 py-4 space-y-3">
            <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wide">Personal Details</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-gray-400 text-xs">Gender</dt>
                <dd className="font-medium text-gray-800 mt-0.5">{fieldLabel(result.gender, GENDERS)}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">Type</dt>
                <dd className="font-medium text-gray-800 mt-0.5 capitalize">{fieldLabel(result.participantType, PARTICIPANT_TYPES)}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">Phone</dt>
                <dd className="font-medium text-gray-800 mt-0.5">{result.phone}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">Email</dt>
                <dd className="font-medium text-gray-800 mt-0.5 break-all">{result.email}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">Area</dt>
                <dd className="font-medium text-gray-800 mt-0.5">{result.area}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">Venue</dt>
                <dd className="font-medium text-gray-800 mt-0.5">{venue ? `${venue.label} — ${venue.description}` : (result.venue ?? '—')}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-400 text-xs">Reserved on</dt>
                <dd className="font-medium text-gray-800 mt-0.5">
                  {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Payment info */}
          <div className="mx-5 mb-5 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conference Rate
            </p>
            <p className="text-sm text-amber-700">
              <strong>GH₵ 600</strong> — This reservation secures your spot.
              Further payment instructions will be communicated by the conference team.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
