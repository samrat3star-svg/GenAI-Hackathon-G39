import React from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Search, Library, Settings2, User, FolderHeart } from "lucide-react";
import { useState } from "react";
import { useCineVault } from "./CineVaultProvider";
import { ARCHETYPE_IDS, ARCHETYPES } from "@/lib/cinevault/archetypes";
import {
  Sheet,
  SheetContent,
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
  const { setArchetype, seedDemo } = useCineVault();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("cv_authed");
    localStorage.removeItem("cv_archetype");
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground selection:bg-primary/30 pb-20 md:pb-0">

      {/* Desktop Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center justify-between px-8 py-4 mx-auto w-full max-w-screen-2xl">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-xl border-b border-border shadow-sm rounded-b-3xl"></div>

        <div className="relative flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">CineVault</span>
        </div>

        {/* Desktop nav: Vault first, then Collections, then Search */}
        <div className="relative flex items-center gap-8 bg-card/80 px-8 py-3 rounded-full border border-border backdrop-blur-lg shadow-md">
          <NavLink to="/watchlist" label="Vault" active={location.pathname === "/watchlist"} primary />
          <NavLink to="/collections" label="Collections" active={location.pathname === "/collections"} />
          <NavLink to="/search" label="Search" active={location.pathname === "/search"} />
        </div>

        <div className="relative flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Settings"
                className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings2 className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card/95 backdrop-blur-xl border-l border-border z-[100]">
              <SheetHeader>
                <SheetTitle className="font-display text-foreground">Switch Archetype</SheetTitle>
              </SheetHeader>
              <div className="mt-6 grid gap-2">
                {ARCHETYPE_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setArchetype(id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3 text-left text-sm hover:bg-secondary/80 hover:border-primary/40 transition-colors"
                  >
                    <span className="font-display text-foreground">{ARCHETYPES[id].name}</span>
                    <span className="text-xs text-muted-foreground">{ARCHETYPES[id].tagline}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-2">
                <Button variant="secondary" onClick={() => { seedDemo(DEMO_SEED); setOpen(false); }}>
                  Seed 8 demo films
                </Button>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link 
            to="/profile" 
            title="Your Profile"
            className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-border shadow-lg hover:scale-105 transition-transform"
          >
            <User className="w-5 h-5 text-primary-foreground" />
          </Link>
        </div>
      </nav>

      {/* Mobile Profile & Settings Icons (Top Right) */}
      <div className="md:hidden fixed top-4 right-4 z-50 flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Settings"
              className="w-11 h-11 rounded-full bg-card/80 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shadow-lg active:scale-95"
            >
              <Settings2 className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card/95 backdrop-blur-xl border-l border-border z-[100]">
            <SheetHeader>
              <SheetTitle className="font-display text-foreground">Switch Archetype</SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-2">
              {ARCHETYPE_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setArchetype(id);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3 text-left text-sm hover:bg-secondary/80 hover:border-primary/40 transition-colors"
                >
                  <span className="font-display text-foreground">{ARCHETYPES[id].name}</span>
                  <span className="text-xs text-muted-foreground">{ARCHETYPES[id].tagline}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-2">
              <Button variant="secondary" onClick={() => { seedDemo(DEMO_SEED); setOpen(false); }}>
                Seed 8 demo films
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Link 
          to="/profile" 
          title="Your Profile"
          className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-border shadow-xl active:scale-95 transition-transform backdrop-blur-md"
        >
          <User className="w-5 h-5 text-primary-foreground" />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto md:pt-24">{children}</main>

      {/* Global Overlays */}
      <PopChat />
      <MovieDetailPanel />

      {/* Mobile Bottom Navigation — Vault, Collections, and Search */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/90 backdrop-blur-xl pb-safe">
        <div className="flex items-stretch justify-center gap-6 px-4 py-1">
          <MobileTab to="/search" label="Search" Icon={Search} active={location.pathname === "/search"} />
          <MobileTab to="/watchlist" label="Vault" Icon={Library} active={location.pathname === "/watchlist"} primary />
          <MobileTab to="/collections" label="Collections" Icon={FolderHeart} active={location.pathname === "/collections"} />
        </div>
      </nav>
    </div>
  );
}

function NavLink({ to, label, active, primary }: { to: string; label: string; active: boolean; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-all duration-200 relative ${
        active
          ? primary ? "text-primary font-semibold" : "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ease-out" />
      )}
    </Link>
  );
}

function MobileTab({ to, label, Icon, active, primary }: { to: string; label: string; Icon: any; active: boolean; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 py-3 text-[10px] font-medium tracking-wide transition-colors ${
        primary
          ? `w-20 ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
          : `w-20 ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
      }`}
    >
      {primary ? (
        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
          active ? "bg-primary shadow-[0_0_16px_rgba(var(--primary),0.5)]" : "bg-secondary border border-border"
        }`}>
          <Icon className={`h-5 w-5 ${active ? "text-primary-foreground" : ""}`} />
        </div>
      ) : (
        <Icon className="h-5 w-5" />
      )}
      {label}
    </Link>
  );
}
