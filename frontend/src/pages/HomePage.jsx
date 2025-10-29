import RateLimitedUI from "@/components/RateLimitedUI";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NoteCard from "@/components/NoteCard";
import api from "@/lib/axios";
import NoNotesFound from "@/components/NoNotesFound";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(true);

  // Update debounced value after 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // wait 500ms after last keystroke

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const endpoint = debouncedSearch
          ? `/notes/search?q=${encodeURIComponent(debouncedSearch)}`
          : "/notes";
        const res = await api.get(endpoint);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen">
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <Input
          type="text"
          id="title"
          placeholder="Search Notes...."
          className="mb-4 max-w-md mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[122px] w-full rounded-xl" />
            ))}
          </div>
        ) : notes.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {notes.map((note) => (
              <div key={note._id} className="break-inside-avoid mb-4">
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        ) : debouncedSearch ? (
          <p className="text-center mt-8 text-gray-500">
            No results found for "{search}"
          </p>
        ) : (
          <NoNotesFound />
        )}
      </div>
    </div>
  );
};

export default HomePage;
