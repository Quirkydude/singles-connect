import { RegistrationWizard } from '@/components/registration/RegistrationWizard'
import { CONFERENCE } from '@/lib/constants'
import Link from 'next/link'

export const metadata = {
  title: `Register — ${CONFERENCE.name}`,
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#faf5ff' }}>

      {/* Header bar */}
      <div
        className="text-white py-3.5 px-4 sm:px-6 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764, #5a0080)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors shrink-0 min-h-[44px]"
            aria-label="Go back to home page"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          {/* Heart logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-xs text-white/70 font-medium hidden sm:block truncate">{CONFERENCE.dateShort}</span>
          </div>
        </div>
      </div>

      {/* Banner strip */}
      <div
        className="py-6 sm:py-8 px-4 sm:px-6 text-white"
        style={{ background: 'linear-gradient(135deg, #2d0050, #5a0080)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-4 sm:gap-6">
          {/* Flyer thumbnail */}
          <div className="w-16 sm:w-24 h-auto rounded-xl overflow-hidden border-2 border-white/20 shadow-xl shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/user-attachments/assets/15cfa367-110e-4e23-a87e-82cd6ebc2280"
              alt="Conference Flyer"
              className="w-full h-auto block"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Registration</p>
            <h1 className="text-base sm:text-2xl font-black text-white leading-tight mb-1 truncate sm:whitespace-normal">
              {CONFERENCE.name}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm truncate">{CONFERENCE.area} · {CONFERENCE.church}</p>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/70 bg-white/10 rounded-full px-2.5 py-1">
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Apr 30 – May 2, 2026
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/70 bg-white/10 rounded-full px-2.5 py-1">
                <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                PCC | KNUST
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard */}
      <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl p-4 sm:p-6 lg:p-8">
            <RegistrationWizard />
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 sm:mt-6 px-2">
            {CONFERENCE.disclaimer} · Conference rate: {CONFERENCE.conferenceRate} · Reservation is free — payment details will follow
          </p>
        </div>
      </div>
    </div>
  )
}


