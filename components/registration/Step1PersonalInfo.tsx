'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { GENDERS, PARTICIPANT_TYPES, TITLES, DESIGNATIONS } from '@/lib/constants'
import { step1Schema, Step1Data } from '@/lib/validations'

interface Step1Props {
  data: Step1Data
  onNext: (data: Step1Data) => void
}

export function Step1PersonalInfo({ data, onNext }: Step1Props) {
  const [form, setForm] = useState<Step1Data>(data)
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({})

  function set<K extends keyof Step1Data>(key: K, value: Step1Data[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = step1Schema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Step1Data, string>> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof Step1Data
        fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    onNext(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          required
          value={form.firstName}
          onChange={(e) => set('firstName', e.target.value)}
          placeholder="Enter your first name"
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          required
          value={form.lastName}
          onChange={(e) => set('lastName', e.target.value)}
          placeholder="Enter your last name"
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Middle Name"
          value={form.middleName ?? ''}
          onChange={(e) => set('middleName', e.target.value)}
          placeholder="Enter your middle name"
        />
        <Select
          label="Gender"
          required
          value={form.gender}
          onChange={(e) => set('gender', e.target.value as Step1Data['gender'])}
          options={GENDERS}
          placeholder="Select gender"
          error={errors.gender}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="Enter your email"
          error={errors.email}
        />
        <Input
          label="Phone Number"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="e.g. 0244 123 456"
          error={errors.phone}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Participant Type"
          required
          value={form.participantType}
          onChange={(e) => set('participantType', e.target.value as Step1Data['participantType'])}
          options={PARTICIPANT_TYPES}
          placeholder="Select Participant Type"
          error={errors.participantType}
        />
        <Select
          label="Title"
          value={form.title ?? ''}
          onChange={(e) => set('title', e.target.value)}
          options={TITLES}
          placeholder="Select Title"
        />
      </div>

      <Select
        label="Designation"
        value={form.designation ?? ''}
        onChange={(e) => set('designation', e.target.value)}
        options={DESIGNATIONS}
        placeholder="Select Designation"
      />

      <Checkbox
        label="I am not a member of the Church of Pentecost"
        checked={form.isNonCOP}
        onChange={(e) => set('isNonCOP', e.target.checked)}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg">
          Next: Venue Selection
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </form>
  )
}
