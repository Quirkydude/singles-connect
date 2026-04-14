import { InputHTMLAttributes, forwardRef } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer min-h-[44px] py-2">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={[
              'mt-0.5 h-5 w-5 rounded border-[var(--color-border)] shrink-0',
              'text-[var(--color-primary)] accent-[var(--color-primary)]',
              'focus:ring-2 focus:ring-[var(--color-primary)]/50',
              'cursor-pointer',
              className,
            ].join(' ')}
            {...props}
          />
          <span className="text-sm text-gray-700 leading-snug">{label}</span>
        </label>
        {error && <p className="text-xs text-red-600 ml-8">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
