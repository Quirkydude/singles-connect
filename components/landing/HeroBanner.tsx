import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--color-accent)] translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28 text-center">
        {/* Church badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
          {CONFERENCE.church}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
          Singles Connect
          <span className="block text-[var(--color-accent)]">Conference 2026</span>
        </h1>

        {/* Area */}
        <p className="text-white/70 text-lg sm:text-xl mb-3">{CONFERENCE.area}</p>

        {/* Dates */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 mb-10">
          <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium tracking-wide">{CONFERENCE.dateShort}</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white px-8 py-4 text-base font-semibold transition-colors shadow-lg shadow-black/20"
          >
            Register Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="#details"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-base font-medium transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-surface)]" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  )
}
