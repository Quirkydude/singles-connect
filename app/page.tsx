import { HeroBanner } from '@/components/landing/HeroBanner'
import { EventDetails } from '@/components/landing/EventDetails'
import { RegisterCTA } from '@/components/landing/RegisterCTA'
import { CONFERENCE } from '@/lib/constants'

export const metadata = {
  title: CONFERENCE.name,
  description: `Register for the ${CONFERENCE.name} — ${CONFERENCE.area}, ${CONFERENCE.church}. ${CONFERENCE.startDate} – ${CONFERENCE.endDate}.`,
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <HeroBanner />
      <EventDetails />
      <RegisterCTA />
      <footer className="bg-[var(--color-primary)] text-white/60 text-xs text-center py-5 px-6">
        © 2026 {CONFERENCE.church} · {CONFERENCE.area}. All rights reserved.
      </footer>
    </main>
  )
}
