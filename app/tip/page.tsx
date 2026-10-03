import { ArrowRightIcon, CreditCardIcon, LockIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tip | Ryan Drachenberg',
    description: 'Support my writing and open-source projects with a card or crypto tip.',
}

const paymentOptions = [
    {
        icon: CreditCardIcon,
        title: 'Credit or debit card',
        description: 'Quick and familiar. Pick an amount and check out securely with Stripe. No account needed.',
        meta: 'Visa · Mastercard · Amex · Apple Pay · Google Pay',
        href: '/fiat',
        cta: 'Tip with card',
    },
    {
        icon: WalletIcon,
        title: 'Crypto',
        description: 'Send ETH or BNB straight from your wallet to my verified Donate smart contract.',
        meta: 'Ethereum · BNB Smart Chain · testnets supported',
        href: '/crypto',
        cta: 'Tip with crypto',
    },
]

export default function TipPage() {
    return (
        <div className='mx-auto w-full max-w-3xl pb-16'>
            <header className='max-w-2xl'>
                <h1 className='text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                    Enjoying the content? Leave a tip.
                </h1>
                <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
                    Everything here is written and built in my spare time. If a post or project
                    helped you out, a tip of any size keeps the coffee flowing and the code shipping.
                    Choose whichever way works best for you.
                </p>
            </header>

            <ul className='mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2'>
                {paymentOptions.map(option => (
                    <li key={option.href}>
                        <Link
                            href={option.href}
                            className='group relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-2 hover:ring-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-800/50 dark:ring-white/10 dark:hover:ring-blue-500'
                        >
                            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-500/20 transition group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400'>
                                <option.icon className='h-6 w-6' aria-hidden='true' />
                            </span>
                            <h2 className='mt-5 text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>
                                {option.title}
                            </h2>
                            <p className='mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400'>
                                {option.description}
                            </p>
                            <p className='mt-4 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500'>
                                {option.meta}
                            </p>
                            <span className='mt-6 inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400'>
                                {option.cta}
                                <ArrowRightIcon className='ml-1 h-4 w-4 transition group-hover:translate-x-1' aria-hidden='true' />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <p className='mt-10 flex items-center justify-center gap-2 text-center text-xs text-zinc-500 dark:text-zinc-500'>
                <LockIcon className='h-3.5 w-3.5 flex-none' aria-hidden='true' />
                Payments are handled by Stripe or your own wallet. No card or wallet details are stored on this site.
            </p>
        </div>
    )
}
