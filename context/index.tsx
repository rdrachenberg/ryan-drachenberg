'use client'

import { ReactNode, useState } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config'

type Props = {
  children: ReactNode
  initialState?: State | undefined
}

export default function Web3ModalProvider({ children, initialState }: Props) {
  // Create once per provider mount (stable across re-renders/HMR)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
