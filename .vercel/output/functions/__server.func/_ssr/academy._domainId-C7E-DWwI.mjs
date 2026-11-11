import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stageOf, h as getDomain, i as Route$2, l as useOrbit, w as stageNames } from "./router-CezrZMOo.mjs";
import { a as Panel, c as faNum } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academy._domainId-C7E-DWwI.js
var import_jsx_runtime = require_jsx_runtime();
function DomainPage() {
	const { domainId } = Route$2.useParams();
	const domain = getDomain(domainId);
	const items = useOrbit((s) => s.items);
	if (!domain) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "این حوزه پیدا نشد." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/academy",
				className: "text-sm text-muted",
				children: "آکادمی"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-bold",
				children: domain.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm leading-7 text-muted",
				children: domain.blurb
			})
		] }), domain.courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: course.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: course.blurb
			})] }), course.chapters.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm text-primary",
					children: ["فصل · ", chapter.title]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: chapter.modules.map((module, index) => {
						const stage = stageOf(items[`mod:${module.id}`]);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/learn/$moduleId",
							params: { moduleId: module.id },
							className: "flex items-center gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num w-6 text-xs text-muted",
								children: faNum(index + 1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: module.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: stageNames[stage]
								})]
							})]
						}) }, module.id);
					})
				})]
			}, chapter.id))]
		}, course.id))]
	});
}
//#endregion
export { DomainPage as component };
