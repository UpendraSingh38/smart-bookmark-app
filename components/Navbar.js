'use client'

import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const supabase = createClient()

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex justify-between p-4 border-b">
      <h1 className="font-bold">Smart Bookmark</h1>
      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </div>
  )
}
