// /config/index.tsx
import { createConfig, http, cookieStorage, createStorage } from 'wagmi'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'
import { mainnet, sepolia, bsc, bscTestnet } from 'wagmi/chains'

// Public values
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? ''
export const host =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ryan-drachenberg.vercel.app'

export const metadata = {
  name: 'Ryan Drachenberg Dev',
  description: 'Web3Modal',
  url: host, // must match your domain/origin
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
} as const

// Keep Web3Modal creation *out* of this file.
// This file must remain server-safe (no '@web3modal/*' imports).
export const chains = [mainnet, sepolia, bsc, bscTestnet] as const

export const config = createConfig({
  chains,
  connectors: [
    // No modal here; the modal is created client-side only.
    walletConnect({ projectId, showQrModal: false }),
    injected(),
    coinbaseWallet({ appName: metadata.name }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
})

// Payments constants
export const CURRENCY = 'usd'
export const MIN_AMOUNT = 5.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0
