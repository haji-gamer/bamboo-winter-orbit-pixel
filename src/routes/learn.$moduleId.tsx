import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { getModule, moduleQuizzes } from "@/data/catalog";
import { EvidenceChip, Panel, SaveButton, StageLine } from "@/components/bits";
import { PracticePanel } from "@/components/practice";
import { stageOf, useOrbit } from "@/lib/store";

export const Route = createFileRoute("/learn/$moduleId")({
  component: LearnPage,
});

function LearnPage() {
  const { moduleId } = Route.useParams();
  const hit = getModule(moduleId);
  const edit = useOrbit((s) => s.edits[moduleId]);
  const note = useOrbit((s) => s.notes[`mod:${moduleId}`] ?? "");
  const setNote = useOrbit((s) => s.setNote);
  const item = useOrbit((s) => s.items[`mod:${moduleId}`]);
  useEffect(() => {
    if (hit) useOrbit.getState().markSeen(`mod:${moduleId}`);
  }, [hit, moduleId]);
  if (!hit) return <p>این درس پیدا نشد.</p>;
  const { module, domain, courseTitle, chapterTitle } = hit;
  const summary = edit?.summary || module.summary;
  const example = edit?.example || module.example;
  const see = module.seeAlso?.startsWith("tech:") ? null : module.seeAlso ? getModule(module.seeAlso) : null;
  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <header className="space-y-2">
        <p className="text-sm text-muted">
          <Link to="/academy/$domainId" params={{ domainId: domain.id }}>{domain.title}</Link>
          <span> · {courseTitle} · {chapterTitle}</span>
        </p>
        <h1 className="text-3xl font-bold">{module.title}</h1>
        <div className="flex flex-wrap gap-2">
          <EvidenceChip evidence={module.evidence} />
          <SaveButton id={`mod:${module.id}`} />
        </div>
        <StageLine stage={stageOf(item)} />
      </header>
      <Panel className="space-y-4 text-sm leading-7">
        <Block title="تعریف ساده" body={summary} />
        <Block title="چرا مهم است" body={module.why} />
        <Block title="مثال" body={example} />
        {module.sections?.map((section) => <Block key={section.title} title={section.title} body={section.body} />)}
        <p className="text-xs leading-6 text-muted">مبنای این بخش: {module.basis}</p>
        {see && (
          <p>
            ارجاع به حوزهٔ مرتبط:{" "}
            <Link className="text-primary" to="/learn/$moduleId" params={{ moduleId: see.module.id }}>{see.module.title}</Link>
          </p>
        )}
        {module.seeAlso?.startsWith("tech:") && (
          <p>
            در بانک تکنیک:{" "}
            <Link className="text-primary" to="/technique/$techniqueId" params={{ techniqueId: module.seeAlso.slice(5) }}>
              باز کردن تکنیک
            </Link>
          </p>
        )}
      </Panel>
      <Panel className="space-y-2">
        <h2 className="font-semibold">یادداشت شخصی</h2>
        <textarea value={note} onChange={(e) => setNote(`mod:${module.id}`, e.target.value)} rows={3} dir="auto" className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none" placeholder="فقط برای خودت، روی همین دستگاه" />
      </Panel>
      <PracticePanel
        itemId={`mod:${module.id}`}
        quizzes={moduleQuizzes(hit)}
        prompt={module.practice}
        keywords={module.keywords}
        modelAnswer={module.modelAnswer}
        context={`${module.title}\n${summary}\n${module.why}`}
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
