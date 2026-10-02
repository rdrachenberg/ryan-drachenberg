import { allPosts } from '@/.contentlayer/generated';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  // copy before sorting so the generated array isn't mutated; newest first
  const sorted = [...allPosts].sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Writing on software design, digital assets, and the blockchain industry.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          My thoughts on programming, e-commerce, product design, and more,
          collected in chronological order.
        </p>
      </header>

      <div className="mt-12 mb-24 sm:mt-20">
        <div className="md:border-l md:border-zinc-300 md:pl-6 dark:md:border-zinc-700/40">
          <div className="flex flex-col space-y-12 sm:space-y-16">
            {sorted.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
