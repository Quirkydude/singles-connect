import { Card } from '@/components/ui/Card'
import { RegistrationWizard } from '@/components/registration/RegistrationWizard'
import { CONFERENCE } from '@/lib/constants'
import Link from 'next/link'

export const metadata = {
  title: `Register — ${CONFERENCE.name}`,
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="bg-[var(--color-primary)] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white text-sm flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <span className="text-white/60 text-xs">{CONFERENCE.dateShort}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">{CONFERENCE.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{CONFERENCE.area} · {CONFERENCE.church}</p>
        </div>

        <Card padding="lg">
          <RegistrationWizard />
        </Card>
      </div>
    </div>
  )
}
