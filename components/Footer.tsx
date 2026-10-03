import Link from 'next/link'
import { MailIcon } from 'lucide-react'
import CurrentYear from './CurrentYear'

const EMAIL = 'ryandrachenberg@gmail.com'

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-12 lg:max-w-4xl">
        <div className="flex flex-col items-center gap-3 border-t border-zinc-300 py-8 text-center text-sm text-zinc-600 dark:border-zinc-700/40 dark:text-zinc-400 sm:flex-row sm:justify-between sm:text-left">
          <p>
            Built by{' '}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Ryan Drachenberg</span>
          </p>
          <Link
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1.5 font-medium transition hover:text-blue-600 dark:hover:text-blue-500"
          >
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            <span>Email me</span>
          </Link>
          <p>
            &copy; <CurrentYear /> Ryan Drachenberg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
