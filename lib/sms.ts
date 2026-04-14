/**
 * SMS Service — Africa's Talking REST API
 *
 * Configure with environment variables:
 *   AFRICASTALKING_API_KEY  — your Africa's Talking API key
 *   AFRICASTALKING_USERNAME — your Africa's Talking username (default: "sandbox")
 *   AFRICASTALKING_SENDER   — optional alphanumeric sender ID (e.g. "SCC2026")
 *
 * If AFRICASTALKING_API_KEY is not set the service only logs (safe for development).
 */

interface SMSResult {
  ok: boolean
  error?: string
}

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  const apiKey = process.env.AFRICASTALKING_API_KEY
  const username = process.env.AFRICASTALKING_USERNAME ?? 'sandbox'
  const sender = process.env.AFRICASTALKING_SENDER ?? ''

  // Normalize Ghanaian phone numbers to international format
  let phone = to.trim().replace(/\s+/g, '')
  if (phone.startsWith('0')) {
    phone = '+233' + phone.slice(1)
  } else if (!phone.startsWith('+')) {
    phone = '+233' + phone
  }

  if (!apiKey) {
    // Development / unconfigured — just log
    console.log(`[SMS] To: ${phone}\n[SMS] Message: ${message}`)
    return { ok: true }
  }

  try {
    const params = new URLSearchParams({
      username,
      to: phone,
      message,
      ...(sender ? { from: sender } : {}),
    })

    const res = await fetch('https://api.africastalking.com/version1/messaging', {
      method: 'POST',
      headers: {
        apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[SMS] Africa\'s Talking error:', text)
      return { ok: false, error: text }
    }

    return { ok: true }
  } catch (err) {
    console.error('[SMS] Network error:', err)
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
    `Hello ${firstName}! Your SCC2026 reservation is received. ` +
    `Booking ID: ${registrationId}. ` +
    `Conference rate: GH\u20B5 600. View details: ${siteUrl}/my-registration ` +
    `- Church of Pentecost, Assin Fosu Area`
  return sendSMS(phone, message)
}
