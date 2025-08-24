'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const next = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={isDark}
      className="rounded-full shadow border border-border p-2 flex items-center justify-center"
    >
      {isDark ? (
        <SunIcon className="w-3 h-3 sm:w-5 sm:h-5" />
      ) : (
        <MoonIcon className="w-3 h-3 sm:w-5 sm:h-5" />
      )}
    </button>
  )
}
