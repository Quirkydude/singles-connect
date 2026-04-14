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

  const placeholderUnits = [
    { value: '--', label: 'DAYS' },
    { value: '--', label: 'HRS' },
    { value: '--', label: 'MIN' },
    { value: '--', label: 'SEC' },
  ]

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {placeholderUnits.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1 sm:gap-2">
            <CountdownUnit value={u.value} label={u.label} />
            {i < placeholderUnits.length - 1 && <Colon />}
          </div>
        ))}
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HRS' },
    { value: timeLeft.minutes, label: 'MIN' },
    { value: timeLeft.seconds, label: 'SEC' },
  ]

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1 sm:gap-2">
          <CountdownUnit value={String(u.value).padStart(2, '0')} label={u.label} />
          {i < units.length - 1 && <Colon />}
        </div>
      ))}
    </div>
  )
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center shadow-inner">
        <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
          {value}
        </span>
      </div>
      <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-white/50 uppercase">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span className="text-white/40 font-black text-lg sm:text-2xl leading-none mb-4 select-none">:</span>
  )
}
