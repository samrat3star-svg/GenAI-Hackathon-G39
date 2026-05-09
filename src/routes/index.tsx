import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { MOVIES } from "@/lib/cinevault/movies";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const authed = localStorage.getItem("cv_authed");
    const archetype = localStorage.getItem("cv_archetype");
    
    // If already logged in, skip the auth/landing page
    if (authed === "true") {
      throw redirect({ to: archetype ? "/watchlist" : "/onboarding" });
    }
  },
  component: LandingAuthPage,
});

function LandingAuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(true);

  const posters = MOVIES.slice(0, 18);

  const getDestination = () => {
    const archetype = localStorage.getItem("cv_archetype");
    return archetype ? "/watchlist" : "/onboarding";
  };

  const handleSignUp = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    localStorage.setItem("cv_authed", "true");
    navigate({ to: getDestination() });
  };

  const handleLogIn = () => {
    const authed = localStorage.getItem("cv_authed");
    // For this mock app, we'll allow login if they've signed up before (cv_authed exists)
    // or just allow it for demo purposes if they enter anything.
    // But let's stick to the logic:
    if (authed === "true") {
      navigate({ to: getDestination() });
    } else {
      // For a better first-time experience, let's just let them "log in" if they have data
      // but if the site is totally fresh, force sign up.
      setError("No account found. Please sign up first.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) handleSignUp();
    else handleLogIn();
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Animated Film Grain */}
      <div className="grain-overlay" />

      {/* BACKGROUND LAYER: Cinematic Poster Grid */}
      <div className="absolute inset-0 overflow-hidden flex gap-3 p-4 rotate-[-8deg] scale-[1.3] origin-center pointer-events-none select-none">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {posters.slice(0, 6).map((m, i) => (
            <img key={m.id + i} src={m.poster} className="w-32 aspect-[2/3] rounded-xl object-cover opacity-30 grayscale-[20%]" alt="" />
          ))}
        </div>
        {/* Column 2 - Offset */}
        <div className="flex flex-col gap-3 -translate-y-10">
          {posters.slice(6, 12).map((m, i) => (
            <img key={m.id + i} src={m.poster} className="w-32 aspect-[2/3] rounded-xl object-cover opacity-30 grayscale-[20%]" alt="" />
          ))}
        </div>
        {/* Column 3 - More Offset */}
        <div className="flex flex-col gap-3 -translate-y-20">
          {posters.slice(12, 18).map((m, i) => (
            <img key={m.id + i} src={m.poster} className="w-32 aspect-[2/3] rounded-xl object-cover opacity-30 grayscale-[20%]" alt="" />
          ))}
        </div>
        <div className="hidden lg:flex flex-col gap-3 translate-y-5">
          {posters.slice(0, 6).map((m, i) => (
            <img key={m.id + i + 'extra'} src={m.poster} className="w-32 aspect-[2/3] rounded-xl object-cover opacity-30 grayscale-[20%]" alt="" />
          ))}
        </div>
      </div>

      {/* OVERLAY LAYER: Gradients */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background via-transparent/30 to-background" />
      <div className="absolute inset-0 z-10 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />

      {/* CONTENT LAYER: Auth Form */}
      <div className="relative z-30 w-full max-w-sm px-4">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">CineVault</h1>
            <p className="text-sm text-muted-foreground italic mt-2">
              The watchlist that finally has opinions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="you@cinema.com"
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="••••••••"
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <p className="text-xs text-center font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground rounded-full py-3 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full bg-secondary/50 text-foreground border border-border rounded-full py-3 font-medium hover:border-primary transition-colors"
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </div>

            <p 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-muted-foreground text-center mt-4 cursor-pointer hover:text-primary transition-colors font-medium"
            >
              {isSignUp ? "Already have an account? Log In" : "New here? Sign Up"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
