import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function RegisterCTA() {
  return (
    <section className="bg-white py-16 px-6 border-t border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-4 py-1.5 text-sm text-[var(--color-accent)] font-medium mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Registration is Open
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-4">
          Secure Your Spot Today
        </h2>
        <p className="text-gray-500 text-base sm:text-lg mb-3 max-w-xl mx-auto">
          Don't miss out on this life-changing conference. Registration is free — complete the form and await your confirmation.
        </p>
        <p className="text-sm text-[var(--color-muted)] mb-10">
          {CONFERENCE.startDate} – {CONFERENCE.endDate}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-10 py-4 text-base font-semibold transition-colors shadow-md shadow-[var(--color-primary)]/20"
          >
            Register Now — It&apos;s Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Organised by {CONFERENCE.church} · {CONFERENCE.area}
        </p>
      </div>
    </section>
  )
}
