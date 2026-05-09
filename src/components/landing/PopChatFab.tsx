import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { PopChatPanel } from "./PopChatPanel";

export function PopChatFab() {
  const [open, setOpen] = useState(false);
  
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
      setOpen(prev => !prev);
    }

    // Snap logic
    setPos(currentPos => {
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
      {mounted && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 20 }}
          onPointerDown={onPointerDown}
          aria-label="Open PopChat"
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            transition: dragging ? "none" : "left 0.3s ease, top 0.3s ease",
            cursor: dragging ? "grabbing" : "grab",
            zIndex: 40,
            userSelect: "none",
            touchAction: "none"
          }}
          className="group relative flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-xl hover:scale-105 transition-transform flex-row px-4 py-2.5"
        >
          <span className="text-base leading-none">🍿</span>
          <span className="text-sm font-display font-bold tracking-wide leading-none">
            Kernel
          </span>
          {/* Pulsing status dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-background rounded-full flex items-center justify-center pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </span>
        </motion.button>
      )}
      <PopChatPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
