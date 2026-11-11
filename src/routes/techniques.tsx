import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ethicsLabel, mergeTechniques } from "@/data/catalog";
import type { Ethics } from "@/data/types";
import { EthicsChip, Panel } from "@/components/bits";
import { useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/techniques")({
  head: () => ({ meta: [{ title: "تکنیک‌ها · ORBIT" }] }),
  component: TechniquesPage,
});

const filters: { id: "all" | Ethics; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "healthy", label: ethicsLabel.healthy },
  { id: "neutral", label: ethicsLabel.neutral },
  { id: "controversial", label: ethicsLabel.controversial },
  { id: "manipulative", label: ethicsLabel.manipulative },
];

function TechniquesPage() {
  const custom = useOrbit((s) => s.customTechniques);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    return mergeTechniques(custom).filter((tech) => {
      if (filter !== "all" && tech.ethics !== filter) return false;
      const blob = `${tech.fa} ${tech.en} ${tech.summary}`.toLowerCase();
      return blob.includes(q.trim().toLowerCase());
    });
  }, [custom, filter, q]);
  return (
    <div className="space-y-5">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold">بانک تکنیک‌ها</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          شناخت یک تکنیک با توصیهٔ آن یکی نیست. موردهای دستکاری‌گرانه حذف نشده‌اند تا دیده و مهار شوند، نه اینکه اجرا شوند.
        </p>
      </header>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="نام فارسی یا انگلیسی" className="h-11 w-full max-w-md rounded-xl border border-border bg-surface px-3 text-sm outline-none" />
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item.id} type="button" onClick={() => setFilter(item.id)} className={cn("min-h-11 rounded-full border px-3 text-sm", filter === item.id ? "border-primary text-primary" : "border-border text-muted")}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-2">
        {list.map((tech) => (
          <Link key={tech.id} to="/technique/$techniqueId" params={{ techniqueId: tech.id }}>
            <Panel className="flex flex-wrap items-start justify-between gap-3 hover:bg-elevated">
              <span>
                <span className="block font-medium">{tech.fa}</span>
                <span className="text-xs text-muted" dir="ltr">{tech.en}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{tech.summary}</span>
              </span>
              <EthicsChip ethics={tech.ethics} />
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
