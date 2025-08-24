'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { reconnect } from '@wagmi/core'
import { config } from '@/config'

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State | undefined
}) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
