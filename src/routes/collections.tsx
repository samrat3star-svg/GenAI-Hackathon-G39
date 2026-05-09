import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/cinevault/AppShell";
import { useCineVault } from "@/components/cinevault/CineVaultProvider";
import { type Collection } from "@/lib/cinevault/storage";
import { MOVIES } from "@/lib/cinevault/movies";
import { Film, Plus, X, Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
});

const EMOJIS = ["🎬", "🎭", "🌙", "⚡", "🔥", "💀", "❤️", "🧠", "🌊", "🎪", "👻", "🚀", "🎸", "🍿", "🌈", "🤯"];

function CollectionsPage() {
  const { collections, createCollection, deleteCollection, addMovieToCollection, removeMovieFromCollection, addCollaborator } = useCineVault();
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("🎬");
  const [newDesc, setNewDesc] = useState("");

  const [isAddFilmModalOpen, setIsAddFilmModalOpen] = useState(false);
  const [filmSearchQuery, setFilmSearchQuery] = useState("");

  const [collabInput, setCollabInput] = useState("");
  const [showCollabInput, setShowCollabInput] = useState(false);

  const activeCollection = collections.find(c => c.id === activeCollectionId);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCollection(newName.trim(), newEmoji, newDesc.trim());
    setIsNewModalOpen(false);
    setNewName("");
    setNewEmoji("🎬");
    setNewDesc("");
    // Find the newly created collection (it will be the last one)
    // We can't synchronously get it since state update is async, 
    // but we can let the user click it from the grid.
  };

  const filteredMovies = useMemo(() => {
    if (!filmSearchQuery.trim()) return MOVIES;
    const q = filmSearchQuery.toLowerCase();
    return MOVIES.filter(m => m.title.toLowerCase().includes(q) || m.genres.some(g => g.toLowerCase().includes(q)));
  }, [filmSearchQuery]);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-32">
        {!activeCollection ? (
          /* VIEW A — Collections grid */
          <>
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl text-foreground font-bold">Collections</h1>
                <p className="text-muted-foreground text-sm mt-1">Organise your vault. Build something worth sharing.</p>
              </div>
              <button 
                onClick={() => setIsNewModalOpen(true)}
                className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
              >
                + New Collection
              </button>
            </div>

            {collections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Film className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-foreground/80 font-medium mb-4">No collections yet. Create your first one.</p>
                <button 
                  onClick={() => setIsNewModalOpen(true)}
                  className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
                >
                  + New Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {collections.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setActiveCollectionId(c.id)}
                    className="group flex flex-col items-center p-4 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-full aspect-square bg-secondary rounded-2xl flex items-center justify-center text-4xl mb-3">
                      {c.emoji}
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground text-center line-clamp-1">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.movieIds.length} films</p>
                    {c.collaborators.length > 0 && (
                      <div className="flex items-center justify-center mt-2 -space-x-2">
                        {c.collaborators.slice(0, 3).map((collab, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-card z-10 relative" style={{ zIndex: 10 - i }}>
                            {collab.charAt(0).toUpperCase()}
                          </div>
                        ))}
                        {c.collaborators.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground border-2 border-card z-0 relative">
                            +{c.collaborators.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* VIEW B — Single collection detail */
          <>
            <button 
              onClick={() => setActiveCollectionId(null)}
              className="text-muted-foreground hover:text-foreground text-sm font-medium mb-6 flex items-center gap-1 transition-colors"
            >
              ← Collections
            </button>
            
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-5xl mb-4">{activeCollection.emoji}</span>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">{activeCollection.name}</h1>
              {activeCollection.description && (
                <p className="text-muted-foreground italic text-sm max-w-md">{activeCollection.description}</p>
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {activeCollection.collaborators.map((c, i) => (
                  <span key={i} className="bg-secondary text-foreground text-xs rounded-full px-3 py-1 font-medium border border-border">
                    {c}
                  </span>
                ))}
                
                {!showCollabInput ? (
                  <button 
                    onClick={() => setShowCollabInput(true)}
                    className="flex items-center gap-1 bg-secondary border border-dashed border-muted-foreground/50 text-foreground text-xs rounded-full px-3 py-1 font-medium hover:border-primary/50 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add person
                  </button>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (collabInput.trim()) {
                        addCollaborator(activeCollection.id, collabInput.trim());
                        setCollabInput("");
                        setShowCollabInput(false);
                      }
                    }}
                  >
                    <input 
                      autoFocus
                      value={collabInput}
                      onChange={e => setCollabInput(e.target.value)}
                      onBlur={() => setShowCollabInput(false)}
                      placeholder="Name..."
                      className="bg-secondary text-foreground text-xs rounded-full px-3 py-1 border border-primary outline-none w-24"
                    />
                  </form>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">Films</h2>
              <button 
                onClick={() => setIsAddFilmModalOpen(true)}
                className="flex items-center gap-1 bg-secondary text-foreground text-sm font-medium rounded-full px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
              >
                <Plus className="w-4 h-4" /> Add Film
              </button>
            </div>

            {activeCollection.movieIds.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/50">
                <p className="text-muted-foreground text-sm">No films yet. Add something worth watching together.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {activeCollection.movieIds.map(id => {
                  const m = MOVIES.find(movie => movie.id === id);
                  if (!m) return null;
                  return (
                    <div key={id} className="group relative flex flex-col">
                      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-muted relative">
                        <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeMovieFromCollection(activeCollection.id, id); }}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md hover:scale-110"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs text-foreground font-medium truncate mt-1">{m.title}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-20 text-center">
              <button 
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this collection?")) {
                    deleteCollection(activeCollection.id);
                    setActiveCollectionId(null);
                  }
                }}
                className="text-destructive text-sm underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Delete Collection
              </button>
            </div>
          </>
        )}
      </div>

      {/* MODAL: New Collection */}
      <Dialog open={isNewModalOpen} onOpenChange={setIsNewModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">New Collection</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Pick an icon</p>
              <div className="grid grid-cols-8 gap-2">
                {EMOJIS.map(e => (
                  <button 
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={`text-xl aspect-square flex items-center justify-center rounded-xl transition-all ${newEmoji === e ? 'border-2 border-primary scale-110 bg-secondary' : 'border border-transparent hover:bg-secondary/50'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Name</p>
              <input 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Sunday Night Cinema"
                className="bg-secondary border border-border rounded-xl px-4 py-2.5 text-foreground w-full focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Description <span className="text-muted-foreground font-normal">(optional)</span></p>
              <input 
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="What's this collection about?"
                className="bg-secondary border border-border rounded-xl px-4 py-2.5 text-foreground w-full focus:border-primary outline-none transition-colors"
              />
            </div>
            <button 
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="bg-primary text-primary-foreground w-full rounded-full py-3 font-semibold mt-4 disabled:opacity-50 transition-opacity"
            >
              Create Collection
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL: Add Film */}
      <Dialog open={isAddFilmModalOpen} onOpenChange={setIsAddFilmModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border overflow-hidden flex flex-col max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add to {activeCollection?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative mt-2 mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              value={filmSearchQuery}
              onChange={e => setFilmSearchQuery(e.target.value)}
              placeholder="Search films..."
              className="w-full bg-secondary border border-border rounded-full pl-10 pr-4 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="overflow-y-auto flex-1 hide-scrollbar space-y-2 pr-2">
            {filteredMovies.map(m => {
              const isAdded = activeCollection?.movieIds.includes(m.id);
              return (
                <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary transition-colors">
                  <img src={m.poster} alt={m.title} className="w-10 aspect-[2/3] rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.year}</p>
                  </div>
                  <button 
                    disabled={isAdded}
                    onClick={() => activeCollection && addMovieToCollection(activeCollection.id, m.id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      isAdded ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground hover:scale-105"
                    }`}
                  >
                    {isAdded ? "Added ✓" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

    </AppShell>
  );
}
