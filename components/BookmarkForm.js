"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

export default function BookmarkForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  )

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const addBookmark = async (e) => {
    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    })

    setTitle("")
    setUrl("")
  }

  return (
    <form onSubmit={addBookmark} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Add Bookmark
      </button>
    </form>
  )
}
