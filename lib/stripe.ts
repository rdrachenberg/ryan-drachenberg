import "server-only";
import { headers } from "next/headers";

import Stripe from "stripe";

const origin: string = headers().get("origin") as string;

export const stripeTester = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Ryan Drachenberg Dev",
    url: origin,
  },
});
export let stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Ryan Drachenberg Dev",
    url: origin,
  },
});
