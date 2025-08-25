// /config/index.tsx
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, base } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

// ---- WalletConnect / dapp meta ----
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!
if (!projectId) throw new Error('Missing NEXT_PUBLIC_PROJECT_ID')

export const metadata = {
  name: 'Ryan Drachenberg',
  description: 'Personal site & dapp',
  url: 'https://ryan-drachenberg.vercel.app',
  icons: ['https://ryan-drachenberg.vercel.app/icon.png'],
}

export const chains = [mainnet, polygon, optimism, base] as const

// ✅ Pure Wagmi config (server-safe). Web3Modal UI is created client-side.
export const config = createConfig({
  chains,
  connectors: [
    walletConnect({ projectId, showQrModal: false }),
    injected(),
    coinbaseWallet({ appName: metadata.name }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
})

// ---- Payments constants used by CheckoutForm ----
export const CURRENCY = 'usd' as const
export const MIN_AMOUNT = 5.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
