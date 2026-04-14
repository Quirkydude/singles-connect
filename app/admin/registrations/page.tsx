import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { FilterBar } from '@/components/admin/FilterBar'
import { RegistrationsTable } from '@/components/admin/RegistrationsTable'
import Link from 'next/link'

export const metadata = {
  title: 'Registrations — Admin',
}

interface Props {
  searchParams: Promise<{
    status?: string
    type?: string
    search?: string
    page?: string
  }>
}

export default async function RegistrationsPage(props: Props) {
  await requireAdmin()

  const params = await props.searchParams
  const status = params.status ?? ''
  const participantType = params.type ?? ''
  const search = params.search ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1'))
  const perPage = 20

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

  const [total, registrations, allStats] = await Promise.all([
    prisma.registration.count({ where }),
    prisma.registration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.registration.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ])

  const statsMap = Object.fromEntries(allStats.map((s) => [s.status, s._count._all]))
  const totalAll = await prisma.registration.count()
  const stats = {
    total: totalAll,
    pending: statsMap.pending ?? 0,
    confirmed: statsMap.confirmed ?? 0,
    cancelled: statsMap.cancelled ?? 0,
  }

  const totalPages = Math.ceil(total / perPage)

  const statCards = [
    { label: 'Total', value: stats.total, color: 'text-gray-900', bg: 'bg-white' },
    { label: 'Pending', value: stats.pending, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Confirmed', value: stats.confirmed, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'Cancelled', value: stats.cancelled, color: 'text-red-700', bg: 'bg-red-50' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Registrations</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl border border-[var(--color-border)] p-4`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <FilterBar status={status} participantType={participantType} search={search} />

      {/* Table */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        <RegistrationsTable registrations={registrations.map(r => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/registrations?${new URLSearchParams({ ...(status && { status }), ...(participantType && { type: participantType }), ...(search && { search }), page: String(page - 1) })}`}
                className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/registrations?${new URLSearchParams({ ...(status && { status }), ...(participantType && { type: participantType }), ...(search && { search }), page: String(page + 1) })}`}
                className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
