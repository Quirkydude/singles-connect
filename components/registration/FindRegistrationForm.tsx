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

const statusConfig: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
    label: 'Pending Confirmation',
  },
  confirmed: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500',
    label: 'Confirmed',
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200',
    dot: 'bg-red-500',
    label: 'Cancelled',
  },
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
  const status = result ? (statusConfig[result.status] ?? statusConfig.pending) : null

  return (
    <div className="space-y-6">
      {/* Search form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-sm font-black text-gray-800 mb-2">
            Phone Number or Booking Reference
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 0241234567 or SCC2026-0001"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all bg-white"
                autoComplete="tel"
                inputMode="search"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-purple-900/20"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Enter the phone number you registered with, or the booking reference from your SMS.
          </p>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-red-800 mb-0.5">Not Found</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && status && (
        <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-lg">

          {/* Header strip */}
          <div
            className="px-5 py-5 text-white"
            style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764, #5a0080)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-base shrink-0 border-2 border-white/20"
                  style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
                >
                  {result.firstName[0]}{result.lastName[0]}
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-0.5">Reservation Found</p>
                  <p className="text-white font-black text-xl leading-tight">
                    {result.firstName} {result.lastName}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5 font-medium">
                    {fieldLabel(result.participantType, PARTICIPANT_TYPES)} &nbsp;·&nbsp; {result.area}
                  </p>
                </div>
              </div>

              {/* Status badge */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border ${status.bg} ${status.text} ${status.border} shrink-0`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
                {status.label}
              </div>
            </div>
          </div>

          {/* Booking ID / Ref row */}
          <div className="px-5 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-0.5">Booking ID</p>
              <p className="font-mono text-sm font-bold text-[var(--color-primary)] break-all">{result.id}</p>
            </div>
            {result.confirmationRef && (
              <div className="flex-1">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-0.5">Confirmation Ref</p>
                <p className="font-mono text-sm font-black text-green-700">{result.confirmationRef}</p>
              </div>
            )}
          </div>

          {/* Details grid */}
          <div className="px-5 py-5 bg-white">
            <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-4">Registration Details</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Gender</dt>
                <dd className="font-bold text-gray-800">{fieldLabel(result.gender, GENDERS)}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Participant Type</dt>
                <dd className="font-bold text-gray-800 capitalize">{fieldLabel(result.participantType, PARTICIPANT_TYPES)}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Phone</dt>
                <dd className="font-bold text-gray-800">{result.phone}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Email</dt>
                <dd className="font-bold text-gray-800 break-all text-xs">{result.email}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Venue</dt>
                <dd className="font-bold text-gray-800">
                  {venue ? (
                    <span className="inline-flex items-center gap-1.5 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-black text-white"
                        style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                      >
                        {venue.value}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{venue.description}</span>
                    </span>
                  ) : (result.venue ?? '—')}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs font-semibold mb-0.5">Reserved On</dt>
                <dd className="font-bold text-gray-800">
                  {new Date(result.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </dd>
              </div>
            </dl>
          </div>

          {/* Status-specific message */}
          {result.status === 'pending' && (
            <div className="mx-4 mb-4 rounded-xl bg-amber-50 border border-amber-200 p-4">
              <p className="text-xs font-black text-amber-800 mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Awaiting Confirmation — Conference Rate: GH₵ 600
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your reservation is received and your spot is secured. The conference team will contact you with payment details. Keep your booking ID safe.
              </p>
            </div>
          )}
          {result.status === 'confirmed' && (
            <div className="mx-4 mb-4 rounded-xl bg-green-50 border border-green-200 p-4">
              <p className="text-xs font-black text-green-800 mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You&apos;re All Set!
              </p>
              <p className="text-xs text-green-700 leading-relaxed">
                Your registration is confirmed. Present your booking ID or confirmation reference at the venue for check-in.
              </p>
            </div>
          )}
          {result.status === 'cancelled' && (
            <div className="mx-4 mb-4 rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="text-xs font-black text-red-800 mb-1">Registration Cancelled</p>
              <p className="text-xs text-red-700 leading-relaxed">
                This registration has been cancelled. Please contact the conference organizers if you believe this is an error.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
