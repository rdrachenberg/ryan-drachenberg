'use client'
import { useEffect } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config } from '@/config'

declare global { interface Window { __W3M_INIT__?: boolean } }

export default function Web3ModalInit() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__W3M_INIT__) return
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
    if (!projectId) {
      if (process.env.NODE_ENV !== 'production') console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set.')
      return
    }
    const isDark = document.documentElement.classList.contains('dark')
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: false,
      themeMode: isDark ? 'dark' : 'light'
    })
    window.__W3M_INIT__ = true
  }, [])
  return null
}
