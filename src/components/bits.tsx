import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bookmark, BookmarkCheck, Brain, Compass, Cpu, Eye, Handshake, Heart, Scale, Store, Users, type LucideIcon } from "lucide-react";
import { ethicsLabel, evidenceLabel, stageNames } from "@/data/catalog";
import type { Ethics, Evidence } from "@/data/types";
import type { LessonBits } from "@/lib/plan";
import { useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  heart: Heart,
  handshake: Handshake,
  eye: Eye,
  users: Users,
  scale: Scale,
  cpu: Cpu,
  store: Store,
  compass: Compass,
  brain: Brain,
};

export function DomainIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Compass;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

export function faNum(n: number) {
  return new Intl.NumberFormat("fa-IR").format(n);
}

export function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" | "accent" | "solid" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "muted" && "bg-elevated text-muted",
        tone === "primary" && "bg-primary/15 text-primary",
        tone === "accent" && "bg-accent/15 text-accent",
        tone === "solid" && "border border-border text-fg",
      )}
    >
      {children}
    </span>
  );
}

export function EthicsChip({ ethics }: { ethics: Ethics }) {
  const tone = ethics === "healthy" ? "accent" : ethics === "controversial" ? "primary" : ethics === "manipulative" ? "solid" : "muted";
  return <Chip tone={tone}>{ethicsLabel[ethics]}</Chip>;
}

export function EvidenceChip({ evidence }: { evidence: Evidence }) {
  return <Chip>{evidenceLabel[evidence]}</Chip>;
}

export function StageLine({ stage }: { stage: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{stageNames[stage]}</span>
        <span className="num">{faNum(stage)} / {faNum(9)}</span>
      </div>
      <div className="flex gap-1">
        {stageNames.slice(1).map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < stage ? "bg-primary" : "bg-elevated")} />
        ))}
      </div>
    </div>
  );
}

export function SaveButton({ id }: { id: string }) {
  const saved = useOrbit((s) => s.saved.includes(id));
  const toggle = useOrbit((s) => s.toggleSave);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm text-fg hover:bg-elevated"
    >
      {saved ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
      {saved ? "در کتابخانه" : "ذخیره"}
    </button>
  );
}

export function LessonLink({ bits, className, children }: { bits: LessonBits; className?: string; children: ReactNode }) {
  if (bits.kind === "module") {
    return (
      <Link to="/learn/$moduleId" params={{ moduleId: bits.moduleId }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/technique/$techniqueId" params={{ techniqueId: bits.techniqueId }} className={className}>
      {children}
    </Link>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border border-border bg-surface p-4 md:p-5", className)}>{children}</section>;
}
