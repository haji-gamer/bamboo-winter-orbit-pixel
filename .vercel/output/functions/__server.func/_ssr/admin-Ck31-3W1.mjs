import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as mergeTechniques, f as domains, l as useOrbit, u as allModules } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum, n as EthicsChip } from "./bits-CHfG36Fl.mjs";
import { t as aiStatus } from "./ai.functions-a98MZAb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Ck31-3W1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const edits = useOrbit((s) => s.edits);
	const setEdit = useOrbit((s) => s.setEdit);
	const custom = useOrbit((s) => s.customTechniques);
	const add = useOrbit((s) => s.addTechnique);
	const remove = useOrbit((s) => s.removeTechnique);
	const items = useOrbit((s) => s.items);
	const [moduleId, setModuleId] = (0, import_react.useState)(allModules()[0]?.module.id ?? "");
	const hit = allModules().find((m) => m.module.id === moduleId);
	const [summary, setSummary] = (0, import_react.useState)("");
	const [example, setExample] = (0, import_react.useState)("");
	const [modelOn, setModelOn] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		fa: "",
		en: "",
		ethics: "neutral",
		summary: "",
		mechanism: "",
		example: "",
		detect: "",
		counter: "",
		useNote: ""
	});
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		aiStatus().then((r) => setModelOn(r.available)).catch(() => setModelOn(false));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hit) return;
		setSummary(edits[hit.module.id]?.summary ?? hit.module.summary);
		setExample(edits[hit.module.id]?.example ?? hit.module.example);
	}, [hit, edits]);
	function saveTechnique() {
		if (form.fa.trim().length < 2 || form.summary.trim().length < 12 || form.counter.trim().length < 8) {
			setError("نام، تعریف و مقابله باید روشن باشند.");
			return;
		}
		const tech = {
			id: `custom-${Date.now()}`,
			fa: form.fa.trim(),
			en: form.en.trim() || form.fa.trim(),
			ethics: form.ethics,
			evidence: "experiential",
			basis: "افزودهٔ همین دستگاه، بدون بازبینی بیرونی.",
			summary: form.summary.trim(),
			mechanism: form.mechanism.trim() || form.summary.trim(),
			example: form.example.trim() || "مثال هنوز نوشته نشده.",
			detect: form.detect.trim() || "تکرار اثر را ببین، نه یک جملهٔ تنها.",
			counter: form.counter.trim(),
			useNote: form.useNote.trim() || "تا وقتی شفافیت و رضایت روشن نیست، اجرا توصیه نمی‌شود.",
			mistakes: "مورد سفارشی است؛ آن را با پژوهش یکی نگیر.",
			signals: form.fa.trim().split(/\s+/).slice(0, 3),
			keywords: form.fa.trim().split(/\s+/).slice(0, 4)
		};
		add(tech);
		setError("");
		setForm({
			fa: "",
			en: "",
			ethics: "neutral",
			summary: "",
			mechanism: "",
			example: "",
			detect: "",
			counter: "",
			useNote: ""
		});
	}
	const practiced = Object.keys(items).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "استودیو"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm leading-7 text-muted",
				children: "مدیریت محتوای همین دستگاه: ویرایش تعریف درس‌ها و افزودن تکنیک، بدون دست زدن به کد. آمار زیر فقط مال همین مرورگر است نه کاربران دیگر."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "حوزه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num text-2xl",
						children: faNum(domains.length)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "درس"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num text-2xl",
						children: faNum(allModules().length)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "مورد تمرین‌شده"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num text-2xl",
						children: faNum(practiced)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "ویرایش درس"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: moduleId,
						onChange: (e) => setModuleId(e.target.value),
						className: "h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm",
						children: domains.map((domain) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: domain.title,
							children: allModules().filter((m) => m.domain.id === domain.id).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m.module.id,
								children: m.module.title
							}, m.module.id))
						}, domain.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["تعریف ساده", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: summary,
							onChange: (e) => setSummary(e.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["مثال", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: example,
							onChange: (e) => setExample(e.target.value),
							rows: 3,
							className: "mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setEdit(moduleId, {
							summary,
							example
						}),
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						children: "ذخیرهٔ ویرایش"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "تکنیک تازه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							label: "نام فارسی",
							value: form.fa,
							onChange: (fa) => setForm({
								...form,
								fa
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							label: "نام انگلیسی",
							value: form.en,
							onChange: (en) => setForm({
								...form,
								en
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["وضعیت توصیه", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.ethics,
							onChange: (e) => setForm({
								...form,
								ethics: e.target.value
							}),
							className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "healthy",
									children: "سالم"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "neutral",
									children: "خنثی"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "controversial",
									children: "بحث‌برانگیز"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "manipulative",
									children: "دستکاری‌گرانه"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "تعریف",
						value: form.summary,
						onChange: (summary) => setForm({
							...form,
							summary
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "نحوهٔ اثر",
						value: form.mechanism,
						onChange: (mechanism) => setForm({
							...form,
							mechanism
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "مثال",
						value: form.example,
						onChange: (example) => setForm({
							...form,
							example
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "تشخیص",
						value: form.detect,
						onChange: (detect) => setForm({
							...form,
							detect
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "مقابله",
						value: form.counter,
						onChange: (counter) => setForm({
							...form,
							counter
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "توصیه",
						value: form.useNote,
						onChange: (useNote) => setForm({
							...form,
							useNote
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: saveTechnique,
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						children: "افزودن به بانک"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: custom.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									tech.fa,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EthicsChip, { ethics: tech.ethics })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 text-xs text-muted",
								onClick: () => remove(tech.id),
								children: "حذف"
							})]
						}, tech.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "مدل‌ها"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["پیش‌فرض گفت‌وگو و ارزیابی: Grok 4.5. وضعیت: ", modelOn ? "وصل" : modelOn === false ? "غیرقابل دسترس" : "…"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							"سبک دانشنامه (روان یا سقراطی) از ابزارها عوض می‌شود. مدل بیرونی فقط Grok است و اگر در دسترس نباشد، همان دانشنامه جواب می‌دهد. تکنیک‌های فعال: ",
							faNum(mergeTechniques(custom).length),
							"."
						]
					})
				]
			})
		]
	});
}
function Input({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none"
		})]
	});
}
function Area({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			rows: 2,
			className: "mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2 outline-none"
		})]
	});
}
//#endregion
export { AdminPage as component };
