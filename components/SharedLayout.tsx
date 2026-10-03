import Header from './Header'
import Footer from './Footer'

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* decorative background shell */}
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-gray-100 shadow ring-2 ring-black dark:bg-gray-900 dark:ring-blue-500" />
        </div>
      </div>

      {/* content: min-h-screen + flex-1 keeps the footer at the bottom on short pages */}
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="relative mx-auto mt-20 w-full max-w-2xl flex-1 px-4 sm:mt-32 sm:px-12 lg:max-w-4xl">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
