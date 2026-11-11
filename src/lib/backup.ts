import type { Technique } from "@/data/types";
import type { ChatMessage, ItemProgress, Thread } from "@/lib/store";

export type OrbitBackup = {
  v: 2;
  name: string;
  xp: number;
  streak: number;
  lastActive: string | null;
  items: Record<string, ItemProgress>;
  saved: string[];
  notes: Record<string, string>;
  edits: Record<string, { summary?: string; example?: string }>;
  threads: Thread[];
  activeThread: string | null;
  customTechniques: Technique[];
  placementDomain: string | null;
  seenAchievements: string[];
  voice: "plain" | "socratic";
};

function num(value: unknown, max: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(max, Math.round(value))) : 0;
}

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function item(value: unknown): ItemProgress | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const quiz = Array.isArray(row.quizPassed) ? row.quizPassed.filter((n) => typeof n === "number" && n >= 0 && n < 8).slice(0, 8) : [];
  return {
    seen: Boolean(row.seen),
    quizPassed: quiz as number[],
    bestText: num(row.bestText, 100),
    attempts: num(row.attempts, 500),
    errors: num(row.errors, 500),
    lastPracticed: typeof row.lastPracticed === "string" ? row.lastPracticed.slice(0, 10) : null,
    nextReview: typeof row.nextReview === "string" ? row.nextReview.slice(0, 10) : null,
    interval: num(row.interval, 60),
    reviews: num(row.reviews, 500),
  };
}

function technique(value: unknown): Technique | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const ethics = row.ethics;
  const evidence = row.evidence;
  if (typeof row.id !== "string" || typeof row.fa !== "string" || row.fa.length < 2) return null;
  if (ethics !== "healthy" && ethics !== "neutral" && ethics !== "controversial" && ethics !== "manipulative") return null;
  if (evidence !== "scientific" && evidence !== "educational" && evidence !== "experiential") return null;
  const list = (key: string) => (Array.isArray(row[key]) ? row[key].filter((x) => typeof x === "string").slice(0, 8).map((x) => x.slice(0, 40)) : []);
  return {
    id: row.id.slice(0, 80),
    en: str(row.en, 80) || str(row.fa, 80),
    fa: str(row.fa, 80),
    ethics,
    evidence,
    basis: str(row.basis, 400),
    summary: str(row.summary, 600),
    mechanism: str(row.mechanism, 600),
    example: str(row.example, 600),
    detect: str(row.detect, 600),
    counter: str(row.counter, 600),
    useNote: str(row.useNote, 600),
    mistakes: str(row.mistakes, 400),
    signals: list("signals"),
    keywords: list("keywords"),
  };
}

function thread(value: unknown): Thread | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string") return null;
  const messages: ChatMessage[] = Array.isArray(row.messages)
    ? row.messages.slice(-24).flatMap((message) => {
        if (!message || typeof message !== "object") return [];
        const m = message as Record<string, unknown>;
        if ((m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return [];
        const via = m.via === "xai" || m.via === "local" || m.via === "user" ? m.via : "local";
        return [{ role: m.role, content: m.content.slice(0, 4000), via }];
      })
    : [];
  return {
    id: row.id.slice(0, 40),
    title: str(row.title, 80) || "گفت‌وگو",
    messages,
    updated: str(row.updated, 40),
  };
}

export function parseBackup(raw: unknown): OrbitBackup | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  if (row.v !== 2 || !row.items || typeof row.items !== "object") return null;
  const items: Record<string, ItemProgress> = {};
  for (const [key, value] of Object.entries(row.items as Record<string, unknown>).slice(0, 400)) {
    if (!/^(mod|tech):[a-z0-9:-]{1,80}$/i.test(key)) continue;
    const parsed = item(value);
    if (parsed) items[key] = parsed;
  }
  const saved = Array.isArray(row.saved) ? row.saved.filter((id) => typeof id === "string").slice(0, 200).map((id) => id.slice(0, 90)) : [];
  const notes: Record<string, string> = {};
  if (row.notes && typeof row.notes === "object") {
    for (const [key, value] of Object.entries(row.notes as Record<string, unknown>).slice(0, 200)) {
      if (typeof value === "string" && /^(mod|tech):/.test(key)) notes[key.slice(0, 90)] = value.slice(0, 4000);
    }
  }
  const edits: OrbitBackup["edits"] = {};
  if (row.edits && typeof row.edits === "object") {
    for (const [key, value] of Object.entries(row.edits as Record<string, unknown>).slice(0, 200)) {
      if (!value || typeof value !== "object") continue;
      const patch = value as Record<string, unknown>;
      edits[key.slice(0, 80)] = { summary: str(patch.summary, 800), example: str(patch.example, 800) };
    }
  }
  return {
    v: 2,
    name: str(row.name, 32) || "کاوشگر",
    xp: num(row.xp, 200000),
    streak: num(row.streak, 5000),
    lastActive: typeof row.lastActive === "string" ? row.lastActive.slice(0, 10) : null,
    items,
    saved,
    notes,
    edits,
    threads: Array.isArray(row.threads) ? row.threads.slice(0, 12).flatMap((entry) => {
      const parsed = thread(entry);
      return parsed ? [parsed] : [];
    }) : [],
    activeThread: typeof row.activeThread === "string" ? row.activeThread.slice(0, 40) : null,
    customTechniques: Array.isArray(row.customTechniques) ? row.customTechniques.slice(0, 40).flatMap((entry) => {
      const parsed = technique(entry);
      return parsed ? [parsed] : [];
    }) : [],
    placementDomain: typeof row.placementDomain === "string" ? row.placementDomain.slice(0, 40) : null,
    seenAchievements: Array.isArray(row.seenAchievements) ? row.seenAchievements.filter((id) => typeof id === "string").slice(0, 30).map((id) => id.slice(0, 40)) : [],
    voice: row.voice === "socratic" ? "socratic" : "plain",
  };
}
