import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, l as useOrbit, s as localDate } from "./router-CezrZMOo.mjs";
import { a as Panel, i as LessonLink } from "./bits-CHfG36Fl.mjs";
import { t as aiStatus } from "./ai.functions-a98MZAb2.mjs";
import { a as todayScript, n as dueIds, r as lessonBits } from "./plan-9Vknut8w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-DE1hWuoO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ToolsPage() {
	const navigate = useNavigate();
	const items = useOrbit((s) => s.items);
	const custom = useOrbit((s) => s.customTechniques);
	const placement = useOrbit((s) => s.placementDomain);
	const voice = useOrbit((s) => s.voice);
	const setVoice = useOrbit((s) => s.setVoice);
	const [modelOn, setModelOn] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)("مربی مبتدی");
	const [task, setTask] = (0, import_react.useState)("");
	const [limit, setLimit] = (0, import_react.useState)("حداکثر ۱۵۰ کلمه، بدون توصیهٔ دستکاری");
	const [shape, setShape] = (0, import_react.useState)("تعریف، مثال، یک تمرین");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const today = localDate();
	const due = dueIds(items, today);
	const script = todayScript(items, placement, custom);
	(0, import_react.useEffect)(() => {
		aiStatus().then((res) => setModelOn(res.available)).catch(() => setModelOn(false));
	}, []);
	const prompt = [
		`نقش: ${role}`,
		`کار: ${task || "…"}`,
		`محدودیت: ${limit}`,
		`قالب: ${shape}`
	].join("\n");
	async function copyScript() {
		try {
			await navigator.clipboard.writeText(script);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "ابزارها"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "کارگاه پرامپت، صف مرور، یادآوری که خودت می‌فرستی، و سبک پاسخ محلی. ربات بیرونی به حساب تو وصل نیست."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "کارگاه پرامپت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "نقش",
						value: role,
						onChange: setRole
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "کار",
						value: task,
						onChange: setTask,
						placeholder: "مثلاً فرق مرز و تهدید را برای دوست توضیح بده"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "محدودیت",
						value: limit,
						onChange: setLimit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "قالب خروجی",
						value: shape,
						onChange: setShape
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm leading-7",
						children: prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						onClick: () => {
							sessionStorage.setItem("orbit-draft", prompt);
							navigate({ to: "/assistant" });
						},
						children: "بردن به دستیار"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "مرورهای سررسید"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/review",
							className: "inline-flex min-h-11 items-center text-sm text-primary",
							children: "شروع مدار"
						})]
					}),
					due.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "موردی برای امروز نیست. بعد از تمرین نوشتاری یا مرور، فاصله تنظیم می‌شود."
					}),
					due.map((id) => {
						const bits = lessonBits(id, custom);
						if (!bits) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonLink, {
							bits,
							className: "block rounded-xl bg-bg px-3 py-2 text-sm",
							children: bits.title
						}, id);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "یادآوری برای خودت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "متن مدار امروز را کپی کن یا در تلگرام برای خودت بفرست. این یک ربات همیشه روشن نیست."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm leading-7",
						children: script
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void copyScript(),
							className: "min-h-11 rounded-xl border border-border px-4 text-sm",
							children: copied ? "کپی شد" : "کپی متن"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
							href: `https://t.me/share/url?text=${encodeURIComponent(script)}`,
							target: "_blank",
							rel: "noreferrer",
							children: "فرستادن در تلگرام"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3 text-sm leading-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "سبک دانشنامهٔ محلی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [["plain", "روان و مستقیم"], ["socratic", "اول یک سؤال"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setVoice(id),
							className: cn("min-h-11 rounded-full border px-3", voice === id ? "border-primary text-primary" : "border-border text-muted"),
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["ارائه‌دهندهٔ محلی همیشه روشن است. ارائه‌دهندهٔ xAI: ", modelOn ? "Grok 4.5 آماده است و فقط با دکمه صدا زده می‌شود." : modelOn === false ? "کلید مدل در این محیط نیست." : "در حال بررسی…"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "مدل دوم اضافه نشده تا پاسخ ساختگی به اسم یک شرکت دیگر نیاید. اگر Grok خطا بدهد، همان دانشنامه با سبک انتخابی جواب می‌دهد."
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none"
		})]
	});
}
//#endregion
export { ToolsPage as component };
