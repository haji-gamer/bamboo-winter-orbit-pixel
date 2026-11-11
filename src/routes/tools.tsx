import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { aiStatus } from "@/lib/ai.functions";
import { LessonLink, Panel } from "@/components/bits";
import { dueIds, lessonBits, todayScript } from "@/lib/plan";
import { localDate, useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [{ title: "ابزارها · ORBIT" }] }),
  component: ToolsPage,
});

function ToolsPage() {
  const navigate = useNavigate();
  const items = useOrbit((s) => s.items);
  const custom = useOrbit((s) => s.customTechniques);
  const placement = useOrbit((s) => s.placementDomain);
  const voice = useOrbit((s) => s.voice);
  const setVoice = useOrbit((s) => s.setVoice);
  const [modelOn, setModelOn] = useState<boolean | null>(null);
  const [role, setRole] = useState("مربی مبتدی");
  const [task, setTask] = useState("");
  const [limit, setLimit] = useState("حداکثر ۱۵۰ کلمه، بدون توصیهٔ دستکاری");
  const [shape, setShape] = useState("تعریف، مثال، یک تمرین");
  const [copied, setCopied] = useState(false);
  const today = localDate();
  const due = dueIds(items, today);
  const script = todayScript(items, placement, custom);

  useEffect(() => {
    void aiStatus().then((res) => setModelOn(res.available)).catch(() => setModelOn(false));
  }, []);

  const prompt = [`نقش: ${role}`, `کار: ${task || "…"}`, `محدودیت: ${limit}`, `قالب: ${shape}`].join("\n");

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <header>
        <h1 className="text-3xl font-bold">ابزارها</h1>
        <p className="mt-2 text-sm leading-7 text-muted">کارگاه پرامپت، صف مرور، یادآوری که خودت می‌فرستی، و سبک پاسخ محلی. ربات بیرونی به حساب تو وصل نیست.</p>
      </header>
      <Panel className="space-y-3">
        <h2 className="font-semibold">کارگاه پرامپت</h2>
        <Field label="نقش" value={role} onChange={setRole} />
        <Field label="کار" value={task} onChange={setTask} placeholder="مثلاً فرق مرز و تهدید را برای دوست توضیح بده" />
        <Field label="محدودیت" value={limit} onChange={setLimit} />
        <Field label="قالب خروجی" value={shape} onChange={setShape} />
        <pre className="whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm leading-7">{prompt}</pre>
        <button
          type="button"
          className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg"
          onClick={() => {
            sessionStorage.setItem("orbit-draft", prompt);
            void navigate({ to: "/assistant" });
          }}
        >
          بردن به دستیار
        </button>
      </Panel>
      <Panel className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">مرورهای سررسید</h2>
          <Link to="/review" className="inline-flex min-h-11 items-center text-sm text-primary">شروع مدار</Link>
        </div>
        {due.length === 0 && <p className="text-sm text-muted">موردی برای امروز نیست. بعد از تمرین نوشتاری یا مرور، فاصله تنظیم می‌شود.</p>}
        {due.map((id) => {
          const bits = lessonBits(id, custom);
          if (!bits) return null;
          return (
            <LessonLink key={id} bits={bits} className="block rounded-xl bg-bg px-3 py-2 text-sm">
              {bits.title}
            </LessonLink>
          );
        })}
      </Panel>
      <Panel className="space-y-3">
        <h2 className="font-semibold">یادآوری برای خودت</h2>
        <p className="text-sm leading-7 text-muted">متن مدار امروز را کپی کن یا در تلگرام برای خودت بفرست. این یک ربات همیشه روشن نیست.</p>
        <pre className="whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm leading-7">{script}</pre>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void copyScript()} className="min-h-11 rounded-xl border border-border px-4 text-sm">
            {copied ? "کپی شد" : "کپی متن"}
          </button>
          <a
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg"
            href={`https://t.me/share/url?text=${encodeURIComponent(script)}`}
            target="_blank"
            rel="noreferrer"
          >
            فرستادن در تلگرام
          </a>
        </div>
      </Panel>
      <Panel className="space-y-3 text-sm leading-7">
        <h2 className="font-semibold">سبک دانشنامهٔ محلی</h2>
        <div className="flex flex-wrap gap-2">
          {([["plain", "روان و مستقیم"], ["socratic", "اول یک سؤال"]] as const).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setVoice(id)} className={cn("min-h-11 rounded-full border px-3", voice === id ? "border-primary text-primary" : "border-border text-muted")}>
              {label}
            </button>
          ))}
        </div>
        <p>ارائه‌دهندهٔ محلی همیشه روشن است. ارائه‌دهندهٔ xAI: {modelOn ? "Grok 4.5 آماده است و فقط با دکمه صدا زده می‌شود." : modelOn === false ? "کلید مدل در این محیط نیست." : "در حال بررسی…"}</p>
        <p className="text-muted">مدل دوم اضافه نشده تا پاسخ ساختگی به اسم یک شرکت دیگر نیاید. اگر Grok خطا بدهد، همان دانشنامه با سبک انتخابی جواب می‌دهد.</p>
      </Panel>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block text-sm">
      {label}
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none" />
    </label>
  );
}
