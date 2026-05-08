import { Link } from "@tanstack/react-router";
import { User, Search, Popcorn } from "lucide-react";

export function FloatingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
      <div className="absolute inset-0 bg-background/30 backdrop-blur-md border-b border-white/5 shadow-sm rounded-b-3xl"></div>
      
      <div className="relative flex items-center gap-2">
        <Popcorn className="w-6 h-6 text-primary" />
        <span className="font-display text-xl font-bold tracking-tight text-white">CineVault</span>
      </div>

      <div className="relative hidden md:flex items-center gap-8 bg-black/40 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-lg">
        <Link to="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Home</Link>
        <Link to="/search" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Search</Link>
        <Link to="/watchlist" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Watchlist</Link>
      </div>

      <div className="relative flex items-center gap-4">
        <button className="p-2 text-white/70 hover:text-white transition-colors">
          <Search className="w-5 h-5 md:hidden" />
        </button>
        <button className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border border-white/20 shadow-lg">
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </nav>
  );
}
