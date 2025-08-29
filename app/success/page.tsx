// app/success/page.tsx
import { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export const dynamic = 'force-dynamic' // render on demand, not SSG

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SuccessClient />
    </Suspense>
  )
}
