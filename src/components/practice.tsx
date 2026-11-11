import { useMemo, useState } from "react";
import { askOrbit } from "@/lib/ai.functions";
import { useOrbit } from "@/lib/store";
import type { Ethics, Quiz } from "@/data/types";
import { scoreAnswer } from "@/data/catalog";
import { faNum, Panel } from "@/components/bits";
import { cn } from "@/lib/cn";

export function PracticePanel({
  itemId,
  quizzes,
  prompt,
  keywords,
  ethics,
  modelAnswer,
  context,
}: {
  itemId: string;
  quizzes: Quiz[];
  prompt: string;
  keywords: string[];
  ethics?: Ethics;
  modelAnswer: string;
  context: string;
}) {
  const recordQuiz = useOrbit((s) => s.recordQuiz);
  const recordText = useOrbit((s) => s.recordText);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answer, setAnswer] = useState("");
  const [card, setCard] = useState<ReturnType<typeof scoreAnswer> | null>(null);
  const [gained, setGained] = useState(0);
  const [ai, setAi] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const quiz = quizzes[step];
  const labels = useMemo(() => ["فهم مفهوم", "تشخیص در مثال", "موقعیت تازه", "پاسخ عملی"], []);

  function submitQuiz() {
    if (picked === null || !quiz) return;
    const ok = picked === quiz.correct;
    const xp = recordQuiz(itemId, step, ok);
    setGained(xp);
    setChecked(true);
  }

  function submitText() {
    const next = scoreAnswer(answer, keywords, ethics);
    const xp = recordText(itemId, next.score);
    setCard(next);
    setGained(xp);
  }

  async function deepen() {
    setBusy(true);
    setAi(null);
    try {
      const res = await askOrbit({
        data: {
          mode: "evaluate",
          messages: [{ role: "user", content: answer }],
          context: `${context}\n\nپاسخ بهتر مرجع:\n${modelAnswer}`,
        },
      });
      setAi(res.ok ? res.text : "مدل همین حالا در دسترس نیست. نمرهٔ بالا ارزیابی محلی بر اساس مفهوم‌های کلیدی است.");
    } catch {
      setAi("ارزیابی مدل انجام نشد. نمرهٔ محلی همچنان معتبر است.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">تمرین</h2>
        <p className="mt-1 text-sm text-muted">تسلط با تشخیص و پاسخ سنجیده می‌شود، نه با باز کردن صفحه.</p>
      </div>
      <div className="grid grid-cols-4 gap-1 text-center text-[11px] text-muted">
        {labels.map((label, i) => (
          <button key={label} type="button" onClick={() => { setStep(i); setPicked(null); setChecked(false); }} className={cn("min-h-11 rounded-lg px-1", step === i ? "bg-elevated text-fg" : "hover:bg-elevated")}>
            {label}
          </button>
        ))}
      </div>
      {step < 3 && quiz && (
        <div className="space-y-3">
          <p className="text-sm leading-7">{quiz.prompt}</p>
          {quiz.options.map((option, index) => {
            const show = checked && (index === quiz.correct || index === picked);
            return (
              <button
                key={option}
                type="button"
                disabled={checked}
                onClick={() => setPicked(index)}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-start text-sm leading-6",
                  picked === index ? "border-primary" : "border-border",
                  show && index === quiz.correct && "border-accent bg-accent/10",
                  show && index === picked && index !== quiz.correct && "border-primary bg-primary/10",
                )}
              >
                {option}
              </button>
            );
          })}
          {!checked ? (
            <button type="button" disabled={picked === null} onClick={submitQuiz} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40">
              ثبت پاسخ
            </button>
          ) : (
            <div className="space-y-2 text-sm leading-7">
              <p>{quiz.explain}</p>
              {gained > 0 && <p className="text-primary">+{faNum(gained)} امتیاز</p>}
              {step < 2 && (
                <button type="button" className="min-h-11 rounded-xl border border-border px-4" onClick={() => { setStep(step + 1); setPicked(null); setChecked(false); }}>
                  مرحلهٔ بعد
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm leading-7">{prompt}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            dir="auto"
            rows={5}
            className="w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm leading-7 outline-none"
            placeholder="پاسخ خودت را بنویس، نه تعریف حفظی."
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={submitText} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg">
              ارزیابی محلی
            </button>
            <button type="button" disabled={busy || answer.trim().length < 8} onClick={() => void deepen()} className="min-h-11 rounded-xl border border-border px-4 text-sm disabled:opacity-40">
              {busy ? "در حال ارزیابی…" : "ارزیابی با مدل"}
            </button>
          </div>
          {card && (
            <div className="space-y-2 rounded-xl bg-elevated p-3 text-sm leading-7">
              <p className="font-semibold">نمرهٔ محلی: <span className="num text-primary">{faNum(card.score)}</span></p>
              {gained > 0 && <p className="text-primary">+{faNum(gained)} امتیاز برای پیشرفت این پاسخ</p>}
              {card.strengths.map((line) => <p key={line}>{line}</p>)}
              {card.gaps.map((line) => <p key={line} className="text-muted">{line}</p>)}
              <p className="text-muted">این نمره پوشش مفهوم‌های کلیدی است، نه داوری کامل یک مربی.</p>
              <p><span className="text-muted">یک پاسخ قوی‌تر: </span>{modelAnswer}</p>
            </div>
          )}
          {ai && <p className="whitespace-pre-wrap rounded-xl border border-border p-3 text-sm leading-7">{ai}</p>}
        </div>
      )}
    </Panel>
  );
}
