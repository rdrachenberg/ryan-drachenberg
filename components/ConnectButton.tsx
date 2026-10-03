'use client'
import { useEffect, useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { WalletIcon } from 'lucide-react'
import { ensureWeb3Modal } from './Web3ModalInit'

const primaryButton =
    'inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60'

function WalletButton() {
    const { isConnected } = useAccount()
    const { open } = useWeb3Modal()

    if (isConnected) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore web3modal custom element
        return <w3m-button balance='show' />
    }

    return (
        <button type='button' onClick={() => open()} className={primaryButton}>
            <WalletIcon className='h-5 w-5' aria-hidden='true' />
            Connect wallet
        </button>
    )
}

export default function ConnectButton() {
    // Web3Modal only exists in the browser, so render it after mount.
    const [ready, setReady] = useState<boolean | null>(null)

    useEffect(() => {
        setReady(ensureWeb3Modal())
    }, [])

    if (ready === null) {
        return (
            <button type='button' disabled className={primaryButton}>
                <WalletIcon className='h-5 w-5' aria-hidden='true' />
                Connect wallet
            </button>
        )
    }

    if (!ready) {
        return (
            <button type='button' disabled className={primaryButton}>
                Wallet connection unavailable
            </button>
        )
    }

    return <WalletButton />
}
