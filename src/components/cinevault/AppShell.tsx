import { Link, useLocation } from "@tanstack/react-router";
import { Search, Library, Settings2, Home, Popcorn, User, Film } from "lucide-react";
import { useState } from "react";
import { useCineVault } from "./CineVaultProvider";
import { ARCHETYPE_IDS, ARCHETYPES } from "@/lib/cinevault/archetypes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PopChat } from "../ui/PopChat";
import { MovieDetailPanel } from "./MovieDetailPanel";

const DEMO_SEED = [
  "inception",
  "moonlight",
  "knives-out",
  "arrival",
  "john-wick",
  "coco",
  "the-grand-budapest",
  "everything-everywhere",
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { archetypeData, reset, setArchetype, seedDemo } = useCineVault();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-primary/30 pb-20 md:pb-0">
      
      {/* Desktop / Tablet Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center justify-between px-8 py-4 mx-auto w-full max-w-screen-2xl">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-xl border-b border-border shadow-sm rounded-b-3xl"></div>
        
        <Link to="/" className="relative flex items-center gap-2 group">
          <Popcorn className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-md">CineVault</span>
        </Link>

        <div className="relative flex items-center gap-8 bg-black/40 px-8 py-3 rounded-full border border-white/10 backdrop-blur-lg shadow-xl">
          <NavLink to="/" label="Home" active={location.pathname === "/"} />
          <NavLink to="/browse" label="Browse" active={location.pathname === "/browse"} />
          <NavLink to="/search" label="Search" active={location.pathname === "/search"} />
          <NavLink to="/watchlist" label="Watchlist" active={location.pathname === "/watchlist"} />
        </div>

        <div className="relative flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Settings"
                className="rounded-full p-2 text-white/50 hover:text-white transition-colors"
              >
                <Settings2 className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/90 backdrop-blur-xl border-l border-white/10 text-white z-[100]">
              <SheetHeader>
                <SheetTitle className="font-display text-white">Demo controls</SheetTitle>
                <SheetDescription className="text-white/50">
                  Switch archetype to see the app re-skin instantly.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 grid gap-2">
                {ARCHETYPE_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setArchetype(id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors"
                  >
                    <span className="font-display">{ARCHETYPES[id].name}</span>
                    <span className="text-xs text-white/40">{ARCHETYPES[id].tagline}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                <Button variant="secondary" onClick={() => { seedDemo(DEMO_SEED); setOpen(false); }}>
                  Seed 8 demo films
                </Button>
                <Button variant="ghost" className="text-white/50 hover:text-white" onClick={() => { reset(); setOpen(false); window.location.href = "/"; }}>
                  Reset everything
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-white/20 shadow-lg hover:scale-105 transition-transform">
            <User className="w-5 h-5 text-white" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto md:pt-24">{children}</main>

      {/* Global Overlays */}
      <PopChat />
      <MovieDetailPanel />

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur-xl pb-safe">
        <div className="flex items-stretch justify-around px-2 py-1">
          <MobileTab to="/" label="Home" Icon={Home} active={location.pathname === "/"} />
          <MobileTab to="/browse" label="Browse" Icon={Film} active={location.pathname === "/browse"} />
          <MobileTab to="/search" label="Search" Icon={Search} active={location.pathname === "/search"} />
          <MobileTab to="/watchlist" label="Vault" Icon={Library} active={location.pathname === "/watchlist"} />
          <MobileTab to="/profile" label="Profile" Icon={User} active={location.pathname === "/profile"} />
        </div>
      </nav>
    </div>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors relative ${
        active ? "text-white" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),1)]" />
      )}
    </Link>
  );
}

function MobileTab({ to, label, Icon, active }: { to: string; label: string; Icon: any; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium tracking-wide transition-colors ${
        active ? "text-primary" : "text-white/40 hover:text-white/80"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" : ""}`} />
      {label}
    </Link>
  );
}
