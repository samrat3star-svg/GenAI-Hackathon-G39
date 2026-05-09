import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Volume2, Sparkles } from "lucide-react";
import { askKernel } from "@/lib/openai";

const GREETINGS = [
  "🍿 Still deciding? Tell me what kind of evening it is and I'll find the one.",
  "🍿 Your vault has good taste. Let me help you pick tonight's feature.",
  "🍿 I've been waiting. What do you need from a film tonight?",
  "🍿 Half the fun is the pick. What's the vibe?"
];

const SUGGESTIONS = [
  "I need something easy",
  "Surprise me tonight",
  "Something to think about",
  "I want to feel something"
];

export function PopChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dragging State
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cv_fab_pos");
    if (saved) {
      try {
        setPos(JSON.parse(saved));
      } catch (e) {}
    } else {
      setPos({ x: window.innerWidth - 140, y: window.innerHeight - 80 });
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      setMessages([{ role: "assistant", text: randomGreeting }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsLoading(true);
    
    const response = await askKernel(text);
    setMessages(prev => [...prev, { role: "assistant", text: response }]);
    setIsLoading(false);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.1;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Drag Handlers
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setDragging(true);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    const fabWidth = 120;
    const fabHeight = 50;
    let newX = e.clientX - dragOffset.current.x;
    let newY = e.clientY - dragOffset.current.y;

    newX = Math.max(0, Math.min(newX, window.innerWidth - fabWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - fabHeight));

    setPos({ x: newX, y: newY });
  };

  const onPointerUp = (e: PointerEvent) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    setDragging(false);

    const distMoved = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.current.x, 2) + 
      Math.pow(e.clientY - dragStartPos.current.y, 2)
    );

    if (distMoved < 5) {
      setIsOpen(prev => !prev);
    }

    // Snap logic
    setPos(currentPos => {
      // Use approximations for FAB dimensions
      const fabW = 120;
      const fabH = 50;

      const distLeft = currentPos.x;
      const distRight = window.innerWidth - currentPos.x - fabW;
      const distTop = currentPos.y;
      const distBottom = window.innerHeight - currentPos.y - fabH;

      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      let finalX = currentPos.x;
      let finalY = currentPos.y;
      const padding = 16;

      if (minDist === distLeft) {
        finalX = padding;
      } else if (minDist === distRight) {
        finalX = window.innerWidth - fabW - padding;
      } else if (minDist === distTop) {
        finalY = padding;
      } else {
        finalY = window.innerHeight - fabH - padding;
      }

      const snapped = { x: finalX, y: finalY };
      localStorage.setItem("cv_fab_pos", JSON.stringify(snapped));
      return snapped;
    });
  };


  return (
    <>
      <AnimatePresence>
        {!isOpen && mounted && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onPointerDown={onPointerDown}
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y,
              transition: dragging ? "none" : "left 0.3s ease, top 0.3s ease",
              cursor: dragging ? "grabbing" : "grab",
              zIndex: 50,
              userSelect: "none",
              touchAction: "none"
            }}
            className="group relative"
          >
            {/* Tooltip */}
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border border-border text-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              your AI Buddy ✨
            </span>

            {/* Pulsing green online dot */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-background rounded-full flex items-center justify-center pointer-events-none z-10 shadow">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </span>

            {/* Kernel Avatar — transparent BG, fluffy natural shape */}
            <div className="w-[60px] h-[60px] group-hover:scale-110 transition-all duration-200 drop-shadow-2xl overflow-hidden rounded-full flex items-center justify-center">
              <img
                src="/kernel-avatar.png"
                alt="Kernel - your AI Buddy"
                className="w-full h-full object-contain scale-[1.6]"
                draggable={false}
              />
            </div>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-80 md:w-96 bg-card border border-border shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, iterationCount: 1 }}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-base"
                >
                  🍿
                </motion.div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground leading-none">Kernel</h3>
                  <p className="text-xs text-muted-foreground italic mt-0.5">pops up when you need a pick</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="min-h-[220px] max-h-[320px] overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar bg-card"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'assistant' ? 'items-start' : 'items-end'}`}>
                  <div className={`group relative px-4 py-3 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                    msg.role === 'assistant' 
                      ? 'bg-secondary text-foreground rounded-tl-sm self-start' 
                      : 'bg-primary text-primary-foreground rounded-tr-sm self-end shadow-sm'
                  }`}>
                    {msg.text}
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => speak(msg.text)}
                        className="absolute -right-8 bottom-0 p-1.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all"
                        title="Speak response"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Grid */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2 bg-card">
              {SUGGESTIONS.map((chip) => (
                <button 
                  key={chip}
                  onClick={() => handleSuggestion(chip)}
                  className="text-[11px] px-3 py-2 rounded-full border border-border bg-secondary text-foreground hover:border-primary hover:text-primary transition-colors text-left truncate"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <form onSubmit={handleSend} className="flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 focus-within:border-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell Kernel your mood..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading} 
                  className="bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isLoading ? <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Pop
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
