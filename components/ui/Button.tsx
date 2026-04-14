import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-transparent',
  secondary: 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white border-transparent',
  outline: 'bg-transparent hover:bg-[var(--color-surface)] text-[var(--color-primary)] border-[var(--color-primary)]',
  ghost: 'bg-transparent hover:bg-[var(--color-surface)] text-gray-700 border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm min-h-[36px]',
  md: 'px-4 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3.5 text-base min-h-[48px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold',
          'transition-all duration-150 cursor-pointer active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
