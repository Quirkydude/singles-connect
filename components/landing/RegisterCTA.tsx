import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function RegisterCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 text-white"
      style={{ background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 50%, #5a0080 100%)' }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-bold tracking-wide text-white/80 uppercase mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
          Registration is Open
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
          Reserve Your Spot<br />
          <span style={{ color: '#f472b6' }}>Today!</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-lg mb-3 max-w-xl mx-auto">
          Secure your place at the conference by completing the reservation form. The conference team will follow up with payment details.
        </p>
        <p className="text-white/50 text-xs sm:text-sm mb-8 sm:mb-10 font-medium">
          {CONFERENCE.startDate} – {CONFERENCE.endDate}
        </p>

        {/* Register button — full width on mobile */}
        <div className="px-0 sm:px-8">
        <Link
            href="/register"
            className="flex sm:inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 sm:py-5 text-base sm:text-lg font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-2xl w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
          >
            RESERVE YOUR SPOT — {CONFERENCE.conferenceRate}
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <p className="mt-6 sm:mt-8 text-xs text-white/40">
          Organised by {CONFERENCE.church} · {CONFERENCE.area}
        </p>
      </div>
    </section>
  )
}

