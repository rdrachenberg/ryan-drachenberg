import {
  CodeIcon,
  GithubIcon,
  HeartHandshakeIcon,
  RabbitIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  Cable,
  Factory,
  PlaneTakeoffIcon
} from "lucide-react";

export const projects = [
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
      label: "App",
      icon: PlaneTakeoffIcon,
    },
    icon: Factory,
  },
  {
    name: "aEComSolution.com",
    description:
      "I was tasked with building a Nextjs app to dirve online bookings with Calendly.",
    link: {
      href: "http://www.aecomsolution.com",
      label: "aecomsolution.com",
    },
    gitHubLink: {
      href: "https://github.com/rdrachenberg/automated-e-solutions", 
      label: "GitHub",
      icon: GithubIcon
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
      icon: GithubIcon
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
      icon: GithubIcon
    },
    icon: CodeIcon,
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
      icon: GithubIcon
    },
    icon: ShieldCheckIcon,
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
      icon: GithubIcon
    },
    icon: RabbitIcon,
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
      icon: GithubIcon
    },
    icon: Cable,
  },
  
];
