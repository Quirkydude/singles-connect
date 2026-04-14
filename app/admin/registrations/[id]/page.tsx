import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { Card } from '@/components/ui/Card'
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/registrations"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{reg.firstName} {reg.lastName}</h1>
        <Badge status={reg.status} />
      </div>

      {reg.confirmationRef && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 flex items-center gap-3">
          <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-xs text-green-700">Confirmation Reference</p>
            <p className="font-mono text-sm font-bold text-green-800">{reg.confirmationRef}</p>
          </div>
        </div>
      )}

      <Card padding="md">
        <h2 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-4">Personal Information</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div><dt className="text-gray-500 text-xs">First Name</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.firstName}</dd></div>
          <div><dt className="text-gray-500 text-xs">Last Name</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.lastName}</dd></div>
          {reg.middleName && <div><dt className="text-gray-500 text-xs">Middle Name</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.middleName}</dd></div>}
          <div><dt className="text-gray-500 text-xs">Gender</dt><dd className="font-medium text-gray-900 mt-0.5">{fieldLabel(reg.gender, GENDERS)}</dd></div>
          <div><dt className="text-gray-500 text-xs">Email</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.email}</dd></div>
          <div><dt className="text-gray-500 text-xs">Phone</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.phone}</dd></div>
          <div><dt className="text-gray-500 text-xs">Participant Type</dt><dd className="font-medium text-gray-900 mt-0.5">{fieldLabel(reg.participantType, PARTICIPANT_TYPES)}</dd></div>
          {reg.title && <div><dt className="text-gray-500 text-xs">Title</dt><dd className="font-medium text-gray-900 mt-0.5">{fieldLabel(reg.title, TITLES)}</dd></div>}
          {reg.designation && <div><dt className="text-gray-500 text-xs">Designation</dt><dd className="font-medium text-gray-900 mt-0.5">{fieldLabel(reg.designation, DESIGNATIONS)}</dd></div>}
          <div><dt className="text-gray-500 text-xs">Region</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.region}</dd></div>
          <div><dt className="text-gray-500 text-xs">Area</dt><dd className="font-medium text-gray-900 mt-0.5">{reg.area}</dd></div>
          <div className="sm:col-span-2">
            <dt className="text-gray-500 text-xs">Church Membership</dt>
            <dd className="font-medium text-gray-900 mt-0.5">
              {reg.isNonCOP ? 'Not a Church of Pentecost member' : 'Church of Pentecost member'}
            </dd>
          </div>
        </dl>
      </Card>

      <Card padding="md">
        <h2 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-4">Venue</h2>
        {venue ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-primary)]">{venue.value}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{venue.label}</p>
              <p className="text-xs text-gray-500">{venue.description}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No venue selected</p>
        )}
      </Card>

      <Card padding="md">
        <h2 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-4">Registration Status</h2>
        <div className="flex items-center gap-3 mb-5">
          <Badge status={reg.status} />
          <span className="text-xs text-gray-500">
            Registered on {new Date(reg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        {reg.notes && (
          <div className="mb-5 text-sm text-gray-700 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-3">
            <p className="text-xs text-gray-500 mb-1">Notes</p>
            <p>{reg.notes}</p>
          </div>
        )}
        <ConfirmButton id={reg.id} currentStatus={reg.status} />
      </Card>
    </div>
  )
}
