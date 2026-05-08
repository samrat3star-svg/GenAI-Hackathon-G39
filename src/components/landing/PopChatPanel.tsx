import { AnimatePresence, motion } from "framer-motion";
import { Mic, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PopcornMascot } from "./PopcornMascot";
import { popchatReply, SUGGESTION_CHIPS, type PopChatMessage } from "@/lib/landing/popchat";

const uid = () => Math.random().toString(36).slice(2, 9);

export function PopChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<PopChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      text: "Hey, I'm PopChat 🍿 — tell me a mood and I'll find your movie.",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
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

  const onMic = () => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      setMessages((m) => [
        ...m,
        { id: uid(), role: "assistant", text: "Voice isn't supported in this browser — type away." },
      ]);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript as string;
      setInput(t);
      setListening(false);
      setTimeout(() => send(t), 100);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
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
            className="fixed bottom-0 right-0 z-50 flex h-[80dvh] w-full flex-col overflow-hidden border border-white/10 bg-black/85 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:bottom-24 sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <PopcornMascot size={32} />
                <div>
                  <p className="font-display text-base font-semibold text-white">PopChat 🍿</p>
                  <p className="text-[11px] text-white/50">Your movie buddy</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-white/60 hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) =>
                m.role === "assistant" ? (
                  <div key={m.id} className="flex items-start gap-2">
                    <div className="mt-1"><PopcornMascot size={22} /></div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/90">
                      <p>{m.text}</p>
                      {m.picks && m.picks.length > 0 && (
                        <ul className="mt-2 space-y-1 text-[13px] text-white/70">
                          {m.picks.map((p) => (
                            <li key={p.id}>· {p.title}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary/90 px-3.5 py-2.5 text-sm font-medium text-primary-foreground">
                      {m.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-white/5 px-3 pb-3 pt-2">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {SUGGESTION_CHIPS.map((c) => (
                  <button
                    key={c}
                    onClick={() => send(c)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What are you in the mood for?"
                  className="flex-1 bg-transparent px-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onMic}
                  aria-label="Voice"
                  className={`grid h-8 w-8 place-items-center rounded-full transition ${listening ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/5"}`}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
