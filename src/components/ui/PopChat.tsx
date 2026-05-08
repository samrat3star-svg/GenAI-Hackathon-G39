import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, X, MessageSquare } from "lucide-react";

export function PopChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "What are you in the mood for tonight?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    
    // Fake typing simulation
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: "Something dark but beautiful. I'd suggest Blade Runner 2049. Trust me." }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-lg border border-white/20 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors" />
            <span className="text-2xl relative z-10">🍿</span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[340px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍿</span>
                <div>
                  <h3 className="font-semibold text-white text-sm">PopChat</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Your Movie Buddy</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  {msg.role === 'assistant' && <span className="text-xl mr-2 mt-1">🍿</span>}
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-white/10 text-white/90 rounded-tl-sm' 
                      : 'bg-primary text-primary-foreground rounded-tr-sm shadow-[0_0_15px_rgba(var(--primary),0.3)]'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {["Recommend a thriller", "Easy weekend watch"].map((chip) => (
                  <button 
                    key={chip}
                    onClick={() => { setInput(chip); handleSend(); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/60">
              <form onSubmit={handleSend} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 focus-within:border-primary/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a mood..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
                <button type="button" className="text-white/40 hover:text-white transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button type="submit" disabled={!input.trim()} className="text-primary disabled:opacity-50 hover:text-primary/80 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
