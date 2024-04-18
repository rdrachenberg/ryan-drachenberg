"use client";

import type Stripe from "stripe";

import React, { useState } from "react";

import CustomDonationInput from "./CustomDonationInput";

import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import * as config from "@/config";
import { createCheckoutSession } from "@/app/actions/stripe";
import getStripe from "@/utils/get-stripe";
import { EmbeddedCheckout, EmbeddedCheckoutProvider,} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  testtoggle: boolean,

}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(10),
  });
  const testMode = props.testtoggle;
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
     
    const { client_secret, url } = await createCheckoutSession(data, testMode);

    if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <div className='flex flex-row justify-center items-center place-items-center'>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <CustomDonationInput
          className="checkout-style dark:text-black rounded"
          name="customDonation"
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
          value={input.customDonation}
        />
        <button
          className="checkout-style-background bg-blue-500 hover:bg-blue-400 hover:border-2 hover:border-white border-2 border-black p-2 rounded-full m-4 "
          type="submit"
          disabled={loading}
        >
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </div>
  );
}
