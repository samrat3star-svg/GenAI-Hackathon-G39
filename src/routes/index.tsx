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

  const col1 = [...MOVIES, ...MOVIES].slice(0, 12);
  const col2 = [...MOVIES.slice(5), ...MOVIES].slice(0, 12);
  const col3 = [...MOVIES.slice(10), ...MOVIES].slice(0, 12);
  const col4 = [...MOVIES.slice(15), ...MOVIES].slice(0, 12);
  const col5 = [...MOVIES.slice(20), ...MOVIES].slice(0, 12);
  const col6 = [...MOVIES.slice(3), ...MOVIES].slice(0, 12);

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
    <div className="min-h-dvh flex flex-col items-center justify-center text-foreground relative overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>

      {/* Full-screen scrolling poster mosaic */}
      <div className="absolute inset-0 flex gap-2 p-2 pointer-events-none select-none">
        {[col1, col2, col3, col4, col5, col6].map((col, ci) => (
          <div
            key={ci}
            className="flex-1 flex flex-col gap-2"
            style={{
              animation: `scrollColumn ${20 + ci * 3}s linear infinite ${ci % 2 === 0 ? "normal" : "reverse"}`,
            }}
          >
            {[...col, ...col].map((m, i) => (
              <img
                key={m.id + ci + i}
                src={m.poster}
                className="w-full aspect-[2/3] rounded-lg object-cover flex-shrink-0"
                style={{ opacity: 0.6 }}
                alt=""
              />
            ))}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
      {/* Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)" }} />

      {/* CONTENT LAYER: Auth Form */}
      <div className="relative z-30 w-full max-w-sm px-4">
        <div className="backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: "rgba(15,15,15,0.75)" }}>
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold tracking-tight" style={{ color: "#fff" }}>CineVault</h1>
            <p className="text-sm italic mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
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
                className="w-full rounded-xl px-4 py-3 outline-none transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 outline-none transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
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
