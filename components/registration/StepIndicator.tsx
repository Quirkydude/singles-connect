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
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, idx) => {
        const isDone = step.number < currentStep
        const isActive = step.number === currentStep

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all',
                  isDone
                    ? 'text-white border-transparent'
                    : isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-white shadow-md shadow-[var(--color-primary)]/20'
                    : 'border-gray-200 text-gray-400 bg-white',
                ].join(' ')}
                style={isDone ? { background: 'linear-gradient(135deg, #3b0764, #db0073)', borderColor: 'transparent' } : {}}
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
                  'text-xs font-semibold whitespace-nowrap',
                  isActive ? 'text-[var(--color-primary)]' : isDone ? 'text-gray-500' : 'text-gray-300',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={[
                  'h-0.5 w-10 xs:w-14 sm:w-20 mb-5 mx-1 sm:mx-2 rounded-full transition-all',
                  isDone ? 'opacity-100' : 'bg-gray-200',
                ].join(' ')}
                style={isDone ? { background: 'linear-gradient(90deg, #3b0764, #db0073)' } : {}}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
