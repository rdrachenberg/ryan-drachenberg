'use client'
import { CogIcon, HomeIcon, InfoIcon, PencilIcon, CircleDollarSignIcon, LightbulbIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
    {
        icon: LightbulbIcon,
        href: '/',
        text: 'Insights'
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
    {
        icon: CircleDollarSignIcon,
        href: '/tip',
        text: 'Tip'
    },
]
export default function Header() {
    const pathname = usePathname();
    return (
        <header className='w-full relative top-8'>
            <div className=' flex flex-row sm:flex items-center mx-auto justify-between md:max-w-2xl max-w-max sm:px-8 '>
                <Link href={'/'} className='rounded-full shadow border dark:border-gray-700 p-2 hidden sm:flex'>
                    <HomeIcon className='text-black dark:text-white w-3 h-3 sm:w-5 sm:h-5 hidden sm:flex'/>
                </Link>
                <ul className='flex rounded-full px-3 dark:text-white text-black font-medium shadow dark:border-gray-700 border'>
                {links.map(link => (
                    <Link key={link.href} href={link.href} className={`${link.href === pathname ?
                    'text-blue-400':''} relative flex items-center space-x-1 px-3 py-2 transition hover:text-blue-600 dark:hover:text-blue-600`} >
                        {<link.icon className='w-3 h-3 sm:w-5 sm:h-5'/>}
                        <span className="text-xs sm:text-lg">{link.text}</span>
                    </Link>
                ))}
            </ul>
            <ThemeToggle />
            </div>
        </header>
    )
}