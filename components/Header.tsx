'use client'
import { CogIcon, HomeIcon, InfoIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
    {
        icon: PencilIcon,
        href: '/',
        text: 'Writing'
    },
    {
        icon: CogIcon,
        href: '/projects',
        text: 'Projects'
    },
    {
        icon: InfoIcon,
        href: '/about',
        text: 'About'
    },
]
export default function Header() {
    const pathname = usePathname();
    return (
        <header className='w-full relative top-8' suppressHydrationWarning={true}>
            <div className='flex items-center mx-auto justify-between md:max-w-2xl max-w-lg sm:px-8 px-2'>
                <Link href={'/'} className='rounded-full shadow border dark:border-gray-700 p-2'>
                    <HomeIcon className='text-black dark:text-white'/>
                </Link>
                <ul className='flex rounded-full px-3 dark:text-white text-black font-medium shadow dark:border-gray-700 border' suppressHydrationWarning>
                {links.map(link => (
                    <Link key={link.href} href={link.href} className={`${link.href === pathname ?
                    'text-blue-400':''} relative flex items-center space-x-1 px-3 py-2 transition hover:text-blue-600 dark:hover:text-blue-600`} suppressHydrationWarning >
                        {<link.icon className='w-4 h-4'/>}
                        <span>{link.text}</span>
                    </Link>
                ))}
            </ul>
            <ThemeToggle />
            </div>
        </header>
    )
}