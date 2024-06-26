"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "@/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe, stripeTester } from "@/lib/stripe";

let testMode = true;

export async function createCheckoutSession(
  data: FormData,
  testMode: boolean
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;
  console.log(testMode);

  const checkoutSession: Stripe.Checkout.Session =
   testMode ? await stripeTester.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Amount of donation",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("customDonation") as string),
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&amount=${data.get("customDonation") as string}`,
        cancel_url: `${origin}/`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    }) : 
    await  stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Amount of donation",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("customDonation") as string),
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&amount=${data.get("customDonation") as string}`,
        cancel_url: `${origin}/`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    })
  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  
  const paymentIntent: Stripe.PaymentIntent =
   testMode ? await stripeTester.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    })
    : 
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    })

  return { client_secret: paymentIntent.client_secret as string };
}
