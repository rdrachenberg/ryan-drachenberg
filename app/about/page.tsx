import { allPages } from "@/.contentlayer/generated";
import Mdx from '@/mdx-components';
import { GithubIcon, MailCheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const socialLinks = [
    {
        icon: XIcon,
        text: 'X (Twitter)',
        social: 'https://twitter.com/RYANDRACHENBERG'
    },
    
    {
        icon: GithubIcon,
        text: 'GitHub',
        social: 'https://github.com/rdrachenberg'
    },
    {
        icon: MailCheckIcon,
        text: 'Email',
        social: 'mailto:ryandrachenberg@gmail.com'
    },

]

export default function AboutPage() {
    const page = allPages.find(page => page.slugAsParams === 'about')
    
    if(!page) {
        notFound();
    }

    return (
        <div className='mt-8'>
            <div className='grid grid-col-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12'>
                <div className='lg:pl-20'>
                    <div className='max-w-xs px-3 lg:max-w-none'>
                        <Image src={page.image} alt='portrait' width={400} height={400} className='aspect-square rotate-[-3deg] hover:rotate-[360deg] rounded-2xl bg-zinc-100 dark:bg-zinc-800'/>
                    </div>
                </div>
                <div className='lg:order-first lg:row-span-2'>
                    <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                        {page.title}
                    </h1>
                    <div className='mt-6 mb-6 space-y-7 text-base text-zinc-700 dark:text-zinc-300'>
                        <Mdx code={page.body.code}/>
                    </div>
                </div>
                {/* Social links here*/}
                <div className='lg:pl-20 pb-20'>
                    <ul className='space-y-4'>
                        {socialLinks.map(link => (
                            <li key={link.text} className='flex'>
                                <Link href={link.social} target="__blank" className='group flex text-base font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500 '>
                                    <link.icon className='h-6 w-6 flex-none transition group-hover:text-blue-500'/>
                                    <span className='ml-4'>{`Follow on ${link.text}`}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}