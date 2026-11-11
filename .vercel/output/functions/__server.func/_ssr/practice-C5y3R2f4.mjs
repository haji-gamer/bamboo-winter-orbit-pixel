import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as scoreAnswer, a as cn, l as useOrbit } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum } from "./bits-CHfG36Fl.mjs";
import { n as askOrbit } from "./ai.functions-a98MZAb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-C5y3R2f4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PracticePanel({ itemId, quizzes, prompt, keywords, ethics, modelAnswer, context }) {
	const recordQuiz = useOrbit((s) => s.recordQuiz);
	const recordText = useOrbit((s) => s.recordText);
	const [step, setStep] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [card, setCard] = (0, import_react.useState)(null);
	const [gained, setGained] = (0, import_react.useState)(0);
	const [ai, setAi] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const quiz = quizzes[step];
	const labels = (0, import_react.useMemo)(() => [
		"فهم مفهوم",
		"تشخیص در مثال",
		"موقعیت تازه",
		"پاسخ عملی"
	], []);
	function submitQuiz() {
		if (picked === null || !quiz) return;
		const ok = picked === quiz.correct;
		const xp = recordQuiz(itemId, step, ok);
		setGained(xp);
		setChecked(true);
	}
	function submitText() {
		const next = scoreAnswer(answer, keywords, ethics);
		const xp = recordText(itemId, next.score);
		setCard(next);
		setGained(xp);
	}
	async function deepen() {
		setBusy(true);
		setAi(null);
		try {
			const res = await askOrbit({ data: {
				mode: "evaluate",
				messages: [{
					role: "user",
					content: answer
				}],
				context: `${context}\n\nپاسخ بهتر مرجع:\n${modelAnswer}`
			} });
			setAi(res.ok ? res.text : "مدل همین حالا در دسترس نیست. نمرهٔ بالا ارزیابی محلی بر اساس مفهوم‌های کلیدی است.");
		} catch {
			setAi("ارزیابی مدل انجام نشد. نمرهٔ محلی همچنان معتبر است.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "تمرین"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "تسلط با تشخیص و پاسخ سنجیده می‌شود، نه با باز کردن صفحه."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 text-center text-[11px] text-muted",
				children: labels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setStep(i);
						setPicked(null);
						setChecked(false);
					},
					className: cn("min-h-11 rounded-lg px-1", step === i ? "bg-elevated text-fg" : "hover:bg-elevated"),
					children: label
				}, label))
			}),
			step < 3 && quiz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7",
						children: quiz.prompt
					}),
					quiz.options.map((option, index) => {
						const show = checked && (index === quiz.correct || index === picked);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: checked,
							onClick: () => setPicked(index),
							className: cn("w-full rounded-xl border px-3 py-3 text-start text-sm leading-6", picked === index ? "border-primary" : "border-border", show && index === quiz.correct && "border-accent bg-accent/10", show && index === picked && index !== quiz.correct && "border-primary bg-primary/10"),
							children: option
						}, option);
					}),
					!checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: picked === null,
						onClick: submitQuiz,
						className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40",
						children: "ثبت پاسخ"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-sm leading-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: quiz.explain }),
							gained > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary",
								children: [
									"+",
									faNum(gained),
									" امتیاز"
								]
							}),
							step < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-xl border border-border px-4",
								onClick: () => {
									setStep(step + 1);
									setPicked(null);
									setChecked(false);
								},
								children: "مرحلهٔ بعد"
							})
						]
					})
				]
			}),
			step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7",
						children: prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: answer,
						onChange: (e) => setAnswer(e.target.value),
						dir: "auto",
						rows: 5,
						className: "w-full rounded-xl border border-border bg-bg px-3 py-3 text-sm leading-7 outline-none",
						placeholder: "پاسخ خودت را بنویس، نه تعریف حفظی."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: submitText,
							className: "min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg",
							children: "ارزیابی محلی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || answer.trim().length < 8,
							onClick: () => void deepen(),
							className: "min-h-11 rounded-xl border border-border px-4 text-sm disabled:opacity-40",
							children: busy ? "در حال ارزیابی…" : "ارزیابی با مدل"
						})]
					}),
					card && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-xl bg-elevated p-3 text-sm leading-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: ["نمرهٔ محلی: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-primary",
									children: faNum(card.score)
								})]
							}),
							gained > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary",
								children: [
									"+",
									faNum(gained),
									" امتیاز برای پیشرفت این پاسخ"
								]
							}),
							card.strengths.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, line)),
							card.gaps.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: line
							}, line)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: "این نمره پوشش مفهوم‌های کلیدی است، نه داوری کامل یک مربی."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "یک پاسخ قوی‌تر: "
							}), modelAnswer] })
						]
					}),
					ai && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap rounded-xl border border-border p-3 text-sm leading-7",
						children: ai
					})
				]
			})
		]
	});
}
//#endregion
export { PracticePanel as t };
