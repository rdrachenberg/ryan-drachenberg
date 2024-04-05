import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SharedLayout from "@/components/SharedLayout";
import { Toaster } from "react-hot-toast";
import { CartProvider } from 'use-shopping-cart';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryan Drachenberg Developer",
  description: 'Ryan Drachenberg projects'
};

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} flex h-full bg-blue-600 dark:bg-black`} suppressHydrationWarning={true}>
        <CartProvider stripe={stripeKey} cartMode='checkout-session' currency='USD'>
        <SharedLayout>
          <Toaster />
          {children}
        </SharedLayout>
        </CartProvider>
      </body>
    </html>
  );
}
