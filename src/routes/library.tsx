import { createFileRoute, Link } from "@tanstack/react-router";
import { getModule, getTechnique } from "@/data/catalog";
import { Panel } from "@/components/bits";
import { useOrbit } from "@/lib/store";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "کتابخانه · ORBIT" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  const saved = useOrbit((s) => s.saved);
  const notes = useOrbit((s) => s.notes);
  const custom = useOrbit((s) => s.customTechniques);
  const setNote = useOrbit((s) => s.setNote);
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <header>
        <h1 className="text-3xl font-bold">کتابخانهٔ شخصی</h1>
        <p className="mt-2 text-sm leading-7 text-muted">درس و تکنیک ذخیره‌شده، با یادداشت. این‌ها روی همین دستگاه می‌مانند و از حافظهٔ پیشرفت جدا پاک نمی‌شوند.</p>
      </header>
      {saved.length === 0 && <p className="text-sm text-muted">هنوز چیزی نشان‌گذاری نشده. داخل هر درس دکمهٔ ذخیره هست.</p>}
      {saved.map((id) => {
        const mod = id.startsWith("mod:") ? getModule(id.slice(4)) : null;
        const tech = id.startsWith("tech:") ? getTechnique(id.slice(5), custom) : null;
        const title = mod?.module.title ?? tech?.fa ?? id;
        const to = mod ? { to: "/learn/$moduleId" as const, params: { moduleId: mod.module.id } } : tech ? { to: "/technique/$techniqueId" as const, params: { techniqueId: tech.id } } : null;
        return (
          <Panel key={id} className="space-y-2">
            {to ? <Link to={to.to} params={to.params} className="font-semibold">{title}</Link> : <p>{title}</p>}
            <textarea value={notes[id] ?? ""} onChange={(e) => setNote(id, e.target.value)} rows={3} dir="auto" className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none" placeholder="یادداشت" />
          </Panel>
        );
      })}
    </div>
  );
}
