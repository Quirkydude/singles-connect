'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { VENUES } from '@/lib/constants'
import { step2Schema, Step2Data } from '@/lib/validations'

interface Step2Props {
  data: Step2Data
  onNext: (data: Step2Data) => void
  onBack: () => void
}

export function Step2VenueSelection({ data, onNext, onBack }: Step2Props) {
  const [selected, setSelected] = useState<string>(data.venue ?? '')
  const [error, setError] = useState<string>('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = step2Schema.safeParse({ venue: selected })
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Please select a venue')
      return
    }
    onNext(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Which venue will you be attending from? <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VENUES.map((venue) => {
            const isSelected = selected === venue.value
            return (
              <button
                key={venue.value}
                type="button"
                onClick={() => {
                  setSelected(venue.value)
                  setError('')
                }}
                className={[
                  'relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-left',
                  'transition-all duration-150 cursor-pointer',
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-surface)] shadow-sm'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary-light)] hover:bg-[var(--color-surface)]',
                ].join(' ')}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div
                  className={[
                    'text-2xl font-bold',
                    isSelected ? 'text-[var(--color-primary)]' : 'text-gray-700',
                  ].join(' ')}
                >
                  {venue.label}
                </div>
                <p className="text-xs text-center text-gray-500">{venue.description}</p>
              </button>
            )
          })}
        </div>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button type="submit" size="lg">
          Review Registration
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </form>
  )
}
