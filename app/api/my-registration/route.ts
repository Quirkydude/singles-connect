import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * Public endpoint — look up a reservation by phone number or booking ID.
 * Query params (at least one required):
 *   ?phone=0241234567
 *   ?ref=SCC2026-0001   (confirmationRef) or booking ID (cuid)
 *
 * Returns a safe subset of the registration (no internal admin notes).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')?.trim()
  const ref = searchParams.get('ref')?.trim()

  if (!phone && !ref) {
    return NextResponse.json(
      { error: 'Please provide a phone number or booking reference.' },
      { status: 400 }
    )
  }

  try {
    let reg = null

    if (ref) {
      // Try confirmationRef first, then the internal cuid id
      reg = await prisma.registration.findFirst({
        where: {
          OR: [
            { confirmationRef: { equals: ref } },
            { id: { equals: ref } },
          ],
        },
      })
    } else if (phone) {
      // Build alternate formats to search — handle 0XX (local) and +233XX (intl)
      const stripped = phone.replace(/^(\+233|00233)/, '0').replace(/\D/g, '')
      const withPlus = stripped.startsWith('0')
        ? '+233' + stripped.slice(1)
        : '+233' + stripped
      const withZero = stripped.startsWith('0') ? stripped : '0' + stripped

      reg = await prisma.registration.findFirst({
        where: {
          OR: [
            { phone: { equals: phone } },
            { phone: { equals: withZero } },
            { phone: { equals: withPlus } },
            { phone: { equals: stripped } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    if (!reg) {
      return NextResponse.json(
        { error: 'No registration found with those details.' },
        { status: 404 }
      )
    }

    // Return a safe public subset — omit internal notes
    return NextResponse.json({
      id: reg.id,
      firstName: reg.firstName,
      lastName: reg.lastName,
      middleName: reg.middleName,
      gender: reg.gender,
      phone: reg.phone,
      email: reg.email,
      participantType: reg.participantType,
      title: reg.title,
      venue: reg.venue,
      status: reg.status,
      confirmationRef: reg.confirmationRef,
      area: reg.area,
      region: reg.region,
      createdAt: reg.createdAt.toISOString(),
    })
  } catch (err) {
    console.error('Find registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
