import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, http } from 'wagmi';
import { mainnet, sepolia, bsc, bscTestnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';


// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
const host = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/' : 'https://ryan-drachenberg.vercel.app/'; 

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Ryan Drachenberg Dev',
  description: 'Web3Modal',
  url: host, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

console.log(host);
// Create wagmiConfig
const chains = [mainnet, sepolia, bsc, bscTestnet] as const
export const config = defaultWagmiConfig({
  chains,
  connectors: [
    walletConnect({projectId}),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
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
