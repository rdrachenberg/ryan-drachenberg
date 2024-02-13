import { allPosts } from '@/.contentlayer/generated';
import formatDate from '@/lib/formatDate';
import Mdx from '@/mdx-components';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        slug: string[]
    }
}


export async function generateStaticParams(): Promise<Props['params'][]> {
    return allPosts.map(post => ({
        slug: post.slugAsParams.split('/'),
    }))
}

export default function PostPage({params}: Props) {
    // console.log(params);
    const slug = params.slug.join('/')
    const post = allPosts.find(post => post.slugAsParams === slug);
    // console.log(post)

    if(!post) {
        notFound();
    }
    
    return (
        <div className='xl:relative'>
            <div className='mx-auto max-w-2xl'>
                <article>
                    <header className='flex flex-col'>
                        <h1 className='mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                            {post.title}
                        </h1>
                        <time dateTime={post.date} className='order-first flex items-center text-base text-zinc-400 dark:text-zinc-500'>
                            <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500'/>
                            <span className='ml-3' suppressHydrationWarning={true}>{formatDate(post.date)}</span>
                        </time>
                    </header>
                    <div className='mt-8 prose dark:prose-invert pb-24 max-w-lg md:max-w-2xl'>
                        <Mdx code={post.body.code}/>
                    </div>
                </article>
            </div>
        </div>
    )
}