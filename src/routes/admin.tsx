import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { allModules, domains, mergeTechniques } from "@/data/catalog";
import type { Ethics, Technique } from "@/data/types";
import { EthicsChip, Panel, faNum } from "@/components/bits";
import { aiStatus } from "@/lib/ai.functions";
import { useOrbit } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "استودیو · ORBIT" }] }),
  component: AdminPage,
});

function AdminPage() {
  const edits = useOrbit((s) => s.edits);
  const setEdit = useOrbit((s) => s.setEdit);
  const custom = useOrbit((s) => s.customTechniques);
  const add = useOrbit((s) => s.addTechnique);
  const remove = useOrbit((s) => s.removeTechnique);
  const items = useOrbit((s) => s.items);
  const [moduleId, setModuleId] = useState(allModules()[0]?.module.id ?? "");
  const hit = allModules().find((m) => m.module.id === moduleId);
  const [summary, setSummary] = useState("");
  const [example, setExample] = useState("");
  const [modelOn, setModelOn] = useState<boolean | null>(null);
  const [form, setForm] = useState({ fa: "", en: "", ethics: "neutral" as Ethics, summary: "", mechanism: "", example: "", detect: "", counter: "", useNote: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    void aiStatus().then((r) => setModelOn(r.available)).catch(() => setModelOn(false));
  }, []);

  useEffect(() => {
    if (!hit) return;
    setSummary(edits[hit.module.id]?.summary ?? hit.module.summary);
    setExample(edits[hit.module.id]?.example ?? hit.module.example);
  }, [hit, edits]);

  function saveTechnique() {
    if (form.fa.trim().length < 2 || form.summary.trim().length < 12 || form.counter.trim().length < 8) {
      setError("نام، تعریف و مقابله باید روشن باشند.");
      return;
    }
    const tech: Technique = {
      id: `custom-${Date.now()}`,
      fa: form.fa.trim(),
      en: form.en.trim() || form.fa.trim(),
      ethics: form.ethics,
      evidence: "experiential",
      basis: "افزودهٔ همین دستگاه، بدون بازبینی بیرونی.",
      summary: form.summary.trim(),
      mechanism: form.mechanism.trim() || form.summary.trim(),
      example: form.example.trim() || "مثال هنوز نوشته نشده.",
      detect: form.detect.trim() || "تکرار اثر را ببین، نه یک جملهٔ تنها.",
      counter: form.counter.trim(),
      useNote: form.useNote.trim() || "تا وقتی شفافیت و رضایت روشن نیست، اجرا توصیه نمی‌شود.",
      mistakes: "مورد سفارشی است؛ آن را با پژوهش یکی نگیر.",
      signals: form.fa.trim().split(/\s+/).slice(0, 3),
      keywords: form.fa.trim().split(/\s+/).slice(0, 4),
    };
    add(tech);
    setError("");
    setForm({ fa: "", en: "", ethics: "neutral", summary: "", mechanism: "", example: "", detect: "", counter: "", useNote: "" });
  }

  const practiced = Object.keys(items).length;
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold">استودیو</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          مدیریت محتوای همین دستگاه: ویرایش تعریف درس‌ها و افزودن تکنیک، بدون دست زدن به کد. آمار زیر فقط مال همین مرورگر است نه کاربران دیگر.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        <Panel><p className="text-xs text-muted">حوزه</p><p className="num text-2xl">{faNum(domains.length)}</p></Panel>
        <Panel><p className="text-xs text-muted">درس</p><p className="num text-2xl">{faNum(allModules().length)}</p></Panel>
        <Panel><p className="text-xs text-muted">مورد تمرین‌شده</p><p className="num text-2xl">{faNum(practiced)}</p></Panel>
      </div>
      <Panel className="space-y-3">
        <h2 className="font-semibold">ویرایش درس</h2>
        <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm">
          {domains.map((domain) => (
            <optgroup key={domain.id} label={domain.title}>
              {allModules().filter((m) => m.domain.id === domain.id).map((m) => (
                <option key={m.module.id} value={m.module.id}>{m.module.title}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <label className="block text-sm">تعریف ساده
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none" />
        </label>
        <label className="block text-sm">مثال
          <textarea value={example} onChange={(e) => setExample(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none" />
        </label>
        <button type="button" onClick={() => setEdit(moduleId, { summary, example })} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">ذخیرهٔ ویرایش</button>
      </Panel>
      <Panel className="space-y-3">
        <h2 className="font-semibold">تکنیک تازه</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input label="نام فارسی" value={form.fa} onChange={(fa) => setForm({ ...form, fa })} />
          <Input label="نام انگلیسی" value={form.en} onChange={(en) => setForm({ ...form, en })} />
        </div>
        <label className="block text-sm">وضعیت توصیه
          <select value={form.ethics} onChange={(e) => setForm({ ...form, ethics: e.target.value as Ethics })} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3">
            <option value="healthy">سالم</option>
            <option value="neutral">خنثی</option>
            <option value="controversial">بحث‌برانگیز</option>
            <option value="manipulative">دستکاری‌گرانه</option>
          </select>
        </label>
        <Area label="تعریف" value={form.summary} onChange={(summary) => setForm({ ...form, summary })} />
        <Area label="نحوهٔ اثر" value={form.mechanism} onChange={(mechanism) => setForm({ ...form, mechanism })} />
        <Area label="مثال" value={form.example} onChange={(example) => setForm({ ...form, example })} />
        <Area label="تشخیص" value={form.detect} onChange={(detect) => setForm({ ...form, detect })} />
        <Area label="مقابله" value={form.counter} onChange={(counter) => setForm({ ...form, counter })} />
        <Area label="توصیه" value={form.useNote} onChange={(useNote) => setForm({ ...form, useNote })} />
        {error && <p className="text-sm text-primary">{error}</p>}
        <button type="button" onClick={saveTechnique} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">افزودن به بانک</button>
        <ul className="space-y-2">
          {custom.map((tech) => (
            <li key={tech.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">{tech.fa} <EthicsChip ethics={tech.ethics} /></span>
              <button type="button" className="min-h-11 text-xs text-muted" onClick={() => remove(tech.id)}>حذف</button>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel className="text-sm leading-7">
        <h2 className="font-semibold">مدل‌ها</h2>
        <p>پیش‌فرض گفت‌وگو و ارزیابی: Grok 4.5. وضعیت: {modelOn ? "وصل" : modelOn === false ? "غیرقابل دسترس" : "…"}</p>
        <p className="text-muted">سبک دانشنامه (روان یا سقراطی) از ابزارها عوض می‌شود. مدل بیرونی فقط Grok است و اگر در دسترس نباشد، همان دانشنامه جواب می‌دهد. تکنیک‌های فعال: {faNum(mergeTechniques(custom).length)}.</p>
      </Panel>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">{label}
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none" />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">{label}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none" />
    </label>
  );
}
