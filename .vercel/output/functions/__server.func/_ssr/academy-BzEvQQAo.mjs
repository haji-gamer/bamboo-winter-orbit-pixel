import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as domains, l as useOrbit, u as allModules } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum, t as DomainIcon } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy-BzEvQQAo.js
var import_jsx_runtime = require_jsx_runtime();
function Academy() {
	const items = useOrbit((s) => s.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold",
			children: "آکادمی"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-7 text-muted",
			children: "ساختار هر حوزه: دوره، فصل، درس. سطح بیان مبتدی است؛ اصطلاح سخت همان‌جا ساده می‌شود. روان‌شناسی حوزهٔ مستقل است و بقیه فقط به آن ارجاع می‌دهند."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: domains.map((domain) => {
				const count = allModules().filter((m) => m.domain.id === domain.id).length;
				const seen = allModules().filter((m) => m.domain.id === domain.id && items[`mod:${m.module.id}`]?.seen).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/academy/$domainId",
					params: { domainId: domain.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "h-full space-y-3 hover:bg-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-11 items-center justify-center rounded-xl bg-bg text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomainIcon, {
										name: domain.icon,
										className: "size-5"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold leading-6",
									children: domain.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-7 text-muted",
								children: domain.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									faNum(seen),
									" از ",
									faNum(count),
									" درس دیده‌شده · ",
									faNum(domain.courses.length),
									" دوره"
								]
							})
						]
					})
				}, domain.id);
			})
		})]
	});
}
//#endregion
export { Academy as component };
