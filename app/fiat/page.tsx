import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "lucide-react";
import CheckoutForm from "../components/CheckoutForm";

export const metadata: Metadata = {
    title: 'Tip with card | Ryan Drachenberg',
    description: 'Leave a tip securely by credit or debit card via Stripe.',
}

export default function FiatPage() {
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
                    Tip with a card
                </h1>
                <p className='mt-4 text-base text-zinc-600 dark:text-zinc-400'>
                    Pick an amount and you&apos;ll be sent to Stripe&apos;s secure checkout to finish up.
                    Thank you. It genuinely means a lot.
                </p>
            </header>

            <div className='mt-10'>
                <CheckoutForm uiMode="hosted" />
            </div>
        </div>
    )
}
