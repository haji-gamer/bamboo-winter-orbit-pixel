import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { BookOpen, GraduationCap, House, Menu, MessagesSquare, Orbit, ScanSearch, Search, Sparkles, UserRound, Wrench, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { searchAll } from "@/data/catalog";
import { achievementDefs, localDate, useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";


const nav = [
  { to: "/", label: "خانه", icon: House, exact: true },
  { to: "/academy", label: "آموزش", icon: GraduationCap, exact: false },
  { to: "/techniques", label: "تکنیک", icon: Sparkles, exact: false },
  { to: "/assistant", label: "دستیار", icon: MessagesSquare, exact: false },
  { to: "/profile", label: "پروفایل", icon: UserRound, exact: false },
];

const moreLinks = [
  { to: "/review", label: "مدار امروز", icon: Orbit },
  { to: "/analyze", label: "تحلیل مکالمه", icon: ScanSearch },
  { to: "/library", label: "کتابخانه", icon: BookOpen },
  { to: "/tools", label: "ابزارها", icon: Wrench },
  { to: "/admin", label: "استودیو", icon: Sparkles },
] as const;

function usePath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function active(path: string, to: string, exact: boolean) {
  if (exact) return path === to;
  return path === to || path.startsWith(`${to}/`);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePath();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [ready, setReady] = useState(false);
  const custom = useOrbit((s) => s.customTechniques);
  const xp = useOrbit((s) => s.xp);
  const streak = useOrbit((s) => s.streak);
  const items = useOrbit((s) => s.items);
  const saved = useOrbit((s) => s.saved);
  const results = useMemo(() => searchAll(q, custom), [q, custom]);
  const dueCount = Object.values(items).filter((item) => item.nextReview && item.nextReview <= localDate()).length;

  useEffect(() => {
    const pending = useOrbit.persist.rehydrate();
    if (pending) void pending.then(() => setReady(true));
    else setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const state = useOrbit.getState();
    for (const item of achievementDefs(state)) {
      if (item.ok && !state.seenAchievements.includes(item.id)) {
        toast(item.name, { description: item.detail });
        state.markAchievement(item.id);
      }
    }
  }, [ready, xp, streak, items, saved]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Toaster
        dir="rtl"
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-surface)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-e border-border px-4 py-6 md:flex">
          <Link to="/" className="px-2">
            <div className="font-display text-2xl font-bold tracking-wide text-primary">ORBIT</div>
            <div className="mt-1 text-sm text-muted">مدار یادگیری</div>
          </Link>
          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => {
              const on = active(path, item.to, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm",
                    on ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg",
                  )}
                >
                  <Icon className={cn("size-4", on && "text-primary")} />
                  {item.label === "آموزش" ? "آکادمی" : item.label === "تکنیک" ? "تکنیک‌ها" : item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-1 text-sm">
            <SideLink to="/review" icon={Orbit} label={dueCount ? `مدار امروز · ${dueCount}` : "مدار امروز"} path={path} />
            <SideLink to="/analyze" icon={ScanSearch} label="تحلیل مکالمه" path={path} />
            <SideLink to="/library" icon={BookOpen} label="کتابخانه" path={path} />
            <SideLink to="/tools" icon={Wrench} label="ابزارها" path={path} />
            <SideLink to="/admin" icon={Sparkles} label="استودیو" path={path} />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <Link to="/" className="font-display text-lg font-bold tracking-wide text-primary md:hidden">
                ORBIT
              </Link>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border md:hidden"
                aria-expanded={more}
                aria-label="بخش‌های دیگر"
                onClick={() => setMore((value) => !value)}
              >
                {more ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
              <form
                className="relative ms-auto w-full max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (results[0]) go(results[0].kind, results[0].id);
                }}
              >
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  placeholder="جست‌وجوی درس یا تکنیک"
                  className="h-11 w-full rounded-xl border border-border bg-surface ps-10 pe-10 text-sm outline-none placeholder:text-muted"
                  aria-label="جست‌وجو"
                />
                {q && (
                  <button type="button" className="absolute end-2 top-1/2 -translate-y-1/2 p-2 text-muted" onClick={() => setQ("")} aria-label="پاک کردن">
                    <X className="size-4" />
                  </button>
                )}
                {open && q && (
                  <div className="absolute z-30 mt-2 w-full rounded-xl border border-border bg-surface p-2 shadow-lg">
                    {results.length === 0 && <p className="px-2 py-3 text-sm text-muted">چیزی پیدا نشد.</p>}
                    {results.map((item) => (
                      <button
                        key={`${item.kind}-${item.id}`}
                        type="button"
                        className="flex w-full flex-col rounded-lg px-2 py-2 text-start hover:bg-elevated"
                        onClick={() => go(item.kind, item.id)}
                      >
                        <span className="text-sm">{item.title}</span>
                        <span className="text-xs text-muted">{item.kicker}</span>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>
            {more && (
              <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
                {moreLinks.map((item) => {
                  const Icon = item.icon;
                  const on = active(path, item.to, false);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMore(false)}
                      className={cn("flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-border px-3 text-sm", on ? "bg-elevated text-fg" : "text-muted")}
                    >
                      <Icon className="size-4 text-primary" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </header>
          <main className="flex-1 px-4 py-5 md:px-8 md:py-8 pb-nav md:pb-10">{children}</main>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur md:hidden">
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
          {nav.map((item) => {
            const on = active(path, item.to, item.exact);
            const Icon = item.icon;
            return (
              <li key={item.to} className="flex-1">
                <Link to={item.to} className={cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", on ? "text-primary" : "text-muted")}>
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  function go(kind: "module" | "technique", id: string) {
    setQ("");
    setOpen(false);
    if (kind === "module") void navigate({ to: "/learn/$moduleId", params: { moduleId: id } });
    else void navigate({ to: "/technique/$techniqueId", params: { techniqueId: id } });
  }
}

function SideLink({ to, label, icon: Icon, path }: { to: string; label: string; icon: typeof House; path: string }) {
  const on = active(path, to, false);
  return (
    <Link to={to} className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3", on ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg")}>
      <Icon className="size-4" />
      {label}
    </Link>
  );
}
