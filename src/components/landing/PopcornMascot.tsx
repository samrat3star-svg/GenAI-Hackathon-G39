import { motion } from "framer-motion";

export function PopcornMascot({ size = 36 }: { size?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative grid place-items-center"
      aria-hidden
    >
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <defs>
          <linearGradient id="pc-cup" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e74c3c" />
            <stop offset="1" stopColor="#a02418" />
          </linearGradient>
        </defs>
        {/* Popcorn fluffs */}
        <g fill="#fff7df">
          <circle cx="22" cy="20" r="9" />
          <circle cx="34" cy="14" r="9" />
          <circle cx="44" cy="22" r="8" />
          <circle cx="28" cy="26" r="7" />
          <circle cx="40" cy="28" r="6" />
        </g>
        <g fill="#f6d77a">
          <circle cx="26" cy="18" r="2.4" />
          <circle cx="38" cy="20" r="2" />
          <circle cx="46" cy="24" r="1.8" />
        </g>
        {/* Cup */}
        <path d="M14 30 L50 30 L46 58 Q32 62 18 58 Z" fill="url(#pc-cup)" />
        <g stroke="#fff" strokeWidth="3" opacity="0.85">
          <line x1="22" y1="32" x2="20" y2="58" />
          <line x1="32" y1="32" x2="32" y2="60" />
          <line x1="42" y1="32" x2="44" y2="58" />
        </g>
        {/* Face */}
        <g fill="#1a1a1a">
          <circle cx="26" cy="44" r="1.6" />
          <circle cx="38" cy="44" r="1.6" />
        </g>
        <path d="M27 49 Q32 53 37 49" stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
