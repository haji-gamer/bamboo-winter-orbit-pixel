import { createFileRoute, Link } from "@tanstack/react-router";
import { allModules, domains } from "@/data/catalog";
import { DomainIcon, faNum, Panel } from "@/components/bits";
import { useOrbit } from "@/lib/store";

export const Route = createFileRoute("/academy")({
  head: () => ({ meta: [{ title: "آکادمی · ORBIT" }] }),
  component: Academy,
});

function Academy() {
  const items = useOrbit((s) => s.items);
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold">آکادمی</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          ساختار هر حوزه: دوره، فصل، درس. سطح بیان مبتدی است؛ اصطلاح سخت همان‌جا ساده می‌شود. روان‌شناسی حوزهٔ مستقل است و بقیه فقط به آن ارجاع می‌دهند.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        {domains.map((domain) => {
          const count = allModules().filter((m) => m.domain.id === domain.id).length;
          const seen = allModules().filter((m) => m.domain.id === domain.id && items[`mod:${m.module.id}`]?.seen).length;
          return (
            <Link key={domain.id} to="/academy/$domainId" params={{ domainId: domain.id }}>
              <Panel className="h-full space-y-3 hover:bg-elevated">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-bg text-primary">
                    <DomainIcon name={domain.icon} className="size-5" />
                  </span>
                  <h2 className="font-semibold leading-6">{domain.title}</h2>
                </div>
                <p className="text-sm leading-7 text-muted">{domain.blurb}</p>
                <p className="text-xs text-muted">{faNum(seen)} از {faNum(count)} درس دیده‌شده · {faNum(domain.courses.length)} دوره</p>
              </Panel>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
