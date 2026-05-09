import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { popchatReply, type PopChatMessage } from "@/lib/landing/popchat";

const uid = () => Math.random().toString(36).slice(2, 9);

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

export function PopChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<PopChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      setMessages([{ id: uid(), role: "assistant", text: randomGreeting }]);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: PopChatMessage = { id: uid(), role: "user", text: t };
    const reply = popchatReply(t);
    const aiMsg: PopChatMessage = { id: uid(), role: "assistant", ...reply };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] sm:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-0 right-0 z-50 flex h-[80dvh] w-full flex-col overflow-hidden border border-border bg-card shadow-2xl sm:bottom-24 sm:right-6 sm:h-[560px] sm:w-96 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: 0 }}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-base"
                >
                  🍿
                </motion.div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground leading-none">Kernel</p>
                  <p className="text-xs text-muted-foreground italic mt-0.5">pops up when you need a pick</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 hide-scrollbar min-h-[220px]">
              {messages.map((m) =>
                m.role === "assistant" ? (
                  <div key={m.id} className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary text-foreground px-4 py-3 text-sm leading-relaxed self-start">
                      <p>{m.text}</p>
                      {m.picks && m.picks.length > 0 && (
                        <ul className="mt-2 space-y-1 text-[13px] opacity-80 border-t border-foreground/10 pt-2">
                          {m.picks.map((p) => (
                            <li key={p.id}>· {p.title}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-3 text-sm self-end">
                      {m.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Suggestions Grid */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
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
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 focus-within:border-primary/50 transition-colors"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell Kernel your mood..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Pop
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
