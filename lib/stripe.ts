import "server-only";
import { host as origin } from "@/config";

import Stripe from "stripe";

export const stripeTester = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Ryan Drachenberg Dev",
    url: origin,
  },
});
export let stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Ryan Drachenberg Dev",
    url: origin,
  },
});
