'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

// Rendered on the server so the nav never shifts on load. Which icon shows is
// decided by the `dark` class next-themes sets on <html> before first paint,
// so there's no need to wait for mount to read the theme.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="rounded-full shadow border border-border p-2 flex items-center justify-center"
    >
      <SunIcon className="w-3 h-3 sm:w-5 sm:h-5 hidden dark:block" />
      <MoonIcon className="w-3 h-3 sm:w-5 sm:h-5 block dark:hidden" />
    </button>
  )
}
