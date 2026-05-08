import { Link, useLocation } from "@tanstack/react-router";
import { Search, Library, Settings2 } from "lucide-react";
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
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <Link to="/watchlist" className="font-display text-xl font-semibold tracking-tight">
            CineVault
          </Link>
          <div className="flex items-center gap-3">
            {archetypeData && (
              <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {archetypeData.name}
              </span>
            )}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Settings"
                  className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Settings2 className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground">
                <SheetHeader>
                  <SheetTitle className="font-display">Demo controls</SheetTitle>
                  <SheetDescription>
                    Switch archetype to see the whole app re-skin instantly.
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
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left text-sm hover:bg-secondary transition-colors"
                    >
                      <span className="font-display">{ARCHETYPES[id].name}</span>
                      <span className="text-xs text-muted-foreground">{ARCHETYPES[id].tagline}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      seedDemo(DEMO_SEED);
                      setOpen(false);
                    }}
                  >
                    Seed 8 demo films
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      reset();
                      setOpen(false);
                      window.location.href = "/";
                    }}
                  >
                    Reset everything
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-5 pb-32 pt-6">{children}</div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-stretch">
          <TabLink to="/search" label="Search" Icon={Search} active={location.pathname === "/search"} />
          <TabLink to="/watchlist" label="Watchlist" Icon={Library} active={location.pathname === "/watchlist"} />
        </div>
      </nav>
    </div>
  );
}

function TabLink({
  to,
  label,
  Icon,
  active,
}: {
  to: "/search" | "/watchlist";
  label: string;
  Icon: typeof Search;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}
