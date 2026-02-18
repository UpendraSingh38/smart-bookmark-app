
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export default function Dashboard() {
  const supabase = createClient();

  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch bookmarks
  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase.from("bookmarks").select("*").order("created_at", { ascending: false });
    setBookmarks(data || []);
    setLoading(false);
  };

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert({ title, url });
    setTitle("");
    setUrl("");
  };

  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Smart Bookmark</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      {/* Add Bookmark Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="max-w-5xl mx-auto mb-6 shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={addBookmark} className="flex gap-2">
              <Plus size={16} /> Add
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bookmark Grid */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center col-span-full">Loading bookmarks...</p>
        ) : bookmarks.length === 0 ? (
          <p className="text-center col-span-full text-slate-500">No bookmarks yet.</p>
        ) : (
          bookmarks.map((bookmark, i) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                <CardContent className="p-5 flex flex-col gap-3">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    className="font-semibold text-lg hover:underline"
                  >
                    {bookmark.title}
                  </a>

                  <p className="text-sm text-slate-500 truncate">{bookmark.url}</p>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-fit"
                    onClick={() => deleteBookmark(bookmark.id)}
                  >
                    <Trash2 size={14} className="mr-1" /> Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
