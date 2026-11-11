import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { faNum, LessonLink, Panel } from "@/components/bits";
import { circuitPlan, lessonBits, reasonLabel, type CircuitReason } from "@/lib/plan";
import { useOrbit } from "@/lib/store";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "مدار امروز · ORBIT" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const custom = useOrbit((s) => s.customTechniques);
  const recordReview = useOrbit((s) => s.recordReview);
  const [queue, setQueue] = useState<{ id: string; reason: CircuitReason }[] | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [gained, setGained] = useState(0);

  useEffect(() => {
    const load = () => {
      const state = useOrbit.getState();
      setQueue(circuitPlan(state.items, state.placementDomain));
    };
    if (useOrbit.persist.hasHydrated()) {
      load();
      return;
    }
    return useOrbit.persist.onFinishHydration(load);
  }, []);

  if (!queue) return <p className="text-sm text-muted">در حال چیدن مدار امروز…</p>;

  const current = queue[index];
  const bits = current ? lessonBits(current.id, custom) : null;

  if (!current || !bits) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <header>
          <h1 className="text-3xl font-bold">مدار امروز تمام شد</h1>
          <p className="mt-2 text-sm leading-7 text-muted">
            {queue.length ? `${faNum(queue.length)} مورد بسته شد.` : "چیزی برای مرور نبود."}{" "}
            {gained > 0 ? `${faNum(gained)} امتیاز این نشست.` : "امتیاز تازه فقط وقتی ثبت می‌شود که پاسخ را سنجیده باشی."}
          </p>
        </header>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">خانه</Link>
          <Link to="/academy" className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm">آکادمی</Link>
        </div>
      </div>
    );
  }

  function rate(quality: 0 | 1 | 2) {
    if (!current) return;
    setGained((n) => n + recordReview(current.id, quality));
    setOpen(false);
    setIndex((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header>
        <p className="text-sm text-muted">مورد {faNum(index + 1)} از {faNum(queue.length)} · {reasonLabel[current.reason]}</p>
        <h1 className="mt-1 text-3xl font-bold">{bits.title}</h1>
        <p className="mt-1 text-sm text-muted">{bits.kicker}</p>
      </header>
      <Panel className="space-y-3">
        <p className="text-sm leading-7">{bits.prompt}</p>
        {current.reason === "next" ? (
          <div className="space-y-3">
            <p className="text-sm leading-7 text-muted">این درس را هنوز باز نکرده‌ای. مرور، جای خواندن درس را نمی‌گیرد.</p>
            <div className="flex flex-wrap gap-2">
              <LessonLink bits={bits} className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">
                شروع درس
              </LessonLink>
              <button type="button" onClick={() => { setOpen(false); setIndex((n) => n + 1); }} className="min-h-11 rounded-xl border border-border px-4 text-sm">
                بعداً
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {!open ? (
              <button type="button" onClick={() => setOpen(true)} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">
                نشان دادن پاسخ مرجع
              </button>
            ) : (
              <>
                <p className="rounded-xl bg-bg p-3 text-sm leading-7">{bits.answer}</p>
                <p className="text-xs leading-5 text-muted">خودت را با پاسخ مرجع بسنج، نه با احساس کلی.</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <button type="button" onClick={() => rate(0)} className="min-h-11 rounded-xl border border-border px-3 text-sm">بلد نبودم</button>
                  <button type="button" onClick={() => rate(1)} className="min-h-11 rounded-xl border border-border px-3 text-sm">تقریبی</button>
                  <button type="button" onClick={() => rate(2)} className="min-h-11 rounded-xl border border-primary px-3 text-sm text-primary">بلد بودم</button>
                </div>
              </>
            )}
            <LessonLink bits={bits} className="inline-flex min-h-11 items-center text-sm text-primary">
              باز کردن درس کامل
            </LessonLink>
          </div>
        )}
      </Panel>
    </div>
  );
}
