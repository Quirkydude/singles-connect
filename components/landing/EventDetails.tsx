import { CONFERENCE } from '@/lib/constants'

const programmeSchedule = [
  {
    day: 'Monday',
    date: 'May 4',
    sessions: [
      { time: 'Morning', title: 'Arrival & Registration', desc: 'Participants arrive and register at Station Central, Assin Fosu.' },
      { time: 'Mid-Morning', title: 'Opening Ceremony', desc: 'Official opening, welcome address and praise & worship.' },
      { time: 'Afternoon', title: 'Teaching Sessions & Group Discussions', desc: 'Deep dive into the conference theme with breakout groups exploring key topics.' },
      { time: 'Evening', title: 'Closing Ceremony & Networking', desc: 'Official closing, commissioning of participants, and fellowship time.' },
    ],
  },
]

export function EventDetails() {
  return (
    <>
      {/* ── Section 1: Theme Banner + Detail Cards ── */}
      <section id="details" className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: '#faf5ff' }}>
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">

          {/* Theme Banner */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl text-white px-6 py-10 sm:px-14 sm:py-16 text-center shadow-2xl"
            style={{ background: 'linear-gradient(150deg, #0d001e 0%, #1a0030 25%, #3b0764 60%, #5a0080 100%)' }}
          >
            {/* Cross pattern */}
            <div className="absolute inset-0 bg-cross-pattern opacity-60 pointer-events-none" />
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-25"
              style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)', transform: 'translate(40%, -40%)', filter: 'blur(50px)' }}
            />
            {/* Heart watermark */}
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 200 180" className="w-48 h-48 sm:w-72 sm:h-72" fill="white">
                <path d="M100 160 L15 75 C-5 55 -5 25 15 10 C35 -5 65 0 80 20 L100 45 L120 20 C135 0 165 -5 185 10 C205 25 205 55 185 75 Z" />
              </svg>
            </div>

            <div className="relative">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-black mb-4">
                Conference Theme
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                &ldquo;{CONFERENCE.theme}&rdquo;
              </h2>
              <p className="text-white/55 text-xs sm:text-sm font-semibold tracking-wide">
                {CONFERENCE.scripture}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['Love', 'Singleness', 'Marriage'].map((word) => (
                  <span
                    key={word}
                    className="px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20"
                    style={{ background: 'rgba(219,0,115,0.25)' }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section heading */}
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-black mb-2">The Essentials</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-primary)] mb-3">Conference Details</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #db0073)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#db0073' }} />
              <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #db0073, transparent)' }} />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-4 leading-relaxed">
              Join us for an inspiring gathering of singles in the Assin Fosu Area as we celebrate faith, community, and purpose. Admission is completely free.
            </p>
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Date',
                value: CONFERENCE.startDate,
                gradient: 'linear-gradient(135deg, #3b0764, #db0073)',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Location',
                value: `${CONFERENCE.area}, Central Region, Ghana`,
                gradient: 'linear-gradient(135deg, #db0073, #f0329a)',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                label: 'Organiser',
                value: CONFERENCE.church,
                gradient: 'linear-gradient(135deg, #5a0080, #3b0764)',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Open To',
                value: 'Singles, Facilitators, Ministers & Guests',
                gradient: 'linear-gradient(135deg, #db0073, #5a0080)',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                label: 'Venue',
                value: 'Station Central, Assin Fosu',
                gradient: 'linear-gradient(135deg, #3b0764, #f0329a)',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                ),
                label: 'Registration',
                value: 'FREE — Admission is completely free',
                gradient: 'linear-gradient(135deg, #f0329a, #db0073)',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-5 flex gap-4 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                  style={{ background: item.gradient }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-2xl border p-4 sm:p-5 flex items-start gap-3"
            style={{ background: 'rgba(219,0,115,0.05)', borderColor: 'rgba(219,0,115,0.2)' }}
          >
            <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              <span className="font-black text-[var(--color-accent)] uppercase tracking-wide text-xs block mb-0.5">Disclaimer</span>
              {CONFERENCE.disclaimer}
            </p>
          </div>

          {/* Package */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                style={{ background: 'linear-gradient(135deg, #3b0764, #5a0080)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-black text-gray-900 text-sm sm:text-base">What&apos;s Included</h3>
            </div>
            <ul className="space-y-2.5">
              {CONFERENCE.conferencePackage.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ── Section 2: Programme Schedule ── */}
      <section
        id="programme"
        className="py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0d001e 0%, #1a0030 30%, #2d0050 70%, #3b0764 100%)' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-cross-pattern pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)', transform: 'translate(40%, -40%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #f0329a, transparent 70%)', transform: 'translate(-40%, 40%)', filter: 'blur(60px)' }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] font-black mb-2">Schedule</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Conference Programme</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #db0073)' }} />
              <div className="w-2 h-2 rounded-full bg-[#db0073]" />
              <div className="h-px w-12 rounded-full" style={{ background: 'linear-gradient(90deg, #db0073, transparent)' }} />
            </div>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              A day of worship, teaching, and fellowship.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {programmeSchedule.map((day) => (
              <div key={day.day} className="space-y-1">
                {/* Day header */}
                <div
                  className="rounded-2xl px-5 py-4 mb-4 border border-white/10"
                  style={{ background: 'linear-gradient(135deg, rgba(219,0,115,0.3), rgba(240,50,154,0.2))' }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{day.day}</p>
                  <p className="text-xl font-black text-white">{day.date}</p>
                  <span
                    className="inline-block text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full border border-white/20"
                    style={{ background: 'rgba(219,0,115,0.3)' }}
                  >
                    {CONFERENCE.area}
                  </span>
                </div>

                {/* Sessions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {day.sessions.map((session, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-xl border border-white/10 p-4 transition-all hover:border-white/20"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: '#f0329a' }}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{session.time}</span>
                      </div>
                      <p className="text-sm font-bold text-white mb-1">{session.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{session.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/30 text-xs mt-10">
            * Programme subject to adjustments. Final schedule will be shared with confirmed participants.
          </p>
        </div>
      </section>
    </>
  )
}
