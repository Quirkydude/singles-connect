import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'
import { CountdownTimer } from './CountdownTimer'

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(150deg, #0d001e 0%, #1a0030 15%, #280046 40%, #3b0064 65%, #550080 100%)',
      }}
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-cross-pattern pointer-events-none" />

      {/* Animated glow blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #db0073 0%, transparent 65%)',
          transform: 'translate(45%, -45%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #f0329a 0%, transparent 65%)',
          transform: 'translate(-45%, 45%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Watermark heart */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 200 180"
          className="w-[450px] h-[450px] sm:w-[750px] sm:h-[750px] lg:w-[950px] lg:h-[950px] opacity-[0.04]"
          fill="white"
        >
          <path d="M100 160 L15 75 C-5 55 -5 25 15 10 C35 -5 65 0 80 20 L100 45 L120 20 C135 0 165 -5 185 10 C205 25 205 55 185 75 Z" />
        </svg>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 sm:pt-16 sm:pb-28 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Flyer image ── */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-64 sm:w-80 lg:w-full lg:max-w-[420px]">
              {/* Multi-layer glow behind the flyer */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl scale-95 opacity-70"
                style={{ background: 'linear-gradient(135deg, #db0073, #7c3aed, #5a0080)' }}
              />
              <div
                className="absolute inset-0 rounded-3xl blur-xl scale-90 opacity-40"
                style={{ background: 'linear-gradient(135deg, #f0329a, #5a0080)' }}
              />

              {/* Flyer card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://github.com/user-attachments/assets/15cfa367-110e-4e23-a87e-82cd6ebc2280"
                  alt="Singles Connect Conference 2026 Official Flyer"
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>

              {/* Floating rate badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 rounded-2xl px-4 py-3 shadow-2xl border border-white/20"
                style={{ background: 'linear-gradient(135deg, rgba(219,0,115,0.95), rgba(240,50,154,0.95))', backdropFilter: 'blur(8px)' }}
              >
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">Registration</p>
                <p className="text-white text-2xl font-black leading-none mt-0.5">{CONFERENCE.conferenceRate}</p>
              </div>

              {/* Floating date badge */}
              <div
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-6 rounded-2xl px-3 py-2 shadow-xl border border-white/15"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
              >
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest">{CONFERENCE.dateShort}</p>
                <p className="text-white text-sm font-black leading-none mt-0.5">{CONFERENCE.year}</p>
              </div>
            </div>
          </div>

          {/* ── Conference info ── */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            {/* Church badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-[10px] sm:text-xs font-bold tracking-wider text-white/90 uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
              {CONFERENCE.church}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-black leading-none tracking-tight">
                <span className="block text-4xl sm:text-5xl xl:text-6xl text-white">Singles</span>
                <span className="block text-4xl sm:text-5xl xl:text-6xl gradient-text-pink">Connect</span>
                <span className="block text-2xl sm:text-3xl xl:text-4xl text-white/80 font-extrabold mt-1">Conference</span>
              </h1>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xl sm:text-2xl font-black text-white mt-3 shadow-lg"
                style={{ background: 'linear-gradient(90deg, #db0073, #f0329a)' }}
              >
                2026
              </div>
            </div>

            {/* Area line */}
            <div className="flex items-center gap-2 -mt-1">
              <div className="w-1 h-5 rounded-full shrink-0" style={{ background: 'linear-gradient(to bottom, #db0073, #f0329a)' }} />
              <p className="text-white/70 text-sm sm:text-base font-semibold">{CONFERENCE.area}</p>
            </div>

            {/* Theme card */}
            <div
              className="rounded-2xl border border-white/10 px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-1">Conference Theme</p>
              <p className="text-sm sm:text-base font-bold text-white/90 italic leading-snug">
                &ldquo;{CONFERENCE.theme}&rdquo;
              </p>
              <p className="text-[10px] text-white/35 mt-1 font-medium">{CONFERENCE.scripture}</p>
            </div>

            {/* Date & Location pills */}
            <div className="flex flex-col gap-2">
              {[
                {
                   icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                   ),
                  text: 'Monday 4 May 2026',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  text: 'Station Central · Assin Fosu, Central Region',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  text: 'Open to all singles aged 21 and above',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/85">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[#f472b6]"
                    style={{ background: 'rgba(219,0,115,0.2)' }}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 mb-3 font-bold">
                Conference begins in
              </p>
              <CountdownTimer targetDate={CONFERENCE.startDateISO} />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm sm:text-base font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-2xl shadow-pink-900/60 w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #c70068, #f0329a)' }}
              >
                RESERVE YOUR SPOT
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/my-registration"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-4 text-sm font-semibold transition-all w-full sm:w-auto"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Reservation
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave — larger, smoother */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 70"
          className="w-full"
          fill="#faf5ff"
          preserveAspectRatio="none"
          style={{ height: '70px' }}
        >
          <path d="M0,70 C240,28 480,0 720,0 C960,0 1200,28 1440,70 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  )
}
