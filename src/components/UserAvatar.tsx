import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

const STORAGE_KEY = "nexaaudit:userName";

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const UserAvatar = () => {
  const [name, setName] = useState("John Doe");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setName(stored);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) {
      setName(trimmed);
      localStorage.setItem(STORAGE_KEY, trimmed);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={popRef}>
      <button
        onClick={() => {
          setDraft(name);
          setOpen((v) => !v);
        }}
        className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        title={name}
      >
        {getInitials(name)}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card shadow-card p-4 z-[100]">
          <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
            <Pencil className="h-3 w-3" /> Display name
          </label>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") setOpen(false);
            }}
            className="w-full px-3 py-2 bg-secondary rounded-lg text-sm border border-transparent focus:border-primary/50 focus:outline-none transition"
            placeholder="Your name"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setOpen(false)}
              className="text-xs px-3 py-1.5 rounded-md hover:bg-secondary transition"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
