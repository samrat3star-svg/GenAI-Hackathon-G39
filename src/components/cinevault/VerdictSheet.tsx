import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { VerdictId } from "@/lib/cinevault/reel";
import { motion } from "framer-motion";

const VERDICTS: { id: VerdictId; label: string; tagline: string; tone: string }[] = [
  { id: "acquitted", label: "ACQUITTED", tagline: "It deserved my time.", tone: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30" },
  { id: "guilty", label: "GUILTY PLEASURE", tagline: "Loved it for exactly what it was.", tone: "from-amber-500/20 to-amber-500/5 border-amber-500/30" },
  { id: "life", label: "LIFE SENTENCE", tagline: "I will come back to this forever.", tone: "from-primary/25 to-primary/5 border-primary/40" },
  { id: "contempt", label: "CONTEMPT", tagline: "It took something from me.", tone: "from-destructive/20 to-destructive/5 border-destructive/30" },
];

interface Props {
  open: boolean;
  movieTitle: string;
  onOpenChange: (open: boolean) => void;
  onPick: (verdict: VerdictId) => void;
}

export function VerdictSheet({ open, movieTitle, onOpenChange, onPick }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-border max-w-md">
        <DialogHeader className="text-center">
          <DialogDescription className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            The Verdict
          </DialogDescription>
          <DialogTitle className="font-display text-2xl tracking-tight">
            How did <span className="italic">{movieTitle}</span> land?
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 grid grid-cols-1 gap-2.5">
          {VERDICTS.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onPick(v.id)}
              className={`group rounded-xl border bg-gradient-to-br ${v.tone} px-4 py-3 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]`}
            >
              <div className="text-xs font-semibold tracking-[0.18em] text-foreground">{v.label}</div>
              <div className="mt-1 font-display text-base text-foreground/80">{v.tagline}</div>
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
