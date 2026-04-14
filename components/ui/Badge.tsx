interface BadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled' | string
  className?: string
}

const statusClasses: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

export function Badge({ status, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
        statusClasses[status] ?? 'bg-gray-100 text-gray-800 border-gray-200',
        className,
      ].join(' ')}
    >
      {status}
    </span>
  )
}
