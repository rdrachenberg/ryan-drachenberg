'use client'

import { useEffect } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config, projectId } from '@/config'

const KEY = '__WEB3MODAL_INITED__'

export default function Web3ModalInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const g = globalThis as any
    if (!projectId) return
    if (g[KEY]) return

    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: true,
      enableOnramp: true,
    })

    g[KEY] = true
  }, [])

  return null
}
