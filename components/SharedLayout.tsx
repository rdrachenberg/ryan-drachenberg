// app/layout.tsx (snippet)
import Web3ModalInit from '@/components/Web3ModalInit'
import { WagmiProvider } from 'wagmi'
import { config } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from '@/components/ThemeProvider'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              {/* Initialize Web3Modal once at the root */}
              <Web3ModalInit />
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
