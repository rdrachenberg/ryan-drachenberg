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
    <div className='flex flex-col mx-auto justify-center items-center place-items-center'>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <div className='flex flex-col-3 justify-center'>
          
          <div className="flex flex-col w-5 justify-center items-end pr-2">$</div>  
          <CustomDonationInput
            className="checkout-style dark:text-black rounded flex flex-col px-auto justify-start items-start place-items-start object-left w-[260px] focus"
            name="customDonation"
            min={config.MIN_AMOUNT}
            max={config.MAX_AMOUNT}
            step={config.AMOUNT_STEP}
            currency={config.CURRENCY}
            onChange={handleInputChange}
            value={input.customDonation}
          />
        </div>
        <div className="flex flex-col h-0 w-20"></div>
        <button
          className="checkout-style-background bg-blue-500 hover:bg-blue-600 hover:border-2 hover:border-blue-500 border-2 border-gray-200 dark:border-black p-2 rounded-full m-4 mt-[350px] sm:mt-28 w-[300px] sm:w-[350px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white"
          type="submit"
          disabled={loading}
        >
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe(testMode)}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </div>
  );
}
