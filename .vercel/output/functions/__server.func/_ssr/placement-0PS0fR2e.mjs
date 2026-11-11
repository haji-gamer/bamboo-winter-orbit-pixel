import { i as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, f as domains, l as useOrbit } from "./router-CezrZMOo.mjs";
import { a as Panel } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/placement-0PS0fR2e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var questions = [
	{
		prompt: "کدام موقعیت الان بیشتر برایت گنگ است؟",
		options: [
			{
				text: "نمی‌دانم یک رابطه کی ناسالم شده",
				domain: "relations"
			},
			{
				text: "در مذاکره زود کوتاه می‌آیم یا سفت می‌ایستم",
				domain: "negotiation"
			},
			{
				text: "زبان بدن را بیش از حد قطعی می‌خوانم",
				domain: "body-language"
			}
		]
	},
	{
		prompt: "کدام مهارت را اول تمرین کنیم؟",
		options: [
			{
				text: "فهمیدن اثر گروه و هنجار",
				domain: "sociology"
			},
			{
				text: "جدا کردن واقعیت از تفسیر در خبر",
				domain: "critical"
			},
			{
				text: "درخواست درست از یک مدل زبانی",
				domain: "ai"
			}
		]
	},
	{
		prompt: "کدام جمله به کارت نزدیک‌تر است؟",
		options: [
			{
				text: "می‌خواهم بدون فشار بفروشم",
				domain: "business"
			},
			{
				text: "شروع کارها به حالم بند است",
				domain: "personal"
			},
			{
				text: "اصطلاح روانی را اشتباه به کار می‌برم",
				domain: "psychology"
			}
		]
	}
];
function PlacementPage() {
	const navigate = useNavigate();
	const setPlacement = useOrbit((s) => s.setPlacement);
	const [step, setStep] = (0, import_react.useState)(0);
	const [scores, setScores] = (0, import_react.useState)({});
	const q = questions[step];
	function choose(domain) {
		const next = {
			...scores,
			[domain]: (scores[domain] ?? 0) + 1
		};
		if (step < questions.length - 1) {
			setScores(next);
			setStep(step + 1);
			return;
		}
		const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "personal";
		setPlacement(winner);
		navigate({
			to: "/academy/$domainId",
			params: { domainId: winner }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "تعیین سطح شروع"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "سه سؤال، نه یک آزمون علمی. نتیجه فقط پیشنهاد مسیر اول است و سطح رسمی نمی‌سازد."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"سؤال ",
							step + 1,
							" از ",
							questions.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: q.prompt
					}),
					q.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => choose(option.domain),
						className: cn("w-full rounded-xl border border-border px-3 py-3 text-start text-sm leading-7 hover:border-primary"),
						children: option.text
					}, option.text))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"حوزه‌ها: ",
					domains.map((d) => d.title).slice(0, 3).join("، "),
					" و شش حوزهٔ دیگر در آکادمی هستند.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/academy",
						className: "text-primary",
						children: "دیدن همه"
					})
				]
			})
		]
	});
}
//#endregion
export { PlacementPage as component };
