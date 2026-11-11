import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn, b as mergeTechniques, l as useOrbit, p as ethicsLabel } from "./router-CezrZMOo.mjs";
import { a as Panel, n as EthicsChip } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/techniques-CsxKWiYS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	{
		id: "all",
		label: "همه"
	},
	{
		id: "healthy",
		label: ethicsLabel.healthy
	},
	{
		id: "neutral",
		label: ethicsLabel.neutral
	},
	{
		id: "controversial",
		label: ethicsLabel.controversial
	},
	{
		id: "manipulative",
		label: ethicsLabel.manipulative
	}
];
function TechniquesPage() {
	const custom = useOrbit((s) => s.customTechniques);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const list = (0, import_react.useMemo)(() => {
		return mergeTechniques(custom).filter((tech) => {
			if (filter !== "all" && tech.ethics !== filter) return false;
			return `${tech.fa} ${tech.en} ${tech.summary}`.toLowerCase().includes(q.trim().toLowerCase());
		});
	}, [
		custom,
		filter,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold",
					children: "بانک تکنیک‌ها"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-7 text-muted",
					children: "شناخت یک تکنیک با توصیهٔ آن یکی نیست. موردهای دستکاری‌گرانه حذف نشده‌اند تا دیده و مهار شوند، نه اینکه اجرا شوند."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "نام فارسی یا انگلیسی",
				className: "h-11 w-full max-w-md rounded-xl border border-border bg-surface px-3 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(item.id),
					className: cn("min-h-11 rounded-full border px-3 text-sm", filter === item.id ? "border-primary text-primary" : "border-border text-muted"),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: list.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/technique/$techniqueId",
					params: { techniqueId: tech.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "flex flex-wrap items-start justify-between gap-3 hover:bg-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: tech.fa
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								dir: "ltr",
								children: tech.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm leading-6 text-muted",
								children: tech.summary
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EthicsChip, { ethics: tech.ethics })]
					})
				}, tech.id))
			})
		]
	});
}
//#endregion
export { TechniquesPage as component };
