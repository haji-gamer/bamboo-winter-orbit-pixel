import { createFileRoute, Link } from "@tanstack/react-router";
import { getDomain, stageNames } from "@/data/catalog";
import { faNum, Panel } from "@/components/bits";
import { stageOf, useOrbit } from "@/lib/store";

export const Route = createFileRoute("/academy/$domainId")({
  component: DomainPage,
});

function DomainPage() {
  const { domainId } = Route.useParams();
  const domain = getDomain(domainId);
  const items = useOrbit((s) => s.items);
  if (!domain) return <p>این حوزه پیدا نشد.</p>;
  return (
    <div className="space-y-6">
      <header>
        <Link to="/academy" className="text-sm text-muted">آکادمی</Link>
        <h1 className="mt-2 text-3xl font-bold">{domain.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{domain.blurb}</p>
      </header>
      {domain.courses.map((course) => (
        <section key={course.id} className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-muted">{course.blurb}</p>
          </div>
          {course.chapters.map((chapter) => (
            <Panel key={chapter.id} className="space-y-2">
              <h3 className="text-sm text-primary">فصل · {chapter.title}</h3>
              <ul className="divide-y divide-border">
                {chapter.modules.map((module, index) => {
                  const stage = stageOf(items[`mod:${module.id}`]);
                  return (
                    <li key={module.id}>
                      <Link to="/learn/$moduleId" params={{ moduleId: module.id }} className="flex items-center gap-3 py-3">
                        <span className="num w-6 text-xs text-muted">{faNum(index + 1)}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium">{module.title}</span>
                          <span className="text-xs text-muted">{stageNames[stage]}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Panel>
          ))}
        </section>
      ))}
    </div>
  );
}
