'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface ConfirmButtonProps {
  id: string
  currentStatus: string
}

export function ConfirmButton({ id, currentStatus }: ConfirmButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function updateStatus(status: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Update failed')
        setLoading(false)
        return
      }
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {currentStatus !== 'confirmed' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => updateStatus('confirmed')}
            disabled={loading}
          >
            {loading ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            Confirm
          </Button>
        )}
        {currentStatus !== 'cancelled' && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => updateStatus('cancelled')}
            disabled={loading}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </Button>
        )}
        {currentStatus !== 'pending' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatus('pending')}
            disabled={loading}
          >
            Reset to Pending
          </Button>
        )}
      </div>
    </div>
  )
}
