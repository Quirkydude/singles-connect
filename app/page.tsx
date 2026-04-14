import { HeroBanner } from '@/components/landing/HeroBanner'
import { EventDetails } from '@/components/landing/EventDetails'
import { RegisterCTA } from '@/components/landing/RegisterCTA'
import { SiteNavbar } from '@/components/landing/SiteNavbar'
import { CONFERENCE } from '@/lib/constants'

export const metadata = {
  title: CONFERENCE.name,
  description: `Register for the ${CONFERENCE.name} — ${CONFERENCE.area}, ${CONFERENCE.church}. ${CONFERENCE.startDate} – ${CONFERENCE.endDate}. Theme: ${CONFERENCE.theme}.`,
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <SiteNavbar />
      <HeroBanner />
      <EventDetails />
      <RegisterCTA />
      <footer
        className="text-white/50 text-xs text-center py-5 px-6"
        style={{ background: '#1a0030' }}
      >
        <p className="mb-1">© 2026 {CONFERENCE.church} · {CONFERENCE.area}. All rights reserved.</p>
        <p>Theme: &ldquo;{CONFERENCE.theme}&rdquo; · {CONFERENCE.scripture}</p>
      </footer>
    </main>
  )
}

