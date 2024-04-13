import "server-only";

import Stripe from "stripe";



export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Ryan Drachenberg Dev",
    url: "http://localhost:3000" || "https://ryan-drachenberg.vercel.app/",
  },
});
