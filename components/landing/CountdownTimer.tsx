'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (!mounted) {
    const placeholderUnits = [
      { value: '--', label: 'DAYS' },
      { value: '--', label: 'HOURS' },
      { value: '--', label: 'MINS' },
      { value: '--', label: 'SECS' },
    ]
    return (
      <div className="flex gap-3 sm:gap-4">
        {placeholderUnits.map((u) => (
          <CountdownUnit key={u.label} value={u.value} label={u.label} />
        ))}
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINS' },
    { value: timeLeft.seconds, label: 'SECS' },
  ]

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((u) => (
        <CountdownUnit key={u.label} value={String(u.value).padStart(2, '0')} label={u.label} />
      ))}
    </div>
  )
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center shadow-inner">
        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
          {value}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] font-semibold tracking-widest text-white/60 uppercase">
        {label}
      </span>
    </div>
  )
}
