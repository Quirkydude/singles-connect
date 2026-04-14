'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { Step1PersonalInfo } from './Step1PersonalInfo'
import { Step2VenueSelection } from './Step2VenueSelection'
import { Step3Review } from './Step3Review'
import { Step1Data, Step2Data } from '@/lib/validations'

const defaultStep1: Step1Data = {
  firstName: '',
  lastName: '',
  middleName: '',
  gender: '' as Step1Data['gender'],
  email: '',
  phone: '',
  participantType: '' as Step1Data['participantType'],
  title: '',
  designation: '',
  isNonCOP: false,
}

const defaultStep2: Step2Data = {
  venue: '' as Step2Data['venue'],
}

export function RegistrationWizard() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [step1Data, setStep1Data] = useState<Step1Data>(defaultStep1)
  const [step2Data, setStep2Data] = useState<Step2Data>(defaultStep2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...step1Data, ...step2Data, region: 'Central', area: 'Assin Fosu' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Registration failed. Please try again.')
        setIsSubmitting(false)
        return
      }
      router.push(`/register/success?ref=${data.id}`)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={step} />
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {step === 1 && (
        <Step1PersonalInfo
          data={step1Data}
          onNext={(data) => { setStep1Data(data); setStep(2) }}
        />
      )}
      {step === 2 && (
        <Step2VenueSelection
          data={step2Data}
          onNext={(data) => { setStep2Data(data); setStep(3) }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3Review
          step1={step1Data}
          step2={step2Data}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
