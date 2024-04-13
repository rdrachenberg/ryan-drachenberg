import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, bsc, bscTestnet } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Ryan Drachenberg Dev',
  description: 'Web3Modal',
  url: 'http://localhost:3000/' || 'https://ryan-drachenberg.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia, bsc, bscTestnet] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableEmail: true,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  // ...wagmiOptions // Optional - Override createConfig parameters
})

export const CURRENCY = "usd";
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 5.0;
export const MAX_AMOUNT = 5000.0;
export const AMOUNT_STEP = 5.0;
