import { Post } from "@/.contentlayer/generated"
import formatDate from "@/lib/formatDate"
import clsx from "clsx"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import PostCover from "./PostCover"

type Props = {
    post: Post,
    // The newest post gets a larger, stacked layout at the top of the list
    featured?: boolean,
}

export function PostMeta({ post, className }: { post: Post, className?: string }) {
    return (
        <p className={clsx('flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400', className)}>
            <time dateTime={post.date} suppressHydrationWarning>{formatDate(post.date)}</time>
            <span aria-hidden className='h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600'/>
            <span>{post.readingTime} min read</span>
        </p>
    )
}

export default function PostCard({ post, featured = false }: Props) {
    return (
        <article className={clsx(
            'group relative flex flex-col gap-5 rounded-2xl p-3 -m-3 transition hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50',
            !featured && 'sm:flex-row sm:items-center sm:gap-6',
        )}>
            <PostCover
                src={post.image}
                alt={post.imageAlt}
                title={post.title}
                priority={featured}
                className={clsx(
                    'w-full shrink-0 rounded-xl ring-1 ring-zinc-900/5 dark:ring-white/10',
                    featured ? 'aspect-[16/9]' : 'aspect-[16/9] sm:aspect-[4/3] sm:w-56',
                )}
            />
            <div className='flex min-w-0 flex-col'>
                <PostMeta post={post}/>
                <h2 className={clsx(
                    'mt-2 font-semibold tracking-tight text-zinc-800 transition group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400',
                    featured ? 'text-2xl sm:text-3xl' : 'text-lg',
                )}>
                    <Link href={post.slug}>
                        {/* Stretch the link over the whole card */}
                        <span className='absolute inset-0 z-10 rounded-2xl'/>
                        {post.title}
                    </Link>
                </h2>
                {post.description && (
                    <p className={clsx('mt-2 text-zinc-600 dark:text-zinc-400', featured ? 'text-base' : 'text-sm line-clamp-2')}>
                        {post.description}
                    </p>
                )}
                <span className='mt-3 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400'>
                    Read article
                    <ArrowRightIcon className='ml-1 h-4 w-4 transition group-hover:translate-x-1'/>
                </span>
            </div>
        </article>
    )
}
