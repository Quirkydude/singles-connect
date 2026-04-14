import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'
import { CountdownTimer } from './CountdownTimer'

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden text-white min-h-[80vh] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #1a0030 0%, #2d0050 30%, #4a0080 60%, #6b0099 100%)',
      }}
    >
      {/* Watermark heart background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 200 180"
          className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-[0.06]"
          fill="white"
        >
          <path d="M100 160 L15 75 C-5 55 -5 25 15 10 C35 -5 65 0 80 20 L100 45 L120 20 C135 0 165 -5 185 10 C205 25 205 55 185 75 Z" />
        </svg>
      </div>

      {/* Decorative glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f0329a, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Conference Info */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Church badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80 uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {CONFERENCE.church}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-none tracking-tight mb-2">
                Singles Connect
                <br />
                <span style={{ color: '#f472b6' }}>Conference</span>
              </h1>
              <div
                className="inline-block px-3 py-1 rounded-md text-lg sm:text-xl font-bold text-white mt-1"
                style={{ background: 'linear-gradient(90deg, #db0073, #f0329a)' }}
              >
                2026
              </div>
            </div>

            {/* Area */}
            <p className="text-white/70 text-base font-medium -mt-2">
              {CONFERENCE.area}
            </p>

            {/* Date & Location */}
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-white/90">
                <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Apr 30 – May 02, 2026</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/90">
                <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">PCC | KNUST</span>
              </div>
            </div>

            {/* Countdown */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">Conference begins in</p>
              <CountdownTimer targetDate={CONFERENCE.startDateISO} />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
              >
                REGISTER NOW
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-4 text-sm font-medium transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right — Official Flyer */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Glow behind the card */}
              <div className="absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }} />
              {/* Flyer card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/15cfa367-110e-4e23-a87e-82cd6ebc2280"
                  alt="Singles Connect Conference 2026 Official Flyer"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full" fill="#faf5ff" preserveAspectRatio="none" style={{ height: '40px' }}>
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  )
}

