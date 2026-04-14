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
        className="text-white/40 text-xs text-center py-6 px-4"
        style={{ background: '#1a0030' }}
      >
        <div className="max-w-4xl mx-auto space-y-1">
          <p>© 2026 {CONFERENCE.church} · {CONFERENCE.area}. All rights reserved.</p>
          <p>Theme: &ldquo;{CONFERENCE.theme}&rdquo; · <span className="text-white/25">{CONFERENCE.scripture}</span></p>
        </div>
      </footer>
    </main>
  )
}

