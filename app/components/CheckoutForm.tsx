"use client";

import type Stripe from "stripe";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { FlaskConicalIcon, Loader2Icon, LockIcon, XIcon } from "lucide-react";

import CustomDonationInput from "./CustomDonationInput";

import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import * as config from "@/config";
import { createCheckoutSession } from "@/app/actions/stripe";
import getStripe from "@/utils/get-stripe";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

function SubmitButton({ label, disabled }: { label: string; disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-gray-900"
    >
      {pending ? (
        <>
          <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden="true" />
          Opening secure checkout…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export default function CheckoutForm({ uiMode }: CheckoutFormProps) {
  const [amount, setAmount] = useState<string>("10");
  // Hidden test switch: click the "$" next to the amount to flip between live and Stripe test keys.
  const [testMode, setTestMode] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const numericAmount = Number(amount);
  const isValid =
    amount !== "" &&
    !Number.isNaN(numericAmount) &&
    numericAmount >= config.MIN_AMOUNT &&
    numericAmount <= config.MAX_AMOUNT;

  const formAction = async (data: FormData): Promise<void> => {
    const mode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data, testMode);

    if (mode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <div className="w-full">
      <form
        action={formAction}
        className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/10 dark:bg-gray-800/50 dark:ring-white/10 sm:p-8"
      >
        <input type="hidden" name="uiMode" value={uiMode} />

        {testMode && (
          <div className="mb-6 flex items-start justify-between gap-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 ring-1 ring-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            <div className="flex items-start gap-2">
              <FlaskConicalIcon className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
              <p>
                <span className="font-semibold">Test mode.</span> No real charge. Use card{" "}
                <span className="font-mono">4242 4242 4242 4242</span>, any future date and any CVC.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTestMode(false)}
              className="rounded-full p-1 transition hover:bg-amber-500/20"
              aria-label="Switch back to live mode"
            >
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <fieldset>
          <legend className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Choose an amount</legend>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {PRESET_AMOUNTS.map(preset => {
              const selected = numericAmount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  aria-pressed={selected}
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-gray-700/60 dark:text-zinc-200 dark:hover:bg-gray-700"
                  }`}
                >
                  ${preset}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label htmlFor="customDonation" className="mt-6 block text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          Or enter your own
        </label>
        <div className="mt-2 flex items-center rounded-xl bg-zinc-50 ring-1 ring-zinc-900/10 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-900/60 dark:ring-white/10">
          <button
            type="button"
            onClick={() => setTestMode(t => !t)}
            className={`select-none pl-4 pr-1 text-lg font-semibold transition ${
              testMode ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400"
            }`}
            aria-label="Currency: US dollars"
            title="USD"
          >
            $
          </button>
          <CustomDonationInput
            className="w-full bg-transparent py-3 pr-4 text-lg font-semibold text-zinc-900 outline-none [appearance:textfield] dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            name="customDonation"
            min={config.MIN_AMOUNT}
            max={config.MAX_AMOUNT}
            step={config.AMOUNT_STEP}
            currency={config.CURRENCY}
            onChange={e => setAmount(e.currentTarget.value)}
            value={amount}
          />
          <span className="pr-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">USD</span>
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          {formatAmountForDisplay(config.MIN_AMOUNT, config.CURRENCY)} minimum ·{" "}
          {formatAmountForDisplay(config.MAX_AMOUNT, config.CURRENCY)} maximum · in{" "}
          {formatAmountForDisplay(config.AMOUNT_STEP, config.CURRENCY)} steps
        </p>

        <div className="mt-8">
          <SubmitButton
            disabled={!isValid}
            label={isValid ? `Tip ${formatAmountForDisplay(numericAmount, config.CURRENCY)}` : "Enter an amount"}
          />
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500 dark:text-zinc-500">
          <LockIcon className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
          Secure checkout by Stripe. Your card details never touch this site.
        </p>
      </form>

      {clientSecret ? (
        <div className="mt-8">
          <EmbeddedCheckoutProvider stripe={getStripe(testMode)} options={{ clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      ) : null}
    </div>
  );
}
