'use client';
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { parseEther, Address } from 'viem';
import { abi } from '../../abi/abi';
import {
    AlertTriangleIcon, ArrowLeftIcon, CheckCircle2Icon, CopyCheckIcon, CopyIcon,
    ExternalLinkIcon, FileTextIcon, HelpCircleIcon, Loader2Icon, ShieldCheckIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Withdrawal from '../components/Withdrawal';
import ContractBalance from '../components/ContractBalance';
import ConnectButton from '@/components/ConnectButton';

type Network = {
    label: string;
    symbol: 'ETH' | 'BNB';
    icon: string;
    contract: Address;
    explorer: string;
    testnet: boolean;
};

const MAINNET_CONTRACT = '0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9' as Address;
const TESTNET_CONTRACT = '0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E' as Address;

const NETWORKS: Record<number, Network> = {
    1: { label: 'Ethereum', symbol: 'ETH', icon: '/eth.png', contract: MAINNET_CONTRACT, explorer: 'https://etherscan.io/tx/', testnet: false },
    56: { label: 'BNB Smart Chain', symbol: 'BNB', icon: '/bsc-nobg.png', contract: MAINNET_CONTRACT, explorer: 'https://bscscan.com/tx/', testnet: false },
    11155111: { label: 'Sepolia', symbol: 'ETH', icon: '/eth.png', contract: TESTNET_CONTRACT, explorer: 'https://sepolia.etherscan.io/tx/', testnet: true },
    97: { label: 'BSC Testnet', symbol: 'BNB', icon: '/bsc-nobg.png', contract: TESTNET_CONTRACT, explorer: 'https://testnet.bscscan.com/tx/', testnet: true },
};

const QUICK_AMOUNTS = ['0.005', '0.01', '0.05', '0.1'];

const STEPS = [
    { title: 'Connect your wallet', body: 'MetaMask, Coinbase Wallet, or any WalletConnect wallet.' },
    { title: 'Pick an amount', body: 'Send ETH or BNB on mainnet, or try it out on a testnet first.' },
    { title: 'Confirm in your wallet', body: 'Funds go straight to the verified Donate contract. No middleman.' },
];

const cardClass = 'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/10 dark:bg-gray-800/50 dark:ring-white/10 sm:p-8';

function isValidAmount(value: string) {
    if (!value || Number.isNaN(Number(value)) || Number(value) <= 0) return false;
    try {
        parseEther(value);
        return true;
    } catch {
        return false;
    }
}

export default function CryptoPage() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const network: Network | undefined = NETWORKS[chainId];

    const [valueToSend, setValueToSend] = useState('');
    const [copied, setCopied] = useState(false);
    const emailedHash = useRef<string | null>(null);

    const { data: hash, writeContract, isPending, error, reset } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const amountOk = isValidAmount(valueToSend);
    const canSubmit = !!network && amountOk && !isPending && !isConfirming;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!network || !amountOk) return;
        writeContract({
            address: network.contract,
            abi,
            functionName: 'deposit',
            value: parseEther(valueToSend),
        });
    }

    function handleCopy(text: string) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleSendAnother() {
        reset();
        setValueToSend('');
    }

    // Notify me by email once per transaction hash.
    useEffect(() => {
        if (!hash || !network || emailedHash.current === hash) return;
        emailedHash.current = hash;
        fetch('/api/email/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                to: 'ryandrachenberg@gmail.com',
                from: 'tssinvestments@gmail.com',
                subject: 'You received a donation',
                text: `You received a donation! \nHere is a link to the transaction: ${network.explorer}${hash}`,
                html: `<h1>You received a donation!</h1><h2>${network.explorer}${hash}</h2>`,
            }),
        }).catch(err => console.error('Donation email failed', err));
    }, [hash, network]);

    useWatchContractEvent({
        address: network?.contract,
        abi,
        eventName: 'PaymentReceived',
        enabled: isConnected && !!network,
        onLogs(logs) {
            if (logs.length) toast.success('Tip received on-chain. Thank you!');
        },
    });

    return (
        <div className='mx-auto w-full max-w-xl pb-16'>
            <Link
                href='/tip'
                className='inline-flex items-center text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400'
            >
                <ArrowLeftIcon className='mr-1 h-4 w-4' aria-hidden='true' />
                All tip options
            </Link>

            <header className='mt-6'>
                <h1 className='text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl'>
                    Tip with crypto
                </h1>
                <p className='mt-4 text-base text-zinc-600 dark:text-zinc-400'>
                    Send ETH or BNB directly to my Donate smart contract, verified on Etherscan and BscScan.
                </p>
            </header>

            <div className='mt-10'>
                {!isConnected ? (
                    <div className={cardClass}>
                        <ol className='space-y-5'>
                            {STEPS.map((step, i) => (
                                <li key={step.title} className='flex gap-4'>
                                    <span className='flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 ring-1 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400'>
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className='text-sm font-semibold text-zinc-800 dark:text-zinc-100'>{step.title}</p>
                                        <p className='mt-0.5 text-sm text-zinc-600 dark:text-zinc-400'>{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className='mt-8'>
                            <ConnectButton />
                        </div>
                        <div className='mt-6 flex items-center justify-center gap-6 text-sm'>
                            <Link href='/instructions' className='inline-flex items-center gap-1 text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400'>
                                <HelpCircleIcon className='h-4 w-4' aria-hidden='true' /> How it works
                            </Link>
                            <Link href='/contracts' className='inline-flex items-center gap-1 text-zinc-600 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400'>
                                <FileTextIcon className='h-4 w-4' aria-hidden='true' /> View contracts
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={cardClass}>
                        {/* Network + wallet */}
                        <div className='flex flex-wrap items-center justify-between gap-3'>
                            {network ? (
                                <span className='inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-gray-700/60 dark:text-zinc-200'>
                                    <Image src={network.icon} width={18} height={18} alt='' />
                                    {network.label}
                                    {network.testnet && (
                                        <span className='rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'>
                                            Testnet
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <span className='inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'>
                                    <AlertTriangleIcon className='h-4 w-4' aria-hidden='true' /> Unsupported network
                                </span>
                            )}
                            <ConnectButton />
                        </div>

                        {!network && (
                            <p className='mt-4 text-sm text-zinc-600 dark:text-zinc-400'>
                                Switch your wallet to Ethereum, BNB Smart Chain, Sepolia, or BSC Testnet to continue.
                            </p>
                        )}

                        {network && isConfirmed && hash ? (
                            /* Success */
                            <div className='mt-8 text-center'>
                                <CheckCircle2Icon className='mx-auto h-14 w-14 text-green-500' aria-hidden='true' />
                                <h2 className='mt-4 text-xl font-semibold text-zinc-800 dark:text-zinc-100'>Thank you!</h2>
                                <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
                                    Your tip of {valueToSend} {network.symbol} is confirmed on {network.label}.
                                </p>
                                <div className='mt-6 flex items-center gap-2 rounded-xl bg-zinc-50 p-3 text-left ring-1 ring-zinc-900/10 dark:bg-gray-900/60 dark:ring-white/10'>
                                    <span className='min-w-0 flex-1 truncate font-mono text-xs text-zinc-700 dark:text-zinc-300' title={hash}>{hash}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleCopy(hash)}
                                        className='rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-800 dark:hover:bg-gray-700 dark:hover:text-white'
                                        aria-label={copied ? 'Copied' : 'Copy transaction hash'}
                                    >
                                        {copied ? <CopyCheckIcon className='h-4 w-4 text-green-500' /> : <CopyIcon className='h-4 w-4' />}
                                    </button>
                                </div>
                                <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                                    <Link
                                        href={`${network.explorer}${hash}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500'
                                    >
                                        View on explorer <ExternalLinkIcon className='h-4 w-4' aria-hidden='true' />
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={handleSendAnother}
                                        className='flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-900/10 transition hover:bg-zinc-100 dark:text-zinc-200 dark:ring-white/10 dark:hover:bg-gray-700/60'
                                    >
                                        Send another
                                    </button>
                                </div>
                            </div>
                        ) : network && (isPending || isConfirming) ? (
                            /* In-flight */
                            <div className='mt-10 flex flex-col items-center text-center'>
                                <Loader2Icon className='h-10 w-10 animate-spin text-blue-500' aria-hidden='true' />
                                <p className='mt-4 font-semibold text-zinc-800 dark:text-zinc-100'>
                                    {isPending ? 'Confirm the transaction in your wallet…' : 'Waiting for network confirmation…'}
                                </p>
                                {hash && (
                                    <Link
                                        href={`${network.explorer}${hash}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400'
                                    >
                                        Track it on the explorer <ExternalLinkIcon className='h-3.5 w-3.5' aria-hidden='true' />
                                    </Link>
                                )}
                            </div>
                        ) : network ? (
                            /* Form */
                            <form onSubmit={handleSubmit} className='mt-8'>
                                <ContractBalance contract={network.contract} symbol={network.symbol} />

                                <label htmlFor='crypto-amount' className='mt-6 block text-sm font-semibold text-zinc-800 dark:text-zinc-100'>
                                    Amount
                                </label>
                                <div className='mt-2 flex items-center rounded-xl bg-zinc-50 ring-1 ring-zinc-900/10 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-900/60 dark:ring-white/10'>
                                    <input
                                        id='crypto-amount'
                                        type='text'
                                        inputMode='decimal'
                                        autoComplete='off'
                                        placeholder='0.00'
                                        value={valueToSend}
                                        onChange={e => setValueToSend(e.target.value.trim())}
                                        className='w-full bg-transparent py-3 pl-4 text-lg font-semibold text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white'
                                    />
                                    <span className='flex items-center gap-1.5 pr-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300'>
                                        <Image src={network.icon} width={18} height={18} alt='' />
                                        {network.symbol}
                                    </span>
                                </div>
                                <div className='mt-3 grid grid-cols-4 gap-2'>
                                    {QUICK_AMOUNTS.map(q => (
                                        <button
                                            key={q}
                                            type='button'
                                            onClick={() => setValueToSend(q)}
                                            aria-pressed={valueToSend === q}
                                            className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${
                                                valueToSend === q
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-gray-700/60 dark:text-zinc-200 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                                {valueToSend && !amountOk && (
                                    <p className='mt-2 text-xs text-rose-600 dark:text-rose-400'>Enter a positive number, like 0.01.</p>
                                )}

                                {error && (
                                    <p className='mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300'>
                                        {(error as { shortMessage?: string }).shortMessage ?? error.message}
                                    </p>
                                )}

                                <button
                                    type='submit'
                                    disabled={!canSubmit}
                                    className='mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60'
                                >
                                    {amountOk ? `Send ${valueToSend} ${network.symbol}` : 'Enter an amount'}
                                </button>

                                <p className='mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500 dark:text-zinc-500'>
                                    <ShieldCheckIcon className='h-3.5 w-3.5 flex-none' aria-hidden='true' />
                                    Sent to{' '}
                                    <Link href='/contracts' className='font-mono underline decoration-dotted hover:text-blue-600'>
                                        {network.contract.slice(0, 6)}…{network.contract.slice(-4)}
                                    </Link>
                                </p>

                                <Withdrawal contract={network.contract} />
                            </form>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
