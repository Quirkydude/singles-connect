import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function RegisterCTA() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 text-white"
      style={{ background: 'linear-gradient(150deg, #0d001e 0%, #1a0030 25%, #3b0764 65%, #5a0080 100%)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cross-pattern pointer-events-none" />

      {/* Large glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #db0073, transparent 70%)' }}
      />
      {/* Bottom left glow */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2 text-xs font-bold tracking-widest text-white/85 uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          Registration is Now Open
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
          Reserve Your Spot
          <br />
          <span className="gradient-text-pink">Today!</span>
        </h2>

        <p className="text-white/65 text-sm sm:text-lg mb-3 max-w-xl mx-auto leading-relaxed">
          Secure your free spot at the conference by completing the online reservation form. You&apos;ll receive confirmation after registering.
        </p>
        <p className="text-white/45 text-xs sm:text-sm mb-10 font-semibold tracking-wide">
          {CONFERENCE.startDate} · {CONFERENCE.venue}
        </p>

        {/* Feature highlights */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 text-sm">
          {[
            { icon: '✓', text: 'Free online registration' },
            { icon: '✓', text: 'Instant booking confirmation' },
            { icon: '✓', text: 'Secure your spot today' },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/75 text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-green-400 font-black">{f.icon}</span>
              {f.text}
            </div>
          ))}
        </div>

        {/* Main CTA button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/register"
            className="flex sm:inline-flex items-center justify-center gap-3 rounded-2xl px-10 py-5 text-base sm:text-lg font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-2xl shadow-pink-900/60 w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, #c70068, #f0329a)' }}
          >
            RESERVE YOUR SPOT — FREE
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/my-registration"
            className="flex sm:inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-5 text-sm font-bold transition-all w-full sm:w-auto"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Track My Reservation
          </Link>
        </div>

        <p className="mt-8 text-xs text-white/35 font-medium">
          Organised by {CONFERENCE.church} · {CONFERENCE.area}
        </p>
      </div>
    </section>
  )
}
