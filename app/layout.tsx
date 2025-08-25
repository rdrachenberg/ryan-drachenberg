// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SharedLayout from "@/components/SharedLayout";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

// ⬇️ Client-only: avoids importing @web3modal/* on the server
const Web3ModalInit = dynamic(() => import("@/components/Web3ModalInit"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryan Drachenberg Developer",
  description: "Ryan Drachenberg projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialState =
    cookieToInitialState(config, headers().get("cookie")) || undefined;

  return (
    <Web3ModalProvider initialState={initialState}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Mount ONCE per app, client-only */}
            <Web3ModalInit />
            <SharedLayout>
              <Toaster />
              {children}
            </SharedLayout>
          </ThemeProvider>
        </body>
      </html>
    </Web3ModalProvider>
  );
}
