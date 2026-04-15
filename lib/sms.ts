/**
 * SMS Service — Arkesel API v2
 *
 * Arkesel is a Ghanaian bulk SMS provider with excellent local delivery.
 *
 * Configure with environment variables:
 *   ARKESEL_API_KEY   — your Arkesel API key (from arkesel.com dashboard)
 *   ARKESEL_SENDER    — your approved sender name (e.g. "SCC2026")
 *                       must be registered with Arkesel; defaults to "SCC2026"
 *
 * If ARKESEL_API_KEY is not set the service only logs (safe for development).
 *
 * Arkesel API docs: https://developers.arkesel.com
 */

interface SMSResult {
  ok: boolean
  error?: string
}

/**
 * Normalize Ghanaian phone numbers to international format (+233…)
 */
function normalizePhone(phone: string): string {
  let p = phone.trim().replace(/[\s\-]/g, '')
  if (p.startsWith('0')) return '+233' + p.slice(1)
  if (p.startsWith('233')) return '+' + p
  if (!p.startsWith('+')) return '+233' + p
  return p
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  const apiKey = process.env.ARKESEL_API_KEY
  const sender = process.env.ARKESEL_SENDER ?? 'SCC2026'

  const phone = normalizePhone(to)

  if (!apiKey) {
    // Development / unconfigured — just log so registration still works
    console.log(`[SMS:dev] To: ${phone}`)
    console.log(`[SMS:dev] Message: ${message}`)
    return { ok: true }
  }

  try {
    const res = await fetch('https://sms.arkesel.com/api/v2/sms/send', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender,
        message,
        recipients: [phone],
      }),
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok || json.status === 'failed') {
      const errMsg = json.message ?? json.error ?? `HTTP ${res.status}`
      console.error('[SMS:arkesel] Error:', errMsg, json)
      return { ok: false, error: errMsg }
    }

    return { ok: true }
  } catch (err) {
    console.error('[SMS:arkesel] Network error:', err)
    return { ok: false, error: String(err) }
  }
}

/**
 * Send reservation confirmation SMS after a new registration.
 */
export async function sendReservationSMS(params: {
  phone: string
  firstName: string
  registrationId: string
  siteUrl: string
}): Promise<SMSResult> {
  const { phone, firstName, registrationId, siteUrl } = params
  const message =
    `Hello ${firstName}! Your SCC2026 spot is reserved. ` +
    `Booking ID: ${registrationId}. ` +
    `Conference rate: GH\u20B5600. ` +
    `Track your reservation: ${siteUrl}/my-registration ` +
    `- COP Assin Fosu Area`
  return sendSMS(phone, message)
}
