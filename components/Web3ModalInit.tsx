'use client'
import { useEffect } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config } from '@/config'

declare global { interface Window { __W3M_INIT__?: boolean } }

/**
 * Creates the Web3Modal once, in the browser. Safe to call many times.
 * Returns false when it can't be created (server render or missing project id).
 * Call this before any `useWeb3Modal()` so the hook never runs ahead of the modal.
 */
export function ensureWeb3Modal(): boolean {
  if (typeof window === 'undefined') return false
  if (window.__W3M_INIT__) return true
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  if (!projectId) {
    if (process.env.NODE_ENV !== 'production') console.warn('NEXT_PUBLIC_PROJECT_ID is not set.')
    return false
  }
  const isDark = document.documentElement.classList.contains('dark')
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false,
    themeMode: isDark ? 'dark' : 'light',
  })
  window.__W3M_INIT__ = true
  return true
}

export default function Web3ModalInit() {
  useEffect(() => {
    ensureWeb3Modal()
  }, [])
  return null
}
