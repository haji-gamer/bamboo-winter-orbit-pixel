import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getModule, getTechnique, levelFor, stageNames } from "@/data/catalog";
import { faNum, Panel } from "@/components/bits";
import { achievementDefs, localDate, stageOf, useOrbit } from "@/lib/store";
import { parseBackup } from "@/lib/backup";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "پروفایل · ORBIT" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const snapshot = useOrbit();
  const setName = useOrbit((s) => s.setName);
  const xp = useOrbit((s) => s.xp);
  const streak = useOrbit((s) => s.streak);
  const items = useOrbit((s) => s.items);
  const custom = useOrbit((s) => s.customTechniques);
  const resetItem = useOrbit((s) => s.resetItem);
  const resetMemory = useOrbit((s) => s.resetMemory);
  const importBackup = useOrbit((s) => s.importBackup);
  const [confirm, setConfirm] = useState(false);
  const [backupNote, setBackupNote] = useState("");
  const level = levelFor(xp);
  const rows = Object.entries(items).sort((a, b) => stageOf(b[1]) - stageOf(a[1]));
  const today = localDate();
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <header>
        <h1 className="text-3xl font-bold">پروفایل و پیشرفت</h1>
        <p className="mt-2 text-sm leading-7 text-muted">حافظهٔ آموزشی از گفت‌وگوها جداست. می‌توانی هر مورد را پاک کنی، یا کل پیشرفت را در یک فایل ببری و برگردانی.</p>
      </header>
      <Panel className="space-y-3">
        <label className="block text-sm">
          نام نمایشی
          <input value={snapshot.name} onChange={(e) => setName(e.target.value.slice(0, 32))} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none" />
        </label>
        <div>
          <div className="flex justify-between text-sm">
            <span>{level.name}</span>
            <span className="num">{faNum(xp)} امتیاز</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-elevated">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.round(level.into * 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">رشته: {streak ? `${faNum(streak)} روز` : "هنوز شروع نشده"}</p>
        </div>
      </Panel>
      <Panel className="space-y-2">
        <h2 className="font-semibold">دستاوردها</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {achievementDefs(snapshot).map((item) => (
            <li key={item.id} className="rounded-xl bg-bg px-3 py-2 text-sm">
              <p className={item.ok ? "text-accent" : "text-muted"}>{item.name}</p>
              <p className="text-xs text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel className="space-y-3">
        <h2 className="font-semibold">حافظهٔ آموزشی</h2>
        {rows.length === 0 && <p className="text-sm text-muted">هنوز موردی ثبت نشده.</p>}
        {rows.map(([id, item]) => {
          const mod = id.startsWith("mod:") ? getModule(id.slice(4)) : null;
          const tech = id.startsWith("tech:") ? getTechnique(id.slice(5), custom) : null;
          const title = mod?.module.title ?? tech?.fa ?? id;
          return (
            <div key={id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
              <div>
                <p>{title}</p>
                <p className="text-xs text-muted">
                  {stageNames[stageOf(item)]}
                  {item.nextReview ? ` · مرور ${item.nextReview === today ? "امروز" : item.nextReview}` : ""}
                  {item.errors ? ` · ${faNum(item.errors)} خطا` : ""}
                </p>
              </div>
              <button type="button" onClick={() => resetItem(id)} className="min-h-11 rounded-lg px-2 text-xs text-muted">حذف این مورد</button>
            </div>
          );
        })}
        {!confirm ? (
          <button type="button" onClick={() => setConfirm(true)} className="min-h-11 text-sm text-primary">پاک کردن پیشرفت و امتیاز</button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { resetMemory(); setConfirm(false); }} className="min-h-11 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-fg">بله، پیشرفت پاک شود</button>
            <button type="button" onClick={() => setConfirm(false)} className="min-h-11 rounded-xl border border-border px-3 text-sm">انصراف</button>
          </div>
        )}
        <p className="text-xs text-muted">یادداشت‌ها، گفت‌وگوها و تکنیک‌های سفارشی با این دکمه پاک نمی‌شوند.</p>
      </Panel>
      <Panel className="space-y-3">
        <h2 className="font-semibold">پشتیبان همین دستگاه</h2>
        <p className="text-sm leading-7 text-muted">فایل را نگه دار. اگر مرورگر عوض شد، همان فایل را برگردان. حساب ابری جدا ساخته نشده چون پیشرفت مال همین دستگاه است.</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg"
            onClick={() => {
              const state = useOrbit.getState();
              const payload = {
                v: 2,
                name: state.name,
                xp: state.xp,
                streak: state.streak,
                lastActive: state.lastActive,
                items: state.items,
                saved: state.saved,
                notes: state.notes,
                edits: state.edits,
                threads: state.threads,
                activeThread: state.activeThread,
                customTechniques: state.customTechniques,
                placementDomain: state.placementDomain,
                seenAchievements: state.seenAchievements,
                voice: state.voice,
              };
              const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "orbit-backup.json";
              link.click();
              URL.revokeObjectURL(url);
              setBackupNote("فایل پشتیبان ساخته شد.");
            }}
          >
            گرفتن فایل
          </button>
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-border px-4 text-sm">
            برگرداندن فایل
            <input
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                if (file.size > 1_500_000) {
                  setBackupNote("فایل بزرگ‌تر از حد این نسخه است.");
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const parsed = parseBackup(JSON.parse(String(reader.result)));
                    if (!parsed) {
                      setBackupNote("این فایل پشتیبان ORBIT نیست.");
                      return;
                    }
                    importBackup(parsed);
                    setBackupNote("پیشرفت از فایل برگشت.");
                  } catch {
                    setBackupNote("فایل خوانده نشد.");
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
        {backupNote && <p className="text-sm text-muted">{backupNote}</p>}
      </Panel>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link to="/library" className="text-primary">کتابخانه</Link>
        <Link to="/tools" className="text-primary">ابزارها</Link>
        <Link to="/admin" className="text-primary">استودیو</Link>
        <Link to="/analyze" className="text-primary">تحلیل</Link>
      </div>
      <p className="text-xs leading-6 text-muted">
        پیشرفت روی همین دستگاه می‌ماند. از بخش پشتیبان فایل بگیر. یادآوری تلگرام در ابزارها فقط متن مدار امروز را برای خودت باز می‌کند و ربات دائمی نیست.
      </p>
    </div>
  );
}
