import { Link } from "@tanstack/react-router";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";

const links = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search" },
  { to: "/watchlist", label: "Watchlist" },
] as const;

export function CinemaNavbar() {
  const [open, setOpen] = useState(false);
  const { archetypeData } = useCineVault();
  const initial = archetypeData?.name?.[0]?.toUpperCase() ?? "C";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/20 ring-1 ring-primary/40">
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-white">
              CineVault
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                activeProps={{ className: "bg-white/10 text-white" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="hidden rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white sm:inline-flex"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground shadow-md"
              aria-label="Profile"
            >
              {initial}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 hover:bg-white/5 md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-3 top-3 rounded-3xl border border-white/10 bg-black/80 p-4 backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-base text-white">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 text-white/70 hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base text-white/90 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
