import { getAdminSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/LoginForm'
import { Card } from '@/components/ui/Card'
import { CONFERENCE } from '@/lib/constants'

export const metadata = {
  title: 'Admin Login',
}

export default async function AdminLoginPage() {
  const session = await getAdminSession()
  if (session) redirect('/admin/registrations')

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">{CONFERENCE.name}</p>
        </div>
        <Card padding="lg">
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}
