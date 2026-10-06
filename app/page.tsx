import { allPosts } from '@/.contentlayer/generated';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  // copy before sorting so the generated array isn't mutated; newest first
  const sorted = [...allPosts].sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const [latest, ...rest] = sorted;

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

      <div className="mt-12 mb-24 sm:mt-16">
        {latest && <PostCard post={latest} featured />}
        <h2 className="mt-16 mb-8 border-t border-zinc-200 pt-8 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700/60 dark:text-zinc-400">
          More articles
        </h2>
        <div className="flex flex-col space-y-10">
          {rest.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
