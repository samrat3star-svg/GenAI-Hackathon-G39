import { motion } from "framer-motion";
import { useState } from "react";
import { PopcornMascot } from "./PopcornMascot";
import { PopChatPanel } from "./PopChatPanel";

export function PopChatFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open PopChat"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_15px_40px_-10px_var(--primary)] ring-1 ring-white/20 sm:bottom-6 sm:right-6"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-xl" />
        <PopcornMascot size={34} />
      </motion.button>
      <PopChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
