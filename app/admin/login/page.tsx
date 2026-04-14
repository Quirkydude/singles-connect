import { getAdminSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/LoginForm'
import { CONFERENCE } from '@/lib/constants'

export const metadata = {
  title: 'Admin Login',
}

export default async function AdminLoginPage() {
  const session = await getAdminSession()
  if (session) redirect('/admin/registrations')

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #1a0030 0%, #3b0764 50%, #5a0080 100%)' }}
    >
      {/* Decorative glow */}
      <div
        className="fixed top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #db0073, transparent 70%)' }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top gradient bar */}
          <div
            className="h-1.5 w-full"
            style={{ background: 'linear-gradient(90deg, #3b0764, #db0073, #f0329a)' }}
          />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="text-xl font-black text-gray-900">Admin Sign In</h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">{CONFERENCE.area}</p>
              <p className="text-xs text-gray-400 mt-0.5">{CONFERENCE.church}</p>
            </div>

            <LoginForm />
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          {CONFERENCE.name} · Admin Portal
        </p>
      </div>
    </div>
  )
}

