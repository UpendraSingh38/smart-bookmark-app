"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

export default function BookmarkList() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const [bookmarks, setBookmarks] = useState([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  return (
    <div className="mt-6 space-y-3">
      {bookmarks.map((b) => (
        <div key={b.id} className="border p-3 flex justify-between">
          <a href={b.url} target="_blank" className="underline">
            {b.title}
          </a>
          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
