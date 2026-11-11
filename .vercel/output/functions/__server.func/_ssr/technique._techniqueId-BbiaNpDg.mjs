import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as techniqueQuizzes, _ as getTechnique, a as cn, b as mergeTechniques, c as stageOf, l as useOrbit, n as Route } from "./router-CezrZMOo.mjs";
import { a as Panel, n as EthicsChip, o as SaveButton, r as EvidenceChip, s as StageLine } from "./bits-CHfG36Fl.mjs";
import { t as PracticePanel } from "./practice-C5y3R2f4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/technique._techniqueId-BbiaNpDg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TechniquePage() {
	const { techniqueId } = Route.useParams();
	const custom = useOrbit((s) => s.customTechniques);
	const tech = getTechnique(techniqueId, custom);
	const item = useOrbit((s) => s.items[`tech:${techniqueId}`]);
	const note = useOrbit((s) => s.notes[`tech:${techniqueId}`] ?? "");
	const setNote = useOrbit((s) => s.setNote);
	(0, import_react.useEffect)(() => {
		if (tech) useOrbit.getState().markSeen(`tech:${techniqueId}`);
	}, [tech, techniqueId]);
	if (!tech) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "این تکنیک پیدا نشد." });
	const all = mergeTechniques(custom);
	const harsh = tech.ethics === "manipulative" || tech.ethics === "controversial";
	const options = [{
		label: "پاسخ الف",
		text: harsh ? "همان الگو را شدیدتر برمی‌گردانم تا کوتاه بیاید." : "از ظاهر این روش استفاده می‌کنم تا طرف گیج شود و امتیاز بدهد.",
		verdict: "avoid",
		why: "تلافی یا گیج کردن، چرخه را ادامه می‌دهد و شفافیت را از بین می‌برد."
	}, {
		label: "پاسخ ب",
		text: tech.counter,
		verdict: "better",
		why: tech.useNote
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/techniques",
						className: "text-sm text-muted",
						children: "بانک تکنیک‌ها"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold",
						children: tech.fa
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						dir: "ltr",
						children: tech.en
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EthicsChip, { ethics: tech.ethics }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceChip, { evidence: tech.evidence }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { id: `tech:${tech.id}` })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageLine, { stage: stageOf(item) })
				]
			}),
			harsh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "border-primary/40 text-sm leading-7",
				children: ["این صفحه برای شناخت، تشخیص و مقابله است. توصیهٔ استفاده فقط وقتی مطرح می‌شود که رضایت، احترام، صداقت و پیامد رعایت شده باشد. در این مورد: ", tech.useNote]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-4 text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "تعریف ساده",
						body: tech.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "نحوهٔ اثر",
						body: tech.mechanism
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "مثال",
						body: tech.example
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "تشخیص در دیگران",
						body: tech.detect
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "مقابله",
						body: tech.counter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "استفاده و محدودیت",
						body: tech.useNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "اشتباه رایج",
						body: tech.mistakes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-6 text-muted",
						children: ["مبنا: ", tech.basis]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compare, {
				itemId: `tech:${tech.id}`,
				options
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "یادداشت"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(`tech:${tech.id}`, e.target.value),
					rows: 3,
					dir: "auto",
					className: "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePanel, {
				itemId: `tech:${tech.id}`,
				quizzes: techniqueQuizzes(tech, all),
				prompt: `اگر این الگو را در حرف طرف دیدی، یک پاسخ محترمانه و مشخص بنویس. تکنیک: ${tech.fa}`,
				keywords: tech.keywords,
				ethics: tech.ethics,
				modelAnswer: tech.counter,
				context: `${tech.fa}\n${tech.summary}\n${tech.mechanism}\n${tech.useNote}`
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
function Compare({ itemId, options }) {
	const recordQuiz = useOrbit((s) => s.recordQuiz);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "مقایسهٔ پاسخ‌ها"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "کدام پاسخ قابل دفاع‌تر است؟"
			}),
			options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: done,
				onClick: () => setPick(index),
				className: cn("w-full rounded-xl border px-3 py-3 text-start text-sm leading-7", pick === index ? "border-primary" : "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [option.label, ". "]
				}), option.text]
			}, option.label)),
			!done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: pick === null,
				onClick: () => {
					if (pick === null) return;
					recordQuiz(itemId, 3, options[pick].verdict === "better");
					setDone(true);
				},
				className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40",
				children: "سنجیدن انتخاب"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 text-sm leading-7",
				children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [option.label, ": "]
					}),
					option.verdict === "better" ? "قابل دفاع‌تر. " : "ضعیف یا آسیب‌زا. ",
					option.why
				] }, option.label))
			})
		]
	});
}
//#endregion
export { TechniquePage as component };
