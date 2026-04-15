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
            { confirmationRef: { contains: search } },
          ],
        }
      : {}),
  }

  const [total, registrations, allStats, venueStats, typeStats] = await Promise.all([
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
    prisma.registration.groupBy({
      by: ['venue'],
      _count: { _all: true },
    }),
    prisma.registration.groupBy({
      by: ['participantType'],
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
    {
      label: 'Total',
      value: stats.total,
      valueColor: 'text-gray-900',
      bg: 'bg-white',
      border: 'border-[var(--color-border)]',
      dotColor: '',
      href: '/admin/registrations',
    },
    {
      label: 'Pending',
      value: stats.pending,
      valueColor: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dotColor: 'bg-amber-400',
      href: '/admin/registrations?status=pending',
    },
    {
      label: 'Confirmed',
      value: stats.confirmed,
      valueColor: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
      dotColor: 'bg-green-500',
      href: '/admin/registrations?status=confirmed',
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      valueColor: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
      dotColor: 'bg-red-400',
      href: '/admin/registrations?status=cancelled',
    },
  ]

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-900">Registrations</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} result{total !== 1 ? 's' : ''}{(status || participantType || search) ? ' (filtered)' : ''}
          </p>
        </div>
        <a
          href={`/api/admin/registrations?format=csv${status ? `&status=${status}` : ''}${participantType ? `&type=${participantType}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold rounded-xl border border-[var(--color-border)] bg-white text-gray-600 hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`${s.bg} border ${s.border} rounded-xl p-3 sm:p-4 hover:shadow-md hover:-translate-y-0.5 transition-all block`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              {s.dotColor && <span className={`w-2 h-2 rounded-full ${s.dotColor} shrink-0`} />}
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-black">{s.label}</p>
            </div>
            <p className={`text-2xl sm:text-3xl font-black ${s.valueColor}`}>{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Venue + Type mini breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Venue Split</p>
          <div className="flex gap-3 flex-wrap">
            {venueStats.map((v) => (
              <Link
                key={v.venue ?? 'none'}
                href={`/admin/registrations${v.venue ? `?type=` : ''}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-black text-white shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                >
                  {v.venue ?? '—'}
                </span>
                <span className="text-sm font-black text-gray-700">{v._count._all}</span>
              </Link>
            ))}
            {venueStats.length === 0 && <span className="text-xs text-gray-400">No data yet</span>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Participant Split</p>
          <div className="flex gap-2 flex-wrap">
            {typeStats.map((t) => (
              <Link
                key={t.participantType}
                href={`/admin/registrations?type=${t.participantType}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors"
              >
                <span className="text-xs font-bold text-gray-700 capitalize">{t.participantType}</span>
                <span className="text-xs font-black text-[var(--color-primary)]">{t._count._all}</span>
              </Link>
            ))}
            {typeStats.length === 0 && <span className="text-xs text-gray-400">No data yet</span>}
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar status={status} participantType={participantType} search={search} />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        <RegistrationsTable registrations={registrations.map(r => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }))} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm flex-wrap gap-3">
          <p className="text-xs text-gray-500 font-medium">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
          </p>
          <div className="flex gap-2 items-center">
            {page > 1 && (
              <Link
                href={`/admin/registrations?${new URLSearchParams({ ...(status && { status }), ...(participantType && { type: participantType }), ...(search && { search }), page: String(page - 1) })}`}
                className="px-4 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all text-xs font-bold min-h-[36px] flex items-center gap-1.5 text-gray-600"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            )}
            <span className="text-xs text-gray-400 font-medium px-2">Page {page} of {totalPages}</span>
            {page < totalPages && (
              <Link
                href={`/admin/registrations?${new URLSearchParams({ ...(status && { status }), ...(participantType && { type: participantType }), ...(search && { search }), page: String(page + 1) })}`}
                className="px-4 py-2 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all text-xs font-bold min-h-[36px] flex items-center gap-1.5 text-gray-600"
              >
                Next
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
