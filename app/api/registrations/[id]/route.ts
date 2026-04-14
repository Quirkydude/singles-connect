import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import { CONFERENCE } from '@/lib/constants'

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const reg = await prisma.registration.findUnique({ where: { id } })
  if (!reg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(reg)
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await props.params
  const body = await request.json()
  const { status, notes } = body

  const reg = await prisma.registration.findUnique({ where: { id } })
  if (!reg) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let confirmationRef = reg.confirmationRef
  if (status === 'confirmed' && !confirmationRef) {
    const count = await prisma.registration.count({ where: { status: 'confirmed' } })
    confirmationRef = `${CONFERENCE.refPrefix}-${String(count + 1).padStart(4, '0')}`
  }

  const updated = await prisma.registration.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(confirmationRef ? { confirmationRef } : {}),
    },
  })
  return NextResponse.json(updated)
}
