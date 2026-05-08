import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { MOVIES } from "@/lib/cinevault/movies";
import { Film, Users, ShieldCheck, Clock, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { archetypeData, watchlist } = useCineVault();
  
  if (!archetypeData) return null;

  const watched = watchlist.filter(w => w.watched);
  const recentWatches = watched.slice(0, 4).map(w => MOVIES.find(m => m.id === w.movieId)).filter(Boolean);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto pt-12 px-6 pb-32">
        {/* Profile Header */}
        <div className="relative flex flex-col items-center text-center mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          
          <div className="relative w-28 h-28 rounded-full border-2 border-primary p-1 mb-4">
            <div className="w-full h-full rounded-full bg-black/50 overflow-hidden relative">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=cinevault&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <h1 className="relative font-display text-3xl font-bold text-white tracking-tight mb-1">
            Alex Cinematic
          </h1>
          <p className="relative text-primary font-medium tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {archetypeData.name}
          </p>
          <p className="relative text-white/60 text-sm max-w-sm">
            {archetypeData.tagline}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard title="Total Vaulted" value={watchlist.length.toString()} icon={<Film className="w-4 h-4" />} />
          <StatCard title="Watched" value={watched.length.toString()} icon={<Clock className="w-4 h-4" />} />
          <StatCard title="Top Verdict" value="LIFE SENTENCE" valueColor="text-amber-500" icon={<ShieldCheck className="w-4 h-4 text-amber-500" />} />
          <StatCard title="Collaborators" value="3" icon={<Users className="w-4 h-4" />} />
        </div>

        {/* Collaborative Lists */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white">Shared Vaults</h2>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Create New</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 p-5 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Film className="w-6 h-6 text-white/70" />
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800" />
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-700" />
                </div>
              </div>
              <h3 className="relative z-10 font-display text-xl font-semibold text-white mb-1">Sunday Night Cinema</h3>
              <p className="relative z-10 text-sm text-white/50">12 Movies · Priya added 'Whiplash'</p>
            </div>
          </div>
        </div>

        {/* Recent Watches */}
        {recentWatches.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Recent Watches</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentWatches.map((movie: any) => (
                <div key={movie.id} className="group relative rounded-xl overflow-hidden aspect-[2/3]">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <h4 className="text-white font-semibold text-sm line-clamp-1">{movie.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function StatCard({ title, value, icon, valueColor = "text-white" }: { title: string, value: string, icon: React.ReactNode, valueColor?: string }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        {icon} {title}
      </div>
      <div className={`font-display text-3xl font-bold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
