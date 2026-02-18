import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import BookmarkForm from "@/components/BookmarkForm"
import BookmarkList from "@/components/BookmarkList"

export default async function Dashboard() {
  // cookies() is async in Next.js 14+
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user → redirect to login
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user.email}</p>

      <div className="mt-6 max-w-md">
    <BookmarkForm />
    <BookmarkList /> 
  </div>
    </div>
  )
}
