// /components/Web3ModalInit.tsx
'use client'

import { useEffect } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config } from '@/config'
import { useTheme } from 'next-themes'

declare global {
  interface Window {
    __W3M_INIT__?: boolean
  }
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!

export default function Web3ModalInit() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.__W3M_INIT__) return
    if (!projectId) return

    const mode: 'light' | 'dark' | undefined =
      resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : undefined

    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      ...(mode ? { themeMode: mode } : {}),
      allowUnsupportedChain: true,
    })

    window.__W3M_INIT__ = true
    // initialize once only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
