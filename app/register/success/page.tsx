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
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Received!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for registering for the {CONFERENCE.name}. Your registration has been received and is pending confirmation.
          </p>

          {ref && (
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-500 mb-1">Submission ID</p>
              <p className="font-mono text-sm font-semibold text-[var(--color-primary)] break-all">{ref}</p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-amber-800 mb-1">⚠️ What happens next?</p>
            <p className="text-xs text-amber-700">
              Our team will review your registration and send a confirmation reference to your email. Please keep this page for your records.
            </p>
          </div>

          <div className="text-xs text-gray-400 mb-6">
            <p className="font-medium">{CONFERENCE.name}</p>
            <p>{CONFERENCE.startDate} – {CONFERENCE.endDate}</p>
            <p>{CONFERENCE.area} · {CONFERENCE.church}</p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
