import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stageOf, g as getModule, l as useOrbit, r as Route$1, x as moduleQuizzes } from "./router-CezrZMOo.mjs";
import { a as Panel, o as SaveButton, r as EvidenceChip, s as StageLine } from "./bits-CHfG36Fl.mjs";
import { t as PracticePanel } from "./practice-C5y3R2f4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn._moduleId-Bfw_zfOe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LearnPage() {
	const { moduleId } = Route$1.useParams();
	const hit = getModule(moduleId);
	const edit = useOrbit((s) => s.edits[moduleId]);
	const note = useOrbit((s) => s.notes[`mod:${moduleId}`] ?? "");
	const setNote = useOrbit((s) => s.setNote);
	const item = useOrbit((s) => s.items[`mod:${moduleId}`]);
	(0, import_react.useEffect)(() => {
		if (hit) useOrbit.getState().markSeen(`mod:${moduleId}`);
	}, [hit, moduleId]);
	if (!hit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "این درس پیدا نشد." });
	const { module, domain, courseTitle, chapterTitle } = hit;
	const summary = edit?.summary || module.summary;
	const example = edit?.example || module.example;
	const see = module.seeAlso?.startsWith("tech:") ? null : module.seeAlso ? getModule(module.seeAlso) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/academy/$domainId",
							params: { domainId: domain.id },
							children: domain.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							" · ",
							courseTitle,
							" · ",
							chapterTitle
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold",
						children: module.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceChip, { evidence: module.evidence }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { id: `mod:${module.id}` })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageLine, { stage: stageOf(item) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-4 text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "تعریف ساده",
						body: summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "چرا مهم است",
						body: module.why
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "مثال",
						body: example
					}),
					module.sections?.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: section.title,
						body: section.body
					}, section.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-6 text-muted",
						children: ["مبنای این بخش: ", module.basis]
					}),
					see && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"ارجاع به حوزهٔ مرتبط:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-primary",
							to: "/learn/$moduleId",
							params: { moduleId: see.module.id },
							children: see.module.title
						})
					] }),
					module.seeAlso?.startsWith("tech:") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"در بانک تکنیک:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "text-primary",
							to: "/technique/$techniqueId",
							params: { techniqueId: module.seeAlso.slice(5) },
							children: "باز کردن تکنیک"
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "یادداشت شخصی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(`mod:${module.id}`, e.target.value),
					rows: 3,
					dir: "auto",
					className: "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none",
					placeholder: "فقط برای خودت، روی همین دستگاه"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePanel, {
				itemId: `mod:${module.id}`,
				quizzes: moduleQuizzes(hit),
				prompt: module.practice,
				keywords: module.keywords,
				modelAnswer: module.modelAnswer,
				context: `${module.title}\n${summary}\n${module.why}`
			})
		]
	});
}
function Block({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1",
		children: body
	})] });
}
//#endregion
export { LearnPage as component };
