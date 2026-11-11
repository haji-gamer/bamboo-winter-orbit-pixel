import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { detectTechniques, mergeTechniques, sampleChat } from "@/data/catalog";
import { EthicsChip, Panel } from "@/components/bits";
import { askOrbit } from "@/lib/ai.functions";
import { useOrbit } from "@/lib/store";
import type { Technique } from "@/data/types";

export const Route = createFileRoute("/analyze")({
  head: () => ({ meta: [{ title: "تحلیل · ORBIT" }] }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const custom = useOrbit((s) => s.customTechniques);
  const [text, setText] = useState("");
  const [hits, setHits] = useState<{ tech: Technique; hits: string[] }[]>([]);
  const [ran, setRan] = useState(false);
  const [ai, setAi] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function run() {
    const found = detectTechniques(text, mergeTechniques(custom)).map((row) => ({ tech: row.tech, hits: row.hits }));
    setHits(found);
    setRan(true);
    setAi(null);
  }

  async function deepen() {
    setBusy(true);
    try {
      const res = await askOrbit({ data: { mode: "analyze", messages: [{ role: "user", content: text }] } });
      setAi(res.ok ? res.text : "مدل در دسترس نیست. نتیجهٔ بالا از تطبیق عبارت‌های بانک تکنیک است.");
    } catch {
      setAi("تحلیل مدل انجام نشد.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <header>
        <h1 className="text-3xl font-bold">تحلیل مکالمه</h1>
        <p className="mt-2 text-sm leading-7 text-muted">متن را بگذار تا الگوهای محتمل از بانک تکنیک پیدا شود. تطبیق عبارت قطعی نیست؛ اگر نشانه‌ها کم باشد چیزی نشان داده نمی‌شود.</p>
      </header>
      <textarea value={text} onChange={(e) => setText(e.target.value)} dir="auto" rows={7} className="w-full rounded-2xl border border-border bg-surface px-3 py-3 text-sm leading-7 outline-none" placeholder="مکالمه را اینجا بنویس" />
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={run} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">تشخیص محلی</button>
        <button type="button" onClick={() => setText(sampleChat)} className="min-h-11 rounded-xl border border-border px-4 text-sm">نمونهٔ آزمایشی</button>
        <button type="button" disabled={busy || text.trim().length < 12} onClick={() => void deepen()} className="min-h-11 rounded-xl border border-border px-4 text-sm disabled:opacity-40">{busy ? "…" : "تحلیل با مدل"}</button>
      </div>
      {ran && hits.length === 0 && <p className="text-sm text-muted">الگوی آشنایی پیدا نشد. یا متن کوتاه است یا در بانک این نسخه نشانه‌ای ندارد.</p>}
      {hits.map((row) => (
        <Panel key={row.tech.id} className="space-y-2 text-sm leading-7">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/technique/$techniqueId" params={{ techniqueId: row.tech.id }} className="font-semibold">{row.tech.fa}</Link>
            <EthicsChip ethics={row.tech.ethics} />
          </div>
          <p>هدف احتمالی: {row.tech.mechanism}</p>
          <p>مقابله: {row.tech.counter}</p>
          {row.hits.length > 0 && <p className="text-xs text-muted">عبارت‌های دیده‌شده: {row.hits.join("، ")}</p>}
        </Panel>
      ))}
      {ai && <Panel><p className="whitespace-pre-wrap text-sm leading-7">{ai}</p></Panel>}
    </div>
  );
}
