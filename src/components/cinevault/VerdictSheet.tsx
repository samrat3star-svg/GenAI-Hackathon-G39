import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

export type VerdictId = "acquitted" | "guilty" | "life" | "contempt";

interface VerdictSheetProps {
  open: boolean;
  movieTitle: string;
  onOpenChange: (open: boolean) => void;
  onPick: (v: VerdictId) => void;
}

const VERDICTS = [
  {
    id: "acquitted",
    label: "ACQUITTED",
    desc: "It deserved my time.",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  {
    id: "guilty",
    label: "GUILTY PLEASURE",
    desc: "Loved it for exactly what it was.",
    color: "bg-pink-500/10 text-pink-500 border-pink-500/30 hover:bg-pink-500/20",
  },
  {
    id: "life",
    label: "LIFE SENTENCE",
    desc: "I'll come back to this forever.",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20",
  },
  {
    id: "contempt",
    label: "CONTEMPT",
    desc: "It took something from me.",
    color: "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20",
  },
] as const;

export function VerdictSheet({ open, movieTitle, onOpenChange, onPick }: VerdictSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl sm:max-w-xl sm:mx-auto p-6 md:p-8">
        <SheetHeader className="text-left mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4 border border-white/10">
            <Gavel className="w-6 h-6 text-primary" />
          </div>
          <SheetTitle className="font-display text-2xl md:text-3xl text-white">
            How did <span className="text-primary italic">{movieTitle}</span> land?
          </SheetTitle>
          <p className="text-white/50 text-sm">Select a verdict. This replaces star ratings.</p>
        </SheetHeader>

        <div className="grid gap-3 pb-8">
          {VERDICTS.map((v, i) => (
            <motion.button
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onPick(v.id as VerdictId)}
              className={`flex flex-col items-start p-4 rounded-xl border transition-all duration-300 ${v.color} group`}
            >
              <span className="font-display font-bold text-lg tracking-widest">{v.label}</span>
              <span className="text-sm opacity-80 mt-1">{v.desc}</span>
            </motion.button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
