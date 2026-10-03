'use client'

// Renders the year in the visitor's browser, so it rolls over on Jan 1
// without a rebuild, even if a page is statically cached.
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}
