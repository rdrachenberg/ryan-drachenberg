import {
  CloudIcon,
  CodeIcon,
  CpuIcon,
  HeartHandshakeIcon,
  LeafIcon,
  RabbitIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  WavesIcon,
} from "lucide-react";

export const projects = [
  {
    name: "aEComSolution.com",
    description:
      "Advanced analytics suite for marine biologists and underwater explorers.",
    link: {
      href: "http://www.aecomsolution.com",
      label: "aecomsolution.com",
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
    icon: ShoppingCartIcon,
  },
  {
    name: "CodeBuddy",
    description:
      "User draws their UI, post request to OpenAI, then returns usable TailwindCSS code",
    link: { 
      href: "https://code-buddy-ten.vercel.app/", 
      label: "code-buddy-ten.vercel.app" 
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
    icon: ShieldCheckIcon,
  },
  {
    name: "Dashey",
    description:
      "A Nextjs styled dashboard with Railway Postgres db, Prisma(ORM), Tremor(charts & graphs), Next Auth",
    link: { 
      href: "https://dashey.vercel.app/", 
      label: "dashey.vercel.app" 
    },
    icon: RabbitIcon,
  },
];
