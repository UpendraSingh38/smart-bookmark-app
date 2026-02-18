import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold">Smart Bookmark App</h1>
      <Link href="/login" className="text-blue-600 underline">
        Login with Google
      </Link>
    </main>
  )
}