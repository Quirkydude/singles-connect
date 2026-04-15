import { HeroBanner } from '@/components/landing/HeroBanner'
import { EventDetails } from '@/components/landing/EventDetails'
import { RegisterCTA } from '@/components/landing/RegisterCTA'
import { FindReservationCTA } from '@/components/landing/FindReservationCTA'
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
      <FindReservationCTA />
      <RegisterCTA />
      <footer
        className="relative overflow-hidden text-white/50 text-xs text-center py-8 px-4"
        style={{ background: 'linear-gradient(135deg, #0d001e, #1a0030)' }}
      >
        <div className="absolute inset-0 bg-cross-pattern pointer-events-none opacity-50" />
        <div className="relative max-w-4xl mx-auto space-y-1.5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
          <p className="font-semibold text-white/60">© 2026 {CONFERENCE.church} · {CONFERENCE.area}. All rights reserved.</p>
          <p>Theme: <span className="text-white/50 italic">&ldquo;{CONFERENCE.theme}&rdquo;</span></p>
          <p className="text-white/25">{CONFERENCE.scripture}</p>
        </div>
      </footer>
    </main>
  )
}
