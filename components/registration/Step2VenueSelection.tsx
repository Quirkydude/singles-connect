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

const venueIcons: Record<string, React.ReactNode> = {
  STATION_CENTRAL: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

const venueTaglines: Record<string, string> = {
  STATION_CENTRAL: 'Station Central, Assin Fosu',
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
        <div className="mb-5">
          <h3 className="text-base font-black text-gray-900 mb-1">Confirm Your Venue</h3>
          <p className="text-sm text-gray-500">
            Confirm you will be attending at the venue below.{' '}
            <span className="text-[var(--color-accent)] font-bold">*</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
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
                  'relative flex flex-col items-center gap-4 rounded-2xl border-2 p-7 text-center',
                  'transition-all duration-200 cursor-pointer group',
                  isSelected
                    ? 'border-[var(--color-primary)] shadow-xl shadow-purple-900/15'
                    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary-light)] hover:shadow-md hover:-translate-y-0.5',
                ].join(' ')}
                style={isSelected ? { background: 'linear-gradient(135deg, rgba(59,7,100,0.04), rgba(219,0,115,0.04))' } : { background: '#fff' }}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                    style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={[
                    'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200',
                    isSelected ? 'text-white shadow-lg shadow-pink-900/30' : 'text-[var(--color-muted)] bg-[var(--color-surface)] group-hover:text-[var(--color-primary)]',
                  ].join(' ')}
                  style={isSelected ? { background: 'linear-gradient(135deg, #3b0764, #db0073)' } : {}}
                >
                  {venueIcons[venue.value] ?? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  )}
                </div>

                {/* Venue name */}
                <div>
                  <p
                    className={[
                      'text-2xl font-black tracking-tight mb-1',
                      isSelected ? 'text-[var(--color-primary)]' : 'text-gray-800',
                    ].join(' ')}
                  >
                    {venue.value}
                  </p>
                  <p className="text-xs text-gray-500 leading-snug font-medium">
                    {venueTaglines[venue.value] ?? venue.description}
                  </p>
                </div>

                {/* Selected indicator bar */}
                {isSelected && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{ background: 'linear-gradient(90deg, #3b0764, #db0073)' }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-600 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}

        {/* Info note */}
        <div
          className="mt-5 rounded-xl border p-3.5 flex items-start gap-3"
          style={{ background: 'rgba(59,7,100,0.04)', borderColor: 'rgba(59,7,100,0.15)' }}
        >
          <svg className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-gray-600 leading-relaxed">
            Confirm your attendance at Station Central, Assin Fosu. Admission to the conference is completely free.
          </p>
        </div>
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
