'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import type { State } from 'wagmi'
import Web3ModalProvider from '@/context'
import Web3ModalInit from '@/components/Web3ModalInit'

export default function Providers({
  children,
  initialState
}: {
  children: React.ReactNode
  initialState?: State
}) {
  return (
    <Web3ModalProvider initialState={initialState}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {/* Mount ONCE per app */}
        <Web3ModalInit />
        {children}
        <Toaster />
      </ThemeProvider>
    </Web3ModalProvider>
  )
}
