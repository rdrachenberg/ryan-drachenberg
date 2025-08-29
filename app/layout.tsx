import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SharedLayout from '@/components/SharedLayout'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ryan Drachenberg Developer',
  description: 'Ryan Drachenberg projects'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Server component only:
  const cookie = headers().get('cookie') ?? ''
  const initialState = cookieToInitialState(config, cookie) || undefined

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers initialState={initialState}>
          <SharedLayout>{children}</SharedLayout>
        </Providers>
      </body>
    </html>
  )
}
