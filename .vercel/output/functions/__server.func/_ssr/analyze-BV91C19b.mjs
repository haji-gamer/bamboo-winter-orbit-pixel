import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as sampleChat, b as mergeTechniques, d as detectTechniques, l as useOrbit } from "./router-CezrZMOo.mjs";
import { a as Panel, n as EthicsChip } from "./bits-CHfG36Fl.mjs";
import { n as askOrbit } from "./ai.functions-a98MZAb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-BV91C19b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalyzePage() {
	const custom = useOrbit((s) => s.customTechniques);
	const [text, setText] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [ran, setRan] = (0, import_react.useState)(false);
	const [ai, setAi] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function run() {
		const found = detectTechniques(text, mergeTechniques(custom)).map((row) => ({
			tech: row.tech,
			hits: row.hits
		}));
		setHits(found);
		setRan(true);
		setAi(null);
	}
	async function deepen() {
		setBusy(true);
		try {
			const res = await askOrbit({ data: {
				mode: "analyze",
				messages: [{
					role: "user",
					content: text
				}]
			} });
			setAi(res.ok ? res.text : "مدل در دسترس نیست. نتیجهٔ بالا از تطبیق عبارت‌های بانک تکنیک است.");
		} catch {
			setAi("تحلیل مدل انجام نشد.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "تحلیل مکالمه"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "متن را بگذار تا الگوهای محتمل از بانک تکنیک پیدا شود. تطبیق عبارت قطعی نیست؛ اگر نشانه‌ها کم باشد چیزی نشان داده نمی‌شود."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: text,
				onChange: (e) => setText(e.target.value),
				dir: "auto",
				rows: 7,
				className: "w-full rounded-2xl border border-border bg-surface px-3 py-3 text-sm leading-7 outline-none",
				placeholder: "مکالمه را اینجا بنویس"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: run,
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						children: "تشخیص محلی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setText(sampleChat),
						className: "min-h-11 rounded-xl border border-border px-4 text-sm",
						children: "نمونهٔ آزمایشی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy || text.trim().length < 12,
						onClick: () => void deepen(),
						className: "min-h-11 rounded-xl border border-border px-4 text-sm disabled:opacity-40",
						children: busy ? "…" : "تحلیل با مدل"
					})
				]
			}),
			ran && hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "الگوی آشنایی پیدا نشد. یا متن کوتاه است یا در بانک این نسخه نشانه‌ای ندارد."
			}),
			hits.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2 text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/technique/$techniqueId",
							params: { techniqueId: row.tech.id },
							className: "font-semibold",
							children: row.tech.fa
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EthicsChip, { ethics: row.tech.ethics })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["هدف احتمالی: ", row.tech.mechanism] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["مقابله: ", row.tech.counter] }),
					row.hits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["عبارت‌های دیده‌شده: ", row.hits.join("، ")]
					})
				]
			}, row.tech.id)),
			ai && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-sm leading-7",
				children: ai
			}) })
		]
	});
}
//#endregion
export { AnalyzePage as component };
