import Link from 'next/link'

export function FindReservationCTA() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-[var(--color-surface)] bg-dot-pattern">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-white shadow-xl"
        >
          {/* Gradient accent bar on left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
            style={{ background: 'linear-gradient(to bottom, #3b0764, #db0073, #f0329a)' }}
          />

          <div className="pl-8 pr-6 py-7 sm:py-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Icon */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-purple-900/20"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[var(--color-accent)] uppercase tracking-widest mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                Already Registered?
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1.5 leading-tight">
                Find Your Reservation
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                Already submitted a reservation? Look it up anytime using your{' '}
                <strong className="text-gray-700">phone number</strong> or your{' '}
                <strong className="text-gray-700">booking reference</strong> sent via SMS.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Check status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  View booking ID
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm details
                </span>
              </div>
            </div>

            {/* CTA button */}
            <div className="shrink-0">
              <Link
                href="/my-registration"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-purple-900/20 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find My Reservation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
