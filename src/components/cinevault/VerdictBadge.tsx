import type { VerdictId } from "@/lib/cinevault/reel";

const LABELS: Record<VerdictId, { label: string; tone: string }> = {
  acquitted: { label: "ACQUITTED", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
  guilty: { label: "GUILTY PLEASURE", tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" },
  life: { label: "LIFE SENTENCE", tone: "bg-primary/15 text-primary border-primary/30" },
  contempt: { label: "CONTEMPT", tone: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function VerdictBadge({ verdict }: { verdict: VerdictId }) {
  const v = LABELS[verdict];
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.18em] ${v.tone}`}>
      {v.label}
    </span>
  );
}
