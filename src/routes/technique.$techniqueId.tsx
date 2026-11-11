import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getTechnique, mergeTechniques, techniqueQuizzes } from "@/data/catalog";
import { EthicsChip, EvidenceChip, Panel, SaveButton, StageLine } from "@/components/bits";
import { PracticePanel } from "@/components/practice";
import { stageOf, useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/technique/$techniqueId")({
  component: TechniquePage,
});

function TechniquePage() {
  const { techniqueId } = Route.useParams();
  const custom = useOrbit((s) => s.customTechniques);
  const tech = getTechnique(techniqueId, custom);
  const item = useOrbit((s) => s.items[`tech:${techniqueId}`]);
  const note = useOrbit((s) => s.notes[`tech:${techniqueId}`] ?? "");
  const setNote = useOrbit((s) => s.setNote);
  useEffect(() => {
    if (tech) useOrbit.getState().markSeen(`tech:${techniqueId}`);
  }, [tech, techniqueId]);
  if (!tech) return <p>این تکنیک پیدا نشد.</p>;
  const all = mergeTechniques(custom);
  const harsh = tech.ethics === "manipulative" || tech.ethics === "controversial";
  const options = [
    { label: "پاسخ الف", text: harsh ? "همان الگو را شدیدتر برمی‌گردانم تا کوتاه بیاید." : "از ظاهر این روش استفاده می‌کنم تا طرف گیج شود و امتیاز بدهد.", verdict: "avoid" as const, why: "تلافی یا گیج کردن، چرخه را ادامه می‌دهد و شفافیت را از بین می‌برد." },
    { label: "پاسخ ب", text: tech.counter, verdict: "better" as const, why: tech.useNote },
  ];
  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <header className="space-y-2">
        <Link to="/techniques" className="text-sm text-muted">بانک تکنیک‌ها</Link>
        <h1 className="text-3xl font-bold">{tech.fa}</h1>
        <p className="text-sm text-muted" dir="ltr">{tech.en}</p>
        <div className="flex flex-wrap gap-2">
          <EthicsChip ethics={tech.ethics} />
          <EvidenceChip evidence={tech.evidence} />
          <SaveButton id={`tech:${tech.id}`} />
        </div>
        <StageLine stage={stageOf(item)} />
      </header>
      {harsh && (
        <Panel className="border-primary/40 text-sm leading-7">
          این صفحه برای شناخت، تشخیص و مقابله است. توصیهٔ استفاده فقط وقتی مطرح می‌شود که رضایت، احترام، صداقت و پیامد رعایت شده باشد. در این مورد: {tech.useNote}
        </Panel>
      )}
      <Panel className="space-y-4 text-sm leading-7">
        <Block title="تعریف ساده" body={tech.summary} />
        <Block title="نحوهٔ اثر" body={tech.mechanism} />
        <Block title="مثال" body={tech.example} />
        <Block title="تشخیص در دیگران" body={tech.detect} />
        <Block title="مقابله" body={tech.counter} />
        <Block title="استفاده و محدودیت" body={tech.useNote} />
        <Block title="اشتباه رایج" body={tech.mistakes} />
        <p className="text-xs leading-6 text-muted">مبنا: {tech.basis}</p>
      </Panel>
      <Compare itemId={`tech:${tech.id}`} options={options} />
      <Panel className="space-y-2">
        <h2 className="font-semibold">یادداشت</h2>
        <textarea value={note} onChange={(e) => setNote(`tech:${tech.id}`, e.target.value)} rows={3} dir="auto" className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none" />
      </Panel>
      <PracticePanel
        itemId={`tech:${tech.id}`}
        quizzes={techniqueQuizzes(tech, all)}
        prompt={`اگر این الگو را در حرف طرف دیدی، یک پاسخ محترمانه و مشخص بنویس. تکنیک: ${tech.fa}`}
        keywords={tech.keywords}
        ethics={tech.ethics}
        modelAnswer={tech.counter}
        context={`${tech.fa}\n${tech.summary}\n${tech.mechanism}\n${tech.useNote}`}
      />
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1">{body}</p>
    </div>
  );
}

function Compare({ itemId, options }: { itemId: string; options: { label: string; text: string; verdict: "avoid" | "better"; why: string }[] }) {
  const recordQuiz = useOrbit((s) => s.recordQuiz);
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  return (
    <Panel className="space-y-3">
      <h2 className="font-semibold">مقایسهٔ پاسخ‌ها</h2>
      <p className="text-sm text-muted">کدام پاسخ قابل دفاع‌تر است؟</p>
      {options.map((option, index) => (
        <button key={option.label} type="button" disabled={done} onClick={() => setPick(index)} className={cn("w-full rounded-xl border px-3 py-3 text-start text-sm leading-7", pick === index ? "border-primary" : "border-border")}>
          <span className="text-muted">{option.label}. </span>{option.text}
        </button>
      ))}
      {!done ? (
        <button type="button" disabled={pick === null} onClick={() => { if (pick === null) return; recordQuiz(itemId, 3, options[pick].verdict === "better"); setDone(true); }} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40">
          سنجیدن انتخاب
        </button>
      ) : (
        <div className="space-y-2 text-sm leading-7">
          {options.map((option) => (
            <p key={option.label}><span className="font-medium">{option.label}: </span>{option.verdict === "better" ? "قابل دفاع‌تر. " : "ضعیف یا آسیب‌زا. "}{option.why}</p>
          ))}
        </div>
      )}
    </Panel>
  );
}
