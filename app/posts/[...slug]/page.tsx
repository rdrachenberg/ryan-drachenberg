import { allPosts } from '@/.contentlayer/generated';
import PostCard, { PostMeta } from '@/components/PostCard';
import PostCover from '@/components/PostCover';
import Mdx from '@/mdx-components';
import { ArrowLeftIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = {
    slug: string[]
}

type Props = {
    params: Promise<Params>
}

// Newest first, matching the home page
const sortedPosts = () => [...allPosts].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

const findPost = async (params: Props['params']) => {
    // Segments arrive URL-encoded, e.g. "$" in Argentinas_$LIBRA_Controversy as "%24"
    const slug = (await params).slug.map(decodeURIComponent).join('/');
    return allPosts.find(post => post.slugAsParams === slug);
}

export async function generateStaticParams(): Promise<Params[]> {
    return allPosts.map(post => ({
        slug: post.slugAsParams.split('/'),
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await findPost(params);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
        },
    };
}

export default async function PostPage({params}: Props) {
    const post = await findPost(params);

    if(!post) {
        notFound();
    }

    const posts = sortedPosts();
    const index = posts.findIndex(p => p._id === post._id);
    const newer = posts[index - 1];
    const older = posts[index + 1];

    return (
        <div className='mx-auto max-w-2xl pb-24'>
            <Link href='/' className='group mb-8 inline-flex items-center text-sm font-medium text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400'>
                <ArrowLeftIcon className='mr-1.5 h-4 w-4 transition group-hover:-translate-x-1'/>
                All articles
            </Link>
            <article>
                <header>
                    <PostMeta post={post}/>
                    <h1 className='mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                        {post.title}
                    </h1>
                    {post.description && (
                        <p className='mt-5 text-lg text-zinc-600 dark:text-zinc-400'>
                            {post.description}
                        </p>
                    )}
                </header>
                <figure className='mt-10'>
                    <PostCover
                        src={post.image}
                        alt={post.imageAlt}
                        title={post.title}
                        priority
                        className='aspect-[16/9] w-full rounded-2xl ring-1 ring-zinc-900/5 dark:ring-white/10'
                    />
                    {post.imageCredit && (
                        <figcaption className='mt-2 text-right text-xs text-zinc-400 dark:text-zinc-500'>
                            {post.imageSource
                                ? <a href={post.imageSource} target='_blank' rel='noopener noreferrer' className='hover:underline'>{post.imageCredit}</a>
                                : post.imageCredit}
                        </figcaption>
                    )}
                </figure>
                <div className='prose prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-h2:mt-12 prose-a:text-blue-600 prose-a:decoration-blue-600/30 hover:prose-a:decoration-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl'>
                    <Mdx code={post.body.code}/>
                </div>
            </article>

            {(newer || older) && (
                <nav aria-label='More articles' className='mt-20 border-t border-zinc-200 pt-10 dark:border-zinc-700/60'>
                    <h2 className='mb-8 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
                        Keep reading
                    </h2>
                    <div className='flex flex-col space-y-10'>
                        {[newer, older].filter(Boolean).map(p => <PostCard key={p!._id} post={p!}/>)}
                    </div>
                </nav>
            )}
        </div>
    )
}
