import { domains, getModule, getTechnique } from "@/data/catalog";
import { localDate, stageOf, type ItemProgress } from "@/lib/store";
import type { Technique } from "@/data/types";

export type LessonBits =
  | {
      kind: "module";
      title: string;
      kicker: string;
      prompt: string;
      answer: string;
      moduleId: string;
    }
  | {
      kind: "technique";
      title: string;
      kicker: string;
      prompt: string;
      answer: string;
      techniqueId: string;
    };

export function lessonBits(id: string, custom: Technique[]): LessonBits | null {
  if (id.startsWith("mod:")) {
    const hit = getModule(id.slice(4));
    if (!hit) return null;
    return {
      kind: "module",
      title: hit.module.title,
      kicker: hit.domain.title,
      prompt: hit.module.practice,
      answer: hit.module.modelAnswer,
      moduleId: hit.module.id,
    };
  }
  if (id.startsWith("tech:")) {
    const tech = getTechnique(id.slice(5), custom);
    if (!tech) return null;
    return {
      kind: "technique",
      title: tech.fa,
      kicker: tech.en,
      prompt: `چطور «${tech.fa}» را تشخیص می‌دهی و چه پاسخ محترمانه‌ای می‌دهی؟`,
      answer: tech.counter,
      techniqueId: tech.id,
    };
  }
  return null;
}

export function dueIds(items: Record<string, ItemProgress>, today = localDate()) {
  return Object.entries(items)
    .filter(([, item]) => item.nextReview && item.nextReview <= today)
    .sort((a, b) => (a[1].nextReview ?? "").localeCompare(b[1].nextReview ?? ""))
    .map(([id]) => id);
}

export function nextUnseenId(items: Record<string, ItemProgress>, placement: string | null) {
  const ordered = [...domains.filter((d) => d.id === placement), ...domains.filter((d) => d.id !== placement)];
  for (const domain of ordered) {
    for (const course of domain.courses) {
      for (const chapter of course.chapters) {
        for (const module of chapter.modules) {
          const id = `mod:${module.id}`;
          if (!items[id]?.seen) return id;
        }
      }
    }
  }
  return null;
}

export type CircuitReason = "due" | "weak" | "next";

export function circuitPlan(items: Record<string, ItemProgress>, placement: string | null) {
  const due = dueIds(items).slice(0, 4);
  const weak = Object.entries(items)
    .filter(([id, item]) => !due.includes(id) && item.errors > 0 && stageOf(item) < 9)
    .sort((a, b) => b[1].errors - a[1].errors)
    .slice(0, 2)
    .map(([id]) => id);
  const next = nextUnseenId(items, placement);
  const ids = [...due, ...weak];
  if (next && !ids.includes(next)) ids.push(next);
  if (!ids.length) {
    const low = Object.entries(items)
      .filter(([, item]) => stageOf(item) < 9)
      .sort((a, b) => stageOf(a[1]) - stageOf(b[1]))[0];
    if (low) ids.push(low[0]);
  }
  return ids.map((id) => ({
    id,
    reason: (due.includes(id) ? "due" : id === next ? "next" : "weak") as CircuitReason,
  }));
}

export const reasonLabel: Record<CircuitReason, string> = {
  due: "مرور سررسید",
  weak: "نقطهٔ ضعف",
  next: "درس بعدی",
};

export function todayScript(items: Record<string, ItemProgress>, placement: string | null, custom: Technique[]) {
  const plan = circuitPlan(items, placement);
  if (!plan.length) return "مدار امروز ORBIT خلوت است. یک درس تازه از آکادمی باز کن.";
  const lines = plan.map((row, index) => {
    const bits = lessonBits(row.id, custom);
    return `${index + 1}. ${bits?.title ?? "مورد"} — ${reasonLabel[row.reason]}`;
  });
  return ["مدار امروز ORBIT", ...lines, "هر مورد را با پاسخ خودت ببند، نه با حفظ تعریف."].join("\n");
}
