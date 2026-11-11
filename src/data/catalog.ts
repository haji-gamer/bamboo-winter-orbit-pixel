import { domainsPartA } from "./domains";
import { domainsPartB } from "./domains-rest";
import { domainsPartC } from "./domains-life";
import { techniques as seedTechniques } from "./techniques";
import type { Domain, Ethics, LessonRef, Module, Quiz, Technique } from "./types";

export const domains: Domain[] = [...domainsPartA, ...domainsPartB, ...domainsPartC];

export type ModuleHit = {
  domain: Domain;
  courseTitle: string;
  chapterTitle: string;
  module: Module;
};

export function allModules(): ModuleHit[] {
  const out: ModuleHit[] = [];
  for (const domain of domains) {
    for (const course of domain.courses) {
      for (const chapter of course.chapters) {
        for (const module of chapter.modules) out.push({ domain, courseTitle: course.title, chapterTitle: chapter.title, module });
      }
    }
  }
  return out;
}

export function getDomain(id: string) {
  return domains.find((d) => d.id === id);
}

export function getModule(id: string) {
  return allModules().find((m) => m.module.id === id);
}

export function mergeTechniques(custom: Technique[]) {
  const ids = new Set(seedTechniques.map((t) => t.id));
  return [...seedTechniques, ...custom.filter((t) => !ids.has(t.id))];
}

export function getTechnique(id: string, custom: Technique[] = []) {
  return mergeTechniques(custom).find((t) => t.id === id);
}

export const ethicsLabel: Record<Ethics, string> = {
  healthy: "سالم",
  neutral: "خنثی",
  controversial: "بحث‌برانگیز",
  manipulative: "دستکاری‌گرانه",
};

export const evidenceLabel = {
  scientific: "پشتوانهٔ پژوهشی",
  educational: "تفسیر آموزشی",
  experiential: "اصطلاح یا تجربهٔ میدانی",
} as const;

export const stageNames = [
  "شروع‌نشده",
  "آشنایی",
  "فهم مفهوم",
  "تشخیص در مثال",
  "تشخیص در موقعیت تازه",
  "پاسخ عملی",
  "تحلیل رفتار",
  "مقابله",
  "آزمون ترکیبی",
  "تسلط",
];

export function norm(input: string) {
  return input
    .replace(/\u200c/g, " ")
    .replace(/[ي]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .toLowerCase()
    .trim();
}

function pickOther<T>(list: T[], avoid: T, n: number) {
  const out: T[] = [];
  for (const item of list) {
    if (item === avoid) continue;
    out.push(item);
    if (out.length === n) break;
  }
  return out;
}

export function moduleQuizzes(hit: ModuleHit): Quiz[] {
  const pool = allModules().map((m) => m.module);
  const decoys = pickOther(pool, hit.module, 2);
  return [
    {
      prompt: `کدام توضیح به «${hit.module.title}» نزدیک‌تر است؟`,
      options: [hit.module.summary, decoys[0]?.summary ?? "این موضوع فقط حفظ یک جمله است.", decoys[1]?.why ?? "در موقعیت واقعی هیچ کاربردی ندارد."],
      correct: 0,
      explain: "گزینهٔ درست همان تعریف سادهٔ درس است. گزینه‌های دیگر به درس دیگری یا به حفظ طوطی‌وار تعلق دارند.",
    },
    {
      prompt: "کدام موقعیت به مثال این درس شبیه‌تر است؟",
      options: [
        hit.module.example,
        "حفظ کردن نام درس و رد شدن از مثال واقعی.",
        decoys[0]?.example ?? "یک موقعیت نامرتبط بدون مشاهدهٔ مشخص.",
      ],
      correct: 0,
      explain: "تشخیص یعنی دیدن همان الگو در موقعیت، نه تکرار عنوان.",
    },
    {
      prompt: "در یک موقعیت تازه، قدم قابل دفاع‌تر کدام است؟",
      options: [
        hit.module.modelAnswer,
        "همان تکنیک یا عادت را شدیدتر تکرار کن تا نتیجه عوض شود.",
        "نتیجه را قطعی اعلام کن و نیازی به مشاهدهٔ مشخص نیست.",
      ],
      correct: 0,
      explain: hit.module.basis,
    },
  ];
}

export function techniqueQuizzes(tech: Technique, all: Technique[]): Quiz[] {
  const decoys = pickOther(all, tech, 2);
  return [
    {
      prompt: `کدام جمله هدف احتمالی «${tech.fa}» را بهتر می‌گوید؟`,
      options: [tech.mechanism, decoys[0]?.mechanism ?? "هیچ اثری ندارد.", "فقط یک نام قشنگ است و رفتار را عوض نمی‌کند."],
      correct: 0,
      explain: "هدف احتمالی را از اثر جدا کن. دانستن اثر به معنی توصیهٔ استفاده نیست.",
    },
    {
      prompt: "کدام نمونه به این تکنیک نزدیک‌تر است؟",
      options: [tech.example, decoys[0]?.example ?? "یک گفت‌وگوی معمولی بدون الگو.", decoys[1]?.counter ?? "یک مرز روشن و بدون نمایش."],
      correct: 0,
      explain: tech.detect,
    },
    {
      prompt: "پاسخ قابل دفاع‌تر در برابر این تکنیک کدام است؟",
      options: [
        tech.counter,
        "همان الگو را شدیدتر برگردان تا کوتاه بیاید.",
        "هیچ چیز نگو و بعداً با تحقیر تلافی کن.",
      ],
      correct: 0,
      explain: tech.useNote,
    },
  ];
}

export type ScoreCard = { score: number; strengths: string[]; gaps: string[] };

export function scoreAnswer(answer: string, keywords: string[], ethics?: Ethics): ScoreCard {
  const text = norm(answer);
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const strengths: string[] = [];
  const gaps: string[] = [];
  if (words.length < 8) {
    return { score: 12, strengths, gaps: ["پاسخ کوتاه است. حداقل دو جمله بنویس: چه دیدی و چه کار می‌کنی."] };
  }
  let score = 22;
  if (words.length >= 18) {
    score += 8;
    strengths.push("پاسخ به اندازهٔ کافی باز شده است.");
  }
  const hits = keywords.filter((k) => text.includes(norm(k)));
  if (hits.length) {
    score += Math.min(36, hits.length * 12);
    strengths.push(`به مفهوم‌های مرتبط اشاره شد: ${hits.slice(0, 3).join("، ")}.`);
  } else {
    gaps.push("به مفهوم اصلی این مورد اشارهٔ روشنی نشده.");
  }
  const care = ["رضایت", "احترام", "صداقت", "مرز", "شفاف", "نه "].filter((w) => text.includes(norm(w)));
  if (ethics === "manipulative" || ethics === "controversial") {
    if (care.length) {
      score += 18;
      strengths.push("قید اخلاق یا مرز در جواب هست.");
    } else {
      gaps.push("برای این مورد باید دربارهٔ شفافیت، احترام یا مرز هم حرف بزنی.");
    }
    const push = ["برگردون", "تلافی", "باید استفاده", "ولش کن تا", "تحقیرش کن", "نشون بده برتری"];
    if (push.some((p) => text.includes(norm(p)))) {
      score -= 28;
      gaps.push("جواب، اجرای تکنیک یا تلافی را پیشنهاد می‌کند. اینجا مقابلهٔ محترمانه ملاک است.");
    }
  } else if (care.length) {
    score += 8;
  }
  if (/همیشه|قطعا|صد در صد|۱۰۰/.test(answer) && ethics) {
    score -= 6;
    gaps.push("قطعیت زیاد است. اثر تکنیک را محتمل بگو نه حتمی.");
  }
  return { score: Math.max(0, Math.min(100, score)), strengths, gaps };
}

export function detectTechniques(text: string, all: Technique[]) {
  const hay = norm(text);
  return all
    .map((tech) => {
      const hits = tech.signals.filter((s) => hay.includes(norm(s)));
      const nameHit = hay.includes(norm(tech.fa)) || hay.includes(tech.en.toLowerCase()) ? 1 : 0;
      return { tech, hits, score: hits.length * 2 + nameHit };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function searchAll(query: string, custom: Technique[]): LessonRef[] {
  const q = norm(query);
  if (!q) return [];
  const refs: LessonRef[] = [];
  for (const hit of allModules()) {
    const blob = norm([hit.module.title, hit.module.summary, hit.domain.title].join(" "));
    if (blob.includes(q)) {
      refs.push({ kind: "module", id: hit.module.id, title: hit.module.title, kicker: hit.domain.title, domainId: hit.domain.id });
    }
  }
  for (const tech of mergeTechniques(custom)) {
    const blob = norm([tech.fa, tech.en, tech.summary].join(" "));
    if (blob.includes(q)) refs.push({ kind: "technique", id: tech.id, title: tech.fa, kicker: tech.en });
  }
  return refs.slice(0, 12);
}

export function localTutor(question: string, custom: Technique[], voice: "plain" | "socratic" = "plain") {
  const all = mergeTechniques(custom);
  const found = detectTechniques(question, all);
  if (question.trim().length > 70 && found.length) {
    const body = found
      .map((row) => `«${row.tech.fa}» محتمل است. ${row.tech.mechanism} مقابله: ${row.tech.counter}`)
      .join("\n\n");
    return voice === "socratic" ? `قبل از برچسب زدن: کدام جملهٔ مشخص این برداشت را ساخته؟\n\n${body}` : body;
  }
  const q = norm(question);
  let best: { score: number; text: string } | null = null;
  for (const hit of allModules()) {
    const keys = [hit.module.title, ...hit.module.keywords];
    const score = keys.reduce((n, k) => n + (q.includes(norm(k)) ? 2 : 0), 0);
    if (!best || score > best.score) {
      best = {
        score,
        text: `${hit.module.title}\n${hit.module.summary}\n\nمثال: ${hit.module.example}\n\nاین پاسخ از دانشنامهٔ محلی است، نه از مدل.`,
      };
    }
  }
  for (const tech of all) {
    const keys = [tech.fa, tech.en, ...tech.keywords, ...tech.signals];
    const score = keys.reduce((n, k) => n + (q.includes(norm(k)) ? 2 : 0), 0);
    if (!best || score > best.score) {
      best = {
        score,
        text: `${tech.fa} (${tech.en})\n${tech.summary}\n\nاثر احتمالی: ${tech.mechanism}\n\nتوصیه: ${tech.useNote}\n\nاین پاسخ از بانک تکنیک است، نه از مدل.`,
      };
    }
  }
  if (best && best.score >= 2) {
    if (voice === "socratic") return `یک سؤال قبل از جواب کامل: در موقعیت خودت کدام بخشش را واقعاً دیدی؟\n\n${best.text}`;
    return best.text;
  }
  return "در دانشنامهٔ محلی چیز دقیقی برای این سؤال پیدا نشد. نام تکنیک یا درس را بگو، یا از آکادمی یک مسیر را باز کن. اگر مدل روشن باشد، می‌توانی همان سؤال را برای پاسخ گسترده‌تر بفرستی.";
}

export const sampleChat = `فقط یه لحظه وقت دارم. راستی تو جذابی ولی زیادی سعی می‌کنی خاص به نظر برسی. شوخی بود، خیلی حساسی. افراد زیادی دنبال وقت من هستند و معلوم نیست جواب بدم، سرم شلوغه.`;

export const levels = [
  { xp: 0, name: "مدار صفر" },
  { xp: 40, name: "ناظر" },
  { xp: 120, name: "شاگرد مدار" },
  { xp: 240, name: "تحلیل‌گر" },
  { xp: 420, name: "مربی مبتدی" },
  { xp: 680, name: "مداربان" },
];

export function levelFor(xp: number) {
  let current = levels[0];
  let next = levels[1];
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xp) {
      current = levels[i];
      next = levels[i + 1];
    }
  }
  const span = next ? next.xp - current.xp : 1;
  const into = next ? Math.min(1, (xp - current.xp) / span) : 1;
  return { name: current.name, next: next?.name ?? null, into, index: levels.indexOf(current) + 1 };
}
