import { CONFERENCE } from '@/lib/constants'
import Link from 'next/link'

export const metadata = {
  title: `Registration Received — ${CONFERENCE.name}`,
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

          <div className="p-8 text-center">
            {/* Success icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Registration Received!</h1>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Thank you for registering for the <strong>{CONFERENCE.name}</strong>. Your registration is pending confirmation.
            </p>

            {/* Submission ref */}
            {ref && (
              <div
                className="rounded-2xl p-4 mb-6 text-left border"
                style={{ background: 'rgba(59, 7, 100, 0.05)', borderColor: 'rgba(59, 7, 100, 0.15)' }}
              >
                <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wide mb-2">Submission ID</p>
                <p className="font-mono text-sm font-semibold text-[var(--color-primary)] break-all">{ref}</p>
                <p className="text-xs text-gray-400 mt-1">Keep this for your records</p>
              </div>
            )}

            {/* What next */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-left">
              <p className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What happens next?
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Our team will review your registration and you will receive a confirmation reference. Please check back or keep an eye on your communication channels.
              </p>
            </div>

            {/* Conference info */}
            <div
              className="rounded-2xl p-4 mb-6 text-sm"
              style={{ background: 'rgba(59, 7, 100, 0.04)', borderColor: 'rgba(59, 7, 100, 0.12)' }}
            >
              <p className="font-bold text-gray-800">{CONFERENCE.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{CONFERENCE.area} · {CONFERENCE.church}</p>
              <p className="text-[var(--color-primary)] text-xs font-semibold mt-1">{CONFERENCE.dateShort}</p>
              <p className="text-gray-400 text-xs mt-1 italic">&ldquo;{CONFERENCE.theme}&rdquo;</p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-md"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          © 2026 {CONFERENCE.church} · {CONFERENCE.area}
        </p>
      </div>
    </div>
  )
}

