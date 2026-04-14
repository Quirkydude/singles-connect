import { CONFERENCE } from '@/lib/constants'
import Link from 'next/link'

export const metadata = {
  title: `Reservation Received — ${CONFERENCE.name}`,
}

interface Props {
  searchParams: Promise<{ ref?: string }>
}

export default async function SuccessPage(props: Props) {
  const { ref } = await props.searchParams

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 50%, #5a0080 100%)' }}
    >
      {/* Decorative glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)' }}
      />

      <div className="relative w-full max-w-lg">
        <div className="bg-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Top gradient strip */}
          <div
            className="h-2 w-full"
            style={{ background: 'linear-gradient(90deg, #3b0764, #db0073, #f0329a)' }}
          />

          <div className="p-6 sm:p-8 text-center">
            {/* Success icon */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-gray-900 mb-2">Spot Reserved!</h1>
            <p className="text-gray-500 text-sm mb-5 max-w-sm mx-auto">
              Your reservation for <strong>{CONFERENCE.name}</strong> has been received. Keep your booking ID safe — you&apos;ll need it for check-in.
            </p>

            {/* Booking ID */}
            {ref && (
              <div
                className="rounded-2xl p-4 mb-4 text-left border"
                style={{ background: 'rgba(59, 7, 100, 0.05)', borderColor: 'rgba(59, 7, 100, 0.15)' }}
              >
                <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wide mb-1.5">Booking ID</p>
                <p className="font-mono text-sm font-bold text-[var(--color-primary)] break-all">{ref}</p>
                <p className="text-xs text-gray-400 mt-1">Screenshot or copy this — it was also sent to your phone via SMS.</p>
              </div>
            )}

            {/* SMS notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4 text-left">
              <p className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                SMS Sent
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                A confirmation SMS with your booking ID has been sent to the phone number you registered with. You can also look up your reservation anytime at{' '}
                <Link href="/my-registration" className="underline font-semibold">
                  View My Registration
                </Link>
                .
              </p>
            </div>

            {/* Payment info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 text-left">
              <p className="text-sm font-bold text-amber-800 mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Conference Rate — {CONFERENCE.conferenceRate}
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                This reservation secures your spot. The conference team will contact you with payment instructions to complete your registration.
              </p>
            </div>

            {/* Conference info */}
            <div
              className="rounded-2xl p-4 mb-5 text-sm border"
              style={{ background: 'rgba(59, 7, 100, 0.04)', borderColor: 'rgba(59, 7, 100, 0.12)' }}
            >
              <p className="font-bold text-gray-800">{CONFERENCE.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{CONFERENCE.area} · {CONFERENCE.church}</p>
              <p className="text-[var(--color-primary)] text-xs font-semibold mt-1">{CONFERENCE.dateShort}</p>
              <p className="text-gray-400 text-xs mt-1 italic">&ldquo;{CONFERENCE.theme}&rdquo;</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/my-registration"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold transition-all hover:bg-[var(--color-surface)] active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View Reservation
              </Link>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-md"
                style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          © 2026 {CONFERENCE.church} · {CONFERENCE.area}
        </p>
      </div>
    </div>
  )
}
