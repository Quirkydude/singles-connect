'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { GENDERS, PARTICIPANT_TYPES, TITLES, DESIGNATIONS, VENUES, CONFERENCE } from '@/lib/constants'
import { Step1Data, Step2Data } from '@/lib/validations'

interface Step3Props {
  step1: Step1Data
  step2: Step2Data
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

function fieldLabel(value: string | undefined, options: { value: string; label: string }[]): string {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}

export function Step3Review({ step1, step2, onSubmit, onBack, isSubmitting }: Step3Props) {
  const venue = VENUES.find((v) => v.value === step2.venue)

  return (
    <div className="space-y-6">
      <Card padding="md" className="border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-4">Personal Information</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div><dt className="text-gray-500">First Name</dt><dd className="font-medium text-gray-900">{step1.firstName}</dd></div>
          <div><dt className="text-gray-500">Last Name</dt><dd className="font-medium text-gray-900">{step1.lastName}</dd></div>
          {step1.middleName && <div><dt className="text-gray-500">Middle Name</dt><dd className="font-medium text-gray-900">{step1.middleName}</dd></div>}
          <div><dt className="text-gray-500">Gender</dt><dd className="font-medium text-gray-900">{fieldLabel(step1.gender, GENDERS)}</dd></div>
          <div><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-900">{step1.email}</dd></div>
          <div><dt className="text-gray-500">Phone</dt><dd className="font-medium text-gray-900">{step1.phone}</dd></div>
          <div><dt className="text-gray-500">Participant Type</dt><dd className="font-medium text-gray-900">{fieldLabel(step1.participantType, PARTICIPANT_TYPES)}</dd></div>
          {step1.title && <div><dt className="text-gray-500">Title</dt><dd className="font-medium text-gray-900">{fieldLabel(step1.title, TITLES)}</dd></div>}
          {step1.designation && <div><dt className="text-gray-500">Designation</dt><dd className="font-medium text-gray-900">{fieldLabel(step1.designation, DESIGNATIONS)}</dd></div>}
          <div><dt className="text-gray-500">Region</dt><dd className="font-medium text-gray-900">Central</dd></div>
          <div><dt className="text-gray-500">Area</dt><dd className="font-medium text-gray-900">Assin Fosu</dd></div>
          <div className="sm:col-span-2"><dt className="text-gray-500">Church Membership</dt><dd className="font-medium text-gray-900">{step1.isNonCOP ? 'Not a Church of Pentecost member' : 'Church of Pentecost member'}</dd></div>
        </dl>
      </Card>

      <Card padding="md" className="border-[var(--color-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-4">Venue Selection</h3>
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
          <p className="text-gray-500">No venue selected</p>
        )}
      </Card>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you confirm your registration for {CONFERENCE.name}. You will receive a confirmation reference upon admin approval.
      </p>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" size="lg" onClick={onBack} disabled={isSubmitting}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button type="button" size="lg" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Registration
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
