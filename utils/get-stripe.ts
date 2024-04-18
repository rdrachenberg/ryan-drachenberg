import {Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export default function getStripe(testMode: boolean): Promise<Stripe | null> {
    if(!stripePromise) {
        {testMode ? 
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST as string,) 
            : 
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,)
        }
    };

    return stripePromise;
}