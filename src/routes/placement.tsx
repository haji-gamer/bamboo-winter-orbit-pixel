import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { domains } from "@/data/catalog";
import { Panel } from "@/components/bits";
import { useOrbit } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/placement")({
  head: () => ({ meta: [{ title: "تعیین سطح · ORBIT" }] }),
  component: PlacementPage,
});

const questions: { prompt: string; options: { text: string; domain: string }[] }[] = [
  {
    prompt: "کدام موقعیت الان بیشتر برایت گنگ است؟",
    options: [
      { text: "نمی‌دانم یک رابطه کی ناسالم شده", domain: "relations" },
      { text: "در مذاکره زود کوتاه می‌آیم یا سفت می‌ایستم", domain: "negotiation" },
      { text: "زبان بدن را بیش از حد قطعی می‌خوانم", domain: "body-language" },
    ],
  },
  {
    prompt: "کدام مهارت را اول تمرین کنیم؟",
    options: [
      { text: "فهمیدن اثر گروه و هنجار", domain: "sociology" },
      { text: "جدا کردن واقعیت از تفسیر در خبر", domain: "critical" },
      { text: "درخواست درست از یک مدل زبانی", domain: "ai" },
    ],
  },
  {
    prompt: "کدام جمله به کارت نزدیک‌تر است؟",
    options: [
      { text: "می‌خواهم بدون فشار بفروشم", domain: "business" },
      { text: "شروع کارها به حالم بند است", domain: "personal" },
      { text: "اصطلاح روانی را اشتباه به کار می‌برم", domain: "psychology" },
    ],
  },
];

function PlacementPage() {
  const navigate = useNavigate();
  const setPlacement = useOrbit((s) => s.setPlacement);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const q = questions[step];

  function choose(domain: string) {
    const next = { ...scores, [domain]: (scores[domain] ?? 0) + 1 };
    if (step < questions.length - 1) {
      setScores(next);
      setStep(step + 1);
      return;
    }
    const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "personal";
    setPlacement(winner);
    void navigate({ to: "/academy/$domainId", params: { domainId: winner } });
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header>
        <h1 className="text-3xl font-bold">تعیین سطح شروع</h1>
        <p className="mt-2 text-sm leading-7 text-muted">سه سؤال، نه یک آزمون علمی. نتیجه فقط پیشنهاد مسیر اول است و سطح رسمی نمی‌سازد.</p>
      </header>
      <Panel className="space-y-3">
        <p className="text-xs text-muted">سؤال {step + 1} از {questions.length}</p>
        <h2 className="text-lg font-semibold">{q.prompt}</h2>
        {q.options.map((option) => (
          <button key={option.text} type="button" onClick={() => choose(option.domain)} className={cn("w-full rounded-xl border border-border px-3 py-3 text-start text-sm leading-7 hover:border-primary")}>
            {option.text}
          </button>
        ))}
      </Panel>
      <p className="text-xs text-muted">
        حوزه‌ها: {domains.map((d) => d.title).slice(0, 3).join("، ")} و شش حوزهٔ دیگر در آکادمی هستند.{" "}
        <Link to="/academy" className="text-primary">دیدن همه</Link>
      </p>
    </div>
  );
}
