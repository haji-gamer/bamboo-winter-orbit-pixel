import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as getTechnique, g as getModule, l as useOrbit } from "./router-CezrZMOo.mjs";
import { a as Panel } from "./bits-CHfG36Fl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-QEZofvaH.js
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const saved = useOrbit((s) => s.saved);
	const notes = useOrbit((s) => s.notes);
	const custom = useOrbit((s) => s.customTechniques);
	const setNote = useOrbit((s) => s.setNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: "کتابخانهٔ شخصی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "درس و تکنیک ذخیره‌شده، با یادداشت. این‌ها روی همین دستگاه می‌مانند و از حافظهٔ پیشرفت جدا پاک نمی‌شوند."
			})] }),
			saved.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "هنوز چیزی نشان‌گذاری نشده. داخل هر درس دکمهٔ ذخیره هست."
			}),
			saved.map((id) => {
				const mod = id.startsWith("mod:") ? getModule(id.slice(4)) : null;
				const tech = id.startsWith("tech:") ? getTechnique(id.slice(5), custom) : null;
				const title = mod?.module.title ?? tech?.fa ?? id;
				const to = mod ? {
					to: "/learn/$moduleId",
					params: { moduleId: mod.module.id }
				} : tech ? {
					to: "/technique/$techniqueId",
					params: { techniqueId: tech.id }
				} : null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-2",
					children: [to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: to.to,
						params: to.params,
						className: "font-semibold",
						children: title
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: notes[id] ?? "",
						onChange: (e) => setNote(id, e.target.value),
						rows: 3,
						dir: "auto",
						className: "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none",
						placeholder: "یادداشت"
					})]
				}, id);
			})
		]
	});
}
//#endregion
export { LibraryPage as component };
