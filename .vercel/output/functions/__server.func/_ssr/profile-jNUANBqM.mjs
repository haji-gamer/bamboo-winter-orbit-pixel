import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getTechnique, c as stageOf, g as getModule, l as useOrbit, o as achievementDefs, s as localDate, v as levelFor, w as stageNames } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-jNUANBqM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function num(value, max) {
	return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(max, Math.round(value))) : 0;
}
function str(value, max) {
	return typeof value === "string" ? value.slice(0, max) : "";
}
function item(value) {
	if (!value || typeof value !== "object") return null;
	const row = value;
	const quiz = Array.isArray(row.quizPassed) ? row.quizPassed.filter((n) => typeof n === "number" && n >= 0 && n < 8).slice(0, 8) : [];
	return {
		seen: Boolean(row.seen),
		quizPassed: quiz,
		bestText: num(row.bestText, 100),
		attempts: num(row.attempts, 500),
		errors: num(row.errors, 500),
		lastPracticed: typeof row.lastPracticed === "string" ? row.lastPracticed.slice(0, 10) : null,
		nextReview: typeof row.nextReview === "string" ? row.nextReview.slice(0, 10) : null,
		interval: num(row.interval, 60),
		reviews: num(row.reviews, 500)
	};
}
function technique(value) {
	if (!value || typeof value !== "object") return null;
	const row = value;
	const ethics = row.ethics;
	const evidence = row.evidence;
	if (typeof row.id !== "string" || typeof row.fa !== "string" || row.fa.length < 2) return null;
	if (ethics !== "healthy" && ethics !== "neutral" && ethics !== "controversial" && ethics !== "manipulative") return null;
	if (evidence !== "scientific" && evidence !== "educational" && evidence !== "experiential") return null;
	const list = (key) => Array.isArray(row[key]) ? row[key].filter((x) => typeof x === "string").slice(0, 8).map((x) => x.slice(0, 40)) : [];
	return {
		id: row.id.slice(0, 80),
		en: str(row.en, 80) || str(row.fa, 80),
		fa: str(row.fa, 80),
		ethics,
		evidence,
		basis: str(row.basis, 400),
		summary: str(row.summary, 600),
		mechanism: str(row.mechanism, 600),
		example: str(row.example, 600),
		detect: str(row.detect, 600),
		counter: str(row.counter, 600),
		useNote: str(row.useNote, 600),
		mistakes: str(row.mistakes, 400),
		signals: list("signals"),
		keywords: list("keywords")
	};
}
function thread(value) {
	if (!value || typeof value !== "object") return null;
	const row = value;
	if (typeof row.id !== "string") return null;
	const messages = Array.isArray(row.messages) ? row.messages.slice(-24).flatMap((message) => {
		if (!message || typeof message !== "object") return [];
		const m = message;
		if (m.role !== "user" && m.role !== "assistant" || typeof m.content !== "string") return [];
		const via = m.via === "xai" || m.via === "local" || m.via === "user" ? m.via : "local";
		return [{
			role: m.role,
			content: m.content.slice(0, 4e3),
			via
		}];
	}) : [];
	return {
		id: row.id.slice(0, 40),
		title: str(row.title, 80) || "گفت‌وگو",
		messages,
		updated: str(row.updated, 40)
	};
}
function parseBackup(raw) {
	if (!raw || typeof raw !== "object") return null;
	const row = raw;
	if (row.v !== 2 || !row.items || typeof row.items !== "object") return null;
	const items = {};
	for (const [key, value] of Object.entries(row.items).slice(0, 400)) {
		if (!/^(mod|tech):[a-z0-9:-]{1,80}$/i.test(key)) continue;
		const parsed = item(value);
		if (parsed) items[key] = parsed;
	}
	const saved = Array.isArray(row.saved) ? row.saved.filter((id) => typeof id === "string").slice(0, 200).map((id) => id.slice(0, 90)) : [];
	const notes = {};
	if (row.notes && typeof row.notes === "object") {
		for (const [key, value] of Object.entries(row.notes).slice(0, 200)) if (typeof value === "string" && /^(mod|tech):/.test(key)) notes[key.slice(0, 90)] = value.slice(0, 4e3);
	}
	const edits = {};
	if (row.edits && typeof row.edits === "object") for (const [key, value] of Object.entries(row.edits).slice(0, 200)) {
		if (!value || typeof value !== "object") continue;
		const patch = value;
		edits[key.slice(0, 80)] = {
			summary: str(patch.summary, 800),
			example: str(patch.example, 800)
		};
	}
	return {
		v: 2,
		name: str(row.name, 32) || "کاوشگر",
		xp: num(row.xp, 2e5),
		streak: num(row.streak, 5e3),
		lastActive: typeof row.lastActive === "string" ? row.lastActive.slice(0, 10) : null,
		items,
		saved,
		notes,
		edits,
		threads: Array.isArray(row.threads) ? row.threads.slice(0, 12).flatMap((entry) => {
			const parsed = thread(entry);
			return parsed ? [parsed] : [];
		}) : [],
		activeThread: typeof row.activeThread === "string" ? row.activeThread.slice(0, 40) : null,
		customTechniques: Array.isArray(row.customTechniques) ? row.customTechniques.slice(0, 40).flatMap((entry) => {
			const parsed = technique(entry);
			return parsed ? [parsed] : [];
		}) : [],
		placementDomain: typeof row.placementDomain === "string" ? row.placementDomain.slice(0, 40) : null,
		seenAchievements: Array.isArray(row.seenAchievements) ? row.seenAchievements.filter((id) => typeof id === "string").slice(0, 30).map((id) => id.slice(0, 40)) : [],
		voice: row.voice === "socratic" ? "socratic" : "plain"
	};
}
function ProfilePage() {
	const snapshot = useOrbit();
	const setName = useOrbit((s) => s.setName);
	const xp = useOrbit((s) => s.xp);
	const streak = useOrbit((s) => s.streak);
	const items = useOrbit((s) => s.items);
	const custom = useOrbit((s) => s.customTechniques);
	const resetItem = useOrbit((s) => s.resetItem);
	const resetMemory = useOrbit((s) => s.resetMemory);
	const importBackup = useOrbit((s) => s.importBackup);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [backupNote, setBackupNote] = (0, import_react.useState)("");
	const level = levelFor(xp);
	const rows = Object.entries(items).sort((a, b) => stageOf(b[1]) - stageOf(a[1]));
	const today = localDate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "پروفایل و پیشرفت"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "حافظهٔ آموزشی از گفت‌وگوها جداست. می‌توانی هر مورد را پاک کنی، یا کل پیشرفت را در یک فایل ببری و برگردانی."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: ["نام نمایشی", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: snapshot.name,
						onChange: (e) => setName(e.target.value.slice(0, 32)),
						className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: level.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "num",
							children: [faNum(xp), " امتیاز"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-primary",
							style: { width: `${Math.round(level.into * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: ["رشته: ", streak ? `${faNum(streak)} روز` : "هنوز شروع نشده"]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "دستاوردها"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: achievementDefs(snapshot).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-bg px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: item.ok ? "text-accent" : "text-muted",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: item.detail
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "حافظهٔ آموزشی"
					}),
					rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "هنوز موردی ثبت نشده."
					}),
					rows.map(([id, item]) => {
						const mod = id.startsWith("mod:") ? getModule(id.slice(4)) : null;
						const tech = id.startsWith("tech:") ? getTechnique(id.slice(5), custom) : null;
						const title = mod?.module.title ?? tech?.fa ?? id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 border-b border-border py-2 text-sm last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									stageNames[stageOf(item)],
									item.nextReview ? ` · مرور ${item.nextReview === today ? "امروز" : item.nextReview}` : "",
									item.errors ? ` · ${faNum(item.errors)} خطا` : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => resetItem(id),
								className: "min-h-11 rounded-lg px-2 text-xs text-muted",
								children: "حذف این مورد"
							})]
						}, id);
					}),
					!confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirm(true),
						className: "min-h-11 text-sm text-primary",
						children: "پاک کردن پیشرفت و امتیاز"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								resetMemory();
								setConfirm(false);
							},
							className: "min-h-11 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-fg",
							children: "بله، پیشرفت پاک شود"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setConfirm(false),
							className: "min-h-11 rounded-xl border border-border px-3 text-sm",
							children: "انصراف"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "یادداشت‌ها، گفت‌وگوها و تکنیک‌های سفارشی با این دکمه پاک نمی‌شوند."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "پشتیبان همین دستگاه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "فایل را نگه دار. اگر مرورگر عوض شد، همان فایل را برگردان. حساب ابری جدا ساخته نشده چون پیشرفت مال همین دستگاه است."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
							onClick: () => {
								const state = useOrbit.getState();
								const payload = {
									v: 2,
									name: state.name,
									xp: state.xp,
									streak: state.streak,
									lastActive: state.lastActive,
									items: state.items,
									saved: state.saved,
									notes: state.notes,
									edits: state.edits,
									threads: state.threads,
									activeThread: state.activeThread,
									customTechniques: state.customTechniques,
									placementDomain: state.placementDomain,
									seenAchievements: state.seenAchievements,
									voice: state.voice
								};
								const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
								const url = URL.createObjectURL(blob);
								const link = document.createElement("a");
								link.href = url;
								link.download = "orbit-backup.json";
								link.click();
								URL.revokeObjectURL(url);
								setBackupNote("فایل پشتیبان ساخته شد.");
							},
							children: "گرفتن فایل"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-border px-4 text-sm",
							children: ["برگرداندن فایل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "application/json,.json",
								className: "sr-only",
								onChange: (event) => {
									const file = event.target.files?.[0];
									event.target.value = "";
									if (!file) return;
									if (file.size > 15e5) {
										setBackupNote("فایل بزرگ‌تر از حد این نسخه است.");
										return;
									}
									const reader = new FileReader();
									reader.onload = () => {
										try {
											const parsed = parseBackup(JSON.parse(String(reader.result)));
											if (!parsed) {
												setBackupNote("این فایل پشتیبان ORBIT نیست.");
												return;
											}
											importBackup(parsed);
											setBackupNote("پیشرفت از فایل برگشت.");
										} catch {
											setBackupNote("فایل خوانده نشد.");
										}
									};
									reader.readAsText(file);
								}
							})]
						})]
					}),
					backupNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: backupNote
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/library",
						className: "text-primary",
						children: "کتابخانه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tools",
						className: "text-primary",
						children: "ابزارها"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-primary",
						children: "استودیو"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/analyze",
						className: "text-primary",
						children: "تحلیل"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-6 text-muted",
				children: "پیشرفت روی همین دستگاه می‌ماند. از بخش پشتیبان فایل بگیر. یادآوری تلگرام در ابزارها فقط متن مدار امروز را برای خودت باز می‌کند و ربات دائمی نیست."
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
