import { toast } from "sonner";

export function reelToast(message: string) {
  toast(message, {
    duration: 3200,
    className: "reel-toast",
    style: {
      background: "var(--reel)",
      color: "var(--reel-foreground)",
      border: "none",
      fontFamily: "var(--font-display)",
      fontSize: "0.95rem",
      letterSpacing: "-0.01em",
      padding: "0.9rem 1.1rem",
      borderRadius: "0.75rem",
      boxShadow: "0 12px 40px -10px color-mix(in oklab, var(--foreground) 25%, transparent)",
    },
  });
}
