import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrbitBackup } from "@/lib/backup";
import type { Ethics, Evidence, Technique } from "@/data/types";

export type ItemProgress = {
  seen: boolean;
  quizPassed: number[];
  bestText: number;
  attempts: number;
  errors: number;
  lastPracticed: string | null;
  nextReview: string | null;
  interval: number;
  reviews: number;
};

export type ChatMessage = { role: "user" | "assistant"; content: string; via: "user" | "local" | "xai" };
export type Thread = { id: string; title: string; messages: ChatMessage[]; updated: string };

export type CustomTechnique = Technique;

type OrbitState = {
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
  customTechniques: CustomTechnique[];
  placementDomain: string | null;
  seenAchievements: string[];
  voice: "plain" | "socratic";
  markSeen: (id: string) => void;
  recordQuiz: (id: string, index: number, ok: boolean) => number;
  recordText: (id: string, score: number) => number;
  toggleSave: (id: string) => void;
  setNote: (id: string, body: string) => void;
  setEdit: (id: string, patch: { summary?: string; example?: string }) => void;
  setName: (name: string) => void;
  setPlacement: (domainId: string) => void;
  addTechnique: (tech: CustomTechnique) => void;
  removeTechnique: (id: string) => void;
  resetItem: (id: string) => void;
  resetMemory: () => void;
  markAchievement: (id: string) => void;
  setVoice: (voice: "plain" | "socratic") => void;
  recordReview: (id: string, quality: 0 | 1 | 2) => number;
  importBackup: (data: OrbitBackup) => void;
  ensureThread: () => string;
  appendMessage: (threadId: string, message: ChatMessage) => void;
  removeThread: (threadId: string) => void;
};

function emptyItem(seed?: Partial<ItemProgress>): ItemProgress {
  return {
    seen: false,
    quizPassed: [],
    bestText: 0,
    attempts: 0,
    errors: 0,
    lastPracticed: null,
    nextReview: null,
    interval: 0,
    reviews: 0,
    ...seed,
  };
}

export function localDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function plusDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return localDate(d);
}

function withStreak<T extends { streak: number; lastActive: string | null }>(state: T): T {
  const today = localDate();
  if (state.lastActive === today) return state;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const streak = state.lastActive === localDate(y) ? state.streak + 1 : 1;
  return { ...state, streak, lastActive: today };
}

export const useOrbit = create<OrbitState>()(
  persist(
    (set) => ({
      name: "کاوشگر",
      xp: 0,
      streak: 0,
      lastActive: null,
      items: {},
      saved: [],
      notes: {},
      edits: {},
      threads: [],
      activeThread: null,
      customTechniques: [],
      placementDomain: null,
      seenAchievements: [],
      voice: "plain",
      markSeen: (id) =>
        set((s) => {
          const prev = s.items[id];
          if (prev?.seen) return withStreak(s);
          return withStreak({
            ...s,
            xp: s.xp + 5,
            items: { ...s.items, [id]: emptyItem({ ...prev, seen: true }) },
          });
        }),
      recordQuiz: (id, index, ok) => {
        let gained = 0;
        set((s) => {
          const prev = emptyItem(s.items[id]);
          const passed = new Set(prev.quizPassed);
          const first = ok && !passed.has(index);
          if (first) {
            passed.add(index);
            gained = 12;
          }
          const errors = ok ? prev.errors : prev.errors + 1;
          const nextReview = ok ? prev.nextReview : plusDays(1);
          return withStreak({
            ...s,
            xp: s.xp + gained,
            items: {
              ...s.items,
              [id]: { ...prev, seen: true, quizPassed: [...passed], errors, nextReview, lastPracticed: localDate(), interval: ok ? prev.interval : 1 },
            },
          });
        });
        return gained;
      },
      recordText: (id, score) => {
        let gained = 0;
        set((s) => {
          const prev = emptyItem(s.items[id]);
          if (prev.bestText < 60 && score >= 60) gained += 20;
          if (prev.bestText < 85 && score >= 85) gained += 15;
          if (gained === 0 && score > prev.bestText && score >= 45) gained += 8;
          const interval = score >= 80 ? Math.max(1, (prev.interval || 1) * 2) : 1;
          return withStreak({
            ...s,
            xp: s.xp + gained,
            items: {
              ...s.items,
              [id]: {
                ...prev,
                seen: true,
                bestText: Math.max(prev.bestText, score),
                attempts: prev.attempts + 1,
                errors: score >= 60 ? prev.errors : prev.errors + 1,
                lastPracticed: localDate(),
                interval,
                nextReview: plusDays(interval),
              },
            },
          });
        });
        return gained;
      },
      toggleSave: (id) =>
        set((s) => ({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })),
      setNote: (id, body) => set((s) => ({ ...s, notes: { ...s.notes, [id]: body } })),
      setEdit: (id, patch) => set((s) => ({ ...s, edits: { ...s.edits, [id]: { ...s.edits[id], ...patch } } })),
      setName: (name) => set({ name }),
      setPlacement: (placementDomain) => set({ placementDomain }),
      addTechnique: (tech) => set((s) => ({ ...s, customTechniques: [tech, ...s.customTechniques.filter((t) => t.id !== tech.id)] })),
      removeTechnique: (id) => set((s) => ({ ...s, customTechniques: s.customTechniques.filter((t) => t.id !== id) })),
      resetItem: (id) =>
        set((s) => {
          const items = { ...s.items };
          delete items[id];
          return { ...s, items };
        }),
      resetMemory: () =>
        set({
          xp: 0,
          streak: 0,
          lastActive: null,
          items: {},
          placementDomain: null,
          seenAchievements: [],
        }),
      markAchievement: (id) => set((s) => (s.seenAchievements.includes(id) ? s : { ...s, seenAchievements: [...s.seenAchievements, id] })),
      setVoice: (voice) => set({ voice }),
      recordReview: (id, quality) => {
        let gained = 0;
        set((s) => {
          const prev = emptyItem(s.items[id]);
          let interval = prev.interval || 0;
          let errors = prev.errors;
          if (quality === 0) {
            interval = 1;
            errors += 1;
          } else if (quality === 1) {
            interval = Math.max(1, interval || 1);
            gained = 6;
          } else {
            interval = Math.min(21, Math.max(2, (interval || 1) * 2));
            gained = 10;
          }
          return withStreak({
            ...s,
            xp: s.xp + gained,
            items: {
              ...s.items,
              [id]: {
                ...prev,
                seen: true,
                errors,
                reviews: (prev.reviews ?? 0) + 1,
                interval,
                lastPracticed: localDate(),
                nextReview: plusDays(interval),
              },
            },
          });
        });
        return gained;
      },
      importBackup: (data) =>
        set({
          name: data.name,
          xp: data.xp,
          streak: data.streak,
          lastActive: data.lastActive,
          items: data.items,
          saved: data.saved,
          notes: data.notes,
          edits: data.edits,
          threads: data.threads,
          activeThread: data.activeThread,
          customTechniques: data.customTechniques,
          placementDomain: data.placementDomain,
          seenAchievements: data.seenAchievements,
          voice: data.voice,
        }),
      ensureThread: () => {
        let id = "";
        set((s) => {
          if (s.activeThread && s.threads.some((t) => t.id === s.activeThread)) {
            id = s.activeThread;
            return s;
          }
          id = `t-${Date.now()}`;
          const thread: Thread = { id, title: "گفت‌وگوی تازه", messages: [], updated: new Date().toISOString() };
          return { ...s, activeThread: id, threads: [thread, ...s.threads].slice(0, 12) };
        });
        return id;
      },
      appendMessage: (threadId, message) =>
        set((s) => ({
          ...s,
          threads: s.threads.map((thread) => {
            if (thread.id !== threadId) return thread;
            const messages = [...thread.messages, message].slice(-24);
            const title = thread.messages.length === 0 && message.role === "user" ? message.content.slice(0, 42) : thread.title;
            return { ...thread, messages, title, updated: new Date().toISOString() };
          }),
        })),
      removeThread: (threadId) =>
        set((s) => {
          const threads = s.threads.filter((t) => t.id !== threadId);
          return { ...s, threads, activeThread: s.activeThread === threadId ? threads[0]?.id ?? null : s.activeThread };
        }),
    }),
    { name: "orbit-v1", skipHydration: true },
  ),
);

export function stageOf(item?: ItemProgress) {
  if (!item?.seen) return 0;
  const quizzes = item.quizPassed.filter((n) => n <= 2).length;
  let stage = 1;
  if (quizzes >= 1) stage = 2;
  if (quizzes >= 2) stage = 3;
  if (quizzes >= 3) stage = 4;
  if (item.bestText >= 45) stage = Math.max(stage, 5);
  if (item.bestText >= 60) stage = Math.max(stage, 6);
  if (item.bestText >= 68 && quizzes >= 2) stage = Math.max(stage, 7);
  if (item.bestText >= 75 && quizzes >= 2) stage = Math.max(stage, 8);
  if (item.bestText >= 85 && quizzes >= 3) stage = 9;
  return stage;
}

export function achievementDefs(state: OrbitState) {
  const values = Object.values(state.items);
  const techSeen = Object.keys(state.items).filter((id) => id.startsWith("tech:") && state.items[id]?.seen).length;
  return [
    { id: "first-seen", name: "اولین مدار", detail: "یک درس یا تکنیک را باز کردی.", ok: values.some((i) => i.seen) },
    { id: "first-text", name: "پاسخ مکتوب", detail: "یک تمرین نوشتاری ثبت شد.", ok: values.some((i) => i.attempts > 0) },
    { id: "three-tech", name: "سه تکنیک", detail: "سه تکنیک را دیدی.", ok: techSeen >= 3 },
    { id: "streak-3", name: "سه روز پیاپی", detail: "سه روز پشت سر هم برگشتی.", ok: state.streak >= 3 },
    { id: "mastery", name: "یک تسلط", detail: "یک مورد به مرحلهٔ تسلط رسید.", ok: values.some((i) => stageOf(i) >= 9) },
    { id: "library", name: "کتابخانه", detail: "چیزی را برای بعد ذخیره کردی.", ok: state.saved.length > 0 },
  ];
}

export type { Ethics, Evidence };
