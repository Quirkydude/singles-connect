import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { registrationSchema } from '@/lib/validations'
import { sendReservationSMS } from '@/lib/sms'
import { CONFERENCE } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = registrationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      )
    }
    const data = result.data
    const registration = await prisma.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        participantType: data.participantType,
        title: data.title,
        designation: data.designation,
        isNonCOP: data.isNonCOP,
        region: data.region ?? 'Central',
        area: data.area ?? 'Assin Fosu',
        venue: data.venue,
      },
    })

    // Fire-and-forget SMS — do not block the response
    sendReservationSMS({
      phone: registration.phone,
      firstName: registration.firstName,
      registrationId: registration.id,
      siteUrl: CONFERENCE.siteUrl,
    }).catch((err) => console.error('[SMS] Failed to send reservation SMS:', err))

    return NextResponse.json(registration, { status: 201 })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'This email address is already registered.' }, { status: 409 })
    }
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
