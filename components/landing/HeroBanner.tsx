import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'
import { CountdownTimer } from './CountdownTimer'

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #1a0030 0%, #2d0050 30%, #4a0080 60%, #6b0099 100%)',
      }}
    >
      {/* Watermark heart — scaled down on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 200 180"
          className="w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] opacity-[0.05]"
          fill="white"
        >
          <path d="M100 160 L15 75 C-5 55 -5 25 15 10 C35 -5 65 0 80 20 L100 45 L120 20 C135 0 165 -5 185 10 C205 25 205 55 185 75 Z" />
        </svg>
      </div>

      {/* Decorative glow blobs */}
      <div
        className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f0329a, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Flyer image — mobile: centered, smaller; desktop: right column */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-56 sm:w-72 lg:w-full lg:max-w-md">
              {/* Pink glow behind */}
              <div
                className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
              />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/15cfa367-110e-4e23-a87e-82cd6ebc2280"
                  alt="Singles Connect Conference 2026 Official Flyer"
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Conference info — mobile: below flyer */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            {/* Church badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-white/80 uppercase">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
              {CONFERENCE.church}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl xl:text-6xl font-black leading-none tracking-tight mb-2">
                Singles Connect
                <br />
                <span style={{ color: '#f472b6' }}>Conference</span>
              </h1>
              <div
                className="inline-block px-3 py-0.5 sm:py-1 rounded-md text-base sm:text-xl font-bold text-white mt-1"
                style={{ background: 'linear-gradient(90deg, #db0073, #f0329a)' }}
              >
                2026
              </div>
            </div>

            {/* Area */}
            <p className="text-white/70 text-sm sm:text-base font-medium -mt-1">
              {CONFERENCE.area}
            </p>

            {/* Date & Location */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">Apr 30 – May 02, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">PCC | KNUST</span>
              </div>
              {/* Rate badge */}
              <div className="flex items-center gap-2 text-white/90">
                <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-bold text-[#f472b6]">GH₵ 600 · {CONFERENCE.disclaimer}</span>
              </div>
            </div>

            {/* Countdown */}
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">
                Conference begins in
              </p>
              <CountdownTimer targetDate={CONFERENCE.startDateISO} />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm sm:text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-xl w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
              >
                REGISTER NOW — FREE
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-4 text-sm font-medium transition-colors w-full sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full" fill="#faf5ff" preserveAspectRatio="none" style={{ height: '40px' }}>
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  )
}


