'use client'
import { allPosts } from '@/.contentlayer/generated';
import PostCard from '@/components/PostCard';
import dbSync from '@/lib/dbSync';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function HomePage() {
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    
    // dbSync(); // call to seed from db
    
    isLoading(false);
  }, [])
  
  
  let sorted = allPosts.sort((a,b) => Number(new Date(b.date)) - Number(new Date(a.date))) // sort decending with newest post at beging of array
  
  return (
    <>
    {loading? 
        <div><Loader2Icon className='animate-spin justify-center items-center text-blue-400 dark:text-white w-10 h-10'/></div>
      :
      <>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Writing on software design, digital assets, and the blockchain industry.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        My thoughts on programming, e-commerce, product design, and
        more, collected in chronological order.
        </p>
      </header>
      <div className='mt-16 sm:mt-20'>
        <div className='md:border-l-2 md:border-zinc-700/40'>
          <div className='flex max-w-3xl flex-col mb-24 space-y-16'>
            {sorted.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
      </>
    }
      
    </>
  );
}
