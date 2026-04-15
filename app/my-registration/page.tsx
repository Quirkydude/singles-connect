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
        className="relative overflow-hidden py-10 sm:py-14 px-4 sm:px-6 text-white"
        style={{ background: 'linear-gradient(150deg, #0d001e 0%, #1a0030 25%, #3b0764 70%, #5a0080 100%)' }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-cross-pattern pointer-events-none" />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)', transform: 'translate(40%, -40%)', filter: 'blur(50px)' }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5 shadow-xl shadow-black/30"
            style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-white/85 uppercase mb-4">
            <svg className="w-3.5 h-3.5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Track Your Reservation
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
            Find Your Registration
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Enter your <strong className="text-white/80">phone number</strong> or{' '}
            <strong className="text-white/80">booking reference</strong> to look up your reservation details and check confirmation status.
          </p>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 30" className="w-full" fill="#faf5ff" preserveAspectRatio="none" style={{ height: '30px' }}>
            <path d="M0,30 C360,10 1080,10 1440,30 L1440,30 L0,30 Z" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-6">

          {/* Search card */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-lg p-5 sm:p-6">
            <FindRegistrationForm />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: 'Phone Search',
                desc: 'Use the number you registered with',
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: 'SMS Reference',
                desc: 'Use the booking ID sent to you via SMS',
              },
              {
                icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Live Status',
                desc: 'See if you\'re pending or confirmed',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-[var(--color-border)] p-4 text-center shadow-sm"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white mx-auto mb-2 shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                >
                  {item.icon}
                </div>
                <p className="text-xs font-black text-gray-800 mb-0.5">{item.title}</p>
                <p className="text-[10px] text-gray-400 leading-snug font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom links */}
          <div className="text-center space-y-2 pb-4">
            <p className="text-sm text-gray-500">
              Haven&apos;t registered yet?{' '}
              <Link href="/register" className="text-[var(--color-primary)] font-black hover:text-[var(--color-accent)] transition-colors">
                Reserve your spot here →
              </Link>
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {CONFERENCE.name} · {CONFERENCE.area} · {CONFERENCE.church}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
