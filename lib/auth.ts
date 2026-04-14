import { decrypt, getSessionToken } from './session'
import { redirect } from 'next/navigation'

export async function getAdminSession() {
  const token = await getSessionToken()
  if (!token) return null
  const payload = await decrypt(token)
  if (!payload?.adminId) return null
  return payload as { adminId: string; email: string }
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')
  return session
}
