export type Evidence = "scientific" | "educational" | "experiential";

export type Ethics = "healthy" | "neutral" | "controversial" | "manipulative";

export type Section = { title: string; body: string };

export type Module = {
  id: string;
  title: string;
  summary: string;
  why: string;
  example: string;
  practice: string;
  modelAnswer: string;
  keywords: string[];
  evidence: Evidence;
  basis: string;
  seeAlso?: string;
  sections?: Section[];
};

export type Chapter = { id: string; title: string; modules: Module[] };

export type Course = { id: string; title: string; blurb: string; chapters: Chapter[] };

export type Domain = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  courses: Course[];
};

export type ResponseOption = {
  label: string;
  text: string;
  verdict: "avoid" | "weak" | "better";
  why: string;
};

export type Technique = {
  id: string;
  en: string;
  fa: string;
  ethics: Ethics;
  evidence: Evidence;
  basis: string;
  summary: string;
  mechanism: string;
  example: string;
  detect: string;
  counter: string;
  useNote: string;
  mistakes: string;
  signals: string[];
  keywords: string[];
};

export type Quiz = {
  prompt: string;
  options: string[];
  correct: number;
  explain: string;
};

export type LessonRef = {
  kind: "module" | "technique";
  id: string;
  title: string;
  kicker: string;
  domainId?: string;
};
