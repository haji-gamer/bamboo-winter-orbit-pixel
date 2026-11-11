import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getTechnique, c as stageOf, f as domains, g as getModule, l as useOrbit, s as localDate, v as levelFor, w as stageNames } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum, i as LessonLink, t as DomainIcon } from "./bits-CHfG36Fl.mjs";
import { i as reasonLabel, r as lessonBits, t as circuitPlan } from "./plan-9Vknut8w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B09w-7n5.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const name = useOrbit((s) => s.name);
	const xp = useOrbit((s) => s.xp);
	const streak = useOrbit((s) => s.streak);
	const items = useOrbit((s) => s.items);
	const custom = useOrbit((s) => s.customTechniques);
	const placement = useOrbit((s) => s.placementDomain);
	const level = levelFor(xp);
	const today = localDate();
	const plan = circuitPlan(items, placement);
	const due = Object.entries(items).filter(([, item]) => item.nextReview && item.nextReview <= today);
	const weak = Object.entries(items).filter(([, item]) => item.errors > 0 && stageOf(item) < 9).sort((a, b) => b[1].errors - a[1].errors).slice(0, 3);
	const recent = Object.entries(items).filter(([, item]) => item.lastPracticed).sort((a, b) => (b[1].lastPracticed ?? "").localeCompare(a[1].lastPracticed ?? ""))[0];
	const started = Object.values(items).filter((item) => item.seen).length;
	const avg = started ? Object.values(items).reduce((sum, item) => sum + stageOf(item), 0) / Math.max(1, started) / 9 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["سلام، ", name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-bold",
						children: "مسیر امروز"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm leading-7 text-muted",
						children: "ORBIT تمرین را تا تسلط ادامه می‌دهد. حفظ تعریف امتیاز تسلط نمی‌دهد."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, {
					pct: avg,
					label: level.name,
					caption: `سطح ${faNum(level.index)}`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "مدار امروز"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-7 text-muted",
						children: plan.length ? `${faNum(plan.length)} مورد: مرور سررسید، ضعف، و اگر جا باشد درس بعدی.` : "مرور بازی نداری. یک درس تازه از آکادمی بردار."
					})] }), plan.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/review",
						className: "inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
						children: "شروع مدار"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: plan.slice(0, 4).map((row) => {
						const bits = lessonBits(row.id, custom);
						if (!bits) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LessonLink, {
							bits,
							className: "flex items-center justify-between gap-3 rounded-xl bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: bits.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-xs text-muted",
								children: reasonLabel[row.reason]
							})]
						}) }, row.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "امتیاز",
						value: faNum(xp),
						hint: level.next ? `تا ${level.next}` : "آخرین سطح این نسخه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "رشته",
						value: streak ? `${faNum(streak)} روز` : "هنوز نه",
						hint: "هر روز یک تمرین رشته را زنده نگه می‌دارد"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "مرور سررسید",
						value: faNum(due.length),
						hint: due.length ? "از آخرین ضعف‌ها" : "بعد از تمرین زمان‌بندی می‌شود"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-3 lg:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "ادامه"
						}),
						recent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Continue, {
							id: recent[0],
							stage: stageOf(recent[1]),
							custom
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-muted",
							children: "هنوز تمرینی ثبت نشده. از آکادمی یک درس را باز کن یا آزمون تعیین سطح بده."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/placement",
								className: "inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
								children: "آزمون تعیین سطح"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/academy",
								className: "inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm",
								children: "نه حوزه"
							})]
						}),
						placement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: ["پیشنهاد آزمون: ", domains.find((d) => d.id === placement)?.title]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-3 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "نقاط ضعف"
						}),
						weak.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-7 text-muted",
							children: "هنوز خطای تکراری ثبت نشده. این فهرست بعد از پاسخ نادرست پر می‌شود."
						}),
						weak.map(([id, item]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeakRow, {
							id,
							errors: item.errors,
							stage: stageOf(item),
							custom
						}, id))
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-semibold",
				children: "حوزه‌ها"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: domains.map((domain) => {
					const ids = domain.courses.flatMap((c) => c.chapters.flatMap((ch) => ch.modules.map((m) => `mod:${m.id}`)));
					const seen = ids.filter((id) => items[id]?.seen).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/academy/$domainId",
						params: { domainId: domain.id },
						className: "flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 hover:bg-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-xl bg-elevated text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainIcon, {
								name: domain.icon,
								className: "size-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: domain.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									faNum(seen),
									" از ",
									faNum(ids.length),
									" دیده‌شده"
								]
							})]
						})]
					}, domain.id);
				})
			})] })
		]
	});
}
function Ring({ pct, label, caption }) {
	const r = 34;
	const c = 2 * Math.PI * r;
	const dash = Math.max(0, Math.min(1, pct)) * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-36",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "size-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					className: "orbit-spin",
					fill: "none",
					stroke: "var(--color-border)",
					strokeWidth: "1",
					strokeDasharray: "3 6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "34",
					fill: "none",
					stroke: "var(--color-elevated)",
					strokeWidth: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: "34",
					fill: "none",
					stroke: "var(--color-primary)",
					strokeWidth: "6",
					strokeLinecap: "round",
					strokeDasharray: `${dash} ${c}`,
					transform: "rotate(-90 50 50)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-muted",
				children: caption
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-6 text-sm font-semibold leading-5",
				children: label
			})]
		})]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num text-2xl font-semibold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-5 text-muted",
				children: hint
			})
		]
	});
}
function titleOf(id, custom) {
	if (id.startsWith("mod:")) return getModule(id.slice(4))?.module.title ?? "درس";
	if (id.startsWith("tech:")) return getTechnique(id.slice(5), custom)?.fa ?? "تکنیک";
	return "مورد";
}
function hrefOf(id) {
	if (id.startsWith("tech:")) return {
		to: "/technique/$techniqueId",
		params: { techniqueId: id.slice(5) }
	};
	return {
		to: "/learn/$moduleId",
		params: { moduleId: id.slice(4) }
	};
}
function Continue({ id, stage, custom }) {
	const href = hrefOf(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href.to,
		params: href.params,
		className: "block rounded-xl bg-elevated p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: titleOf(id, custom)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: stageNames[stage]
		})]
	});
}
function WeakRow({ id, errors, stage, custom }) {
	const href = hrefOf(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href.to,
		params: href.params,
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: titleOf(id, custom)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-0.5 block text-xs text-muted",
			children: [
				faNum(errors),
				" خطا · ",
				stageNames[stage]
			]
		})]
	});
}
//#endregion
export { Home as component };
