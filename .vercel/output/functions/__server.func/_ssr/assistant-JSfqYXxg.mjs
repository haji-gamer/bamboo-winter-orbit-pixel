import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useOrbit, y as localTutor } from "./router-CezrZMOo.mjs";
import { a as Panel } from "./bits-CHfG36Fl.mjs";
import { n as askOrbit, t as aiStatus } from "./ai.functions-a98MZAb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant-JSfqYXxg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var suggestions = [
	"تحقیر ملایم را ساده توضیح بده",
	"فرق مرز و تهدید چیست؟",
	"یک پرامپت مبتدی برای خلاصهٔ متن بساز"
];
function AssistantPage() {
	const threads = useOrbit((s) => s.threads);
	const activeThread = useOrbit((s) => s.activeThread);
	const append = useOrbit((s) => s.appendMessage);
	const removeThread = useOrbit((s) => s.removeThread);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [modelOn, setModelOn] = (0, import_react.useState)(null);
	const thread = threads.find((item) => item.id === activeThread) ?? null;
	(0, import_react.useEffect)(() => {
		aiStatus().then((res) => setModelOn(res.available)).catch(() => setModelOn(false));
		const draft = sessionStorage.getItem("orbit-draft");
		if (draft) {
			setText(draft);
			sessionStorage.removeItem("orbit-draft");
		}
	}, []);
	function openNew() {
		const id = `t-${Date.now()}`;
		useOrbit.setState((s) => ({
			activeThread: id,
			threads: [{
				id,
				title: "گفت‌وگوی تازه",
				messages: [],
				updated: (/* @__PURE__ */ new Date()).toISOString()
			}, ...s.threads].slice(0, 12)
		}));
	}
	async function send(content) {
		const clean = content.trim();
		if (!clean || busy) return;
		setBusy(true);
		setText("");
		let threadId = useOrbit.getState().activeThread;
		if (!threadId || !useOrbit.getState().threads.some((item) => item.id === threadId)) {
			threadId = `t-${Date.now()}`;
			useOrbit.setState((s) => ({
				activeThread: threadId,
				threads: [{
					id: threadId,
					title: clean.slice(0, 42),
					messages: [],
					updated: (/* @__PURE__ */ new Date()).toISOString()
				}, ...s.threads].slice(0, 12)
			}));
		}
		append(threadId, {
			role: "user",
			content: clean,
			via: "user"
		});
		const history = (useOrbit.getState().threads.find((item) => item.id === threadId)?.messages ?? []).map((m) => ({
			role: m.role,
			content: m.content
		}));
		try {
			const res = await askOrbit({ data: {
				mode: "chat",
				messages: history
			} });
			if (res.ok) append(threadId, {
				role: "assistant",
				content: res.text,
				via: "xai"
			});
			else append(threadId, {
				role: "assistant",
				content: localTutor(clean, useOrbit.getState().customTechniques, useOrbit.getState().voice),
				via: "local"
			});
		} catch {
			append(threadId, {
				role: "assistant",
				content: localTutor(clean, useOrbit.getState().customTechniques, useOrbit.getState().voice),
				via: "local"
			});
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openNew,
					className: "min-h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-fg",
					children: "گفت‌وگوی تازه"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-5 text-muted",
					children: modelOn ? "مدل Grok 4.5 روشن است. هر ارسال یک درخواست است." : modelOn === false ? "مدل خاموش است؛ پاسخ از دانشنامهٔ محلی می‌آید." : "در حال دیدن وضعیت مدل…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: threads.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => useOrbit.setState({ activeThread: item.id }),
							className: "min-h-11 flex-1 truncate rounded-lg px-2 text-start text-sm hover:bg-elevated",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "حذف گفت‌وگو",
							onClick: () => removeThread(item.id),
							className: "min-h-11 px-2 text-xs text-muted",
							children: "حذف"
						})]
					}, item.id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-[60dvh] flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "دستیار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "پاسخ‌ها فارسی و مبتدی‌اند. تکنیک دستکاری توصیه نمی‌شود."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-3",
					children: [(thread?.messages ?? []).map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: message.role === "user" ? "ms-8 rounded-2xl bg-elevated p-3 text-sm leading-7" : "me-8 rounded-2xl border border-border p-3 text-sm leading-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[11px] text-muted",
							children: message.role === "user" ? "تو" : message.via === "xai" ? "Grok 4.5" : "دانشنامهٔ محلی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: message.content
						})]
					}, `${message.role}-${index}`)), !thread?.messages.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void send(item),
							className: "min-h-11 rounded-full border border-border px-3 text-sm",
							children: item
						}, item))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						send(text);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value),
						dir: "auto",
						rows: 2,
						className: "min-h-11 flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none",
						placeholder: "سؤال، موقعیت، یا یک تکنیک"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy || !text.trim(),
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40",
						children: busy ? "…" : "بفرست"
					})]
				})
			]
		})]
	});
}
//#endregion
export { AssistantPage as component };
