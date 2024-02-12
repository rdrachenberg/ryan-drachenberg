import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SharedLayout from "@/components/SharedLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryan Drachenberg Developer",
  description: 'Ryan Drachenberg projects'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} flex h-full bg-blue-600 dark:bg-black`}>
        <SharedLayout>
          {children}
        </SharedLayout>
        </body>
    </html>
  );
}
