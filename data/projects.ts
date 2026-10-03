import {
  CodeIcon,
  HeartHandshakeIcon,
  RabbitIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  Cable,
  Factory,
  PlaneTakeoffIcon,
  QrCode,
  BadgeCheckIcon,
  EraserIcon,
  GraduationCapIcon,
  SunIcon
} from "lucide-react";

import { SiGithub } from "react-icons/si";

export const projects = [
  {
    name: "Sol Kat Boutique",
    description:
      "A resale storefront and inventory tracker. Log finds from your phone with photos and purchase price, pull eBay resale comps, and sell through a public shop with Stripe checkout. Next.js, MongoDB Atlas, Vercel Blob",
    link: {
      href: "https://www.sol-kat.com/",
      label: "sol-kat.com"
    },
    gitHubLink: {
      href: "https://www.sol-kat.com/",
      label: "Deployed App",
      icon: PlaneTakeoffIcon,
    },
    icon: SunIcon,
  },
  {
    name: "BG Remover",
    description:
      "Removes photo backgrounds entirely in the browser with an on-device ML model, so images never leave your machine. Supports iPhone HEIC, batch uploads, PNG/JPEG export and ZIP download",
    link: {
      href: "https://bg-remover-five-omega.vercel.app/",
      label: "bg-remover-five-omega.vercel.app"
    },
    gitHubLink: {
      href: "https://bg-remover-five-omega.vercel.app/",
      label: "Deployed App",
      icon: PlaneTakeoffIcon,
    },
    icon: EraserIcon,
  },
  {
    name: "CCA-F Prep",
    description:
      "A 60-question timed, self-scoring mock exam and 2-week study guide for the Claude Certified Architect – Foundations exam. Lightweight static HTML with no build step",
    link: {
      href: "https://cca-f-prep-kohl.vercel.app/exam",
      label: "cca-f-prep-kohl.vercel.app"
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/cca-f-prep",
      label: "GitHub",
      icon: SiGithub
    },
    icon: GraduationCapIcon,
  },
  {
    name: "Anthropic Credentials",
    description:
      "A terminal-styled page showcasing my verified Anthropic course completions, with a built-in form for adding new credentials",
    link: {
      href: "https://anthropic-credentials.vercel.app/",
      label: "anthropic-credentials.vercel.app"
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/anthropic-credentials",
      label: "GitHub",
      icon: SiGithub
    },
    icon: BadgeCheckIcon,
  },
  {
    name: "Solana Mint Forge",
    description:
      "A dApp that allows users to mint their own tokens on the Solana Network",
    link: { 
      href: "https://SolanaMintForge.com/", 
      label: "SolanaMintForge.com" 
    },
    gitHubLink: {
      href: "https://solanamintforge.com", 
      label: "Deployed App",
      icon: PlaneTakeoffIcon,
    },
    icon: Factory,
  },
  {
    name: "aEComSolution.com",
    description:
      "I was tasked with building a Nextjs app to dirve online bookings with Calendly.",
    link: {
      href: "https://automated-e-solutions-odtj522a2-tssinvestments.vercel.app/",
      label: "aecomsolution.com",
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/automated-e-solutions", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: HeartHandshakeIcon,
  },
  {
    name: "AnyStore",
    description:
      "Developed as a template shell for any online store. Has stripe integration and is built with Nextjs",
    link: { 
      href: "https://any-store-tau.vercel.app", 
      label: "any-store-tau.vercel.app" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/any-store", 
      label: "GitHub",
      icon: SiGithub
    },
    
    icon: ShoppingCartIcon,
  },
  {
    name: "CodeBuddy",
    description:
      "User draws their UI, post request to OpenAI, then returns usable TailwindCSS code",
    link: { 
      // href: "https://code-buddy-ten.vercel.app/", // hobby deployment that is has 10 sec timeout casuing api request to timeout
      href: "https://code-buddy-iota.vercel.app/", 
      label: "code-buddy-iota.vercel.app" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/code-buddy", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: CodeIcon,
  },
  {
    name: "QR Pal",
    description:
      "User provides a link that they want to turn into a QR Code and returns it. Nexjs with Python Flask App",
    link: { 
      // href: "https://code-buddy-ten.vercel.app/", // hobby deployment that is has 10 sec timeout casuing api request to timeout
      href: "https://qr-pal.vercel.app/", 
      label: "QR Pal" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/qr-pal", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: QrCode,
  },
  {
    name: "Next-Protector",
    description:
      "Authentication for protected content using Next Auth, Railway Postgres db, Prisma(ORM), Next.js",
    link: { 
      href: "https://next-protector.vercel.app/", 
      label: "next-protector.vercel.app" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/next-protector", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: ShieldCheckIcon,
  },
  {
    name: "Rip Cord",
    description:
      "An app that works on any EVM compatiable blockchain and allows you to load all available functions and call them.",
    link: { 
      href: "https://rip-cord.vercel.app/", 
      label: "Rip Cord" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/rip-cord", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: Cable,
  },
  {
    name: "Dashey",
    description:
      "A Next Auth app with Railway Postgres db, Prisma(ORM), Tremor(charts & graphs)",
    link: { 
      href: "https://dashey.vercel.app/", 
      label: "dashey.vercel.app" 
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/dashey", 
      label: "GitHub",
      icon: SiGithub
    },
    icon: RabbitIcon,
  },
];