import { projects } from "@/data/projects";
import { ArrowRightIcon, GithubIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <div>
            <header className='max-w-2xl`'>
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Projects That Shape My Journey
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                In this dynamic tech landscape, my projects are my stepping stones. Each one, from simple ideas to budding applications, is a journey of learning and growth. Embracing the open-source ethos, these projects are not just mine; they&apos;re a canvas for collaboration. Take a look at the repositories. Your input, your code could be the key to unlocking new potentials. Let&apos;s collaborate, learn, and evolve together in this exciting world of web development.
                </p>
            </header>
            <div className='mt-16 sm:mt-20 mb-16 sm:mb-20'>
                <ul className='grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
                    {projects.map(project => (
                        <div key={project.name}>
                            <li key={project.name} className='group relative flex flex-col items-start mb-2 pt-2'>
                                <div className='relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 mb-3 group-hover:bg-blue-500 '>
                                    <project.icon className="group-hover:text-white"/>
                                </div>
                                <h2 className='text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-gray-800 dark:group-hover:text-gray-100'>
                                    <div className='absolute z-0 bg-blue-300/50 -inset-x-4 -inset-y-1 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-blue-800/20 sm:-inset-x-6 sm:rounded-2xl '/>
                                    <Link href={project.link.href} target="_blank">
                                        <span className='absolute -inset-x-4 -inset-y-6 z-20 sm:rounded-2xl'></span>
                                        <span className='relative z-10'>{project.name}</span>
                                    </Link>
                                </h2>
                                <p className='relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 dark:group-hover:text-white'>{project.description}</p>
                                <p className='relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-blue-500 items-center dark:text-zinc-200'>
                                    <ArrowRightIcon className='w-3 h-3'/>
                                    <span className='ml-2'>{project.link.label}</span>
                                </p>
                            </li>
                            <li className='group relative flex flex-col items-start'>
                            <div className='relative z-10 flex'>
                                <Link href={project.gitHubLink.href} target="_blank">
                                    <p className='relative z-10 mt-3 flex text-sm font-medium text-zinc-400 transition group-hover:text-blue-500 items-center dark:text-zinc-200 hover:scale-125'>
                                        <GithubIcon className='w-3 h-3 group-hover:text-black dark:group-hover:text-white'/>
                                        <span className='ml-2'>{project.gitHubLink.label}</span>
                                    </p>
                                </Link>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}