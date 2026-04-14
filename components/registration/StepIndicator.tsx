interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Venue' },
  { number: 3, label: 'Review' },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, idx) => {
        const isDone = step.number < currentStep
        const isActive = step.number === currentStep

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors',
                  isDone
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                    : isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-white'
                    : 'border-gray-300 text-gray-400 bg-white',
                ].join(' ')}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={[
                  'text-xs font-medium whitespace-nowrap',
                  isActive ? 'text-[var(--color-primary)]' : isDone ? 'text-gray-600' : 'text-gray-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={[
                  'h-0.5 w-16 sm:w-24 mb-5 mx-2',
                  isDone ? 'bg-[var(--color-primary)]' : 'bg-gray-200',
                ].join(' ')}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
