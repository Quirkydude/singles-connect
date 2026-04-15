interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  {
    number: 1,
    label: 'Personal Info',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: 2,
    label: 'Venue',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: 3,
    label: 'Review',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressPct = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="mb-8 sm:mb-10">
      {/* Progress bar + step circles */}
      <div className="relative flex items-center justify-between mb-6 px-5 sm:px-8">
        {/* Background track */}
        <div className="absolute left-5 right-5 sm:left-8 sm:right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 rounded-full" />

        {/* Filled progress */}
        <div
          className="absolute left-5 sm:left-8 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `calc(${progressPct}% * (100% - 40px) / 100)`,
            background: 'linear-gradient(90deg, #3b0764, #db0073)',
            maxWidth: `calc(100% - 40px)`,
          }}
        />

        {/* Step circles */}
        {steps.map((step) => {
          const isDone = step.number < currentStep
          const isActive = step.number === currentStep

          return (
            <div key={step.number} className="relative flex flex-col items-center z-10">
              {/* Pulse ring for active step */}
              {isActive && (
                <div
                  className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full animate-ping opacity-15"
                  style={{ background: 'linear-gradient(135deg, #3b0764, #db0073)' }}
                />
              )}
              <div
                className={[
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 relative',
                  isDone
                    ? 'border-transparent shadow-lg shadow-pink-900/30'
                    : isActive
                    ? 'border-[var(--color-primary)] bg-white shadow-lg shadow-purple-900/25 scale-110'
                    : 'border-gray-200 bg-white text-gray-300',
                ].join(' ')}
                style={isDone ? { background: 'linear-gradient(135deg, #3b0764, #db0073)' } : {}}
              >
                {isDone ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className={isActive ? 'text-[var(--color-primary)]' : 'text-gray-300'}>
                    {step.icon}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Labels row */}
      <div className="flex items-start justify-between px-0">
        {steps.map((step) => {
          const isDone = step.number < currentStep
          const isActive = step.number === currentStep

          return (
            <div key={step.number} className="flex flex-col items-center text-center" style={{ width: '33.33%' }}>
              <span
                className={[
                  'text-xs font-bold transition-colors leading-tight',
                  isActive ? 'text-[var(--color-primary)]' : isDone ? 'text-gray-500' : 'text-gray-300',
                ].join(' ')}
              >
                {step.label}
              </span>
              {isActive && (
                <span className="text-[10px] text-[var(--color-accent)] font-bold mt-0.5">In progress</span>
              )}
              {isDone && (
                <span className="text-[10px] text-green-600 font-semibold mt-0.5">Complete</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
