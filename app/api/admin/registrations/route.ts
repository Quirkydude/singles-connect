import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status') ?? undefined
  const participantType = searchParams.get('type') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const perPage = 20
  const format = searchParams.get('format')

  const where = {
    ...(status ? { status } : {}),
    ...(participantType ? { participantType } : {}),
    ...(search
      ? {
          OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {}),
  }

  if (format === 'csv') {
    const all = await prisma.registration.findMany({ where, orderBy: { createdAt: 'desc' } })
    const headers = ['id','firstName','lastName','email','phone','gender','participantType','title','designation','isNonCOP','region','area','venue','status','confirmationRef','createdAt']
    const csv = [
      headers.join(','),
      ...all.map((r) =>
        headers.map((h) => {
          const v = (r as Record<string, unknown>)[h]
          return typeof v === 'string' && v.includes(',') ? `"${v}"` : String(v ?? '')
        }).join(',')
      ),
    ].join('\n')
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="registrations.csv"',
      },
    })
  }

  const [total, registrations] = await Promise.all([
    prisma.registration.count({ where }),
    prisma.registration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
  ])

  const stats = await prisma.registration.groupBy({
    by: ['status'],
    _count: { _all: true },
  })

  const statsMap = Object.fromEntries(stats.map((s) => [s.status, s._count._all]))

  return NextResponse.json({
    registrations,
    total,
    page,
    totalPages: Math.ceil(total / perPage),
    stats: {
      total: await prisma.registration.count(),
      pending: statsMap.pending ?? 0,
      confirmed: statsMap.confirmed ?? 0,
      cancelled: statsMap.cancelled ?? 0,
    },
  })
}
