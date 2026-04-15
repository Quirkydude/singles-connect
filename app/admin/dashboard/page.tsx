import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { CONFERENCE } from '@/lib/constants'

export const metadata = {
  title: 'Dashboard — Admin',
}

function BarChart({ items }: { items: { label: string; value: number; total: number; color: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between items-center text-sm mb-1.5">
            <span className="font-semibold text-gray-700 capitalize">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-black text-gray-900">{item.value}</span>
              <span className="text-xs text-gray-400">
                ({item.total > 0 ? Math.round((item.value / item.total) * 100) : 0}%)
              </span>
            </div>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%`,
                background: item.color,
                minWidth: item.value > 0 ? '4px' : '0',
              }}
            />
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
      )}
    </div>
  )
}

export default async function DashboardPage() {
  await requireAdmin()

  const [total, statuses, venues, types, recent, todayCount] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.registration.groupBy({ by: ['venue'], _count: { _all: true } }),
    prisma.registration.groupBy({ by: ['participantType'], _count: { _all: true } }),
    prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.registration.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ])

  const statusMap = Object.fromEntries(statuses.map((s) => [s.status, s._count._all]))
  const venueMap = Object.fromEntries(venues.map((v) => [v.venue ?? 'Not specified', v._count._all]))
  const typeMap = Object.fromEntries(types.map((t) => [t.participantType, t._count._all]))

  const confirmed = statusMap.confirmed ?? 0
  const pending = statusMap.pending ?? 0
  const cancelled = statusMap.cancelled ?? 0
  const confirmRate = total > 0 ? Math.round((confirmed / total) * 100) : 0

  const statCards = [
    {
      label: 'Total Registrations',
      value: total,
      sub: `+${todayCount} today`,
      gradient: 'linear-gradient(135deg, #3b0764, #5a0080)',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Confirmed',
      value: confirmed,
      sub: `${confirmRate}% confirm rate`,
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending',
      value: pending,
      sub: 'Awaiting confirmation',
      gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Cancelled',
      value: cancelled,
      sub: total > 0 ? `${Math.round((cancelled / total) * 100)}% of total` : '0%',
      gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{CONFERENCE.name} · Overview</p>
        </div>
        <Link
          href="/admin/registrations"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white px-4 py-2.5 rounded-xl shadow-md transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          View All Registrations
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest leading-tight">{card.label}</p>
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                style={{ background: card.gradient }}
              >
                {card.icon}
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Venue breakdown */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-black text-gray-900">Venue Breakdown</h3>
          </div>
          <BarChart
            items={Object.entries(venueMap).map(([venue, count], i) => ({
              label: venue,
              value: count,
              total,
              color: i === 0
                ? 'linear-gradient(90deg, #3b0764, #db0073)'
                : 'linear-gradient(90deg, #db0073, #f0329a)',
            }))}
          />
          {total > 0 && (
            <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-[var(--color-border)] font-medium">
              {total} total registrations across {Object.keys(venueMap).length} venue(s)
            </p>
          )}
        </div>

        {/* Participant types */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-black text-gray-900">Participant Types</h3>
          </div>
          <BarChart
            items={Object.entries(typeMap).map(([type, count], i) => {
              const colors = [
                'linear-gradient(90deg, #3b0764, #5a0080)',
                'linear-gradient(90deg, #db0073, #f0329a)',
                'linear-gradient(90deg, #5a0080, #db0073)',
                'linear-gradient(90deg, #7c3aed, #5a0080)',
              ]
              return {
                label: type,
                value: count,
                total,
                color: colors[i % colors.length],
              }
            })}
          />
        </div>
      </div>

      {/* Registration status summary */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #5a0080, #3b0764)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-black text-gray-900">Status Overview</h3>
          </div>
          <Link
            href="/admin/registrations?status=pending"
            className="text-xs text-[var(--color-accent)] font-bold hover:underline"
          >
            Review pending →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Pending', count: pending, color: '#d97706', bg: 'bg-amber-50', border: 'border-amber-200', href: '/admin/registrations?status=pending' },
            { label: 'Confirmed', count: confirmed, color: '#059669', bg: 'bg-green-50', border: 'border-green-200', href: '/admin/registrations?status=confirmed' },
            { label: 'Cancelled', count: cancelled, color: '#dc2626', bg: 'bg-red-50', border: 'border-red-200', href: '/admin/registrations?status=cancelled' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${item.bg} border ${item.border} rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 block`}
            >
              <p className="text-2xl sm:text-3xl font-black" style={{ color: item.color }}>{item.count}</p>
              <p className="text-xs font-bold text-gray-600 mt-1">{item.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{total > 0 ? Math.round((item.count / total) * 100) : 0}%</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent registrations */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-black text-gray-900">Recent Registrations</h3>
          </div>
          <Link
            href="/admin/registrations"
            className="text-xs font-black text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
          >
            View all
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {recent.map((reg) => (
            <Link
              key={reg.id}
              href={`/admin/registrations/${reg.id}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--color-surface)] transition-colors group"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
              >
                {reg.firstName[0]}{reg.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {reg.firstName} {reg.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {reg.email} &nbsp;·&nbsp; <span className="capitalize">{reg.participantType}</span>
                  {reg.venue && <> &nbsp;·&nbsp; {reg.venue}</>}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={[
                    'text-xs font-bold px-2.5 py-1 rounded-full border capitalize',
                    reg.status === 'confirmed'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : reg.status === 'cancelled'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200',
                  ].join(' ')}
                >
                  {reg.status}
                </span>
                <span className="text-xs text-gray-400 hidden sm:block whitespace-nowrap">
                  {new Date(reg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
          {recent.length === 0 && (
            <div className="px-5 py-12 text-center">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-400 font-medium">No registrations yet</p>
              <p className="text-xs text-gray-300 mt-1">They&apos;ll appear here as people register.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'All Registrations',
            href: '/admin/registrations',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
          },
          {
            label: 'Pending Only',
            href: '/admin/registrations?status=pending',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: 'Export CSV',
            href: '/api/admin/registrations?format=csv',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            ),
          },
          {
            label: 'View Public Site',
            href: '/',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            ),
          },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="bg-white rounded-xl border border-[var(--color-border)] p-4 flex flex-col items-center gap-2 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {link.icon}
            </div>
            <span className="text-xs font-bold text-gray-700 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
