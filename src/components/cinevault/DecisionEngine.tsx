import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, RotateCcw, Info } from "lucide-react";
import { Movie } from "@/lib/cinevault/movies";
import { useCineVault } from "./CineVaultProvider";

interface DecisionEngineProps {
  movies: Movie[];
  onClose: () => void;
  onPick: (movie: Movie) => void;
}

export function DecisionEngine({ movies, onClose, onPick }: DecisionEngineProps) {
  const { setDetailMovieId } = useCineVault();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentMovie = movies[currentIndex];

  const next = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (movies.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-lg">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Decision Engine
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Focus on one.</h2>
          <p className="text-white/50 text-sm mt-1">Don't browse. Decide.</p>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentMovie.id}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -20 }}
              className="bg-card border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="aspect-[16/9] relative">
                <img src={currentMovie.poster} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-display font-bold text-white mb-2">{currentMovie.title}</h3>
                <div className="flex justify-center items-center gap-3 text-white/60 text-sm mb-6">
                  <span>{currentMovie.year}</span>
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span>{currentMovie.genres.slice(0, 2).join(", ")}</span>
                </div>
                
                <p className="text-white/80 leading-relaxed mb-8 italic">
                  "{currentMovie.blurb}"
                </p>

                <div className="flex gap-4">
                  <button 
                    onClick={next}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" /> Not Tonight
                  </button>
                  <button 
                    onClick={() => onPick(currentMovie)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all scale-105"
                  >
                    <Check className="w-5 h-5" /> Watch This
                  </button>
                </div>
                
                <button 
                  onClick={() => setDetailMovieId(currentMovie.id)}
                  className="mt-6 text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1 mx-auto"
                >
                  <Info className="w-3.5 h-3.5" /> More Details
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-white/10 rounded-[2rem] p-12 text-center"
            >
              <RotateCcw className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">End of the line.</h3>
              <p className="text-white/50 mb-8">You've seen all your options. Ready to start over or pick from the list?</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setCurrentIndex(0); setIsFinished(false); }}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold"
                >
                  Start Over
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl bg-white/5 text-white font-bold"
                >
                  Back to Vault
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Dots */}
        {!isFinished && (
          <div className="flex justify-center gap-2 mt-8">
            {movies.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
