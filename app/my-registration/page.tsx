import { FindRegistrationForm } from '@/components/registration/FindRegistrationForm'
import { SiteNavbar } from '@/components/landing/SiteNavbar'
import { CONFERENCE } from '@/lib/constants'
import Link from 'next/link'

export const metadata = {
  title: `View My Registration — ${CONFERENCE.name}`,
  description: 'Look up your reservation by phone number or booking reference.',
}

export default function MyRegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#faf5ff' }}>
      <SiteNavbar />

      {/* Hero strip */}
      <div
        className="py-8 px-4 sm:px-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764, #5a0080)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-wide text-white/80 uppercase mb-4">
            <svg className="w-3.5 h-3.5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Reservation
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mb-2">Find Your Registration</h1>
          <p className="text-white/60 text-sm max-w-sm mx-auto">
            Enter your phone number or the booking reference sent to you via SMS after registration.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm p-5 sm:p-6">
            <FindRegistrationForm />
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-500">
              Haven&apos;t registered yet?{' '}
              <Link href="/register" className="text-[var(--color-primary)] font-semibold hover:underline">
                Reserve your spot here
              </Link>
            </p>
            <p className="text-xs text-gray-400">
              {CONFERENCE.name} · {CONFERENCE.area} · {CONFERENCE.church}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
