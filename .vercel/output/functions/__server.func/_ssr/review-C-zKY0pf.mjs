import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useOrbit } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum, i as LessonLink } from "./bits-CHfG36Fl.mjs";
import { i as reasonLabel, r as lessonBits, t as circuitPlan } from "./plan-9Vknut8w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-C-zKY0pf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const custom = useOrbit((s) => s.customTechniques);
	const recordReview = useOrbit((s) => s.recordReview);
	const [queue, setQueue] = (0, import_react.useState)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [gained, setGained] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const load = () => {
			const state = useOrbit.getState();
			setQueue(circuitPlan(state.items, state.placementDomain));
		};
		if (useOrbit.persist.hasHydrated()) {
			load();
			return;
		}
		return useOrbit.persist.onFinishHydration(load);
	}, []);
	if (!queue) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "در حال چیدن مدار امروز…"
	});
	const current = queue[index];
	const bits = current ? lessonBits(current.id, custom) : null;
	if (!current || !bits) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "مدار امروز تمام شد"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm leading-7 text-muted",
			children: [
				queue.length ? `${faNum(queue.length)} مورد بسته شد.` : "چیزی برای مرور نبود.",
				" ",
				gained > 0 ? `${faNum(gained)} امتیاز این نشست.` : "امتیاز تازه فقط وقتی ثبت می‌شود که پاسخ را سنجیده باشی."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
				children: "خانه"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/academy",
				className: "inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm",
				children: "آکادمی"
			})]
		})]
	});
	function rate(quality) {
		if (!current) return;
		setGained((n) => n + recordReview(current.id, quality));
		setOpen(false);
		setIndex((n) => n + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"مورد ",
					faNum(index + 1),
					" از ",
					faNum(queue.length),
					" · ",
					reasonLabel[current.reason]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-bold",
				children: bits.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: bits.kicker
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7",
				children: bits.prompt
			}), current.reason === "next" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-7 text-muted",
					children: "این درس را هنوز باز نکرده‌ای. مرور، جای خواندن درس را نمی‌گیرد."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonLink, {
						bits,
						className: "inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						children: "شروع درس"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setOpen(false);
							setIndex((n) => n + 1);
						},
						className: "min-h-11 rounded-xl border border-border px-4 text-sm",
						children: "بعداً"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
					children: "نشان دادن پاسخ مرجع"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-bg p-3 text-sm leading-7",
						children: bits.answer
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-5 text-muted",
						children: "خودت را با پاسخ مرجع بسنج، نه با احساس کلی."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => rate(0),
								className: "min-h-11 rounded-xl border border-border px-3 text-sm",
								children: "بلد نبودم"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => rate(1),
								className: "min-h-11 rounded-xl border border-border px-3 text-sm",
								children: "تقریبی"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => rate(2),
								className: "min-h-11 rounded-xl border border-primary px-3 text-sm text-primary",
								children: "بلد بودم"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonLink, {
					bits,
					className: "inline-flex min-h-11 items-center text-sm text-primary",
					children: "باز کردن درس کامل"
				})]
			})]
		})]
	});
}
//#endregion
export { ReviewPage as component };
