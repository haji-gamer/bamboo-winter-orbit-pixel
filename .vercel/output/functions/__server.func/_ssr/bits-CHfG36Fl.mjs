import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as BookmarkCheck, S as Bookmark, b as Compass, g as Handshake, h as Heart, o as Store, r as Users, u as Scale, v as Eye, x as Brain, y as Cpu } from "../_libs/lucide-react.mjs";
import { a as cn, l as useOrbit, m as evidenceLabel, p as ethicsLabel, w as stageNames } from "./router-CezrZMOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bits-CHfG36Fl.js
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	heart: Heart,
	handshake: Handshake,
	eye: Eye,
	users: Users,
	scale: Scale,
	cpu: Cpu,
	store: Store,
	compass: Compass,
	brain: Brain
};
function DomainIcon({ name, className }) {
	const Icon = icons[name] ?? Compass;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.75,
		"aria-hidden": true
	});
}
function faNum(n) {
	return new Intl.NumberFormat("fa-IR").format(n);
}
function Chip({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tone === "muted" && "bg-elevated text-muted", tone === "primary" && "bg-primary/15 text-primary", tone === "accent" && "bg-accent/15 text-accent", tone === "solid" && "border border-border text-fg"),
		children
	});
}
function EthicsChip({ ethics }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
		tone: ethics === "healthy" ? "accent" : ethics === "controversial" ? "primary" : ethics === "manipulative" ? "solid" : "muted",
		children: ethicsLabel[ethics]
	});
}
function EvidenceChip({ evidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: evidenceLabel[evidence] });
}
function StageLine({ stage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stageNames[stage] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "num",
				children: [
					faNum(stage),
					" / ",
					faNum(9)
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1",
			children: stageNames.slice(1).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 flex-1 rounded-full", i < stage ? "bg-primary" : "bg-elevated") }, i))
		})]
	});
}
function SaveButton({ id }) {
	const saved = useOrbit((s) => s.saved.includes(id));
	const toggle = useOrbit((s) => s.toggleSave);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => toggle(id),
		className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm text-fg hover:bg-elevated",
		children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), saved ? "در کتابخانه" : "ذخیره"]
	});
}
function LessonLink({ bits, className, children }) {
	if (bits.kind === "module") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/learn/$moduleId",
		params: { moduleId: bits.moduleId },
		className,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/technique/$techniqueId",
		params: { techniqueId: bits.techniqueId },
		className,
		children
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-2xl border border-border bg-surface p-4 md:p-5", className),
		children
	});
}
//#endregion
export { Panel as a, faNum as c, LessonLink as i, EthicsChip as n, SaveButton as o, EvidenceChip as r, StageLine as s, DomainIcon as t };
