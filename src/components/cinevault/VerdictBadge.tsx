import type { VerdictId } from "@/lib/cinevault/reel";

const LABELS: Record<VerdictId, { label: string; tone: string }> = {
  acquitted: { label: "ACQUITTED", tone: "text-green-500 border-green-500" },
  guilty: { label: "GUILTY PLEASURE", tone: "text-amber-500 border-amber-500" },
  life: { label: "LIFE SENTENCE", tone: "text-primary border-primary" },
  contempt: { label: "CONTEMPT", tone: "text-red-500 border-red-500" },
};

export function VerdictBadge({ verdict, size = "md" }: { verdict: VerdictId; size?: "xs" | "sm" | "md" }) {
  const v = LABELS[verdict];
  const sizeClasses = {
    xs: "text-[9px] px-1.5 py-0",
    sm: "text-[10px] px-2 py-0.5",
    md: "text-[10px] px-2 py-0.5",
  };
  
  return (
    <span className={`inline-block border rounded-full font-bold uppercase tracking-widest w-fit ${sizeClasses[size]} ${v.tone}`}>
      {v.label}
    </span>
  );
}
