import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/cinevault/AppShell";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const EMOJIS = [
  "😎", "🎬", "🎭", "🌙", "👁️", "🦅", "🐺", "🌊", "🔥", "⚡",
  "🧠", "👻", "🚀", "🎸", "🌈", "🤖", "🦁", "🐉", "🌺", "💎"
];

const COLORS = [
  "#6C3FC5", "#F59E0B", "#C4622D", "#6366F1",
  "#10B981", "#EF4444", "#EC4899", "#64748B"
];

function SettingsPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("Movie Fan");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("");

  const [activeTab, setActiveTab] = useState<"emoji" | "color" | null>(null);

  useEffect(() => {
    setMounted(true);
    setName(localStorage.getItem("cv_display_name") || "Movie Fan");
    setEmoji(localStorage.getItem("cv_avatar_emoji") || "");
    setColor(localStorage.getItem("cv_avatar_color") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("cv_display_name", name.trim() || "Movie Fan");
    if (emoji) localStorage.setItem("cv_avatar_emoji", emoji);
    else localStorage.removeItem("cv_avatar_emoji");
    if (color) localStorage.setItem("cv_avatar_color", color);
    else localStorage.removeItem("cv_avatar_color");

    toast.success("Profile updated.");
    navigate({ to: "/profile" });
  };

  if (!mounted) return null;

  const displayInitial = name.trim() ? name.trim().charAt(0).toUpperCase() : "M";

  return (
    <AppShell>
      <div className="max-w-xl mx-auto pt-8 px-6 pb-32">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Edit Profile</h1>
        </div>

        {/* SECTION 1 — Profile Picture */}
        <section className="mb-12 flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden shadow-inner mb-6 text-3xl transition-colors duration-300"
            style={{ backgroundColor: color || 'var(--primary)' }}
          >
            {emoji ? (
              <span>{emoji}</span>
            ) : (
              <span className="font-display font-bold text-primary-foreground">{displayInitial}</span>
            )}
          </div>

          <div className="flex gap-3 mb-6">
            <button 
              onClick={() => setActiveTab(activeTab === "emoji" ? null : "emoji")}
              className={`bg-secondary border text-foreground text-sm rounded-full px-4 py-2 transition-colors ${activeTab === 'emoji' ? 'border-primary' : 'border-border hover:border-primary/50'}`}
            >
              Choose Emoji
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === "color" ? null : "color")}
              className={`bg-secondary border text-foreground text-sm rounded-full px-4 py-2 transition-colors ${activeTab === 'color' ? 'border-primary' : 'border-border hover:border-primary/50'}`}
            >
              Pick Color
            </button>
          </div>

          {activeTab === "emoji" && (
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 w-full bg-card border border-border rounded-2xl p-4 animate-in fade-in slide-in-from-top-4">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => setEmoji(e === emoji ? "" : e)}
                  className={`text-2xl aspect-square flex items-center justify-center rounded-xl transition-all hover:bg-secondary ${emoji === e ? 'ring-2 ring-primary scale-110 bg-secondary' : ''}`}
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          {activeTab === "color" && (
            <div className="flex flex-wrap justify-center gap-4 w-full bg-card border border-border rounded-2xl p-5 animate-in fade-in slide-in-from-top-4">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-all hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 ring-offset-background ring-white scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2 — Display Name */}
        <section className="mb-10">
          <label className="block text-sm text-muted-foreground mb-2 font-medium">Display Name</label>
          <div className="w-full max-w-sm relative">
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 24))}
              className="bg-secondary border border-border rounded-xl px-4 py-3 text-foreground w-full focus:border-primary outline-none transition-colors"
              placeholder="Movie Fan"
            />
            <div className="text-xs text-muted-foreground text-right mt-1.5 font-medium">
              {name.length} / 24
            </div>
          </div>
        </section>

        {/* SECTION 3 — Save button */}
        <button 
          onClick={handleSave}
          className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold hover:scale-105 transition-transform"
        >
          Save Changes
        </button>
      </div>
    </AppShell>
  );
}
