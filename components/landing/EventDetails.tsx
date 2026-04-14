import { CONFERENCE } from '@/lib/constants'

export function EventDetails() {
  return (
    <section id="details" className="bg-[var(--color-surface)] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">

        {/* Theme Banner */}
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl text-white px-6 py-8 sm:px-12 sm:py-14 text-center shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 50%, #5a0080 100%)' }}
        >
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 180" className="w-40 h-40 sm:w-64 sm:h-64" fill="white">
              <path d="M100 160 L15 75 C-5 55 -5 25 15 10 C35 -5 65 0 80 20 L100 45 L120 20 C135 0 165 -5 185 10 C205 25 205 55 185 75 Z" />
            </svg>
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-bold mb-3 sm:mb-4">Conference Theme</p>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight">
            &ldquo;{CONFERENCE.theme}&rdquo;
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-medium tracking-wide">
            {CONFERENCE.scripture}
          </p>
        </div>

        {/* Section heading */}
        <div className="text-center">
          <h2 className="text-xl sm:text-3xl font-black text-[var(--color-primary)] mb-3">Conference Details</h2>
          <div className="w-12 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #db0073, #f0329a)' }} />
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base mt-4">
            Join us for an inspiring gathering of singles in the Assin Fosu Area as we celebrate faith, community, and purpose.
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
              label: 'Dates',
              value: `${CONFERENCE.startDate} – ${CONFERENCE.endDate}`,
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
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              label: 'Organiser',
              value: CONFERENCE.church,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              label: 'Open To',
              value: 'Singles, Facilitators, Ministers & Guests',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              label: 'Venues',
              value: 'PCC (Pentecost Convention Centre) · KNUST',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              ),
              label: 'Rate',
              value: 'GH₵ 600 — Registration is FREE online',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 flex gap-3 sm:gap-4 items-start shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-gray-800 leading-snug">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer card */}
        <div
          className="rounded-2xl border p-4 sm:p-5 flex items-start gap-3"
          style={{ background: 'rgba(219,0,115,0.05)', borderColor: 'rgba(219,0,115,0.2)' }}
        >
          <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold text-[var(--color-accent)] uppercase tracking-wide text-xs block mb-0.5">Disclaimer</span>
            {CONFERENCE.disclaimer}
          </p>
        </div>

        {/* Conference package + follow-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b0764, #5a0080)' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Conference Package</h3>
            </div>
            <ul className="space-y-2">
              {CONFERENCE.conferencePackage.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-[var(--color-accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Follow-up Programme</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{CONFERENCE.followUp}</p>
          </div>
        </div>

      </div>
    </section>
  )
}


