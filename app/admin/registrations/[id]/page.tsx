import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import Link from 'next/link'
import { GENDERS, PARTICIPANT_TYPES, TITLES, DESIGNATIONS, VENUES } from '@/lib/constants'

export const metadata = {
  title: 'Registration Detail — Admin',
}

function fieldLabel(value: string | undefined | null, options: { value: string; label: string }[]) {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function RegistrationDetailPage(props: Props) {
  await requireAdmin()
  const { id } = await props.params

  const reg = await prisma.registration.findUnique({ where: { id } })
  if (!reg) notFound()

  const venue = VENUES.find((v) => v.value === reg.venue)

  const personalFields = [
    { label: 'First Name', value: reg.firstName },
    { label: 'Last Name', value: reg.lastName },
    ...(reg.middleName ? [{ label: 'Middle Name', value: reg.middleName }] : []),
    { label: 'Gender', value: fieldLabel(reg.gender, GENDERS) },
    { label: 'Email', value: reg.email },
    { label: 'Phone', value: reg.phone },
    { label: 'Participant Type', value: fieldLabel(reg.participantType, PARTICIPANT_TYPES) },
    ...(reg.title ? [{ label: 'Title', value: fieldLabel(reg.title, TITLES) }] : []),
    ...(reg.designation ? [{ label: 'Designation', value: fieldLabel(reg.designation, DESIGNATIONS) }] : []),
    { label: 'Region', value: reg.region },
    { label: 'Area', value: reg.area },
    {
      label: 'Church Membership',
      value: reg.isNonCOP ? 'Not a Church of Pentecost member' : 'Church of Pentecost member',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb + title */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href="/admin/registrations"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors font-semibold"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Registrations
        </Link>
        <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <h1 className="text-lg font-black text-gray-900">{reg.firstName} {reg.lastName}</h1>
        <Badge status={reg.status} />
      </div>

      {/* Confirmation ref banner */}
      {reg.confirmationRef && (
        <div
          className="rounded-2xl p-4 flex items-center gap-4 border"
          style={{ background: 'rgba(5,150,105,0.05)', borderColor: 'rgba(5,150,105,0.2)' }}
        >
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">Confirmation Reference</p>
            <p className="font-mono text-base font-black text-green-800">{reg.confirmationRef}</p>
          </div>
        </div>
      )}

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        {/* Header strip */}
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #1a0030, #3b0764)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 border-2 border-white/20"
            style={{ background: 'linear-gradient(135deg, #db0073, #f0329a)' }}
          >
            {reg.firstName[0]}{reg.lastName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-xl leading-tight">{reg.firstName} {reg.lastName}</p>
            <p className="text-white/60 text-sm mt-0.5 font-medium">
              {fieldLabel(reg.participantType, PARTICIPANT_TYPES)} &nbsp;·&nbsp; {reg.area}
            </p>
            <p className="text-white/40 text-xs mt-0.5 font-mono">{reg.id.slice(0, 24)}…</p>
          </div>
        </div>

        {/* Personal info grid */}
        <div className="p-5 sm:p-6">
          <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-4">Personal Information</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {personalFields.map((f) => (
              <div key={f.label} className={f.label === 'Church Membership' ? 'sm:col-span-2' : ''}>
                <dt className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{f.label}</dt>
                <dd className="font-semibold text-gray-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Venue card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 shadow-sm">
        <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-4">Venue Selection</p>
        {venue ? (
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md"
              style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
            >
              {venue.value[0]}
            </div>
            <div>
              <p className="font-black text-gray-900 text-base">{venue.label}</p>
              <p className="text-sm text-gray-500 font-medium">{venue.description}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No venue selected</p>
        )}
      </div>

      {/* Registration status & actions */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 shadow-sm">
        <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-4">Status & Actions</p>

        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[var(--color-border)]">
          <Badge status={reg.status} />
          <span className="text-sm text-gray-500 font-medium">
            Registered on{' '}
            <strong className="text-gray-700">
              {new Date(reg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </strong>
          </span>
        </div>

        {reg.notes && (
          <div className="mb-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4">
            <p className="text-[10px] font-black text-[var(--color-muted)] uppercase tracking-widest mb-1.5">Notes</p>
            <p className="text-sm text-gray-700 leading-relaxed">{reg.notes}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-bold text-gray-500 mb-3">Update registration status:</p>
          <ConfirmButton id={reg.id} currentStatus={reg.status} />
        </div>
      </div>
    </div>
  )
}
