import { createFileRoute, Link } from "@tanstack/react-router";
import { domains, levelFor, stageNames } from "@/data/catalog";
import { getModule, getTechnique } from "@/data/catalog";
import { DomainIcon, faNum, LessonLink, Panel } from "@/components/bits";
import { circuitPlan, lessonBits, reasonLabel } from "@/lib/plan";
import { localDate, stageOf, useOrbit } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "ORBIT · مدار یادگیری" }] }),
  component: Home,
});

function Home() {
  const name = useOrbit((s) => s.name);
  const xp = useOrbit((s) => s.xp);
  const streak = useOrbit((s) => s.streak);
  const items = useOrbit((s) => s.items);
  const custom = useOrbit((s) => s.customTechniques);
  const placement = useOrbit((s) => s.placementDomain);
  const level = levelFor(xp);
  const today = localDate();
  const plan = circuitPlan(items, placement);
  const due = Object.entries(items).filter(([, item]) => item.nextReview && item.nextReview <= today);
  const weak = Object.entries(items)
    .filter(([, item]) => item.errors > 0 && stageOf(item) < 9)
    .sort((a, b) => b[1].errors - a[1].errors)
    .slice(0, 3);
  const recent = Object.entries(items)
    .filter(([, item]) => item.lastPracticed)
    .sort((a, b) => (b[1].lastPracticed ?? "").localeCompare(a[1].lastPracticed ?? ""))[0];
  const started = Object.values(items).filter((item) => item.seen).length;
  const avg = started ? Object.values(items).reduce((sum, item) => sum + stageOf(item), 0) / Math.max(1, started) / 9 : 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">سلام، {name}</p>
          <h1 className="mt-1 text-3xl font-bold">مسیر امروز</h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
            ORBIT تمرین را تا تسلط ادامه می‌دهد. حفظ تعریف امتیاز تسلط نمی‌دهد.
          </p>
        </div>
        <Ring pct={avg} label={level.name} caption={`سطح ${faNum(level.index)}`} />
      </header>
      <Panel className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-semibold">مدار امروز</h2>
            <p className="mt-1 text-sm leading-7 text-muted">
              {plan.length ? `${faNum(plan.length)} مورد: مرور سررسید، ضعف، و اگر جا باشد درس بعدی.` : "مرور بازی نداری. یک درس تازه از آکادمی بردار."}
            </p>
          </div>
          {plan.length > 0 && (
            <Link to="/review" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">
              شروع مدار
            </Link>
          )}
        </div>
        <ul className="space-y-2">
          {plan.slice(0, 4).map((row) => {
            const bits = lessonBits(row.id, custom);
            if (!bits) return null;
            return (
              <li key={row.id}>
                <LessonLink bits={bits} className="flex items-center justify-between gap-3 rounded-xl bg-elevated px-3 py-2">
                  <span className="text-sm">{bits.title}</span>
                  <span className="shrink-0 text-xs text-muted">{reasonLabel[row.reason]}</span>
                </LessonLink>
              </li>
            );
          })}
        </ul>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="امتیاز" value={faNum(xp)} hint={level.next ? `تا ${level.next}` : "آخرین سطح این نسخه"} />
        <Stat label="رشته" value={streak ? `${faNum(streak)} روز` : "هنوز نه"} hint="هر روز یک تمرین رشته را زنده نگه می‌دارد" />
        <Stat label="مرور سررسید" value={faNum(due.length)} hint={due.length ? "از آخرین ضعف‌ها" : "بعد از تمرین زمان‌بندی می‌شود"} />
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <Panel className="space-y-3 lg:col-span-3">
          <h2 className="font-semibold">ادامه</h2>
          {recent ? (
            <Continue id={recent[0]} stage={stageOf(recent[1])} custom={custom} />
          ) : (
            <p className="text-sm leading-7 text-muted">هنوز تمرینی ثبت نشده. از آکادمی یک درس را باز کن یا آزمون تعیین سطح بده.</p>
          )}
          <div className="flex flex-wrap gap-2">
            <Link to="/placement" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">
              آزمون تعیین سطح
            </Link>
            <Link to="/academy" className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm">
              نه حوزه
            </Link>
          </div>
          {placement && <p className="text-sm text-muted">پیشنهاد آزمون: {domains.find((d) => d.id === placement)?.title}</p>}
        </Panel>
        <Panel className="space-y-3 lg:col-span-2">
          <h2 className="font-semibold">نقاط ضعف</h2>
          {weak.length === 0 && <p className="text-sm leading-7 text-muted">هنوز خطای تکراری ثبت نشده. این فهرست بعد از پاسخ نادرست پر می‌شود.</p>}
          {weak.map(([id, item]) => (
            <WeakRow key={id} id={id} errors={item.errors} stage={stageOf(item)} custom={custom} />
          ))}
        </Panel>
      </div>
      <section>
        <h2 className="mb-3 font-semibold">حوزه‌ها</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => {
            const ids = domain.courses.flatMap((c) => c.chapters.flatMap((ch) => ch.modules.map((m) => `mod:${m.id}`)));
            const seen = ids.filter((id) => items[id]?.seen).length;
            return (
              <Link key={domain.id} to="/academy/$domainId" params={{ domainId: domain.id }} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 hover:bg-elevated">
                <span className="flex size-11 items-center justify-center rounded-xl bg-elevated text-primary">
                  <DomainIcon name={domain.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{domain.title}</span>
                  <span className="text-xs text-muted">{faNum(seen)} از {faNum(ids.length)} دیده‌شده</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Ring({ pct, label, caption }: { pct: number; label: string; caption: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, pct)) * c;
  return (
    <div className="relative size-36">
      <svg viewBox="0 0 100 100" className="size-full">
        <circle cx="50" cy="50" r={r} className="orbit-spin" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="var(--color-elevated)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] text-muted">{caption}</span>
        <span className="px-6 text-sm font-semibold leading-5">{label}</span>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Panel className="space-y-1">
      <p className="text-xs text-muted">{label}</p>
      <p className="num text-2xl font-semibold">{value}</p>
      <p className="text-xs leading-5 text-muted">{hint}</p>
    </Panel>
  );
}

function titleOf(id: string, custom: ReturnType<typeof useOrbit.getState>["customTechniques"]) {
  if (id.startsWith("mod:")) return getModule(id.slice(4))?.module.title ?? "درس";
  if (id.startsWith("tech:")) return getTechnique(id.slice(5), custom)?.fa ?? "تکنیک";
  return "مورد";
}

function hrefOf(id: string): { to: "/learn/$moduleId"; params: { moduleId: string } } | { to: "/technique/$techniqueId"; params: { techniqueId: string } } {
  if (id.startsWith("tech:")) return { to: "/technique/$techniqueId", params: { techniqueId: id.slice(5) } };
  return { to: "/learn/$moduleId", params: { moduleId: id.slice(4) } };
}

function Continue({ id, stage, custom }: { id: string; stage: number; custom: ReturnType<typeof useOrbit.getState>["customTechniques"] }) {
  const href = hrefOf(id);
  return (
    <Link to={href.to} params={href.params} className="block rounded-xl bg-elevated p-3">
      <p className="text-sm font-medium">{titleOf(id, custom)}</p>
      <p className="mt-1 text-xs text-muted">{stageNames[stage]}</p>
    </Link>
  );
}

function WeakRow({ id, errors, stage, custom }: { id: string; errors: number; stage: number; custom: ReturnType<typeof useOrbit.getState>["customTechniques"] }) {
  const href = hrefOf(id);
  return (
    <Link to={href.to} params={href.params} className="block text-sm">
      <span className="font-medium">{titleOf(id, custom)}</span>
      <span className="mt-0.5 block text-xs text-muted">{faNum(errors)} خطا · {stageNames[stage]}</span>
    </Link>
  );
}
