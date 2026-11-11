import { i as __toESM } from "../_runtime.mjs";
import { C as useRouter, S as useNavigate, Z as require_react, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as GraduationCap, a as TriangleAlert, c as Search, d as Orbit, f as MessagesSquare, i as UserRound, l as ScanSearch, m as House, n as Wrench, p as Menu, s as Sparkles, t as X, w as BookOpen } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CezrZMOo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "خطای غیرمنتظره. صفحه را یک بار تازه کن.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-10 text-primary",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "مشکلی پیش آمد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function mod$2(m) {
	return m;
}
function course$2(id, title, blurb, chapterTitle, modules) {
	return {
		id,
		title,
		blurb,
		chapters: [{
			id: `${id}-ch`,
			title: chapterTitle,
			modules
		}]
	};
}
var domainsPartA = [
	{
		id: "relations",
		title: "روابط عاطفی، دوستی و خانواده",
		blurb: "رابطه را از روی احساس لحظه‌ای نمی‌سنجیم؛ نیاز، مرز، الگو و گفت‌وگو را جدا می‌بینیم.",
		icon: "heart",
		courses: [course$2("rel-base", "شناخت رابطه", "زبان ساده برای دیدن خود رابطه، نه فقط حالِ خوب یا بد آن.", "هسته", [
			mod$2({
				id: "rel-know",
				title: "شناخت روابط انسانی",
				summary: "رابطه فقط «دوست داشتن» نیست. مجموعهٔ انتظار، وقت، اعتماد و نحوهٔ تعمیر بعد از تنش است.",
				why: "تا ندانیم رابطه چه کاری برای هر دو طرف می‌کند، اختلاف را شخصی و دائمی می‌بینیم.",
				example: "دو دوست هر هفته حرف می‌زنند اما یکی فقط شنونده است. مسئله کمبود محبت نیست؛ تعادل نقش است.",
				practice: "یک رابطهٔ واقعی را در چهار کلمه توصیف کن: انتظار، وقت، اعتماد، تعمیر. برای هر کدام یک جمله بنویس.",
				modelAnswer: "انتظارم شنیده شدن است، وقتم هفته‌ای یک گفت‌وگوی واقعی است، اعتماد یعنی حرفم جای دیگر تعریف نشود، و تعمیر یعنی بعد از دلخوری موضوع را باز کنیم نه اینکه قهر را طولانی کنیم.",
				keywords: [
					"انتظار",
					"اعتماد",
					"تعمیر",
					"نقش"
				],
				evidence: "educational",
				basis: "چارچوب آموزشی برای مبتدی؛ نظریهٔ دلبستگی در حوزهٔ روان‌شناسی جداگانه معرفی می‌شود."
			}),
			mod$2({
				id: "rel-start",
				title: "شروع و حفظ ارتباط",
				summary: "شروع خوب یعنی کنجکاوی مشخص، نه اجرای یک شخصیت. حفظ یعنی بازگشت منظم، نه شدتِ روز اول.",
				why: "خیلی از رابطه‌ها در اوج هیجان شروع می‌شوند و چون ریتم ندارند خاموش می‌شوند.",
				example: "به‌جای «بیشتر از خودت بگو»، بپرس «این هفته کدام کار واقعاً خسته‌ات کرد؟» و خودت هم یک جواب هم‌اندازه بده.",
				practice: "برای یک آشنایی تازه، سه پرسش مشخص بنویس که جواب‌شان یک‌کلمه‌ای نباشد و فشار هم نیاورند.",
				modelAnswer: "این روزها کدام بخش کارت انرژی می‌گیرد؟ آخرین باری که واقعاً خندیدی سر چه بود؟ اگر فردا یک ساعت آزاد داشته باشی ترجیح می‌دهی تنهایی باشد یا با یک نفر؟",
				keywords: [
					"پرسش",
					"ریتم",
					"کنجکاوی",
					"فشار"
				],
				evidence: "educational",
				basis: "مهارت گفت‌وگو؛ توصیهٔ تجربی آموزشی، نه یک قانون علمی ثابت."
			}),
			mod$2({
				id: "rel-needs",
				title: "شناخت نیازهای عاطفی",
				summary: "نیاز عاطفی یعنی چیزی که نبودنش رابطه را ناامن می‌کند: دیده شدن، اختیار، آرامش، یا صراحت.",
				why: "وقتی نیاز را با «توقّع زیاد» یکی بگیریم، یا خودمان را خاموش می‌کنیم یا طرف مقابل را محکوم.",
				example: "کسی که زیاد می‌پرسد «رسیدی؟» شاید کنترل‌گر نباشد؛ نیازش به اطمینان است. راهش توافق بر سر یک خبر کوتاه است، نه دعوا بر سر شخصیت.",
				practice: "نیاز خودت را از راه رسیدن به آن جدا کن. یک جمله برای نیاز و یک جمله برای درخواست مشخص بنویس.",
				modelAnswer: "نیازم این است که وقتی دیر می‌شود رهاشده احساس نکنم. درخواستم این است که اگر بیش از نیم‌ساعت تأخیر داشتی یک پیام کوتاه بفرستی. این درخواست کنترل تمام روزت نیست.",
				keywords: [
					"نیاز",
					"درخواست",
					"اطمینان",
					"اختیار"
				],
				evidence: "educational",
				basis: "تفسیر آموزشی از نیاز و درخواست. مبنای هیجان در حوزهٔ روان‌شناسی است.",
				seeAlso: "psy-emotion"
			}),
			mod$2({
				id: "rel-talk",
				title: "مهارت گفت‌وگو",
				summary: "گفت‌وگوی سالم سه بخش دارد: مشاهدهٔ مشخص، اثر آن بر تو، و یک درخواست قابل‌اجرا.",
				why: "جملهٔ «تو همیشه این‌طوری هستی» موضوع را به هویت طرف تبدیل می‌کند و چیزی برای اصلاح باقی نمی‌گذارد.",
				example: "به‌جای «تو بی‌توجهی»، بگو «دیروز وسط حرفم موبایل را چک کردی. احساس کردم حرفم مهم نیست. می‌شود وقتی حرف می‌زنیم گوشی کنار باشد؟»",
				practice: "یک دلخوری کوچک را با قالب مشاهده، اثر، درخواست بازنویسی کن. از کلمهٔ «همیشه» استفاده نکن.",
				modelAnswer: "مشاهده: دو بار حرفم را قطع کردی. اثر: رشتهٔ فکرم پاره شد و کوتاه آمدم. درخواست: اجازه بده جمله‌ام تمام شود، بعد جواب بده.",
				keywords: [
					"مشاهده",
					"اثر",
					"درخواست",
					"همیشه"
				],
				evidence: "educational",
				basis: "نزدیک به الگوی مشاهده/احساس/نیاز/درخواست در ارتباط بدون خشونت؛ اینجا ساده شده است."
			})
		]), course$2("rel-health", "سلامت رابطه", "اختلاف، الگوی ناسالم، مرز، و تکنیک‌هایی که باید بشناسی نه اینکه کورکورانه اجرا کنی.", "کاربرد", [
			mod$2({
				id: "rel-conflict",
				title: "مدیریت اختلاف",
				summary: "هدف اختلاف برنده شدن نیست؛ فهمیدن موضوع واقعی و یک قدم بعدی است که هر دو بتوانند انجام دهند.",
				why: "اگر اختلاف فقط با قهر یا امتیاز دادن تمام شود، همان مسئله با لباس تازه برمی‌گردد.",
				example: "بحث سر ظرف‌های شسته است اما موضوع واقعی این است که یکی احساس می‌کند بار خانه دیده نمی‌شود.",
				practice: "یک اختلاف آشنا را بنویس. زیرش دو خط بکش: موضوع ظاهری و موضوع واقعی. بعد فقط برای موضوع واقعی یک قدم کوچک پیشنهاد کن.",
				modelAnswer: "ظاهری: دیر جواب دادن. واقعی: ترس از این‌که رابطه یک‌طرفه شده. قدم: این هفته هر کدام یک بار شروع‌کنندهٔ حرف باشیم و آخر شب ده دقیقه بدون موبایل حرف بزنیم.",
				keywords: [
					"موضوع واقعی",
					"قدم",
					"قهر",
					"اختلاف"
				],
				evidence: "educational",
				basis: "چارچوب آموزشی حل مسئله در رابطه؛ درمان زوج‌ها جایگزین این درس نیست."
			}),
			mod$2({
				id: "rel-toxic",
				title: "شناخت الگوهای ناسالم",
				summary: "الگوی ناسالم تکرار است، نه یک روز بد: تحقیر، قطع کردن ارتباط به‌عنوان تنبیه، کنترل، یا عذرخواهی بدون تغییر.",
				why: "یک اشتباه را می‌شود تعمیر کرد. الگو وقتی خطرناک است که هر بار همان چرخه برگردد و تو شک کنی زیادی حساس هستی.",
				example: "بعد از هر انتقاد آرام، چند روز سکوت تنبیهی می‌آید و بعد محبت شدید. این چرخه را با «بالاخره آشتی کردیم» اشتباه نگیر.",
				practice: "یک چرخه را در سه پرده بنویس: جرقه، واکنش، جایزهٔ موقتی. بگو کدام پرده تو را به ماندن راضی می‌کند.",
				modelAnswer: "جرقه انتقاد از دیر رسیدن است. واکنش، بی‌اعتنایی دو روزه است. جایزه، پیام طولانی محبت‌آمیز است. همان پیام باعث می‌شود الگوی سکوت را فراموش کنم، در حالی که مسئلهٔ اصلی حل نشده.",
				keywords: [
					"الگو",
					"چرخه",
					"تنبیه",
					"تحقیر"
				],
				evidence: "educational",
				basis: "معرفی آموزشی. تشخیص بالینی خشونت یا رابطهٔ آسیب‌زا کار این درس نیست.",
				seeAlso: "psy-patterns"
			}),
			mod$2({
				id: "rel-boundaries",
				title: "مرزبندی در روابط",
				summary: "مرز قانونی است که خودت اجرا می‌کنی، نه دستوری که طرف را مجبور کند. مرز می‌گوید اگر این رفتار ادامه پیدا کند تو چه می‌کنی.",
				why: "بدون مرز، مهربانی کم‌کم به فرسودگی تبدیل می‌شود و بعد ناگهان به انفجار.",
				example: "«حق نداری با مادرم آن‌طور حرف بزنی» یک دستور است. «اگر تحقیر ادامه پیدا کند، آن جمع را ترک می‌کنم» یک مرز است.",
				practice: "یک مرز واقعی برای همین هفته بنویس: رفتار مشخص، حد تو، و کاری که خودت انجام می‌دهی اگر رد شد.",
				modelAnswer: "اگر وسط مهمانی مسخره شوم، همان لحظه آرام می‌گویم این شوخی برایم پذیرفته نیست. اگر ادامه پیدا کند، جمع را ترک می‌کنم. لازم نیست داد بزنم یا شخصیت کسی را تحلیل کنم.",
				keywords: [
					"مرز",
					"رفتار",
					"اجرا",
					"تهدید"
				],
				evidence: "educational",
				basis: "مهارت آموزشی. مرز با تهدید و با تنبیه عاطفی فرق دارد.",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "مرز دربارهٔ کنترل خودت است. تو نمی‌توانی احساس طرف را خاموش کنی، اما می‌توانی مشخص کنی کدام رفتار را در رابطه‌ات نگه می‌داری."
					},
					{
						title: "علت به‌هم‌ریختن مرز",
						body: "ترس از طرد، عادت میانجی بودن، یا این تصور که عشق یعنی همیشه در دسترس بودن. این‌ها مرز را به «خودخواهی» تعبیر می‌کنند."
					},
					{
						title: "تشخیص در دیگران",
						body: "کسی که مرز را با قهر مبهم، امتحان کردن، یا جمله‌هایی مثل «پس دوستم نداری» جواب می‌دهد، مرز را حمله دیده است. این واکنش، باطل بودن مرز تو را ثابت نمی‌کند."
					},
					{
						title: "محدودیت",
						body: "مرز بهانهٔ سردی دائمی یا فرار از گفت‌وگو نیست. اول درخواست روشن، بعد اگر الگو تکرار شد اجرای مرز."
					},
					{
						title: "اشتباه رایج",
						body: "مرز را فقط وقتی بگویی که عصبانی هستی، یا مرزی بگذاری که خودت هم اجرا نمی‌کنی. هر دو، حرف را بی‌اعتبار می‌کنند."
					}
				]
			}),
			mod$2({
				id: "rel-tactics",
				title: "شناخت تکنیک‌های تعامل و جذب",
				summary: "بعضی حرف‌ها تصادفی نیستند؛ الگو دارند. شناخت تکنیک یعنی بفهمی هدف احتمالی‌اش چیست، نه اینکه همان را روی دیگران پیاده کنی.",
				why: "اگر تکنیک را نشناسی، اثرش را به «حس خودت» نسبت می‌دهی و یا بیش از حد خودت را مقصر می‌دانی یا بیش از حد شیفتهٔ بازی می‌شوی.",
				example: "تعریفِ دوپهلو، کمیاب کردن ناگهانی توجه، و چالش «مطمئن نیستم به درد تو بخورد» می‌توانند جداگانه بی‌خطر باشند و در ترکیب، یک الگو.",
				practice: "یک جمله که اخیراً گیجت کرده بنویس. بگو اثرش چه بود و آیا به رضایت و شفافیت نزدیک‌تر بود یا به ابهام.",
				modelAnswer: "جمله این بود که «افراد زیادی دنبال وقت من هستند». اثرش عجله و حس رقابت بود. شفافیت نداشت؛ بیشتر کمیابی توجه بود. به‌جای عجله، می‌پرسم دقیقاً چه چیزی پیشنهاد می‌شود و چه زمانی واقعی است.",
				keywords: [
					"تکنیک",
					"ابهام",
					"شفافیت",
					"اثر"
				],
				evidence: "experiential",
				basis: "درگاه ورود به بانک تکنیک‌ها. بسیاری از نام‌ها اصطلاح تجربی فضای ارتباطات‌اند، نه تشخیص علمی.",
				seeAlso: "tech:mild-negging"
			})
		])]
	},
	{
		id: "negotiation",
		title: "مذاکره، متقاعدسازی و فن بیان",
		blurb: "اقناع را از فشار جدا می‌کنیم. هدف، توافقی است که طرف مقابل هم بتواند با صدای بلند تکرار کند.",
		icon: "handshake",
		courses: [course$2("neg-base", "پایهٔ مذاکره", "قبل از تکنیک، موضوع، منافع و ساختار حرف را روشن کن.", "هسته", [
			mod$2({
				id: "neg-principles",
				title: "اصول مذاکره",
				summary: "مذاکره تبادل موضع نیست؛ کشف منافع است. موضع همان جملهٔ علنی است، منفعت دلیل پشت آن.",
				why: "اگر فقط روی عدد یا خواستهٔ اول بمانی، به بن‌بست می‌رسی در حالی که راه جایگزین وجود داشته.",
				example: "دو هم‌خانه بر سر ساعت مهمان دعوا می‌کنند. موضع‌ها «مهمان نیاید» و «هر وقت خواستم بیاید» است. منافع: خواب، و دیدن دوستان. توافق ممکن: دو شب مشخص.",
				practice: "یک خواستهٔ خودت را به موضع و منفعت بشکن. بعد یک گزینه بنویس که منفعت را حفظ کند ولی موضع اولیه نباشد.",
				modelAnswer: "موضع من این است که پروژه را فقط خودم انجام دهم. منفعتم دیده شدن سهم کار و جلوگیری از دوباره‌کاری است. گزینه: تقسیم نوشته و یک بازبینی مشترک، با اسم هر دو.",
				keywords: [
					"موضع",
					"منفعت",
					"گزینه",
					"توافق"
				],
				evidence: "educational",
				basis: "سادهٔ ایدهٔ مذاکره بر اساس منافع، مشهور در Getting to Yes. اینجا نسخهٔ مبتدی است نه دورهٔ حقوق.",
				sections: [
					{
						title: "تعریف ساده",
						body: "مذاکره یعنی دو نفر که اختیار «نه» دارند، دنبال قراری می‌گردند که برای هر دو قابل زندگی باشد."
					},
					{
						title: "نحوهٔ کار",
						body: "اول موضوع را یک جمله کن. بعد بپرس این خواسته کدام نگرانی را آرام می‌کند. سپس حداقل دو گزینه بساز، نه فقط قبول یا رد."
					},
					{
						title: "تشخیص بازی",
						body: "اگر طرف فقط زمان را کم می‌کند، اطلاعات را مخفی می‌کند، یا موافقت را با عجله می‌خواهد، احتمالاً دنبال توافق پایدار نیست."
					},
					{
						title: "محدودیت",
						body: "منافع، جادو نیست. جایی که زور، فریب یا نیاز شدید یک‌طرفه هست، «مذاکرهٔ برابر» را نمایش نده."
					}
				]
			}),
			mod$2({
				id: "neg-structure",
				title: "ساختار گفت‌وگو",
				summary: "گفت‌وگوی قانع‌کننده برای مبتدی چهار تکه دارد: زمینه، مسئله، پیشنهاد، قدم بعدی.",
				why: "حرف بدون ساختار، شنونده را خسته می‌کند و آخرش معلوم نیست از او چه خواسته‌ای.",
				example: "زمینه: گزارش دیر رسیده. مسئله: مشتری فردا جلسه دارد. پیشنهاد: امروز نسخهٔ کوتاه بفرستیم. قدم: تا ساعت پنج شاخص‌ها را جمع کنم اگر تو مقدمه را بنویسی.",
				practice: "یک درخواست کاری یا خانوادگی را در همان چهار تکه، هر کدام حداکثر یک جمله، بنویس.",
				modelAnswer: "زمینه: این ماه دو بار قرارمان لغو شد. مسئله: برای برنامه‌ریزی هفته به حرف قطعی نیاز دارم. پیشنهاد: جمعه‌ها را ثابت بگذاریم. قدم: همین امروز ساعت را در تقویم بنویسیم.",
				keywords: [
					"زمینه",
					"مسئله",
					"پیشنهاد",
					"قدم"
				],
				evidence: "educational",
				basis: "الگوی آموزشی بیان درخواست؛ تکنیک تجربی ارتباطی نیست."
			}),
			mod$2({
				id: "neg-speech",
				title: "فن بیان",
				summary: "فن بیان یعنی جملهٔ کوتاه، مثال مشخص، و توقف. پر کردن سکوت با کلمهٔ اضافه، اعتماد را کمتر می‌کند.",
				why: "مبتدی فکر می‌کند هرچه بیشتر حرف بزند مسلط‌تر دیده می‌شود. معمولاً برعکس است.",
				example: "به‌جای پنج دلیل پشت‌سرهم، یک دلیل را با یک نمونه بگو و بپرس «این بخش برای تو گنگ است؟»",
				practice: "یک نظر خودت را در حداکثر چهل کلمه بگو. بعد یک پرسش باز به شنونده اضافه کن.",
				modelAnswer: "به نظرم شروع پروژه با یک نمونهٔ کوچک بهتر از برنامهٔ کامل است، چون زود می‌فهمیم مشتری چه می‌خواهد. کدام بخش از دید تو هنوز مبهم است؟",
				keywords: [
					"کوتاه",
					"مثال",
					"پرسش",
					"سکوت"
				],
				evidence: "educational",
				basis: "مهارت ارائه برای مبتدی."
			}),
			mod$2({
				id: "neg-oratory",
				title: "سخنوری",
				summary: "سخنوری اینجا نمایش صدای بلند نیست. یعنی یک جمع بداند حرف تو از کجا شروع شد، به چه دردی می‌خورد و با چه جمله‌ای تمام می‌شود.",
				why: "بدون جملهٔ آخر، شنونده قصه را دوست دارد اما فردا کاری از آن به یاد ندارد.",
				example: "شروع: «دیروز یک مشتری به‌خاطر یک جملهٔ مبهم منصرف شد.» پایان: «پس هر پیشنهاد را با یک کار مشخص تمام کنیم.»",
				practice: "برای یک موضوع که بلدی، فقط جملهٔ شروع و جملهٔ پایان را بنویس. وسط را عمداً خالی بگذار.",
				modelAnswer: "شروع: بیشتر سوءتفاهم‌های تیم ما از پیام شبانه می‌آید. پایان: از این هفته موضوع‌های مهم را در یک پیام روزانه و با یک مسئول مشخص می‌نویسیم.",
				keywords: [
					"شروع",
					"پایان",
					"جمع",
					"جمله"
				],
				evidence: "educational",
				basis: "آموزش ساختار صحبت برای جمع کوچک."
			})
		]), course$2("neg-influence", "اقناع مسئولانه", "متقاعد کردن وقتی قابل دفاع است که اطلاعات اصلی پنهان نشود.", "کاربرد", [
			mod$2({
				id: "neg-persuasion",
				title: "تکنیک‌های متقاعدسازی",
				summary: "اثبات اجتماعی، کمیابی، اقتدار و عمل متقابل واقعاً روی تصمیم اثر دارند. استفاده‌شان بدون فریب با استفادهٔ تبلیغاتی‌شان فرق دارد.",
				why: "اگر این اثرها را نشناسی، هم زودتر قانع می‌شوی هم ممکن است ناخواسته اعتماد کسی را خرج کنی.",
				example: "«فقط امروز سه تا مانده» اگر دروغ باشد کمیابی ساختگی است. «این تخفیف واقعاً تا جمعه است چون بعدش قیمت تأمین بالا می‌رود» کمیابی قابل‌بررسی است.",
				practice: "یک پیام تبلیغاتی که دیدی را بنویس و بگو کدام بخشش را می‌توانی بررسی کنی و کدام بخش فقط فشار است.",
				modelAnswer: "پیام می‌گفت صندلی‌ها در حال تمام شدن‌اند و استاد مشهور آن را تأیید کرده. عدد ظرفیت را می‌شود پرسید؛ جملهٔ تأیید بدون منبع فقط اقتدار نمایشی است.",
				keywords: [
					"کمیابی",
					"فریب",
					"منبع",
					"فشار"
				],
				evidence: "scientific",
				basis: "اثرهای کلاسیک اقناع، از جمله کار رابرت سیالدینی. اندازهٔ اثر در هر موقعیت یکسان نیست.",
				seeAlso: "psy-social"
			}),
			mod$2({
				id: "neg-objection",
				title: "مدیریت مخالفت",
				summary: "مخالفت را زود جمع نکن. اول آن را دقیق تکرار کن تا طرف بفهمد شنیده شده، بعد فرق واقعیت و تفسیر را جدا کن.",
				why: "جواب فوری معمولاً به نیمهٔ دوم حرف نمی‌رسد و مخالفت را شدیدتر می‌کند.",
				example: "«اگر درست فهمیده باشم، نگران زمانی، نه خودِ ایده. درست است؟» بعد از تأیید، دربارهٔ زمان حرف بزن.",
				practice: "یک مخالفت که معمولاً می‌شنوی را بنویس و یک بازتاب یک‌جمله‌ای برایش بساز که تهش پرسش تأیید باشد.",
				modelAnswer: "اگر درست شنیده باشم، مشکل تو قیمت نیست؛ می‌ترسی بعد از خرید تنها بمانی با استفاده از ابزار. این برداشت نزدیک است؟",
				keywords: [
					"مخالفت",
					"بازتاب",
					"تأیید",
					"تفسیر"
				],
				evidence: "educational",
				basis: "مهارت گوش دادن فعال در مذاکره."
			}),
			mod$2({
				id: "neg-language",
				title: "زبان اقناعی",
				summary: "زبان اقناعی مشخص است: عدد، نمونه، و انتخاب. صفت‌های بزرگ مثل «فوق‌العاده» و «قطعاً» جای دلیل را نمی‌گیرند.",
				why: "مبتدی با تأکید احساسی ضعف دلیل را می‌پوشاند و شنوندهٔ دقیق زود آن را می‌فهمد.",
				example: "«این روش عالیه» ضعیف است. «در دو فروش آخر، تماس پیگیری سه‌روزه نرخ پاسخ را از یکی به چهار رساند» قابل بحث است.",
				practice: "یک جملهٔ تبلیغاتی از خودت را از صفت خالی کن و یک عدد یا نمونهٔ واقعی جایش بگذار. اگر عدد نداری، همان را اعتراف کن.",
				modelAnswer: "نمی‌گویم نتیجه تضمینی است. می‌گویم در نمونهٔ خودم، نوشتن نفع مشتری در خط اول باعث شد پاسخ سریع‌تر بیاید. نمونه هنوز کم است.",
				keywords: [
					"عدد",
					"نمونه",
					"صفت",
					"دلیل"
				],
				evidence: "educational",
				basis: "استاندارد بیان ادعا در این محصول: قطعیت را از شواهد جدا کن."
			}),
			mod$2({
				id: "neg-meetings",
				title: "مدیریت جلسات",
				summary: "جلسهٔ سالم یک نتیجهٔ مکتوب دارد: تصمیم، مسئول، موعد. اگر این سه نباشند، جلسه گفت‌وگوی خوب بوده نه کار.",
				why: "جلسه‌های بی‌خروجی، وقت را می‌خورند و اختلاف را به تعارف تبدیل می‌کنند.",
				example: "ده دقیقهٔ آخر فقط می‌پرسید: چه تصمیمی گرفتیم، چه کسی انجام می‌دهد، تا کی؟",
				practice: "برای یک جلسهٔ خیالی یا واقعی، سه خط خروجی بنویس. اگر تصمیمی نیست، بنویس «تصمیم نگرفتیم» تا خالی بودنش معلوم باشد.",
				modelAnswer: "تصمیم: نسخهٔ کوتاه را بفرستیم نه گزارش کامل. مسئول: من شاخص‌ها، تو مقدمه. موعد: امروز ساعت پنج. موضوع قیمت به جلسهٔ بعد موکول شد.",
				keywords: [
					"تصمیم",
					"مسئول",
					"موعد",
					"جلسه"
				],
				evidence: "educational",
				basis: "عادت اجرایی تیم‌های کوچک؛ قاعدهٔ جهانی علمی نیست."
			})
		])]
	},
	{
		id: "body-language",
		title: "زبان بدن و ارتباط غیرکلامی",
		blurb: "یک نشانه تشخیص نیست. خوشهٔ نشانه‌ها را در زمینه می‌خوانیم و از قضاوت قطعی پرهیز می‌کنیم.",
		icon: "eye",
		courses: [course$2("body-read", "خواندن نشانه", "صورت، چشم، تنه و دست را جدا توصیف کن، بعد تازه معنا را محتمل بدان.", "مشاهده", [
			mod$2({
				id: "body-face",
				title: "حالات چهره",
				summary: "صورت خبر هیجان می‌دهد اما فرهنگ، خستگی و عادت شخصی معنا را عوض می‌کند. یک اخم همیشه یعنی مخالفت نیست.",
				why: "قضاوت سریع از صورت، رابطه را به سوءتفاهم تبدیل می‌کند.",
				example: "ابروهای گره‌خورده وسط گوش دادن ممکن است تمرکز باشد. اگر هم‌زمان سر تکان دهد و سؤال دقیق بپرسد، مخالفت خواندنش ضعیف است.",
				practice: "بدون نسبت دادن نیت، سه چیز قابل دیدن در صورت یک گفت‌وگوی اخیر را توصیف کن. بعد بنویس کدام معنا فقط حدس توست.",
				modelAnswer: "قابل دیدن: لب‌ها فشرده، نگاه به پایین، بعد یک لبخند کوتاه. حدس من ناراحتی بود. حدس جایگزین: داشت جمله را جمع می‌کرد و لبخند از روی تعارف بود. باید می‌پرسیدم نه اینکه نتیجه بگیرم.",
				keywords: [
					"حدس",
					"زمینه",
					"صورت",
					"نیت"
				],
				evidence: "educational",
				basis: "پژوهش هیجان چهره وجود دارد اما خواندن نیت از یک فریم قابل اتکا نیست. ادعای «همیشه لو می‌رود» رد می‌شود."
			}),
			mod$2({
				id: "body-eyes",
				title: "تماس چشمی",
				summary: "تماس چشمی نشانهٔ واحد صداقت نیست. کمش ممکن است فکر کردن، شرم فرهنگی، یا اضطراب باشد؛ زیاد و بی‌پلکش می‌تواند فشار باشد.",
				why: "افسانهٔ «دروغگو به چشم نگاه نمی‌کند» هم بی‌گناه را متهم می‌کند هم دروغگوی مسلط را تبرئه.",
				example: "در یک مصاحبه، نگاه مداوم بدون پلک شنونده را معذب می‌کند حتی اگر حرف درست باشد.",
				practice: "برای خودت یک قاعدهٔ میانه بنویس: کی نگاه را نگه می‌داری و کی عمداً رها می‌کنی تا فشار نسازی.",
				modelAnswer: "وقتی طرف حرف می‌زند نگاه را نرم نگه می‌دارم تا بداند می‌شنوم. وقتی خودش سکوت می‌کند نگاه را برنمی‌گردانم که مجبور به حرف زدن شود. قطع نگاه برای فکر کردن را بی‌احترامی حساب نمی‌کنم.",
				keywords: [
					"نگاه",
					"صداقت",
					"فشار",
					"فرهنگ"
				],
				evidence: "educational",
				basis: "خلاف باور عامه، پژوهش‌ها تماس چشمی را نشانهٔ قطعی دروغ نمی‌دانند.",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "چشم کانال توجه است، دستگاه دروغ‌سنج نیست. شدت مناسب به فرهنگ، نسبت قدرت و موضوع حساس بستگی دارد."
					},
					{
						title: "تشخیص سوءاستفاده",
						body: "خیره شدن برای معذب کردن، یا تنبیه با برگرداندن کامل صورت، تکنیک قدرت است نه مهارت ارتباط."
					},
					{
						title: "مقابله",
						body: "اگر نگاه طرف سنگین است، می‌توانی بگویی «وقتی این‌قدر مستقیم نگاه می‌کنی سخت‌تر حرف می‌زنم» و موضوع را به محتوا برگردانی."
					},
					{
						title: "اشتباه رایج",
						body: "تمرین نگاه در آینه تا حدی که طبیعی بودن از بین برود. ارتباط زنده مهم‌تر از اجرای قاعده است."
					}
				]
			}),
			mod$2({
				id: "body-posture",
				title: "وضعیت بدن",
				summary: "تنهٔ باز و روبه‌رو یعنی دسترس‌پذیری نسبی. جمع شدن، فاصله، یا زاویهٔ خروج یعنی احتیاط. هیچ‌کدام به‌تنهایی علاقه یا بی‌علاقگی قطعی نیست.",
				why: "توصیهٔ «قدرت را با ژست نشان بده» اگر نمایشی شود، اعتماد را کم می‌کند.",
				example: "کسی که روی صندلی جمع شده و پا را سمت در گذاشته، شاید عجله دارد نه اینکه از تو بدش بیاید. بپرس نه اینکه داستان بسازی.",
				practice: "در یک گفت‌وگو فقط جهت تنه و فاصله را توصیف کن و یک پرسش محترمانه پیشنهاد بده به‌جای نتیجه‌گیری.",
				modelAnswer: "تنه‌اش زاویه داشت و وسایلش را نزدیک در گذاشته بود. به‌جای این‌که بگویم بی‌علاقه است، می‌پرسم «اگر وقتت کم است بگو تا کوتاه کنیم.»",
				keywords: [
					"تنه",
					"فاصله",
					"نتیجه",
					"پرسش"
				],
				evidence: "educational",
				basis: "توصیف رفتاری، نه آزمون شخصیت."
			}),
			mod$2({
				id: "body-hands",
				title: "حرکات دست",
				summary: "دستِ هم‌آهنگ با حرف، فهم را آسان می‌کند. دستِ بی‌قرار، مشت، یا اشارهٔ قطع‌کننده می‌تواند تنش یا عادت باشد؛ باید با کلام چک شود.",
				why: "مبتدی یک حرکت را برابر یک شخصیت می‌گیرد: «دست به سینه یعنی بسته.» گاهی فقط سردش است.",
				example: "اشارهٔ کوچک به موضوع روی میز، بهتر از دست‌های پنهان زیر میز در توضیح یک طرح است. اما پنهان بودن دست در هوا سرد، مدرک پنهان‌کاری نیست.",
				practice: "یک حرکت دست خودت را که موقع استرس می‌آید نام ببر و یک جایگزین آرام برایش انتخاب کن که نمایشی نباشد.",
				modelAnswer: "موقع استرس با خودکار بازی می‌کنم و طرف را از حرف پرت می‌کنم. جایگزین: خودکار را زمین بگذارم و فقط وقتی نکته‌ای هست با دست محدوده را نشان بدهم.",
				keywords: [
					"دست",
					"عادت",
					"تنش",
					"جایگزین"
				],
				evidence: "experiential",
				basis: "مشاهدهٔ آموزشی. نسبت دادن شخصیت از روی یک ژست معتبر نیست."
			})
		]), course$2("body-voice", "صدا و زمینه", "لحن و اضطراب را در کنار کلام بسنج، نه به‌جای آن.", "زمینه", [
			mod$2({
				id: "body-tone",
				title: "لحن و آهنگ صدا",
				summary: "لحن گاهی از واژه قوی‌تر به نظر می‌رسد: طعنه، عجله، یا گرمای واقعی. اما لحن هم مثل صورت، بدون زمینه قطعی نیست.",
				why: "پیام نوشتاری لحن ندارد و ذهن شنونده جای خالی را معمولاً با بدترین حالت پر می‌کند.",
				example: "جملهٔ «باشه هر جور تو بگی» با آهنگ افتان می‌تواند تسلیم عصبی باشد نه توافق.",
				practice: "همان جمله را یک بار موافق و یک بار ناراضی بخوان. بنویس کدام کلمه را در متن باید اضافه کنی تا لحنِ غلط برداشت نشود.",
				modelAnswer: "به‌جای «باشه هر جور تو بگی» می‌نویسم «موافقم ساعت شش باشد». اگر ناراضی باشم می‌نویسم «ساعت شش برایم سخت است؛ هفت ممکن است؟» تا طعنه جای موافقت را نگیرد.",
				keywords: [
					"لحن",
					"متن",
					"طعنه",
					"توافق"
				],
				evidence: "educational",
				basis: "مهارت وضوح در ارتباط روزمره."
			}),
			mod$2({
				id: "body-anxiety",
				title: "نشانه‌های اضطراب",
				summary: "اضطراب خوشه‌ای است: تند حرف زدن، نفس بالا، عذرخواهی زیاد، یا قفل شدن. یک نشانه برای برچسب «مضطرب» کم است.",
				why: "اگر اضطراب را نیت بد بخوانیم، آدم دقیق یا خجالتی را غیرصادق می‌بینیم.",
				example: "کسی که قبل از ارائه آب زیاد می‌نوشد و جمله‌ها را تکرار می‌کند، احتمالاً تحت فشار است نه اینکه حرفش ساختگی باشد.",
				practice: "سه نشانهٔ اضطراب خودت را بنویس و یک تنظیم کوچک قبل از گفت‌وگوی مهم که واقعاً انجام می‌دهی.",
				modelAnswer: "نشانه‌هایم: سرعت حرف، عذرخواهی بی‌محل، و بازی با انگشت. تنظیم: دو دقیقه قبل، سه نفس آهسته و نوشتن اولین جمله روی کاغذ تا شروع از حفظ نباشد.",
				keywords: [
					"اضطراب",
					"خوشه",
					"برچسب",
					"نفس"
				],
				evidence: "educational",
				basis: "آشنایی عمومی. این درس تشخیص اضطراب بالینی نیست.",
				seeAlso: "psy-emotion"
			}),
			mod$2({
				id: "body-relations",
				title: "ارتباط غیرکلامی در روابط",
				summary: "در رابطه، غیرکلام یعنی توجه روزمره: رو کردن بدن وقتی طرف حرف می‌زند، زمین گذاشتن گوشی، یا خروج فیزیکی به‌جای فحش.",
				why: "حرف محبت‌آمیز با بدنِ غایب، اعتماد را می‌ساید. بدنِ آرام با حرفِ توهین‌آمیز هم آن را نمی‌سازد.",
				example: "گفتن «حرفت مهمه» همزمان با جواب دادن به پیام، دو پیام متناقض است. شنونده معمولاً رفتار را باور می‌کند.",
				practice: "یک تناقض کلام و رفتار که خودت یا دیگری ساخته را بنویس و یک اصلاح رفتاری کوچک پیشنهاد کن.",
				modelAnswer: "می‌گویم «بگو» اما نگاه‌ام به صفحه است. اصلاح: گوشی را برگردانم و اگر واقعاً نمی‌توانم، بگویم «ده دقیقهٔ دیگر کاملاً مال این حرف است» به‌جای توجه نصفه.",
				keywords: [
					"تناقض",
					"رفتار",
					"گوشی",
					"توجه"
				],
				evidence: "educational",
				basis: "اصل ساده: هنگام تعارض پیام، رفتار قابل‌مشاهده را جدی بگیر و هنوز هم نیت را بپرس."
			})
		])]
	}
];
function mod$1(m) {
	return m;
}
function course$1(id, title, blurb, chapterTitle, modules) {
	return {
		id,
		title,
		blurb,
		chapters: [{
			id: `${id}-ch`,
			title: chapterTitle,
			modules
		}]
	};
}
var domainsPartB = [
	{
		id: "sociology",
		title: "جامعه‌شناسی و هوش اجتماعی",
		blurb: "رفتار تو فقط مالِ خودت نیست؛ گروه، هنجار و جایگاه هم آن را شکل می‌دهند.",
		icon: "users",
		courses: [course$1("soc-group", "گروه و هنجار", "قبل از قضاوت اخلاقی یک نفر، قاعدهٔ نانوشتهٔ جمع را ببین.", "زمینه", [
			mod$1({
				id: "soc-behavior",
				title: "رفتار گروهی",
				summary: "در گروه، آدم‌ها بیشتر از آنچه فکر می‌کنند همسو می‌شوند: کمتر مخالفت می‌کنند و خطر را بین همه پخش می‌کنند.",
				why: "اگر این اثر را نشناسی، سکوت خودت را با موافقت واقعی اشتباه می‌گیری.",
				example: "در جلسه همه سر تکان می‌دهند. بعد از جلسه دو نفر جداگانه می‌گویند مخالف بوده‌اند. تصمیم مال جمع نبوده؛ مال جو بوده.",
				practice: "یک موقعیت گروهی را بنویس که در آن حرفت را نگفتی. یک جملهٔ مخالفِ کوتاه طراحی کن که شخص را تحقیر نکند.",
				modelAnswer: "در جمع خانوادگی با انتخاب رستوران مخالفت نکردم. جمله: «اگر هدف وقتِ با هم بودن است، جای خلوت‌تر برای من ممکن‌تر است.»",
				keywords: [
					"گروه",
					"سکوت",
					"مخالفت",
					"جو"
				],
				evidence: "educational",
				basis: "آشنایی با همرنگی گروهی. پژوهش کلاسیک وجود دارد؛ اینجا نسخهٔ کاربردی مبتدی است."
			}),
			mod$1({
				id: "soc-norms",
				title: "هنجارهای اجتماعی",
				summary: "هنجار قاعده‌ای است که کسی روی دیوار ننوشته اما تخلف از آن هزینهٔ اجتماعی دارد: نگاه، طعنه، یا حذف.",
				why: "تا هنجار را از سلیقه جدا نکنی، یا بی‌جهت خودت را خاطی می‌دانی یا بی‌جهت دیگران را بی‌ادب.",
				example: "جواب ندادن سلام در یک جمع آشنا هنجار را می‌شکند. نپوشیدن رنگ مورد علاقهٔ میزبان، هنجار نیست؛ سلیقه است.",
				practice: "دو قاعدهٔ جمع خودت را بنویس. مشخص کن شکستن کدام واقعاً به کسی آسیب می‌زند و کدام فقط عادت است.",
				modelAnswer: "قاعدهٔ آسیب‌زا: حرف خصوصی کسی را در جمع تعریف نکنیم. عادت: همه باید تا آخر مهمانی بمانند. دومی را می‌شود با خداحافظی روشن تغییر داد.",
				keywords: [
					"هنجار",
					"هزینه",
					"سلیقه",
					"آسیب"
				],
				evidence: "educational",
				basis: "مفهوم پایهٔ جامعه‌شناسی، ساده شده برای مهارت اجتماعی."
			}),
			mod$1({
				id: "soc-status",
				title: "جایگاه اجتماعی",
				summary: "جایگاه یعنی در آن جمع حرف چه کسی وزن بیشتری دارد. جایگاه همیشه شایستگی نیست؛ گاهی سابقه، پول، سن یا روابط است.",
				why: "اگر جایگاه را نبینی، مخالفت برابر را با دشمنی شخصی اشتباه می‌گیری یا برعکس، جلوی صاحب صدا خاموش می‌شوی.",
				example: "پیشنهاد کارآموز دقیق‌تر است اما پیشنهاد مدیر زودتر تصویب می‌شود. موضوع فقط کیفیت ایده نیست.",
				practice: "در یک جمع که می‌شناسی، بگو وزن حرف از کجا می‌آید و این وزن کجا تصمیم را بهتر و کجا بدتر می‌کند.",
				modelAnswer: "در فامیل وزن حرف با سن است. برای خاطره و هماهنگی خوب است. برای تصمیم مالی بد است، چون تجربهٔ قدیمی جای عدد تازه را می‌گیرد.",
				keywords: [
					"جایگاه",
					"وزن",
					"شایستگی",
					"جمع"
				],
				evidence: "educational",
				basis: "مفهوم منزلت اجتماعی در سطح مقدماتی."
			}),
			mod$1({
				id: "soc-interact",
				title: "تعاملات گروهی",
				summary: "تعامل سالم در گروه نقش روشن دارد: کی حرف را باز می‌کند، کی جمع می‌کند، کی مواظب است یک نفر غایب نباشد.",
				why: "بدون نقش، بلندترین صدا همه‌چیز را می‌برد.",
				example: "یک نفر زمان را نگه می‌دارد، یک نفر از ساکت‌ترین عضو می‌پرسد، یک نفر تصمیم را می‌نویسد.",
				practice: "برای یک گروه کوچک، سه نقش حداقلی پیشنهاد کن و بگو خودت کدام را واقع‌بینانه برمی‌داری.",
				modelAnswer: "نقش‌ها: نگهبان زمان، نویسندهٔ تصمیم، و کسی که از افراد ساکت یک نوبت می‌گیرد. من نویسنده را برمی‌دارم چون عجلهٔ حرف زدن دارم و نوشتن سرعتم را کم می‌کند.",
				keywords: [
					"نقش",
					"نوبت",
					"تصمیم",
					"صدا"
				],
				evidence: "educational",
				basis: "تمرین تسهیل گروه کوچک."
			})
		]), course$1("soc-read", "خواندن فضا", "فضا، نفوذ و فرهنگ را قبل از نصیحت شخصی ببین.", "کاربرد", [
			mod$1({
				id: "soc-space",
				title: "شناخت فضای اجتماعی",
				summary: "فضای اجتماعی یعنی اینجا چه چیزی گفتنی است، شوخی تا کجا مجاز است، و چه موضوعی هزینه دارد.",
				why: "حرف درست در فضای غلط، اثر درست نمی‌دهد و گاهی بی‌احترامی خوانده می‌شود.",
				example: "انتقاد از میزبان وسط میز شام، حتی اگر دقیق باشد، فضا را امن نمی‌کند. همان حرف را بعداً دونفره بگو.",
				practice: "یک حرف که جای خودش نبوده را جابه‌جا کن: همان محتوا، فضای بهتر، و یک جملهٔ شروع مناسب.",
				modelAnswer: "به‌جای نقد غذا سر میز، فردا می‌گویم: «دیشب ممنون. اگر دفعهٔ بعد کمک بخواهی در خرید جا ماند، بگو.» محتوا ماند، شرمندگی جمع حذف شد.",
				keywords: [
					"فضا",
					"هزینه",
					"زمان",
					"جمع"
				],
				evidence: "experiential",
				basis: "هوش اجتماعی کاربردی، نه قانون فراگیر."
			}),
			mod$1({
				id: "soc-influence",
				title: "نفوذ اجتماعی",
				summary: "نفوذ یعنی تغییر رفتار دیگری از راه هنجار، الگو یا فشار. نفوذ همیشه فریب نیست، اما همیشه هم بی‌طرف نیست.",
				why: "کسی که نفوذ را نمی‌بیند، فکر می‌کند انتخابش کاملاً شخصی بوده است.",
				example: "وقتی سه دوست داوطلب می‌شوند، چهارمی هم دست بلند می‌کند. این انتخاب خالص نیست؛ اثر الگوست.",
				practice: "یک تصمیم اخیر را بنویس و جدا کن چقدرش مال دلیل خودت بود و چقدرش مال جمع. لازم نیست تصمیم را باطل کنی.",
				modelAnswer: "کلاس را چون دوستم ثبت‌نام کرد برداشتم. دلیل خودم کنجکاوی بود، اما زمان ثبت‌نام را جمع تعیین کرد. انتخاب بد نبود؛ فقط کاملاً مستقل هم نبود.",
				keywords: [
					"نفوذ",
					"الگو",
					"فشار",
					"انتخاب"
				],
				evidence: "educational",
				basis: "مفهوم نفوذ اجتماعی. جزئیات اقناع در درس متقاعدسازی است و سوگیری‌ها در روان‌شناسی.",
				seeAlso: "psy-social",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "نفوذ سالم اطلاعات و الگو می‌دهد و راه «نه» را باز می‌گذارد. نفوذ ناسالم شرم، انزوا یا اطلاعات جعلی را هزینهٔ مخالفت می‌کند."
					},
					{
						title: "تشخیص",
						body: "اگر دلیل اصلی این است که «همه دارند» یا «وگرنه از جمع می‌افتی»، نفوذ را جدی بگیر و دلیل مستقل بخواه."
					},
					{
						title: "مقابله",
						body: "یک جمله فاصله: «بگذارید جدا فکر کنم و فردا بگویم.» تعویق کوتاه، اثر جو را کم می‌کند."
					},
					{
						title: "محدودیت",
						body: "هر اثرپذیری، ضعف شخصیت نیست. انسان اجتماعی است. هدف، دیدن اثر است نه انکار تعلق."
					}
				]
			}),
			mod$1({
				id: "soc-culture",
				title: "فرهنگ و جامعه",
				summary: "فرهنگ مجموعهٔ معناهای مشترک است: چه چیزی احترام است، چه چیزی خصوصی است، خانواده تا کجا تصمیم می‌گیرد.",
				why: "مهارت ارتباطی اگر فرهنگ را یک‌شکل فرض کند، تفاوت را به بی‌ادبی ترجمه می‌کند.",
				example: "تعارف برای پرداخت صورتحساب در یک فرهنگ جدی است و در دیگری نمایش. بدون پرسش، هر دو طرف ممکن است برنجند.",
				practice: "یک تفاوت فرهنگی یا خانوادگی که دیدی را بدون برنده و بازنده توصیف کن و یک پرسش شفاف پیشنهاد بده.",
				modelAnswer: "در خانوادهٔ من تعارف چندباره احترام است و در خانهٔ دوستم تعارف اضافه فشار است. پرسش: «این پیشنهاد را جدی بگیرم یا رسم تعارف است؟»",
				keywords: [
					"فرهنگ",
					"احترام",
					"تعارف",
					"پرسش"
				],
				evidence: "educational",
				basis: "مقدمهٔ بسیار کوتاه. این درس جای مطالعهٔ مردم‌نگاری را نمی‌گیرد."
			})
		])]
	},
	{
		id: "critical",
		title: "تفکر انتقادی و سواد رسانه‌ای",
		blurb: "ادعا را از گوینده جدا کن. بپرس شاهد چیست، چه چیزی جا افتاده، و این حرف چه کاری از تو می‌خواهد.",
		icon: "scale",
		courses: [course$1("crit-claim", "سنجش ادعا", "مغالطه، منبع و منطق را روی حرف واقعی تمرین کن نه روی تعریف حفظی.", "ابزار", [
			mod$1({
				id: "crit-fallacy",
				title: "تشخیص مغالطه",
				summary: "مغالطه شکلِ قانع‌کنندهٔ یک دلیل ضعیف است. نام لاتین لازم نیست؛ کافی است بپرسیی دلیل واقعاً به نتیجه وصل است یا به احساس و حمله.",
				why: "اگر فقط حس کنی «یک جای کار می‌لنگد» اما نتوانی بگویی کجا، یا ساکت می‌شوی یا بددهن.",
				example: "«مخالف این طرح هستی؟ پس برات مهم نیست مردم آسیب ببینند.» این حمله به نیت است، نه پاسخ به دلیل تو.",
				practice: "یک جملهٔ قانع‌کننده اما ضعیف بنویس و دقیقاً بگو پرش کجاست: از کدام مقدمه به کدام نتیجه.",
				modelAnswer: "جمله: «چون یک‌بار این روش جواب داده، همیشه جواب می‌دهد.» پرش این است که یک نمونه به قاعدهٔ همیشگی تبدیل شده، بدون بررسی شرایط آن بار.",
				keywords: [
					"دلیل",
					"نتیجه",
					"حمله",
					"نمونه"
				],
				evidence: "educational",
				basis: "منطق غیررسمی برای مبتدی. نام‌گذاری مکتب‌ها هدف این درس نیست.",
				sections: [
					{
						title: "تعریف ساده",
						body: "مغالطه یعنی حرفی که شبیه دلیل است اما یا موضوع را عوض می‌کند، یا نمونه را بیش از حد بزرگ می‌کند، یا ترس را جای شاهد می‌گذارد."
					},
					{
						title: "چهار شکل دم‌دستی",
						body: "حمله به شخص به‌جای حرف. دوگانهٔ ساختگی که انگار فقط دو راه وجود دارد. تعمیم از یک خاطره. و تهدید که نتیجه را بدون دلیل تحمیل می‌کند."
					},
					{
						title: "تشخیص",
						body: "جمله را به دو تکه بشکن: آنچه گفته شد و آنچه از آن نتیجه گرفته شد. اگر تکهٔ وسط جا افتاده، همان‌جا بایست."
					},
					{
						title: "مقابله",
						body: "نام مغالطه را مثل شمشیر به کار نبر. بگو: «این بخش به نتیجه وصل نمی‌شود؛ شاهد مستقیم چیست؟»"
					},
					{
						title: "محدودیت",
						body: "هر جملهٔ احساسی مغالطه نیست. گاهی تجربه شاهد کیفی است. سؤال این است که ادعا چقدر بزرگ‌تر از شاهد است."
					}
				]
			}),
			mod$1({
				id: "crit-claims",
				title: "تحلیل ادعاها",
				summary: "هر ادعا سه لایه دارد: واقعیت قابل‌بررسی، تفسیر، و توصیه. این سه را در یک جمله قاطی نکن.",
				why: "بیشتر دعواها سر این است که یک نفر تفسیرش را واقعیت می‌نامد.",
				example: "«فروش این ماه ۲۰٪ کم شد» واقعیت قابل‌چک است. «پس تیم تنبل شده» تفسیر است. «باید نیرو حذف شود» توصیه است.",
				practice: "یک خبر یا حرف روزمره را در سه خط بازنویسی کن: واقعیت، تفسیر، توصیه.",
				modelAnswer: "واقعیت: پیام دیر جواب داده شد. تفسیر من: رابطه سرد شده. توصیهٔ عجولانه: فاصله بگیرم. تفسیر هنوز شاهد کافی ندارد؛ اول دلیل تأخیر را می‌پرسم.",
				keywords: [
					"واقعیت",
					"تفسیر",
					"توصیه",
					"شاهد"
				],
				evidence: "educational",
				basis: "عادت فکری این محصول برای همهٔ درس‌ها."
			}),
			mod$1({
				id: "crit-sources",
				title: "ارزیابی منابع",
				summary: "منبع خوب معلوم می‌کند چه کسی، کی، با چه روشی، و با چه منفعتی حرف می‌زند. ناشناس بودن به‌تنهایی باطل نمی‌کند اما وزن را کم می‌کند.",
				why: "بازنشر زیاد، منبع نمی‌سازد. هزار نفر می‌توانند یک خطای اول را تکرار کنند.",
				example: "نقل‌قول یک متخصص بدون لینک اثر، ضعیف‌تر از گزارش همان متخصص با تاریخ و داده است؛ حتی اگر نام متخصص آشنا باشد.",
				practice: "برای یک ادعای که امروز دیدی، چهار جواب کوتاه بده: نویسنده، تاریخ، روش، منفعت احتمالی. هر کدام را که نمی‌دانی بنویس «نامعلوم».",
				modelAnswer: "نویسنده نامعلوم، تاریخ نامعلوم، روش یک خاطرهٔ شخصی، منفعت احتمالی فروش دوره. پس ادعا را جدی می‌گیرم فقط به‌عنوان فرض، نه واقعیت.",
				keywords: [
					"منبع",
					"تاریخ",
					"روش",
					"منفعت"
				],
				evidence: "educational",
				basis: "سواد اطلاعاتی مقدماتی."
			}),
			mod$1({
				id: "crit-logic",
				title: "استدلال منطقی",
				summary: "استدلال ساده: اگر این مقدمه‌ها درست باشند، این نتیجه تا چه حد ناچار است؟ غالباً نتیجه ممکن است، نه ناچار.",
				why: "کلمه‌های «پس حتماً» و «بنابراین قطعاً» جای حلقهٔ گم‌شده را می‌گیرند.",
				example: "مقدمه: دیروز دیر آمد. نتیجهٔ ناچار وجود ندارد. نتیجهٔ ممکن: ترافیک، بی‌نظمی، یا فوریت خانوادگی.",
				practice: "یک «پس حتماً» که شنیده‌ای را به «پس یکی از احتمال‌ها این است» تبدیل کن و دو احتمال دیگر اضافه کن.",
				modelAnswer: "به‌جای «جواب نداده پس حتماً بی‌خیال شده»، می‌نویسم یکی از احتمال‌ها شلوغی است، یکی فراموشی، یکی فاصلهٔ عمدی. بدون پرسش، هیچ‌کدام قطعی نیست.",
				keywords: [
					"مقدمه",
					"نتیجه",
					"احتمال",
					"قطعاً"
				],
				evidence: "educational",
				basis: "منطق روزمره، نه منطق صوری دانشگاهی."
			})
		]), course$1("crit-media", "رسانه", "سوگیری و اطلاعات نادرست را در سطح کاربرد رسانه‌ای ببین. نظریهٔ کامل سوگیری در روان‌شناسی است.", "رسانه", [
			mod$1({
				id: "crit-bias",
				title: "سوگیری شناختی در ارزیابی ادعا",
				summary: "اینجا سوگیری را فقط تا جایی می‌گیریم که روی باور کردن خبر اثر می‌گذارد: میل به تأیید چیزی که از قبل دوست داریم.",
				why: "اگر این اثر را فقط «مال آدم‌های دیگر» بدانی، رسانه همان چیزی را نشانت می‌دهد که نگهت می‌دارد.",
				example: "دو گزارش متعارض. گزارشی که با نظر قبلی‌ات جور است را تا آخر می‌خوانی و دیگری را از عنوان رد می‌کنی.",
				practice: "یک موضوع که درباره‌اش مطمئنی را انتخاب کن و عامدانه یک منبع مخالف قابل‌فهم پیدا کن. بنویس کدام تکه‌اش را هنوز جواب نداده‌ای.",
				modelAnswer: "مطمئن بودم پیام‌های انگیزشی بی‌ضرند. یک نقد خواندم که می‌گفت هدف مبهم را قشنگ می‌کنند. هنوز جواب نداده‌ام که هدف خودم چقدر سنجش‌پذیر است.",
				keywords: [
					"تأیید",
					"منبع مخالف",
					"خبر",
					"یقین"
				],
				evidence: "scientific",
				basis: "کاربرد سوگیری تأیید. شرح علمی‌تر در درس سوگیری‌های شناختی حوزهٔ روان‌شناسی است.",
				seeAlso: "psy-bias"
			}),
			mod$1({
				id: "crit-misinfo",
				title: "تشخیص اطلاعات نادرست",
				summary: "اطلاعات نادرست همیشه دروغ شاخ‌دار نیست. گاهی عدد درست با حذف زمینه، تصویر غلط می‌سازد.",
				why: "تکذیب دیر می‌رسد و نسخهٔ هیجانی زودتر پخش می‌شود. عادت توقف، از حافظهٔ قوی مهم‌تر است.",
				example: "«شکایت‌ها سه برابر شد» بدون گفتن اینکه تعداد مشتری هم چهار برابر شده، تصویر بدی می‌سازد که شاید نرخ شکایت کمتر شده باشد.",
				practice: "یک آمار چشمگیر بنویس و دو سوال زمینه‌ای که قبل از باور کردنش لازم است.",
				modelAnswer: "آمار: «نود درصد موفق‌ها این عادت را دارند.» سؤال‌ها: موفق چطور تعریف شده و گروه مقایسه چه کسانی بودند؟ بدون این دو، درصد هیچ کاری نمی‌کند.",
				keywords: [
					"زمینه",
					"آمار",
					"حذف",
					"توقف"
				],
				evidence: "educational",
				basis: "سواد رسانه‌ای کاربردی."
			}),
			mod$1({
				id: "crit-media-analysis",
				title: "تحلیل رسانه",
				summary: "هر رسانه انتخاب می‌کند چه چیزی دیده شود، چه چیزی عنوان شود، و چه احساسی مقدم بر اطلاعات بیاید.",
				why: "اگر فقط محتوا را بخوانی و قالب را نه، هیجان عنوان را با اهمیت موضوع یکی می‌گیری.",
				example: "عنوان «رسوایی بزرگ» بالای یک اختلاف عادی قراردادی، اهمیت را مصنوعی بالا می‌برد.",
				practice: "یک عنوان را خنثی بازنویسی کن طوری که نه بزرگ‌نمایی کند نه موضوع را پنهان.",
				modelAnswer: "به‌جای «رسوایی شوکه‌کننده در تیم»، می‌نویسم: «تیم دربارهٔ تأخیر تحویل و شرط قرارداد اختلاف دارد.»",
				keywords: [
					"عنوان",
					"قالب",
					"هیجان",
					"انتخاب"
				],
				evidence: "educational",
				basis: "آموزش خواندن رسانه برای مبتدی."
			})
		])]
	},
	{
		id: "ai",
		title: "هوش مصنوعی و فناوری",
		blurb: "مدل را ابزار بدان نه مرجع حقیقت. هر خروجی ادعا است تا وقتی منبع و محدودیتش روشن شود.",
		icon: "cpu",
		courses: [course$1("ai-base", "فهم ابزار", "مبنا، مدل زبانی و پرامپت را بدون واژه‌پراکنی یاد بگیر.", "هسته", [
			mod$1({
				id: "ai-basics",
				title: "مبانی هوش مصنوعی",
				summary: "در این سطح، هوش مصنوعی یعنی نرم‌افزاری که از روی مثال‌های زیاد الگو پیش‌بینی می‌کند، نه موجودی که می‌فهمد یا مسئولیت می‌پذیرد.",
				why: "اگر برای مدل ذهن انسانی فرض کنی، اشتباه مطمئنِ آن را باور می‌کنی.",
				example: "مدل می‌تواند توضیح روانیِ قانع‌کننده بنویسد و هم‌زمان یک منبع جعلی بسازد. روانی بودن، درستی نیست.",
				practice: "با زبان خودت بنویس مدل زبانی چه کاری را خوب انجام می‌دهد و چه کاری را نباید به او بسپاری.",
				modelAnswer: "خوب است در پیش‌نویس، طبقه‌بندی و ایده. نباید داوری نهایی پزشکی، حقوقی یا واقعیت یک شخص را به او بسپارم مگر منبع مستقل داشته باشم.",
				keywords: [
					"پیش‌بینی",
					"مسئولیت",
					"منبع",
					"الگو"
				],
				evidence: "educational",
				basis: "تصویر مبتدی از مدل‌های یادگیری؛ جزئیات ریاضی این درس نیست."
			}),
			mod$1({
				id: "ai-llm",
				title: "مدل‌های زبانی",
				summary: "مدل زبانی ادامهٔ محتمل متن را تولید می‌کند. به همین دلیل هم مفید است هم می‌تواند با اطمینان چیزِ نگفته را پر کند.",
				why: "کاربر مبتدی خروجی را مثل جست‌وجو در یک دانشنامهٔ قطعی می‌خواند.",
				example: "می‌پرسی تاریخ یک رویداد گمنام. مدل به‌جای «نمی‌دانم» یک تاریخ خوش‌ساخت می‌سازد.",
				practice: "یک سؤال بنویس که مدل باید حق داشته باشد بگوید نمی‌دانم. کنارش بنویس چه شاهدی از او می‌خواهی.",
				modelAnswer: "سؤال: آمار دقیق کاربران یک کسب‌وکار کوچک محلی. شاهد: لینک منبع اولیه یا اعتراف به نداشتن داده. عددِ بدون منبع را نمی‌پذیرم.",
				keywords: [
					"احتمال",
					"نمی‌دانم",
					"اطمینان",
					"متن"
				],
				evidence: "educational",
				basis: "توصیف کاربردی مدل زبانی، نه معماری شبکه."
			}),
			mod$1({
				id: "ai-prompt",
				title: "مهندسی پرامپت",
				summary: "پرامپت خوب نقش، کار، زمینه، محدودیت و شکل خروجی را جدا می‌نویسد. هرچه مبهم‌تر بخواهی، مدل جای خالی را با حدس پر می‌کند.",
				why: "بیشتر خروجی‌های ضعیف، ضعف مدل نیستند؛ درخواستِ بدون معیارند.",
				example: "«یک متن خوب بنویس» ضعیف است. «برای والد مبتدی، در ۱۲۰ کلمه، بدون ترس‌آفرینی، سه نشانهٔ مرز سالم را با یک مثال بنویس» قابل ارزیابی است.",
				practice: "یک درخواست مبهم خودت را با پنج تکه بازنویسی کن: نقش، کار، مخاطب، محدودیت، قالب.",
				modelAnswer: "نقش: مربی مبتدی. کار: توضیح تفاوت مرز و تهدید. مخاطب: من. محدودیت: حداکثر ۱۵۰ کلمه و بدون توصیهٔ دستکاری. قالب: تعریف، مثال، یک تمرین.",
				keywords: [
					"نقش",
					"محدودیت",
					"قالب",
					"معیار"
				],
				evidence: "experiential",
				basis: "مهارت کار با مدل‌های فعلی. جزئیات با عوض شدن مدل تغییر می‌کند.",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "پرامپت برنامهٔ کوچکِ زبان طبیعی است. اگر معیار موفقیت را نگویی، هر خروجی را می‌شود «خوب» نامید."
					},
					{
						title: "پنج تکه",
						body: "نقش مدل، کار مشخص، زمینهٔ لازم، ممنوعیت‌ها، و قالب تحویل. اطلاعات محرمانه را زمینه نکن."
					},
					{
						title: "تشخیص پرامپت ضعیف",
						body: "صفت به‌جای معیار، چند کار متضاد در یک جمله، و نبودِ اجازه برای گفتن «کافی نیست»."
					},
					{
						title: "محدودیت",
						body: "پرامپتclever حقایق را تضمین نمی‌کند. برای واقعیت، منبع بیرونی لازم است. مدل را ممیز نهایی قرار نده."
					},
					{
						title: "اشتباه رایج",
						body: "تکرار «باهوش باش» و «خلاق باش» به‌جای دادن نمونهٔ ورودی و خروجی مورد انتظار."
					}
				]
			}),
			mod$1({
				id: "ai-tools",
				title: "ابزارهای هوش مصنوعی",
				summary: "ابزارها را با کار جدا کن: نوشتار، جست‌وجو، تصویر، صوت، خودکارسازی. ابزار همه‌کاره معمولاً در کار حساس نامطمئن‌تر است.",
				why: "انتخاب ابزار از روی تبلیغ، وقت و دادهٔ شخصی را هدر می‌دهد.",
				example: "برای خلاصهٔ یک متن که خودت داری، مدل گفت‌وگو کافی است. برای عدد زندهٔ بازار، ابزار باید به منبع به‌روز وصل باشد وگرنه حدس می‌زند.",
				practice: "یک کار واقعی هفته‌ات را انتخاب کن و بنویس کدام بخشش را به ابزار می‌دهی و کدام بخش باید مال خودت بماند.",
				modelAnswer: "پیش‌نویس پیام را به ابزار می‌دهم. تصمیم اینکه این وعده را واقعاً می‌توانم بدهم مال خودم می‌ماند، چون ابزار تعهد مرا نمی‌داند.",
				keywords: [
					"ابزار",
					"داده",
					"تعهد",
					"منبع"
				],
				evidence: "educational",
				basis: "راهنمای انتخاب ابزار، وابسته به بازار روز."
			})
		]), course$1("ai-build", "اتصال و اتوماسیون", "اتوماسیون وقتی مفید است که خطا قابل دیدن و برگشت باشد.", "ساخت", [
			mod$1({
				id: "ai-auto",
				title: "اتوماسیون",
				summary: "اتوماسیون یعنی کار تکراری با قاعدهٔ روشن، بدون تصمیم حساس انسانی، خودش تکرار شود.",
				why: "خودکار کردن یک قضاوت مبهم، خطا را سریع و بی‌صدا پخش می‌کند.",
				example: "برچسب زدن ایمیل‌های خبرنامه مناسب است. جواب خودکار به مشتری عصبانی، بدون بازبینی انسان، مناسب نیست.",
				practice: "یک کار تکراری را به دو بخش بشکن: بخش قاعده‌مند که قابل اتوماسیون است و بخش قضاوتی که نباید خودکار شود.",
				modelAnswer: "یادآوری مرور درس‌ها قاعده‌مند است و می‌تواند زمان‌بندی شود. ارزیابی اینکه پاسخ من به یک نفر محترمانه بود قضاوتی است و باید انسان یا بازبینی صریح داشته باشد.",
				keywords: [
					"قاعده",
					"قضاوت",
					"بازبینی",
					"تکرار"
				],
				evidence: "educational",
				basis: "اصل طراحی اتوماسیون محتاط."
			}),
			mod$1({
				id: "ai-code",
				title: "برنامه‌نویسی با هوش مصنوعی",
				summary: "مدل کد را پیش‌نویس می‌کند. مسئولیت اجرا، امنیت و فهم قطعه هنوز با انسان است.",
				why: "چسباندن کد نخوانده، آسیب‌پذیری و وابستگی می‌سازد.",
				example: "مدل یک فرم ورود می‌سازد که رمز را در نشانی صفحه می‌گذارد. ظاهر کار می‌کند؛ از نظر امنیت خراب است.",
				practice: "سه سوال بنویس که قبل از قبول هر کد تولیدشده باید از خودت بپرسی.",
				modelAnswer: "این کد چه ورودی را اعتماد می‌کند؟ اگر خطا بخورد چه می‌بیند کاربر؟ آیا راز یا کلید را جایی نمایان می‌کند؟",
				keywords: [
					"کد",
					"امنیت",
					"بازبینی",
					"خطا"
				],
				evidence: "educational",
				basis: "عادت حرفه‌ای کار با دستیار کدنویسی."
			}),
			mod$1({
				id: "ai-api",
				title: "رابط برنامه‌نویسی و اتصال سرویس‌ها",
				summary: "رابط برنامه‌نویسی راه حرف زدن دو نرم‌افزار است. کلید این رابط مثل رمز است و نباید در صفحهٔ کاربر یا متن عمومی باشد.",
				why: "اتصال شتاب‌زده، هم هزینه می‌سازد هم داده را جایی می‌فرستد که قصدش را نداشتی.",
				example: "یک برنامه به‌جای یک مدل ثابت، از درگاه چند مدل استفاده می‌کند تا اگر یکی خطا داد دیگری جای آن بیاید. کلید فقط سمت سرور می‌ماند.",
				practice: "برای یک اتصال خیالی بنویس: چه داده‌ای فرستاده می‌شود، چه چیزی هرگز نباید فرستاده شود، و اگر سرویس خواب بود کاربر چه می‌بیند.",
				modelAnswer: "متن تمرین فرستاده می‌شود. نام واقعی افراد و اطلاعات پزشکی هرگز نرود. اگر سرویس خواب بود، ارزیابی محلی نشان داده شود و دکمهٔ مدل غیرفعال با دلیل روشن باشد.",
				keywords: [
					"کلید",
					"سرور",
					"داده",
					"خطا"
				],
				evidence: "educational",
				basis: "معماری همین محصول: درگاه مدل، نه وابستگی پنهان به یک ارائه‌دهنده."
			}),
			mod$1({
				id: "ai-news",
				title: "فناوری‌های روز",
				summary: "فناوری روز را با سه سؤال دنبال کن: چه مسئله‌ای را ارزان‌تر کرده، چه خطای تازه‌ای ساخته، و تبلیغش کدام محدودیت را پنهان کرده.",
				why: "تعقیب هر نام تازه، یادگیری مهارت را با جمع کردن ابزار عوض می‌کند.",
				example: "یک مدل جدید سریع‌تر است اما همچنان منبع جعل می‌کند. سرعت، آن محدودیت را لغو نکرده.",
				practice: "یک ابزار تازه‌ای که اسمش را شنیده‌ای در سه خط همان سؤال‌ها جواب بده. اگر نمی‌دانی، «نمی‌دانم» قابل قبول است.",
				modelAnswer: "نمی‌دانم هزینه را چقدر کم کرده. خطای محتملش جواب مطمئنِ غلط است. تبلیغ معمولاً نمونه‌های موفق را نشان می‌دهد نه نرخ خطا را.",
				keywords: [
					"محدودیت",
					"تبلیغ",
					"مسئله",
					"خطا"
				],
				evidence: "educational",
				basis: "روش دنبال کردن خبر فناوری، نه فهرست ابزارهای این ماه."
			})
		])]
	}
];
function mod(m) {
	return m;
}
function course(id, title, blurb, chapterTitle, modules) {
	return {
		id,
		title,
		blurb,
		chapters: [{
			id: `${id}-ch`,
			title: chapterTitle,
			modules
		}]
	};
}
var domainsPartC = [
	{
		id: "business",
		title: "کسب‌وکار، فروش و بازاریابی",
		blurb: "فروش را فشار لحظهٔ آخر ندان. مسئلهٔ مشتری، قول قابل اثبات، و ادامهٔ رابطه را جدا ببین.",
		icon: "store",
		courses: [course("biz-core", "اساس کار", "کسب‌وکار یعنی مسئله‌ای که کسی حاضر است برای حل شدنش هزینه کند.", "پایه", [
			mod({
				id: "biz-principles",
				title: "اصول کسب‌وکار",
				summary: "برای مبتدی، کسب‌وکار چهار سؤال است: درد مشتری چیست، راه‌حل تو کدام تکه را برمی‌دارد، پول از کجا می‌آید، و اگر قولت خالی بود چه می‌شود.",
				why: "ایدهٔ جذاب بدون پرداخت‌کننده، سرگرمی است نه کسب‌وکار.",
				example: "«آموزش زبان بدن» ایده است. «کمک به فروشندهٔ تازه‌کار برای اینکه در جلسهٔ اول حرف مشتری را قطع نکند» یک مسئلهٔ مشخص است.",
				practice: "یک ایده را در چهار سؤال بالا جواب بده. جایی که نمی‌دانی را خالی نگذار؛ بنویس نمی‌دانم.",
				modelAnswer: "درد: نمی‌دانم پیامم چرا جواب نمی‌گیرد. تکهٔ راه‌حل: بازنویسی جملهٔ اول. پول: هنوز کسی نپرداخته. اگر قول خالی باشد باید نمونه را پس بدهم نه اینکه بهانه بیاورم.",
				keywords: [
					"مشتری",
					"قول",
					"پول",
					"مسئله"
				],
				evidence: "educational",
				basis: "چارچوب آموزشی شروع، نه طرح تجاری کامل."
			}),
			mod({
				id: "biz-sales",
				title: "فروش حرفه‌ای",
				summary: "فروش حرفه‌ای کشف است نه تعقیب. اول بفهم خریدار چه چیزی را از دست می‌دهد اگر هیچ نکند، بعد بگو راه‌حل تو کدام بخش را پوشش نمی‌دهد.",
				why: "فروشندهٔ مبتدی مزیت را فهرست می‌کند قبل از آنکه مسئله را شنیده باشد.",
				example: "به‌جای پنج ویژگی، بپرس «آخرین باری که این کار دستی خسته‌تان کرد چه بود؟» اگر آن درد وجود نداشت، فروش را تمام کن.",
				practice: "برای چیزی که بلدی بفروشی، سه پرسش کشف بنویس و یک جمله‌ای که در آن محدودیت محصول را خودت می‌گویی.",
				modelAnswer: "پرسش‌ها: این کار را حالا چطور انجام می‌دهید؟ کجا وقت تلف می‌شود؟ اگر حل نشود ماه بعد چه هزینه‌ای دارد؟ محدودیت: این روش برای تیم بالای بیست نفر طراحی نشده.",
				keywords: [
					"کشف",
					"درد",
					"محدودیت",
					"تعقیب"
				],
				evidence: "educational",
				basis: "فروش مشاوره‌ای در سطح مبتدی.",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "فروش خوب حق «نه» را حفظ می‌کند. اگر خریدار فقط با عجله یا شرم بله بگوید، رابطهٔ بعد از فروش خراب می‌شود."
					},
					{
						title: "ساختار کوتاه",
						body: "اجازه بگیر، مسئله را با زبان خود او تکرار کن، فقط بخش مربوط را پیشنهاد بده، قدم بعدی را کوچک کن."
					},
					{
						title: "تشخیص فروش ناسالم",
						body: "کمیابی دروغ، مخفی کردن هزینه، و جواب ندادن به سؤال «اگر به درد نخورد». این‌ها تکنیک فشارند نه مهارت."
					},
					{
						title: "مقابله به‌عنوان خریدار",
						body: "بگو: «خلاصهٔ مسئلهٔ من را بگویید. اگر جور نبود، مکثتان برای من کافی است.»"
					}
				]
			}),
			mod({
				id: "biz-sales-neg",
				title: "مذاکرهٔ فروش",
				summary: "تخفیف اولین جواب نیست. اگر قیمت مانع است، دامنه را کوچک کن یا چیزی را حذف کن تا مبادله روشن بماند.",
				why: "تخفیف بی‌مبادله به خریدار یاد می‌دهد که قیمت اول ساختگی است.",
				example: "به‌جای کم کردن قیمت همان بسته، پشتیبانی تلفنی را حذف کن و قیمت پایین‌تر را به دامنهٔ کمتر وصل کن.",
				practice: "یک امتیاز که می‌توانی بدهی و یک چیزی که در عوضش حفظ می‌کنی را بنویس.",
				modelAnswer: "امتیاز: تحویل را یک هفته دیرتر می‌کنم. حفظ: قیمت و کیفیت نسخهٔ اصلی نمی‌شکند. این مبادله است نه تسلیم.",
				keywords: [
					"تخفیف",
					"مبادله",
					"دامنه",
					"قیمت"
				],
				evidence: "educational",
				basis: "عادت مذاکرهٔ فروش. اصول منفعت در حوزهٔ مذاکره آمده است.",
				seeAlso: "neg-principles"
			}),
			mod({
				id: "biz-market",
				title: "تحلیل بازار",
				summary: "بازار در این سطح یعنی ده نفر واقعی، نه اسلاید. ببین مسئله را با چه کلمه‌ای می‌گویند و حالا با چه راه بدلی سر می‌کنند.",
				why: "تحلیل از دور، رقیب و قیمت را خیالی می‌سازد.",
				example: "اگر پنج نفر بگویند مشکلشان «وقت» است و تو محصول «انگیزه» ساخته‌ای، بازار حرف تو را تأیید نکرده.",
				practice: "سه سؤال که از یک مشتری احتمالی می‌پرسی را بنویس. سؤال‌ها نباید جواب مورد علاقه‌ات را در دهان او بگذارند.",
				modelAnswer: "آخرین بار این مشکل پیش آمد چه کردید؟ آن راه چقدر وقت یا پول گرفت؟ چه چیزی باعث می‌شود اصلاً دنبال جایگزین نروید؟",
				keywords: [
					"مشتری واقعی",
					"راه بدل",
					"سؤال",
					"بازار"
				],
				evidence: "educational",
				basis: "گفت‌وگوی کشف مسئله، نه آمارسازی."
			})
		]), course("biz-reach", "دیده شدن", "پیام بیرونی باید همان قول محصول را بگوید، نه شخصیتی که به آن نمی‌رسی.", "بیرون", [
			mod({
				id: "biz-digital",
				title: "بازاریابی دیجیتال",
				summary: "دیجیتال کانال است نه استراتژی. اول بگو به چه کسی، چه قولی، در کدام جا. بعد ابزار را انتخاب کن.",
				why: "حضور در همه‌جا، پیام را نازک می‌کند و سنجش را غیرممکن.",
				example: "یک نامهٔ ماهانه برای بیست مشتری قبلی، از پنج شبکهٔ بی‌پاسخ آموزنده‌تر است.",
				practice: "یک کانال را انتخاب کن و بنویس مخاطب کیست، قول چیست، و با چه عددی می‌فهمی بی‌فایده بوده.",
				modelAnswer: "کانال پیام مستقیم به مشتریان قبلی. قول: هر ماه یک نمونهٔ واقعی از اصلاح جملهٔ فروش. اگر بعد از چهار نوبت هیچ پاسخی نیامد، کانال را عوض می‌کنم.",
				keywords: [
					"کانال",
					"قول",
					"سنجش",
					"مخاطب"
				],
				evidence: "educational",
				basis: "اصول بازاریابی برای شروع کوچک."
			}),
			mod({
				id: "biz-content",
				title: "بازاریابی محتوایی",
				summary: "محتوای مفید یک مسئلهٔ کوچک را واقعاً حل می‌کند. محتوای ظاهری فقط می‌گوید «ما حرفه‌ای هستیم».",
				why: "تولید زیاد بدون مسئله، اعتماد نمی‌سازد؛ فقط شلوغی است.",
				example: "یک نمونهٔ قبل و بعد از یک پیام فروش، مفیدتر از نقل‌قول انگیزشی روزانه است.",
				practice: "موضوع یک محتوای این هفته را طوری بنویس که خواننده بدون خرید هم یک کار مشخص بتواند بکند.",
				modelAnswer: "عنوان عملی: «جملهٔ اول پیام را از تعریف خودت به مسئلهٔ طرف عوض کن.» خواننده همان امروز یک پیام را بازنویسی می‌کند، حتی اگر از من نخرد.",
				keywords: [
					"محتوا",
					"مسئله",
					"نمونه",
					"قول"
				],
				evidence: "educational",
				basis: "رویهٔ محتوا برای کسب‌وکار کوچک."
			}),
			mod({
				id: "biz-social",
				title: "شبکه‌های اجتماعی",
				summary: "شبکه برای رابطهٔ سبک و آزمون پیام خوب است. معیار را پسندیدن نگذار؛ پاسخ، سؤال، یا کار واقعی را بشمار.",
				why: "پسندیدن ارزان است و الگوریتم را با تقاضا اشتباه می‌گیری.",
				example: "صد پسند بدون یک پرسش، ضعیف‌تر از ده خواننده است که بپرسند «این برای فروشگاه کوچک هم هست؟»",
				practice: "یک معیار غیر از پسند برای محتوای بعدی تعیین کن و بگو اگر نبود چه تصمیمی می‌گیری.",
				modelAnswer: "معیار: حداقل سه نفر مسئله‌شان را با کلمات خودشان بنویسند. اگر نبود، موضوع را عوض می‌کنم نه اینکه فقط ساعت انتشار را عوض کنم.",
				keywords: [
					"معیار",
					"پاسخ",
					"پسند",
					"آزمون"
				],
				evidence: "experiential",
				basis: "توصیهٔ عملی، وابسته به بستر و همیشه در حال تغییر."
			}),
			mod({
				id: "biz-brand",
				title: "برندینگ",
				summary: "برند قول تکرارشونده است: هر بار که با تو تماس می‌گیرند چه تجربه‌ای حق دارند انتظار داشته باشند.",
				why: "لوگو و لحن، بدون ثبات رفتار، پوسته است.",
				example: "اگر قولت شفافیت است، پنهان کردن هزینهٔ جانبی برند را خراب می‌کند حتی اگر رنگ‌ها قشنگ باشند.",
				practice: "یک قول برند در یک جمله بنویس و یک رفتاری که این قول را نقض می‌کند و باید حذف شود.",
				modelAnswer: "قول: آموزش را ساده می‌گویم و اغراق نمی‌کنم. رفتار ممنوع: تیتر «تضمین جذابیت» یا نشان دادن نتیجهٔ غیرواقعی.",
				keywords: [
					"قول",
					"ثبات",
					"رفتار",
					"اغراق"
				],
				evidence: "educational",
				basis: "تعریف کاربردی برند برای شروع."
			}),
			mod({
				id: "biz-customer",
				title: "مدیریت مشتری",
				summary: "مدیریت مشتری یعنی یادت بماند مسئلهٔ او چه بود، چه قولی دادی، و دفعهٔ بعد از کجا ادامه می‌دهی.",
				why: "حافظهٔ پراکنده، مشتری را مجبور می‌کند هر بار از صفر خودش را توضیح دهد.",
				example: "یادداشت: «نگران زمان تحویل است نه قیمت. قول دادیم جمعه پیش‌نمونه بدهیم.»",
				practice: "برای یک مشتری فرضی سه خط حافظه بنویس که اگر همکارت بخواند بدون تو بتواند ادامه دهد.",
				modelAnswer: "مسئله: پیام اولش مبهم است. قول: دو بازنویسی تا چهارشنبه. ادامه: خودش انتخاب کند کدام لحن به مشتری واقعی‌اش نزدیک‌تر است.",
				keywords: [
					"حافظه",
					"قول",
					"ادامه",
					"مسئله"
				],
				evidence: "educational",
				basis: "عادت عملیات، نه نرم‌افزار خاص."
			})
		])]
	},
	{
		id: "personal",
		title: "مهارت‌های فردی و توسعهٔ شخصیت",
		blurb: "رشد شخصیت را به احساس انگیزه گره نزن. سیستم کوچک، قابل دیدن و قابل اصلاح بساز.",
		icon: "compass",
		courses: [course("per-day", "روز و تصمیم", "زمان، نظم، هدف و تصمیم را از شعار به قاعده تبدیل کن.", "عمل", [
			mod({
				id: "per-time",
				title: "مدیریت زمان",
				summary: "زمان را مدیریت نمی‌کنی؛ توجه را به تعداد کمی کارِ از قبل انتخاب‌شده می‌دهی. فهرست بلند، برنامه نیست.",
				why: "برنامهٔ شلوغ حس جدیت می‌دهد و آخر روز هیچ کار عمیق تمام نشده.",
				example: "به‌جای دوازده کار، سه کار را بنویس و بقیه را عمداً به فردا تبعید کن.",
				practice: "فقط سه خروجی برای فردا بنویس، نه فعالیت. خروجی باید قابل دیدن باشد.",
				modelAnswer: "خروجی‌ها: یک درس را تا آزمون تمام کنم، پیام مشتری را با جملهٔ مشخص بفرستم، میز کار را ده دقیقه جمع کنم. «فکر کردن به آینده» خروجی نیست.",
				keywords: [
					"خروجی",
					"توجه",
					"فهرست",
					"فردا"
				],
				evidence: "educational",
				basis: "روش برنامه‌ریزی سبک. بهره وری علمی واحدی وجود ندارد که برای همه یکسان باشد."
			}),
			mod({
				id: "per-order",
				title: "نظم شخصی",
				summary: "نظم یعنی اصطکاک شروعِ کار درست کم باشد و اصطکاک کار پرت‌کننده زیاد. ارادهٔ هر روزه کافی نیست.",
				why: "اگر هر بار باید از نو تصمیم بگیری، خستگی تصمیم را می‌برد نه تنبلی مرموز.",
				example: "کتاب را روی بالش بگذار و گوشی را شارژر بیرون اتاق. شروع مطالعه از جست‌وجوی کتاب آسان‌تر است.",
				practice: "یک کار که می‌خواهی تکرار شود را انتخاب کن و فقط محیط را طوری عوض کن که شروعش کمتر از دو دقیقه طول بکشد.",
				modelAnswer: "برای تمرین نوشتن، فایل را از شب باز می‌گذارم و جملهٔ اول را خالی می‌نویسم «امروز دربارهٔ مرز». فردا به‌جای انتخاب موضوع، فقط ادامه می‌دهم.",
				keywords: [
					"اصطکاک",
					"محیط",
					"شروع",
					"تصمیم"
				],
				evidence: "educational",
				basis: "طراحی محیط. به درس عادت‌سازی وصل است.",
				seeAlso: "per-habits"
			}),
			mod({
				id: "per-goals",
				title: "هدف‌گذاری",
				summary: "هدف مفید جهت است به‌اضافهٔ نشانهٔ نزدیک. هدفِ فقط احساسی، مثل «بهتر شوم»، قابل تمرین نیست.",
				why: "هدف بزرگ بدون نشانه، یا انگیزهٔ کوتاه می‌سازد یا شرم عقب افتادن.",
				example: "«مهارت مذاکره» جهت است. «این هفته یک مخالفت را با بازتاب جواب بدهم» نشانه است.",
				practice: "یک جهت یک‌ساله را به یک نشانهٔ همین هفته تبدیل کن که شخص دیگری بتواند انجام شدنش را ببیند.",
				modelAnswer: "جهت: آرام‌تر حرف بزنم. نشانهٔ هفته: در یک گفت‌وگوی واقعی، قبل از جواب، حرف طرف را یک جمله تکرار کنم و او تأیید کند که درست فهمیده‌ام.",
				keywords: [
					"جهت",
					"نشانه",
					"هفته",
					"قابل دیدن"
				],
				evidence: "educational",
				basis: "هدف رفتاری، نه تصویر ذهنی صرف."
			}),
			mod({
				id: "per-decide",
				title: "تصمیم‌گیری",
				summary: "تصمیم معقول برای مبتدی: معیار را قبل از گزینه‌ها بنویس، هزینهٔ برگشت را بسنج، و اگر برگشت ارزان است زودتر انتخاب کن.",
				why: "معیارِ بعد از دیدن گزینه‌ها، معمولاً توجیه علاقه‌ای است که از قبل داشتی.",
				example: "قبل از دیدن دوره‌ها بنویس: باید تمرین بازخورد داشته باشد و زیر بودجه باشد. بعد حذف کن، نه اینکه شیفتهٔ معرفی قشنگ شوی.",
				practice: "یک تصمیم معطل را با دو معیار قبلی و یک جمله دربارهٔ هزینهٔ برگشت تمام کن.",
				modelAnswer: "معیارها: هفته‌ای کمتر از سه ساعت، و خروجی قابل نشان دادن. برگشت این انتخاب ارزان است چون تعهد مالی طولانی ندارد. پس همین هفته نسخهٔ کوچک را شروع می‌کنم نه اینکه ماه‌ها مقایسه کنم.",
				keywords: [
					"معیار",
					"برگشت",
					"گزینه",
					"تعویق"
				],
				evidence: "educational",
				basis: "بهداشت تصمیم. سوگیری‌های مرتبط در روان‌شناسی شرح داده می‌شوند.",
				seeAlso: "psy-bias"
			})
		]), course("per-self", "خودِ پایدار", "اعتماد، هیجان، مسئله و عادت را مهارت بدان نه صفت ثابت.", "ادامه", [
			mod({
				id: "per-confidence",
				title: "اعتمادبه‌نفس",
				summary: "اعتمادبه‌نفس پایدار از شواهد کوچکِ انجام‌شده می‌آید، نه از جملهٔ تأییدی. جمله‌ها بدون شاهد، زود می‌شکنند.",
				why: "منتظر ماندن برای حس آمادگی، شروع را به تعویق بی‌پایان تبدیل می‌کند.",
				example: "به‌جای «من سخنران خوبی هستم»، بنویس «یک بار توضیح سه‌دقیقه‌ای را بدون خواندن از روی متن تمام کردم.»",
				practice: "سه شاهد واقعی از کارهایی که قبلاً انجام داده‌ای بنویس. شاهد باید کوچک و درست باشد، نه اغراق.",
				modelAnswer: "یک گفت‌وگوی سخت را قطع نکردم. یک وعده را سر وقت فرستادم. یک اشتباه را همان روز اصلاح کردم. این‌ها شخصیت کامل نمی‌سازند اما نشان می‌دهند شروع از صفر نیست.",
				keywords: [
					"شاهد",
					"آمادگی",
					"اغراق",
					"شروع"
				],
				evidence: "educational",
				basis: "خودکارآمدی در روان‌شناسی به تجربهٔ موفقِ واقعی نزدیک است؛ اینجا نسخهٔ تمرین است.",
				seeAlso: "psy-motive"
			}),
			mod({
				id: "per-emotion",
				title: "مدیریت احساسات",
				summary: "مدیریت یعنی نام بردن هیجان و فاصله انداختن قبل از عمل، نه حذف احساس. احساس پیام است؛ دستور نیست.",
				why: "سرکوب، انفجار دیرتر می‌سازد. اطاعت فوری از خشم هم رابطه را می‌سوزاند.",
				example: "جمله: «خشمگینم و الان پیام را نمی‌فرستم. بیست دقیقه بعد فقط دربارهٔ رفتار مشخص می‌نویسم.»",
				practice: "یک احساس شدید اخیر را نام ببر، بگو چه عملی را عقب انداختی یا باید می‌انداختی، و عمل جایگزین را بنویس.",
				modelAnswer: "نامش تحقیر شدن بود نه فقط عصبانیت. عمل عقب‌افتاده: جواب تند. جایگزین: نوشتن مشاهده و درخواست، بعد از آنکه بدن آرام‌تر شده.",
				keywords: [
					"نام",
					"فاصله",
					"عمل",
					"خشم"
				],
				evidence: "educational",
				basis: "مهارت تنظیم هیجان در سطح خودیاری. درمان تخصصی جای این درس را نمی‌گیرد.",
				seeAlso: "psy-emotion"
			}),
			mod({
				id: "per-problem",
				title: "حل مسئله",
				summary: "مسئله را از راه‌حل جدا بنویس. اگر مسئله غلط تعریف شود، راه‌حلِ دقیق هم بی‌ربط است.",
				why: "عجله برای راه‌حل، معمولاً همان عادت قبلی را تکرار می‌کند.",
				example: "«باید بیشتر تلاش کنم» راه‌حل مبهم است برای مسئله‌ای که شاید «کار بیش از ظرفیت روز» باشد.",
				practice: "یک گرفتاری را در یک جملهٔ مسئله بنویس که داخلش راه‌حل قایم نشده باشد. بعد دو راه‌حل متفاوت پیشنهاد کن.",
				modelAnswer: "مسئله: گزارش‌ها چون معیار تمام شدن ندارند باز می‌مانند. راه‌حل یک: تعریف خروجی یک‌صفحه‌ای. راه‌حل دو: موعد میانی با بازخورد. «بیشتر تلاش کنم» را کنار می‌گذارم.",
				keywords: [
					"مسئله",
					"راه‌حل",
					"تعریف",
					"خروجی"
				],
				evidence: "educational",
				basis: "حل مسئلهٔ عمومی برای کار و زندگی روزمره."
			}),
			mod({
				id: "per-habits",
				title: "عادت‌سازی",
				summary: "عادت را به نشانه، کار خیلی کوچک، و ثبت وصل کن. هدف این نیست که هر روز عالی باشد؛ این است که شروع قطع نشود.",
				why: "عادت‌های بزرگ بعد از انگیزهٔ اولیه می‌شکنند چون به حالِ خوب وابسته‌اند.",
				example: "نشانه: بعد از چای صبح. کار: یک سؤال تمرینی، نه یک فصل. ثبت: یک علامت روی کاغذ.",
				practice: "برای یک مهارت همین آکادمی، نشانه و کوچک‌ترین نسخهٔ دو دقیقه‌ای را بنویس. نسخه را آن‌قدر کوچک کن که بهانه سخت باشد.",
				modelAnswer: "نشانه: نشستن سر میز بعد از شام. کار: خواندن تعریف یک تکنیک و نوشتن یک جملهٔ مقابله. ثبت: تاریخ در دفتر حافظهٔ یادگیری. اگر جا ماند، فردا همان نسخهٔ کوچک است نه جبرانِ تنبیهی.",
				keywords: [
					"نشانه",
					"کوچک",
					"ثبت",
					"شروع"
				],
				evidence: "educational",
				basis: "عادت مبتنی بر نشانه و کوچک‌سازی. پژوهش عادت پیچیده‌تر از شعار بیست‌ویک‌روز است و آن عدد اینجا توصیه نمی‌شود.",
				sections: [
					{
						title: "مفهوم اصلی",
						body: "عادت حافظهٔ محیط است. مغز دنبال حلقهٔ آشنا می‌گردد. اگر شروع سخت باشد، روزهای معمولی حذف می‌شوند."
					},
					{
						title: "طراحی",
						body: "نشانه باید از قبل در روز وجود داشته باشد. کار باید کوچک‌تر از انگیزه باشد. ثبت باید بی‌درد باشد."
					},
					{
						title: "تشخیص عادت نمایشی",
						body: "اگر فقط روزهای خوب را ثبت می‌کنی یا سیستم را مدام عوض می‌کنی، در حال مطالعهٔ عادت هستی نه ساختنش."
					},
					{
						title: "محدودیت",
						body: "عادت جای درمان بی‌خوابی، افسردگی یا اعتیاد را نمی‌گیرد. اگر شروع تقریباً همیشه ناممکن است، مسئله فقط نظم نیست."
					},
					{
						title: "اشتباه رایج",
						body: "جبران تنبیهی بعد از یک روز جا مانده. آن جبران، عادت را به بدهی تبدیل می‌کند."
					}
				]
			})
		])]
	},
	{
		id: "psychology",
		title: "روان‌شناسی و شناخت رفتار انسان",
		blurb: "حوزهٔ مستقل برای فهم رفتار. حوزه‌های دیگر فقط در صورت نیاز به اینجا ارجاع می‌دهند، نه اینکه نظریه را ناقص تکرار کنند.",
		icon: "brain",
		courses: [course("psy-base", "نقشهٔ رفتار", "روان‌شناسی را با برچسب زدن به اطرافیان عوض نکن.", "پایه", [
			mod({
				id: "psy-found",
				title: "مبانی روان‌شناسی",
				summary: "روان‌شناسی علمی رفتار و فرآیندهای ذهنی را با روش قابل‌بازنگری بررسی می‌کند. یک مفهوم محبوب در شبکه، خودکار علم نیست.",
				why: "بدون این تفکیک، اصطلاح‌ها تبدیل به سلاح گفت‌وگو می‌شوند.",
				example: "گفتن «تو مکانیزم دفاعی داری» وسط دعوا، هم احتمالاً نادرست است هم گفت‌وگو را می‌بندد.",
				practice: "یک اصطلاح روان‌شناسی که بلدی را بنویس و مشخص کن آن را از منبع آموزشی معتبر دیدی یا از مکالمهٔ روزمره.",
				modelAnswer: "اصطلاح سوگیری تأیید را در درس تفکر انتقادی دیدم و می‌دانم نسخهٔ علمی‌تر اینجاست. حق ندارم با آن شخصیت کسی را تشخیص بدهم.",
				keywords: [
					"علم",
					"برچسب",
					"روش",
					"اصطلاح"
				],
				evidence: "educational",
				basis: "معرفی حوزه. جایگزین درس دانشگاهی نیست."
			}),
			mod({
				id: "psy-cog",
				title: "روان‌شناسی شناختی",
				summary: "ذهن ظرفیت محدودی برای توجه دارد و جاهای خالی را با انتظار قبلی پر می‌کند. به همین دلیل خاطره، شاهد بی‌نقص نیست.",
				why: "اگر حافظه را ضبط صوت بدانی، هم به خودت ستم می‌کنی هم به دیگران.",
				example: "دو نفر از یک گفت‌وگو دو جملهٔ متفاوت به یاد دارند. لزوماً یکی دروغگو نیست؛ توجه هر کدام جای دیگری بوده.",
				practice: "یک خاطرهٔ اختلافی را طوری بنویس که بین «آنچه دیدم» و «آنچه معنی کردم» خط بکشد.",
				modelAnswer: "دیدم صدا بالا رفت و اتاق را ترک کرد. معنی کردم که تحقیر شدم. معنی ممکن دیگری: از بالا رفتن تنش ترسید و بیرون رفت. بخش دوم هنوز تفسیر من است.",
				keywords: [
					"توجه",
					"خاطره",
					"تفسیر",
					"انتظار"
				],
				evidence: "scientific",
				basis: "یافته‌های پایدار روان‌شناسی شناختی دربارهٔ محدودیت توجه و خطاپذیری حافظه. جزئیات آزمایش‌ها در این درس نیامده."
			}),
			mod({
				id: "psy-social",
				title: "روان‌شناسی اجتماعی",
				summary: "موقعیت، نقش و حضور دیگران بخش بزرگی از رفتار را توضیح می‌دهد. شخصیت تنها علت نیست.",
				why: "توضیح همه‌چیز با «ذات آدم» هم ظالمانه است هم برای تغییر بی‌فایده.",
				example: "همان آدم در جایگاه مهمان ساکت است و در جایگاه متخصص پرحرف. تغییر، الزاماً دورویی نیست؛ نقش عوض شده.",
				practice: "یک رفتار که به شخصیت نسبت داده بودی را با یک عامل موقعیتی دوباره توضیح بده، بدون اینکه مسئولیت اخلاقی را پاک کنی.",
				modelAnswer: "دیر جواب دادن را بی‌تفاوتی ذاتی دیده بودم. عامل موقعیتی: آن هفته شیفت اضافه داشت. مسئولیت باقی است که خبر بدهد، اما برچسب شخصیت لازم نبود.",
				keywords: [
					"موقعیت",
					"نقش",
					"شخصیت",
					"مسئولیت"
				],
				evidence: "scientific",
				basis: "سنت روان‌شناسی اجتماعی: قدرت موقعیت. این به معنی بی‌اثر بودن تفاوت‌های فردی نیست."
			}),
			mod({
				id: "psy-personality",
				title: "شخصیت",
				summary: "شخصیت الگوی نسبتاً پایدار گرایش‌هاست، نه حکم قطعی و نه برچسبclinical. آزمون اینترنتی، اندازه‌گیری معتبر نیست.",
				why: "برچسب شخصیت گفت‌وگو را تمام می‌کند: «من این‌طوری‌ام» به‌جای «این کار را می‌توانم عوض کنم».",
				example: "درون‌گرایی یعنی هزینهٔ تحریک اجتماعی بیشتر است، نه اینکه رابطه لازم نیست یا حق بی‌خبری داری.",
				practice: "یک برچسب که به خودت می‌زنی را به یک گرایش قابل‌مشاهده ترجمه کن و یک رفتار قابل تغییر کنارش بگذار.",
				modelAnswer: "به‌جای «من آدم Confrontation نیستم» می‌نویسم در لحظه مکث می‌کنم. رفتار قابل تغییر: همان روز یک جملهٔ مکتوب بفرستم، حتی اگر شفاهی سخت باشد.",
				keywords: [
					"برچسب",
					"گرایش",
					"تغییر",
					"آزمون"
				],
				evidence: "educational",
				basis: "احتیاط در برابر آزمون‌های عامه‌پسند. مدل‌های علمی شخصیت وجود دارند اما این صفحه آن‌ها را اندازه نمی‌گیرد."
			})
		]), course("psy-move", "هیجان، انگیزه، سوگیری", "این درس‌ها مرجع بقیهٔ حوزه‌ها هستند وقتی مفهوم روانی لازم می‌شود.", "مرجع", [
			mod({
				id: "psy-emotion",
				title: "هیجان",
				summary: "هیجان پاسخ سریع ذهن و بدن به معنی یک موقعیت است. نه دشمن منطق است و نه فرمان معتبر برای هر عمل فوری.",
				why: "حذف هیجان از تصمیم، تصمیم را کور می‌کند؛ اطاعت از موج اول هم همین‌طور.",
				example: "ترس قبل از ارائه اطلاعات می‌دهد که موضوع برایت مهم است. فرمان «فرار کن» را لازم نیست اجرا کنی.",
				practice: "یک هیجان را در سه لایه بنویس: حس بدن، معنی‌ای که به موقعیت دادی، و عملی که الزامی نیست.",
				modelAnswer: "دل‌شوره و فک فشرده. معنی: اگر اشتباه کنم رد می‌شوم. عمل الزامی نیست که پیام را پاک کنم. می‌توانم پیش‌نویس را نگه دارم و یک بار دیگر معیار را چک کنم.",
				keywords: [
					"هیجان",
					"بدن",
					"معنی",
					"فرمان"
				],
				evidence: "scientific",
				basis: "دیدگاه کاربردی از هیجان به‌عنوان ارزیابی موقعیت. نظریه‌های رقیب در این سطح جمع نشده‌اند."
			}),
			mod({
				id: "psy-motive",
				title: "انگیزش",
				summary: "انگیزش فقط هیجان شروع نیست. وقتی کار به ارزش خودت وصل باشد و پیشرفت دیده شود، دوامش بیشتر از جایزهٔ بیرونیِ تصادفی است.",
				why: "سیستم‌هایی که فقط با امتیاز بیرونی کار می‌کنند، با قطع امتیاز می‌خوابند.",
				example: "امتیاز درس مفید است اگر نشان دهد کجا مسلط شده‌ای. اگر فقط عدد را جمع کنی، یادگیری نمایشی می‌شود.",
				practice: "بگو برای کدام مهارت این هفته انگیزهٔ بیرونی داری و پیشرفت قابل دیدنِ درونی‌اش چیست.",
				modelAnswer: "بیرونی: امتیاز تمرین. درونی: می‌خواهم در مکالمه کمتر حدس نیت بزنم. پیشرفت قابل دیدن: یک بار به‌جای نتیجه‌گیری، پرسش چک کردن فهم را به کار بردم.",
				keywords: [
					"انگیزه",
					"پیشرفت",
					"امتیاز",
					"ارزش"
				],
				evidence: "educational",
				basis: "ترکیب ساده از انگیزش درونی و بازخورد. نظریهٔ خودتعیین‌گری عمیق‌تر از این صفحه است."
			}),
			mod({
				id: "psy-bias",
				title: "سوگیری‌های شناختی",
				summary: "سوگیری خطای سیستماتیک در قضاوت است، نه حماقت. ذهن میانبر می‌زند چون زمان و توجه کم است. دانستن نام سوگیری، مصونیت نمی‌دهد.",
				why: "کسانی که فقط لیست سوگیری حفظ می‌کنند، آن را برای برد در بحث به کار می‌برند و در تصمیم خودشان نمی‌بینند.",
				example: "سوگیری تأیید: دنبال شاهدی می‌گردی که نظر فعلی‌ات را نگه دارد. اثر لنگر: اولین عدد، حتی اگر بی‌ربط باشد، حدس بعدی را جابه‌جا می‌کند.",
				practice: "یک تصمیم اخیر را انتخاب کن و فقط یک میانبر احتمالی را با شاهد مشخص کن. بعد بگو چه اطلاعاتی هنوز نگرفته‌ای.",
				modelAnswer: "در انتخاب دوره، به اولین قیمت گیر دادم و بقیه را گران دیدم. این به لنگر نزدیک است. هنوز سرفصل واقعی و نمونهٔ تمرین را نخوانده‌ام.",
				keywords: [
					"میانبر",
					"تأیید",
					"لنگر",
					"مصونیت"
				],
				evidence: "scientific",
				basis: "برنامهٔ پژوهشی کاهنمن و تورسکی و ادامهٔ آن. نام بردن سوگیری در گفت‌وگو، اثبات آن در یک مورد خاص نیست.",
				sections: [
					{
						title: "تعریف ساده",
						body: "سوگیری یعنی کجیِ تکرارشونده، نه یک اشتباه تصادفی. اگر در موقعیت مشابه اغلب همان‌طور منحرف شوی، با میانبر طرفی."
					},
					{
						title: "دو نمونهٔ پرکار",
						body: "تأیید: شاهد موافق را آسان می‌پذیری. لنگر: نقطهٔ شروع بی‌دلیل، تخمین را نگه می‌دارد. هر دو در مذاکره و رسانه مهم‌اند."
					},
					{
						title: "چرا دانستن کافی نیست",
						body: "پژوهش‌ها نشان می‌دهند آشنایی با نام سوگیری، اثر را خودکار حذف نمی‌کند. باید رویه بسازی: معیار قبل از گزینه، و منبع مخالف."
					},
					{
						title: "تشخیص سوءاستفاده از مفهوم",
						body: "گفتن «این سوگیری توست» بدون شاهد رفتار، خودش یک حمله است. مفهوم علمی را چماق نکن."
					},
					{
						title: "محدودیت",
						body: "فهرست بلند سوگیری‌ها با تعریف‌های هم‌پوشان، دقت را کم می‌کند. در این نسخه فقط وقتی میانبر به تصمیم تو ربط دارد نام ببر."
					}
				]
			}),
			mod({
				id: "psy-behavior",
				title: "رفتار انسان",
				summary: "رفتار را در سه لایه ببین: چه چیزی در موقعیت آن را راه می‌اندازد، خودِ عمل چیست، و چه پیامدی آن را نگه می‌دارد.",
				why: "نصیحت «سعی کن بهتر باشی» هیچ‌کدام از سه لایه را عوض نمی‌کند.",
				example: "راه انداز: خستگی شب. عمل: جواب تند. پیامد: طرف کوتاه می‌آید و تو موقتاً راحت می‌شوی. پیامدِ لحظه‌ای، عادت بد را نگه می‌دارد.",
				practice: "یک رفتار که می‌خواهی کمتر شود را در سه لایه بنویس و فقط پیامد لحظه‌ای را عوض کن.",
				modelAnswer: "راه‌انداز خستگی است. عمل چک کردن بی‌پایان پیام است. پیامد لحظه‌ای کاهش اضطراب است. عوضش: پیام را در ساعت ثابت جواب می‌دهم و تا آن ساعت گوشی در اتاق دیگر می‌ماند تا آرامش از مسیر دیگری بیاید.",
				keywords: [
					"راه‌انداز",
					"پیامد",
					"عمل",
					"عادت"
				],
				evidence: "educational",
				basis: "تحلیل رفتاری ساده شده. درمان رفتاری رسمی نیست."
			}),
			mod({
				id: "psy-patterns",
				title: "شناخت الگوهای رفتاری",
				summary: "الگو وقتی است که راه‌انداز مشابه، عمل مشابه و پیامد مشابه را چند بار دیده باشی. یک بار، الگو نیست.",
				why: "نامیدن زودهنگامِ الگو، آدم‌ها را زندانی یک داستان می‌کند.",
				example: "اگر سه بار بعد از انتقاد آرام، سکوت چندروزه آمده، دیگر «تصادف» توضیح ضعیفی است.",
				practice: "یک الگوی احتمالی را با حداقل دو تکرار بنویس. اگر تکرار دوم را به یاد نمی‌آوری، بنویس هنوز الگو نیست.",
				modelAnswer: "بار اول و دوم بعد از نه گفتن، محبت ناگهانی آمد و من کوتاه آمدم. این دو تکرار است. هنوز علت را قطعی نمی‌گویم، اما دیگر آن محبت را پایان مسئله حساب نمی‌کنم.",
				keywords: [
					"الگو",
					"تکرار",
					"داستان",
					"پیامد"
				],
				evidence: "educational",
				basis: "مهارت مشاهده. تشخیص اختلال شخصیتی یا بالینی خارج از این درس است.",
				seeAlso: "rel-toxic"
			})
		])]
	}
];
function t(x) {
	return x;
}
var techniques = [
	t({
		id: "mild-negging",
		en: "Mild Negging",
		fa: "تحقیر ملایم",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "اصطلاح تجربی فضای جذب. پشتوانهٔ علمی مستقل به‌عنوان تکنیک توصیه شده ندارد.",
		summary: "تعریفِ دوپهلو که ظاهرش شوخی یا رک‌گویی است و تهش ارزش طرف را پایین می‌آورد تا تأیید تو را دنبال کند.",
		mechanism: "اگر کسی کمی تحقیر شود و هم‌زمان توجه بگیرد، ممکن است برای پس گرفتن حس ارزشمندی بیشتر تلاش کند. این تلاش، علاقه نیست؛ جبران است.",
		example: "«جذابی، ولی مشخصه زیادی سعی می‌کنی خاص به نظر برسی.» شوخی هم اگر اضافه شود، راه اعتراض را می‌بندد.",
		detect: "بعد از جمله، حس کوچک شدن می‌آید نه گرما. اگر اعتراض کنی می‌شنوی «شوخی بود» یا «خیلی حساسی».",
		counter: "اثر را جدا از نیت اعلام‌شده بگو و تأیید نخواه. مثلاً: «این جمله تحقیر بود نه شوخی. ادامه نمی‌دهم.» لازم نیست متقابل همان کار را بکنی.",
		useNote: "ORBIT استفاده از تحقیر ملایم را توصیه نمی‌کند. شناختش برای تشخیص و توقف است. رک‌گویی محترمانه نیازی به پایین آوردن ارزش کسی ندارد.",
		mistakes: "اشتباه رایج این است که هر انتقاد را تحقیر ملایم بدانیم، یا برعکس هر تحقیر را «شوخ‌طبعی قوی» بنامیم.",
		signals: [
			"زیادی سعی",
			"شوخی بود",
			"خیلی حساسی",
			"مثل بقیه نیستی ولی",
			"خاص به نظر"
		],
		keywords: [
			"تحقیر",
			"شوخی",
			"ارزش",
			"اعتراض"
		]
	}),
	t({
		id: "push-pull",
		en: "Push-Pull",
		fa: "جذب و پس‌زدن",
		ethics: "controversial",
		evidence: "experiential",
		basis: "اصطلاح تجربی. نوسان هیجان در روان‌شناسی توصیف شده، اما این دستورالعمل توصیهٔ علمی نیست.",
		summary: "یک لحظه گرما و لحظهٔ بعد فاصله، تا طرف بین امید و اضطراب نوسان کند.",
		mechanism: "نوسان، توجه را قفل می‌کند چون ذهن دنبال تمام کردن الگوی ناتمام است. شدت احساس با امنیت اشتباه گرفته می‌شود.",
		example: "«با تو حرف زدن از بقیه بهتره» و ساعتی بعد سردیِ بدون توضیح.",
		detect: "نمی‌توانی پیش‌بینی کنی نوبت بعدی گرم است یا سرد. آرامش کم است و چک کردن پیام زیاد.",
		counter: "نوسان را نام ببر و ریتم روشن بخواه: «گرما و فاصلهٔ بی‌توضیح را ادامه نمی‌دهم. اگر رابطه برای تو جدی است بگو الگویش چیست.»",
		useNote: "فاصلهٔ واقعی به‌خاطر ظرفیت، با پس‌زدنِ حساب‌شده فرق دارد. دومی را برای جذابیت توصیه نمی‌کنیم.",
		mistakes: "هر تغییر خلق را این تکنیک دانستن. آدم‌ها روز بد هم دارند؛ الگو و قصد مهم است.",
		signals: [
			"یهو سرد",
			"نوسان",
			"دیروز گرم",
			"نمی‌فهمم با منی"
		],
		keywords: [
			"نوسان",
			"فاصله",
			"گرما",
			"ریتم"
		]
	}),
	t({
		id: "hard-to-get",
		en: "Hard to Get",
		fa: "سخت‌به‌دست",
		ethics: "controversial",
		evidence: "experiential",
		basis: "باور عامه‌پسند دربارهٔ کمیابی. شواهد علمی دربارهٔ «همیشه بازی کن» ضعیف و موقعیتی است.",
		summary: "عمداً دسترس‌پذیری را کم می‌کنند تا ارزش ظاهری بالا برود.",
		mechanism: "چیز کمیاب مهم‌تر به نظر می‌رسد. اگر کمیابی ساختگی باشد، طرف برای یک تصویر تلاش می‌کند نه برای یک انسان واقعی.",
		example: "علاقه وجود دارد اما پاسخ‌ها حساب‌شده دیر و کوتاه می‌شوند تا تعقیب شکل بگیرد.",
		detect: "تفاوت بین زندگی شلوغ واقعی و الگوی ثابتِ «دقیقاً وقتی نزدیک می‌شوی دور می‌شوم».",
		counter: "تعقیب را متوقف کن و یک بار شفافیت بخواه. اگر فقط با فاصله جواب آمد، بازی را ادامه نده.",
		useNote: "مرز و وقت واقعی سالم است. سخت‌به‌دست به‌عنوان تاکتیک، شفافیت را فدا می‌کند و توصیه نمی‌شود.",
		mistakes: "هر آدم مستقل را بازیگر دانستن.",
		signals: [
			"سخت به دست",
			"زیادی در دسترسی",
			"باید کمتر جواب بدی",
			"تعقیب"
		],
		keywords: [
			"کمیابی",
			"تعقیب",
			"دسترس",
			"شفاف"
		]
	}),
	t({
		id: "time-constraint",
		en: "Time Constraint",
		fa: "محدودیت زمانی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "ترکیب تجربهٔ ارتباطی و اثر کمیابی زمان. اگر زمان راست باشد، مهارت برنامه‌ریزی است نه تکنیک نفوذ.",
		summary: "گوینده از اول می‌گوید وقت کمی دارد تا فشار کم شود یا تصمیم عجله‌ای شود.",
		mechanism: "وقت کم، هم دفاع شنونده را پایین می‌آورد («چون کوتاه است خطرناک نیست») و هم بررسی را سخت می‌کند.",
		example: "«فقط یه لحظه وقت دارم» و بعد یک درخواست مهم که جا برای پرسیدن نمی‌گذارد.",
		detect: "اگر موضوع مهم است ولی قاب زمان طوری است که سؤال کردن بی‌ادبی به نظر برسد.",
		counter: "عجله را نپذیر: «اگر مهم است، وقتی حرف می‌زنیم که هر دو وقت داشته باشیم.»",
		useNote: "گفتن زمان واقعی جلسه محترمانه است. ساختن عجله برای بستن تصمیم، توصیه نمی‌شود.",
		mistakes: "هر اشاره‌ای به شلوغی را فریب دانستن.",
		signals: [
			"یه لحظه وقت",
			"فقط یه لحظه",
			"وقت ندارم ولی",
			"زود بگو آره"
		],
		keywords: [
			"زمان",
			"عجله",
			"تصمیم",
			"پرسش"
		]
	}),
	t({
		id: "small-compliance",
		en: "Small Compliance",
		fa: "موافقت کوچک",
		ethics: "controversial",
		evidence: "scientific",
		basis: "نزدیک به اثر «پا لای در» در پژوهش فریدمن و فریزر. کاربرد فروش و نفوذ می‌تواند رضایت را نازک کند.",
		summary: "اول یک بلهٔ کوچک و کم‌هزینه می‌گیرند تا بلهٔ بعدی آسان‌تر شود.",
		mechanism: "آدم‌ها دوست دارند با عمل قبلی‌شان سازگار بمانند. بلهٔ کوچک، هویت موقت «کسی که همکاری می‌کند» می‌سازد.",
		example: "اول فقط «یک نظر کوتاه» و بعد درخواست وقت، معرفی، یا خرید.",
		detect: "مسیر درخواست‌ها پله‌ای است و هر نه گفتن، خلاف حرف قبلی‌ات جلوه داده می‌شود.",
		counter: "هر درخواست را مستقل کن: «بلهِ قبلی دربارهٔ همان مورد بود. این یکی را جدا بررسی می‌کنم.»",
		useNote: "شروع از قدم کوچک در آموزش صادقانه مفید است. چیدن پله برای دور زدن نه، توصیه نمی‌شود.",
		mistakes: "هر پیشرفت تدریجی رابطه را دستکاری دانستن.",
		signals: [
			"فقط یک نظر",
			"حالا که گفتی",
			"قدم کوچک",
			"یک بله کوچک"
		],
		keywords: [
			"بله",
			"پله",
			"سازگاری",
			"مستقل"
		]
	}),
	t({
		id: "mixed-signals",
		en: "Mixed Signals",
		fa: "سیگنال متناقض",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "اصطلاح رایج رابطه. اثرش با پژوهش‌های ابهام و اضطراب دلبستگی قابل فهم است اما دستور اجرا علمی نیست.",
		summary: "هم‌زمان نشانه‌های نزدیک شدن و دور شدن فرستاده می‌شود تا طرف در عدم قطعیت بماند.",
		mechanism: "ابهام مداوم توجه را بیشتر از جواب روشن می‌گیرد، چون ذهن درگیر حل معماست.",
		example: "شب تعریف صمیمانه، صبح رفتار رسمی، بدون هیچ توضیح تغییر.",
		detect: "برای فهم یک رابطه مجبور باشی دوستانت تفسیر بنویسند. اگر بپرسی، می‌گویند زیادی تحلیل می‌کنی.",
		counter: "تفسیر را متوقف کن و یک سؤال بله/خیر بپرس. اگر جواب مبهم ماند، رفتار غایب را جواب حساب کن.",
		useNote: "سیگنال متناقض عمدی توصیه نمی‌شود. تردید صادقانه را می‌شود با زبان روشن گفت.",
		mistakes: "یک تناقض واحد را برابر شخصیت دستکاری‌گر گرفتن.",
		signals: [
			"سیگنال متناقض",
			"نمی‌فهمم چی می‌خواد",
			"یه شب آره",
			"زیادی تحلیل می‌کنی"
		],
		keywords: [
			"ابهام",
			"تناقض",
			"روشن",
			"رفتار"
		]
	}),
	t({
		id: "soft-takeaway",
		en: "Soft Takeaway",
		fa: "پس‌گرفتن نرم",
		ethics: "controversial",
		evidence: "experiential",
		basis: "نزدیک به زیان‌گریزی در قضاوت. نسخهٔ ارتباطی‌اش بیشتر اصطلاح تجربی است.",
		summary: "چیزی که پیشنهاد شده بود، آرام پس گرفته می‌شود تا طرف برای نگه‌داشتنش جلو بیاید.",
		mechanism: "از دست دادن احتمالی، تندتر از به دست آوردنِ همان چیز واکنش می‌سازد.",
		example: "«فکر کردم این جمع به دردت می‌خورد، ولی شاید خیلی برات شلوغ باشه.» در حالی که دعوت را برنمی‌دارد مگر طرف اصرار کند.",
		detect: "پیشنهاد کامل گفته نمی‌شود؛ نصفش پس گرفته می‌شود و تو حس می‌کنی باید ثابت کنی لایق آنی.",
		counter: "پس‌گرفتن را بپذیر نه اینکه اصرار کنی: «باشد، اگر منتفی است اصرار نمی‌کنم. وقتی پیشنهاد روشن داشتی بگو.»",
		useNote: "پس گرفتن صادقانهٔ یک پیشنهاد به‌خاطر عوض شدن شرایط درست است. پس گرفتن برای تحریک اصرار توصیه نمی‌شود.",
		mistakes: "هر انصراف واقعی را بازی دیدن.",
		signals: [
			"شاید به دردت نخورد",
			"بی‌خیال شدم",
			"اصرار",
			"پس گرفت"
		],
		keywords: [
			"پس‌گرفتن",
			"اصرار",
			"زیان",
			"پیشنهاد"
		]
	}),
	t({
		id: "qualification-challenge",
		en: "Qualification Challenge",
		fa: "چالش صلاحیت",
		ethics: "controversial",
		evidence: "experiential",
		basis: "اصطلاح تجربی جذب و فروش. اثر چالش بر انگیزش در روان‌شناسی هست، این اجرا نسخهٔ عامیانه است.",
		summary: "به‌جای تعریف، تردید می‌کنند که تو به معیارشان برسی تا خودت شروع کنی به اثبات.",
		mechanism: "وقتی باید صلاحیتت را ثابت کنی، سرمایه‌گذاری ذهنی بالا می‌رود و رها کردن سخت‌تر می‌شود.",
		example: "«معمولاً با آدم‌هایی که این‌قدر مشغول‌اند کنار نمی‌آیم؛ نمی‌دانم تو استثنا هستی یا نه.»",
		detect: "گفت‌وگو شبیه مصاحبه شده و تو بیشتر از او در حال ارائه‌ای.",
		counter: "وارد مصاحبه نشو: «من اینجا نیستم که صلاحیتم را ثابت کنم. اگر کنجکاوی دوطرفه است بمانیم.»",
		useNote: "معیار واقعی داشتن سالم است. تبدیل رابطه به آزمون یک‌طرفه توصیه نمی‌شود.",
		mistakes: "هر استاندارد را چالش دستکاری‌گرانه نامیدن.",
		signals: [
			"استثنا هستی",
			"نمی‌دانم به معیار",
			"ثابت کن",
			"مصاحبه"
		],
		keywords: [
			"صلاحیت",
			"آزمون",
			"اثبات",
			"معیار"
		]
	}),
	t({
		id: "light-teasing",
		en: "Light Teasing",
		fa: "شوخی سبک",
		ethics: "neutral",
		evidence: "experiential",
		basis: "بازی و شوخی در رابطه پژوهش کیفی دارد. مرزش با تحقیر تجربی و موقعیتی است.",
		summary: "شوخی کوتاه دربارهٔ موقعیت یا عادت، نه دربارهٔ ارزش، بدن، یا زخم طرف.",
		mechanism: "شوخی مشترک فاصلهٔ رسمی را کم می‌کند، به شرطی که هر دو توان جواب و توان توقف داشته باشند.",
		example: "«برای بار سوم همان کافه؟ وفاداری‌ات به قهوه جدی است.» نه مسخره کردن لهجه یا اضطراب.",
		detect: "اگر فقط یک طرف می‌خندد یا موضوع شوخی چیزی است که طرف قبلاً گفته آزارش می‌دهد، سبک نیست.",
		counter: "همان لحظه موضوع را ببند: «این یکی شوخی نیست، لطفاً همین‌جا تمامش کن.» اگر تمام شد، لازم نیست رابطه را تمام کنی.",
		useNote: "شوخی سبک اگر دوطرفه و قابل توقف باشد اشکال ندارد. بهانهٔ «شوخی بود» بعد از آزار، استفادهٔ درست نیست.",
		mistakes: "تحقیر را به‌خاطر خندهٔ خودت شوخی سبک نامیدن.",
		signals: [
			"شوخی سبک",
			"فقط من خندیدم",
			"لهجه",
			"تمومش کن"
		],
		keywords: [
			"شوخی",
			"دوطرفه",
			"ارزش",
			"توقف"
		]
	}),
	t({
		id: "soft-frame-control",
		en: "Soft Frame Control",
		fa: "کنترل نرم چارچوب",
		ethics: "controversial",
		evidence: "experiential",
		basis: "واژهٔ چارچوب در فضای مذاکره و جذب رایج است. علم واحدی به این نام وجود ندارد.",
		summary: "یکی آرام معنی کل تعامل را تعریف می‌کند: «ما که جدی نیستیم» یا «تو داری بیش از حد واکنش نشان می‌دهی».",
		mechanism: "هر کس چارچوب را بپذیرد، داخل قواعد دیگری حرف می‌زند و مخالفتش غیرمنطقی به نظر می‌رسد.",
		example: "قبل از شنیدن اعتراض: «بیا منطقی باشیم، تو احساساتی شدی.»",
		detect: "احساس یا حافظهٔ تو قبل از بررسی واقعیت، برچسب می‌خورد.",
		counter: "چارچوب را برگردان به مشاهده: «هنوز دربارهٔ احساس حرف نمی‌زنم. دربارهٔ این قولِ مشخص حرف می‌زنم.»",
		useNote: "روشن کردن موضوع گفت‌وگو مفید است. تعریف کردن واقعیت طرف به‌جای او توصیه نمی‌شود.",
		mistakes: "هر رهبری گفت‌وگو را کنترل پنهان دانستن.",
		signals: [
			"احساساتی شدی",
			"منطقی باشیم",
			"چارچوب",
			"زیادی جدی گرفتی"
		],
		keywords: [
			"چارچوب",
			"برچسب",
			"واقعیت",
			"مشاهده"
		]
	}),
	t({
		id: "strategic-pullback",
		en: "Strategic Pullback",
		fa: "عقب‌نشینی راهبردی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "تاکتیک تجربی. عقب‌نشینی سالم بعد از مرز با این یکی فرق دارد.",
		summary: "وقتی توجه طرف زیاد می‌شود، عامدانه یک قدم عقب می‌روند تا او جلو بیاید.",
		mechanism: "کم شدن ناگهانی پاداش، رفتار جست‌وجو را قوی‌تر می‌کند.",
		example: "بعد از چند گفت‌وگوی خوب، بدون دلیلِ گفتنی ناپدید شدن و برگشتن وقتی طرف نگران شده.",
		detect: "الگو این است که فاصله دقیقاً بعد از صمیمیت می‌آید و با بازگشت پیروزمندانه تمام می‌شود.",
		counter: "به دنبالش نرو. یک بار بگو فاصلهٔ بدون توضیح را ادامه نمی‌دهی.",
		useNote: "فاصله برای فکر کردن سالم است اگر اعلام شود. فاصله برای تعقیب توصیه نمی‌شود.",
		mistakes: "نیاز واقعی به تنهایی را تاکتیک خواندن، بدون دیدن الگو.",
		signals: [
			"عقب‌نشینی",
			"بعد از صمیمیت غیب",
			"بیا دنبالت",
			"بدون توضیح رفت"
		],
		keywords: [
			"فاصله",
			"تعقیب",
			"اعلام",
			"صمیمیت"
		]
	}),
	t({
		id: "role-reversal",
		en: "Role Reversal",
		fa: "وارونگی نقش",
		ethics: "controversial",
		evidence: "experiential",
		basis: "اصطلاح تجربی روابط. روان‌شناسی نقش را جداگانه و علمی‌تر بحث می‌کند.",
		summary: "نقشی که معمولاً مال طرف است را برمی‌دارند: او که همیشه initiator است حالا باید شایستگی‌اش را نشان دهد.",
		mechanism: "تغییر نقش، تعادل تلاش را به‌هم می‌ریزد و گاهی غرور را وارد تصمیم می‌کند.",
		example: "کسی که تا دیروز پیگیر بود، ناگهان مصاحبه‌گر می‌شود و سؤال‌های گزینشی می‌پرسد.",
		detect: "جای دنبال‌کننده و دنبال‌شونده بی‌دلیل و بی‌گفت‌وگو عوض می‌شود.",
		counter: "نقش نمایشی را بازی نکن. بگو: «اگر هر دو سؤال داریم بپرسیم؛ آزمون یک‌طرفه نمی‌دهم.»",
		useNote: "عوض شدن نقش با توافق می‌تواند رابطه را تازه کند. وارونگی برای قدرت توصیه نمی‌شود.",
		mistakes: "هر بار که کسی کمتر پیگیری کرد را وارونگی حساب کردن.",
		signals: [
			"حالا تو ثابت کن",
			"نقش عوض",
			"مصاحبه‌گر",
			"من دیگر دنبال نمی‌کنم"
		],
		keywords: [
			"نقش",
			"تلاش",
			"آزمون",
			"توافق"
		]
	}),
	t({
		id: "soft-ultimatum",
		en: "Soft Ultimatum",
		fa: "ضرب‌الاجل نرم",
		ethics: "controversial",
		evidence: "educational",
		basis: "نزدیک به مرز سالم، اما اگر تنبیه مبهم باشد تکنیک فشار است. تفکیک آموزشی است.",
		summary: "با لحن آرام گفته می‌شود اگر چیزی تغییر نکند رابطه ادامه ندارد. می‌تواند مرز باشد یا اهرم.",
		mechanism: "ضرب‌الاجل تصمیم را از تعویق درمی‌آورد. اگر مبهم و تکرارشونده باشد، اضطراب دائمی می‌سازد نه انتخاب.",
		example: "سالم: «اگر تحقیر ادامه پیدا کند من این گفت‌وگو را ترک می‌کنم.» ناسالم: «می‌دانی که آدم‌های دیگر منتظرند، خودت می‌دانی.»",
		detect: "مرز رفتار مشخص و اقدام خود گوینده را دارد. اهرم، تهدید مبهم و امتیاز خواهی است.",
		counter: "بخواه دقیق شود: «دقیقاً کدام رفتار و تا کی؟ اگر مبهم بماند جواب نمی‌دهم.»",
		useNote: "مرز روشن توصیه می‌شود. ضرب‌الاجل مبهم برای ایجاد ترس توصیه نمی‌شود.",
		mistakes: "هر مرز را تهدید دانستن یا هر تهدید را مرز سالم نامیدن.",
		signals: [
			"خود دانی",
			"آدم‌های دیگر منتظر",
			"تا کی",
			"ضرب‌الاجل"
		],
		keywords: [
			"مرز",
			"تهدید",
			"رفتار",
			"مبهم"
		]
	}),
	t({
		id: "calculated-ambiguity",
		en: "Calculated Ambiguity",
		fa: "ابهام حساب‌شده",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "اصطلاح تجربی. ذهن جای خالی را معمولاً خوش‌بینانه پر می‌کند؛ این توصیف آموزشی است نه قانون قطعی.",
		summary: "عمداً طوری حرف می‌زنند که چند معنی داشته باشد تا طرف بهترین معنی را انتخاب کند و بماند.",
		mechanism: "ابهام، امید را زنده نگه می‌دارد بدون آنکه تعهدی ساخته شود.",
		example: "«ببینیم چی می‌شه» در جواب سؤال مستقیم دربارهٔ انحصار یا جدیت، برای ماه‌ها.",
		detect: "سؤال مشخص همیشه جواب تصویری می‌گیرد. تعهدها قابل نقل قول نیستند.",
		counter: "معنی را خودت پر نکن. بگو: «این جمله را تعهد حساب نمی‌کنم. اگر جواب مشخص نداری، جوابت نه است.»",
		useNote: "نداشتنِ تصمیم را می‌شود صادقانه گفت. مبهم ماندن برای نگه داشتن چند گزینه توصیه نمی‌شود.",
		mistakes: "هر آدم مردد را محاسبه‌گر دانستن. تفاوت در تکرار و گریز از وضوح است.",
		signals: [
			"ببینیم چی می‌شه",
			"عجله نکن",
			"برچسب نزن",
			"تعهد"
		],
		keywords: [
			"ابهام",
			"تعهد",
			"امید",
			"واضح"
		]
	}),
	t({
		id: "comfort-then-tease",
		en: "Comfort then Tease",
		fa: "آرامش سپس شوخی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "الگوی تجربی جذب. اگر شوخی بعد از امنیت، تحقیر باشد به تحقیر ملایم نزدیک می‌شود.",
		summary: "اول فضای امن می‌سازند و بعد یک ضربهٔ شوخی می‌زنند تا هیجان برگردد ولی اعتراض سخت شود.",
		mechanism: "آرامش اولیه اعتبار می‌خرد. شوخی بعدی را شنونده به‌خاطر آن اعتبار تحمل می‌کند.",
		example: "ده دقیقه همدلی واقعی، بعد: «البته تو کلاً خیلی نمایشی واکنش نشان می‌دهی.»",
		detect: "چرخهٔ دلگرمی و سوزن. بعد از سوزن، از آرامش قبلی خجالت می‌کشی اعتراض کنی.",
		counter: "اعتبار قبلی را به شوخیِ زخم‌زن قرض نده: «همدلی‌ات خوب بود. این جمله جداگانه تحقیر است.»",
		useNote: "ترکیب صمیمیت و شوخی دوطرفه اشکالی ندارد. نقشهٔ آرام‌کردن برای جا انداختن تحقیر توصیه نمی‌شود.",
		mistakes: "هر شوخی بعد از حرف جدی را نقشه دانستن.",
		signals: [
			"البته تو کلاً",
			"شوخی بعد از همدلی",
			"نمایشی",
			"سوزن"
		],
		keywords: [
			"آرامش",
			"تحقیر",
			"چرخه",
			"اعتراض"
		]
	}),
	t({
		id: "selective-availability",
		en: "Selective Availability",
		fa: "دسترس‌پذیری گزینشی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "می‌تواند مدیریت واقعی وقت باشد یا نمایش کمیابی. تفکیک آموزشی است.",
		summary: "آدم فقط گاهی و با قاعده‌ای که به دیگری نمی‌گوید در دسترس است تا ارزش توجه بالا دیده شود.",
		mechanism: "پاداش نامنظم، چک کردن و انتظار را قوی می‌کند.",
		example: "بعضی شب‌ها فوراً و گرم، بعضی روزها بدون هیچ قراری غایب. اگر بپرسی: «سرم شلوغه».",
		detect: "غیبت الگو دارد نه بحران. توضیح‌ها کلی‌اند و عوض نمی‌شوند.",
		counter: "برای توجه نامنظم برنامه نچین. بگو چه ریتمی برایت قابل قبول است و اگر نشد، انتظار را کم کن.",
		useNote: "ظرفیت محدود را صادقانه بگو. غیب و ظهور برای ارزشمند دیده شدن توصیه نمی‌شود.",
		mistakes: "هر انسان پرمشغله را بازیگر دانستن.",
		signals: [
			"سرم شلوغه",
			"معلوم نیست جواب",
			"بعضی شب‌ها",
			"دسترس"
		],
		keywords: [
			"ریتم",
			"غیبت",
			"ظرفیت",
			"انتظار"
		]
	}),
	t({
		id: "soft-disqualification",
		en: "Soft Disqualification",
		fa: "رد صلاحیت نرم",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "اصطلاح تجربی. هدف رایجش این است که طرف برای ثابت کردن برعکس تلاش کند.",
		summary: "با لحن ملایم می‌گویند تو احتمالاً مناسب نیستی، به امید اینکه خودت مخالف را ثابت کنی.",
		mechanism: "ردِ نرم، غرور و ترس از طرد را هم‌زمان بیدار می‌کند.",
		example: "«تو خیلی خوبی، ولی آدم‌هایی مثل تو آخرش حوصله‌شان سر می‌رود.»",
		detect: "رد شدن طوری است که راه اثبات باز است و تو حس می‌کنی باید استثنا بودن را نشان بدهی.",
		counter: "اثبات نکن. «اگر فکر می‌کنی مناسب نیستیم، اصرار نمی‌کنم.»",
		useNote: "گفتن ناسازگاری واقعی محترمانه است. رد کردن برای تحریک اثبات توصیه نمی‌شود.",
		mistakes: "هر نهِ مؤدبانه را این تکنیک گرفتن.",
		signals: [
			"آدم‌هایی مثل تو",
			"حوصله‌ات سر می‌رود",
			"مناسب نیستی ولی",
			"استثنا"
		],
		keywords: [
			"رد",
			"اثبات",
			"غرور",
			"مناسب"
		]
	}),
	t({
		id: "playful-challenge",
		en: "Playful Challenge",
		fa: "چالش بازی‌گونه",
		ethics: "neutral",
		evidence: "experiential",
		basis: "بازی در گفت‌وگو. سالم بودنش به تساوی قدرت و امکان رد کردن بستگی دارد.",
		summary: "یک چالش کوچک و شاد که هر دو می‌توانند ببازنده شوند، نه آزمونی که فقط یکی باید لایق بماند.",
		mechanism: "چالش سبک انرژی مشترک می‌سازد. اگر نتیجه از قبل مشخص باشد، بازی نیست.",
		example: "«شرط می‌بندم اسم آن فیلم را یادت نیست» در موضوعی بی‌خطر.",
		detect: "اگر باختن مساوی تحقیر یا بدهکاری باشد، بازی‌گونه نیست.",
		counter: "اگر فضا برابر نیست: «این یکی را بازی نمی‌کنم.» دلیل بیشتر لازم نیست.",
		useNote: "چالش سبک با موضوع بی‌خطر و حق انصراف اشکال ندارد.",
		mistakes: "مسابقهٔ ارزش انسانی را چالش بازی‌گونه نامیدن.",
		signals: [
			"شرط می‌بندم",
			"جرات داری",
			"بازی",
			"بدهکار"
		],
		keywords: [
			"چالش",
			"برابر",
			"انصراف",
			"بازی"
		]
	}),
	t({
		id: "delayed-reply",
		en: "Delayed Reply",
		fa: "پاسخ با تأخیر",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "تاکتیک نمایشی رایج. تأخیر واقعی زندگی این تکنیک نیست.",
		summary: "عمداً دیر جواب می‌دهند تا بی‌تفاوت یا پرطرفدار به نظر برسند، یا طرف را تنبیه کنند.",
		mechanism: "انتظار نامعلوم اضطراب می‌سازد و رسیدنِ جواب دیر را به پاداش تبدیل می‌کند.",
		example: "پیام را دیده‌اند، ساعت‌ها صبر می‌کنند، بعد کوتاه جواب می‌دهند. قاعده برای خودشان وقتی عجله دارند عوض می‌شود.",
		detect: "تأخیر انتخابی است: برای افراد یا لحظه‌هایی که می‌خواهند اثر بگذارند، نه وقتی واقعاً نمی‌توانند.",
		counter: "زمان‌بندی زندگی‌ات را به تأخیر عمدی گره نزن. یک بار انتظار روشن بگو و بعد پیگیری نکن.",
		useNote: "دیر جواب دادن به‌خاطر کار و استراحت کاملاً درست است. دیر جواب دادن به‌عنوان تنبیه یا نمایش جایگاه توصیه نمی‌شود.",
		mistakes: "هر پاسخ کند را نقشه دانستن. به نشانهٔ انتخابی بودن نگاه کن.",
		signals: [
			"عمداً دیر",
			"بگذار منتظر بماند",
			"seen",
			"تنبیه سکوت"
		],
		keywords: [
			"تأخیر",
			"تنبیه",
			"انتظار",
			"انتخابی"
		]
	}),
	t({
		id: "ioi-withdraw",
		en: "IOI then Withdraw",
		fa: "نشانهٔ علاقه سپس عقب‌نشینی",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "اصطلاح تجربی (IOI: indicator of interest). توصیهٔ علمی نیست.",
		summary: "اول نشانهٔ روشن علاقه می‌دهند و درست وقتی طرف پاسخ می‌دهد، علاقه را برمی‌دارند.",
		mechanism: "شروع پاداش و قطع ناگهانی، رفتار پیگیری را شدید می‌کند.",
		example: "تعریف مشخص و پیشنهاد دیدار، بعد از موافقت ناگهان لحن رسمی و «زیادی جدی نگیر».",
		detect: "عقب‌نشینی دقیقاً بعد از پاسخ مثبت توست، نه به‌خاطر مانع بیرونی.",
		counter: "پشت نشانه نرو. «آن پیشنهاد را پس گرفتی. من پیگیری‌اش نمی‌کنم.»",
		useNote: "عوض شدن احساس را باید صادقانه گفت. دادن نشانه برای ایجاد تعقیب توصیه نمی‌شود.",
		mistakes: "هر پشیمانی صادقانه را این تکنیک نامیدن.",
		signals: [
			"زیادی جدی نگیر",
			"نشانه علاقه",
			"بعد از موافقت سرد",
			"ioi"
		],
		keywords: [
			"نشانه",
			"عقب‌نشینی",
			"پیگیری",
			"صادقانه"
		]
	}),
	t({
		id: "agree-amplify",
		en: "Agree and Amplify",
		fa: "موافقت و بزرگ‌نمایی",
		ethics: "neutral",
		evidence: "experiential",
		basis: "فن کلامی در برابر طعنه. اثرش موقعیتی است.",
		summary: "به‌جای دفاع، با حرف اغراق‌آمیزِ طرف موافق می‌شوی تا جدیت حمله بشکند.",
		mechanism: "دفاع، حمله را تأیید می‌کند که به هدف خورده. بزرگ‌نمایی، جمله را مسخرهٔ خودش می‌کند.",
		example: "طعنه: «باز دیر کردی، خیلی مهمی ها.» جواب: «بله، جلسه با هیئت مدیرهٔ خیالی طول کشید.»",
		detect: "اگر بزرگ‌نمایی برای تحقیر متقابل استفاده شود، دیگر مهارت دفاعی نیست.",
		counter: "اگر خودت هدف این جواب بودی و موضوع جدی است بگو: «شوخی کافی است؛ دربارهٔ تأخیر حرف می‌زنم.»",
		useNote: "برای طعنهٔ سبک می‌تواند مفید باشد. برای توهین جدی، نام بردن مرز بهتر از بازی است.",
		mistakes: "استفاده از آن وقتی طرف واقعاً آسیب دیده و شوخی بی‌جا است.",
		signals: [
			"خیلی مهمی",
			"موافقم حتی بدتر",
			"بزرگ‌نمایی",
			"طعنه"
		],
		keywords: [
			"طعنه",
			"دفاع",
			"مرز",
			"شوخی"
		]
	}),
	t({
		id: "reframe",
		en: "Reframe",
		fa: "بازتعریف",
		ethics: "neutral",
		evidence: "educational",
		basis: "در درمان و مذاکره، بازتعریف معنا رایج است. اگر واقعیت را پنهان کند فریب است.",
		summary: "همان واقعیت را در قاب معنایی دیگری می‌گذارند، بدون اینکه خودِ واقعیت را انکار کنند.",
		mechanism: "تصمیم‌ها بیشتر به معنی وابسته‌اند تا به واقعهٔ خام. قاب تازه، احساس و گزینه را عوض می‌کند.",
		example: "سالم: «این نه، رد شدن تو نیست؛ نخوردنِ زمان است.» ناسالم: «این تحقیر بود؟ نه، داشت قوی‌ات می‌کرد.»",
		detect: "بپرس واقعیت خام باقی مانده یا زیر قاب پاک شده است.",
		counter: "واقعیت را تکرار کن: «معنی را می‌شنوم. خودِ اتفاق این بود که سر قرار نیامدی.»",
		useNote: "بازتعریف صادقانه برای دیدن گزینهٔ تازه مفید است. بازتعریف برای انکار آسیب توصیه نمی‌شود.",
		mistakes: "هر نگاه تازه را فریب دانستن.",
		signals: [
			"اینطوری نگاه کن",
			"در واقع داشت",
			"بازتعریف",
			"معنی‌اش این نیست"
		],
		keywords: [
			"معنی",
			"واقعیت",
			"قاب",
			"انکار"
		]
	}),
	t({
		id: "light-future-hint",
		en: "Light Future Hint",
		fa: "اشارهٔ سبک به آینده",
		ethics: "controversial",
		evidence: "experiential",
		basis: "اشاره به آیندهٔ مشترک هم صمیمیت صادقانه است هم طعمهٔ معروف. تفکیک با تعهد مشخص است.",
		summary: "تصویر کوچک و خوشایندی از آیندهٔ دونفره گفته می‌شود، بدون قرار عملی.",
		mechanism: "ذهن تصویر را مثل برنامهٔ نیمه‌واقعی ذخیره می‌کند و رها کردنش شبیه از دست دادن چیزی واقعی حس می‌شود.",
		example: "«تابستان باید با هم برویم همان شهر» در حالی که هنوز قرار هفتهٔ بعد معلوم نیست.",
		detect: "آیندهٔ بزرگ روشن است و گام نزدیک مبهم.",
		counter: "تصویر را تعهد ندان. «حرف تابستان قشنگ است. من بر اساس قرارهای نزدیک تصمیم می‌گیرم.»",
		useNote: "اگر هر دو جدی هستند و گام نزدیک هم وجود دارد، اشاره به آینده طبیعی است. تصویر بدون قصد توصیه نمی‌شود.",
		mistakes: "هر حرف مثبت دربارهٔ آینده را طعمه دیدن.",
		signals: [
			"تابستان با هم",
			"بعداً مال ما",
			"آینده مشترک",
			"یه روزی"
		],
		keywords: [
			"آینده",
			"تعهد",
			"گام",
			"تصویر"
		]
	}),
	t({
		id: "leading",
		en: "Leading",
		fa: "پیش‌بردن",
		ethics: "neutral",
		evidence: "educational",
		basis: "مهارت گفت‌وگو و میزبانی. اگر راه مخالفت را ببندد فشار است.",
		summary: "قدم بعدی را مشخص پیشنهاد می‌دهند به‌جای اینکه گفت‌وگو در «ببینیم» بماند.",
		mechanism: "تصمیم کوچک و روشن، اصطکاک را کم می‌کند. فرض پنهانِ موافقت، اگر چک نشود، رضایت را دور می‌زند.",
		example: "سالم: «پنجشنبه ساعت شش آن کافه؟ اگر نه، بگو.» فشاری: «پس پنجشنبه می‌بینمت» و رد شدن سخت جلوه کند.",
		detect: "ببین پیشنهاد سؤال است یا دستور با لباس قطعیت.",
		counter: "نه را کوتاه بگو. پیش‌بردن درست، نه را شخصی نمی‌کند.",
		useNote: "پیشنهاد مشخص با حق رد کردن توصیه می‌شود. فرض گرفتن بله توصیه نمی‌شود.",
		mistakes: "هر دعوت روشن را فشار دانستن.",
		signals: [
			"پس می‌بینمت",
			"قدم بعدی",
			"اگر نه بگو",
			"ببینیم"
		],
		keywords: [
			"پیشنهاد",
			"نه",
			"قدم",
			"فرض"
		]
	}),
	t({
		id: "pattern-break",
		en: "Pattern Break",
		fa: "شکست الگو",
		ethics: "neutral",
		evidence: "experiential",
		basis: "ایدهٔ قطع عادت در گفت‌وگو. نسخهٔ درمانی‌اش دقیق‌تر از لطیفهٔ مهمانی است.",
		summary: "در یک تعامل گیرکرده، رفتار غیرمنتظره اما بی‌خطر می‌کنند تا هر دو از متن تکراری بیرون بیایند.",
		mechanism: "ذهن روی ریل آشنا خودکار جواب می‌دهد. وقفهٔ کوچک، انتخاب آگاهانه را برمی‌گرداند.",
		example: "وسط بحث تکراری: «ایست. هر کدام فقط یک جملهٔ درخواست بگوییم، نه تاریخچه.»",
		detect: "وقفه اگر تحقیر یا ترس باشد، شکست الگو نیست؛ قطع صحبت است.",
		counter: "اگر وقفه بی‌ربط و نمایشی است: «به موضوع برگردیم.» اگر مفید است، همان قاعدهٔ تازه را بپذیر.",
		useNote: "وقفهٔ محترمانه برای خروج از چرخه توصیه می‌شود. غافلگیری برای دستپاچه کردن نه.",
		mistakes: "هر کار عجیب را عمیق و هوشمندانه نامیدن.",
		signals: [
			"الگوی تکراری",
			"ایست",
			"غیرمنتظره",
			"از ریل"
		],
		keywords: [
			"وقفه",
			"چرخه",
			"درخواست",
			"غافلگیری"
		]
	}),
	t({
		id: "scarcity-attention",
		en: "Scarcity of Attention",
		fa: "کمیابی توجه",
		ethics: "controversial",
		evidence: "educational",
		basis: "اصل کمیابی در اقناع شناخته شده است. نمایش کمیابی توجه، کاربرد بحث‌برانگیز آن است.",
		summary: "توجه طوری عرضه می‌شود که انگار منبع نایاب است و شنونده باید برایش رقابت کند.",
		mechanism: "کمیابی ارزش ذهنی را بالا می‌برد، حتی وقتی خودِ توجه معمولی است.",
		example: "«افراد زیادی دنبال وقت من هستند» وسط یک آشنایی که هنوز هیچ قراری ندارد.",
		detect: "گوینده به‌جای محتوای رابطه، از تقاضا برای خودش حرف می‌زند.",
		counter: "وارد مزایده نشو. «اگر وقت نداری لازم نیست رقابت کنم.»",
		useNote: "وقت محدود واقعی را ساده بگو. رقابت ساختن برای توجه‌ات توصیه نمی‌شود.",
		mistakes: "هر نه به دعوت را کمیابی نمایشی دانستن.",
		signals: [
			"افراد زیادی",
			"وقت من",
			"رقابت",
			"کمیاب"
		],
		keywords: [
			"توجه",
			"رقابت",
			"کمیابی",
			"وقت"
		]
	}),
	t({
		id: "open-loop",
		en: "Open Loop",
		fa: "حلقهٔ باز",
		ethics: "neutral",
		evidence: "educational",
		basis: "نزدیک به اثر زایگارنیک دربارهٔ کار ناتمام، که در تبلیغ زیاده‌روی شده. اینجا ابزار روایت است.",
		summary: "داستان یا نکته را نیمه‌تمام رها می‌کنند تا ذهن شنونده برای بستن آن برگردد.",
		mechanism: "موضوع ناتمام بیشتر از موضوع بسته‌شده در توجه می‌ماند.",
		example: "در آموزش: «سه اشتباه رایج است؛ سومی را بعد از تمرین می‌گویم.» در رابطه اگر همیشه طعمه باشد، اعتماد را کم می‌کند.",
		detect: "اگر حلقه هرگز با اطلاعات واقعی بسته نمی‌شود و فقط نگهت می‌دارد، ابزار قصه‌گویی نیست.",
		counter: "برای تصمیم مهم، حلقه را نپذیر: «قبل از ادامه، همان نکته را کامل بگو.»",
		useNote: "در آموزش برای ایجاد کنجکاوی، اگر واقعاً بسته شود، مناسب است. در رابطه برای نگه داشتن مبهم توصیه نمی‌شود.",
		mistakes: "هر مکث قصه‌گویی را دستکاری دانستن.",
		signals: [
			"بعداً می‌گم",
			"سومیش مونده",
			"حلقه باز",
			"ناتمام"
		],
		keywords: [
			"ناتمام",
			"کنجکاوی",
			"آموزش",
			"بستن"
		]
	}),
	t({
		id: "jealousy-seed",
		en: "Playful Jealousy Seed",
		fa: "بذر حسادت بازی‌گونه",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "تاکتیک تجربی. حسادت هیجان واقعی است و «بازی‌گونه» بودنش اغلب بهانه است.",
		summary: "اشاره‌ای به رقیب یا تحسین دیگران می‌اندازند تا ناامنی و تلاش بیشتر بیدار شود.",
		mechanism: "تهدید از دست دادن، توجه را اجباری می‌کند. بازی نامیدنش اثر را کم نمی‌کند.",
		example: "«فلانی دیروز تعریفت را که شنید خیلی کنجکاو شد» در رابطه‌ای که هنوز اعتماد شکل نگرفته.",
		detect: "اسم یا اشارهٔ ثالث دقیقاً وقتی می‌آید که توجه تو کم شده.",
		counter: "رقابت را قبول نکن. «اگر می‌خواهی دربارهٔ ما حرف بزنی، شخص ثالث را وارد نکن.»",
		useNote: "استفاده از حسادت توصیه نمی‌شود، حتی با برچسب شوخی.",
		mistakes: "هر حرفی دربارهٔ آدم‌های دیگر را بذر حسادت دانستن. زمینه و زمان مهم است.",
		signals: [
			"فلانی کنجکاو",
			"رقیب",
			"حسادت",
			"یکی دیگه"
		],
		keywords: [
			"حسادت",
			"رقیب",
			"ناامنی",
			"شوخی"
		]
	}),
	t({
		id: "boundary-test",
		en: "Soft Boundary Test",
		fa: "آزمون نرم مرز",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "الگوی مشاهده‌شده در رابطه‌های ناسالم. آزمون مخفیانه توصیهٔ روان‌شناسی نیست.",
		summary: "یک عبور کوچک از حد می‌کنند تا ببینند طرف دفاع می‌کند یا کوتاه می‌آید.",
		mechanism: "اگر عبور کوچک بی‌هزینه باشد، عبور بعدی آسان‌تر توجیه می‌شود.",
		example: "شوخی توهین‌آمیز کوچک بعد از اینکه گفته‌ای آن موضوع خط قرمز است، با جملهٔ «داشتم می‌دیدم جدی هستی یا نه».",
		detect: "بعد از اعلام مرز، نسخهٔ کوچک‌تری از همان رفتار زود برمی‌گردد.",
		counter: "آزمون را پاس نکن. همان بار اول مرز را اجرا کن، نه اینکه «چون کوچک بود» بگذری.",
		useNote: "امتحان پنهانیِ مرز دیگران توصیه نمی‌شود.",
		mistakes: "هر اشتباه یک‌باره را آزمون نقشه دار دانستن. تکرار بعد از اعلام مرز مهم است.",
		signals: [
			"جدی هستی یا نه",
			"داشتم امتحان",
			"خط قرمز",
			"کوچک بود"
		],
		keywords: [
			"مرز",
			"آزمون",
			"تکرار",
			"اجرا"
		]
	}),
	t({
		id: "callback-tease",
		en: "Callback Tease",
		fa: "شوخی بازگشت‌پذیر",
		ethics: "neutral",
		evidence: "experiential",
		basis: "ابزار قصه‌گویی و صمیمیت. ریسک کمی دارد اگر موضوع از قبل مشترک و بی‌آزار باشد.",
		summary: "به یک شوخی یا لحظهٔ قبلی که هر دو دوست داشتند برمی‌گردند.",
		mechanism: "ارجاع مشترک حس «ما» می‌سازد، چون حافظهٔ دونفره را زنده می‌کند.",
		example: "یادآوری نام اشتباهی که خودت آن شب به آن خندیدی، نه رازی که خصوصی گفته بودی.",
		detect: "اگر بازگشت به موضوعی است که فقط یک طرف خندیده، دیگر صمیمیت نیست.",
		counter: "بگو آن موضوع بسته است. آدم سالم شوخی را عوض می‌کند.",
		useNote: "با موضوع بی‌آزار و مشترک مناسب است. با راز و شرم نه.",
		mistakes: "هر اشاره به گذشته را صمیمیت دانستن.",
		signals: [
			"یادت هست",
			"همان شوخی",
			"راز",
			"رجوع"
		],
		keywords: [
			"مشترک",
			"حافظه",
			"شرم",
			"شوخی"
		]
	}),
	t({
		id: "false-takeaway",
		en: "False Takeaway",
		fa: "پس‌گرفتن نمایشی",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "نسخهٔ نمایشیِ پس‌گرفتن. قصد ماندن هست و نمایش رفتن برای تعقیب است.",
		summary: "وانمود می‌کنند گفت‌وگو یا رابطه را تمام کرده‌اند تا طرف بترسد و عقب‌نشینی کند.",
		mechanism: "ترس فقدان، امتیازهایی را بیرون می‌کشد که در گفت‌وگوی آرام داده نمی‌شد.",
		example: "«پس تمام شد، خداحافظ» و ماندن در همان گفت‌وگو برای دیدن التماس.",
		detect: "خروج اجرا می‌شود نه واقع. درِ برگشتن عمداً باز است و امتیاز می‌خواهد.",
		counter: "نمایش را واقعی بگیر و واقعاً متوقف شو. اگر جدایی بازی بوده، خودشان برمی‌گردند؛ تو امتیاز نده.",
		useNote: "توصیه نمی‌شود. خروج واقعی را بدون نمایش انجام بده.",
		mistakes: "هر خداحافظی عصبی را نمایش دانستن.",
		signals: [
			"پس تمام شد",
			"التماس",
			"نمایش رفتن",
			"خداحافظ ولی"
		],
		keywords: [
			"خروج",
			"نمایش",
			"امتیاز",
			"توقف"
		]
	}),
	t({
		id: "preselection",
		en: "Preselection",
		fa: "پیش‌گزینش",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "شاخه‌ای از اثبات اجتماعی در فضای جذب. اگر شواهد علاقهٔ دیگران ساختگی باشد فریب است.",
		summary: "نشان می‌دهند دیگران قبلاً آن‌ها را انتخاب کرده‌اند تا تو هم انتخاب را منطقی ببینی.",
		mechanism: "انتخاب دیگران عدم قطعیت را کم می‌کند و رقابت را بالا.",
		example: "عکس یا حرف‌هایی که عامدانه صف علاقه‌مندان را وسط آشنایی می‌آورد، نه دوستی معمولی.",
		detect: "اشاره به خواستاران وقتی است که باید دربارهٔ خود رابطه حرف بزنید.",
		counter: "انتخاب دیگران دلیل تو نیست. موضوع را به رفتار با خودت برگردان.",
		useNote: "ساختن ویترین خواستاران توصیه نمی‌شود.",
		mistakes: "داشتن دوستان یا گذشتهٔ رابطه را با این تکنیک یکی دانستن.",
		signals: [
			"همه می‌خوان",
			"خواستار",
			"پیش‌گزینش",
			"صف"
		],
		keywords: [
			"رقابت",
			"ساختگی",
			"انتخاب",
			"ویترین"
		]
	}),
	t({
		id: "social-proof",
		en: "Social Proof",
		fa: "اثبات اجتماعی",
		ethics: "neutral",
		evidence: "scientific",
		basis: "اصل شناخته‌شدهٔ اقناع، مشهور در کار سیالدینی. اگر شاهد جعلی باشد غیراخلاقی است.",
		summary: "آدم‌ها در ابهام به رفتار دیگران نگاه می‌کنند تا بفهمند چه چیزی درست یا محبوب است.",
		mechanism: "تکرار جمع، جای بررسی شخصی را می‌گیرد مخصوصاً وقتی موضوع ناآشناست.",
		example: "راست: «از ده مشتری قبلی، شش نفر تمدید کردند.» دروغ: عدد ساختگی یا نظرهای جعلی.",
		detect: "شاهد قابل چک است یا فقط ازدحام نشان داده می‌شود؟",
		counter: "بپرس عدد از کجا آمده و گروه مقایسه کیست. شلوغی را دلیل کافی ندان.",
		useNote: "شاهد واقعی مفید است. شاهد ساختگی فریب است و توصیه نمی‌شود.",
		mistakes: "هر استناد به تجربهٔ دیگران را فریب دانستن.",
		signals: [
			"همه دارن",
			"هزار نفر",
			"نظر جعلی",
			"اثبات اجتماعی"
		],
		keywords: [
			"شاهد",
			"جمع",
			"جعل",
			"ابهام"
		]
	}),
	t({
		id: "emotional-spike",
		en: "Emotional Spike",
		fa: "جهش هیجانی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "هیجان شدید حافظه را برجسته می‌کند؛ این گرایش شناخته شده است. ساختن جهش برای نفوذ بحث‌برانگیز است.",
		summary: "ناگهان شدت احساسی بالا می‌رود تا لحظه در حافظه حک شود و منطق دیرتر برسد.",
		mechanism: "برانگیختگی بالا، جزئیات را به آن لحظه گره می‌زند و گاهی قضاوت را تنگ می‌کند.",
		example: "تعریف ناگهانی خیلی شدید یا افشای دراماتیک در اوایل آشنایی، قبل از اعتماد.",
		detect: "شدت با عمق رابطه نمی‌خواند و بعد از فروکش، درخواست یا وابستگی می‌آید.",
		counter: "در اوج تصمیم نگیر. «این حرف شدید بود. فردا درباره‌اش جواب می‌دهم.»",
		useNote: "هیجان صادقانه ممنوع نیست. ساختن اوج برای قفل کردن تصمیم توصیه نمی‌شود.",
		mistakes: "هر لحظهٔ عاطفی واقعی را نقشه دانستن.",
		signals: [
			"همین الان تصمیم",
			"اوج احساس",
			"درام",
			"فردا جواب"
		],
		keywords: [
			"شدت",
			"حافظه",
			"تصمیم",
			"فروکش"
		]
	}),
	t({
		id: "compliance-ladder",
		en: "Compliance Ladder",
		fa: "نردبان موافقت",
		ethics: "controversial",
		evidence: "scientific",
		basis: "خویشاوند پا لای در و سازگاری شناختی. پایهٔ پژوهشی دارد؛ چیدن نردبان برای دور زدن نه بحث‌برانگیز است.",
		summary: "سلسله درخواست‌هایی که هر کدام فقط کمی از قبلی بزرگ‌تر است.",
		mechanism: "تغییر کوچک نسبت به وضعیت فعلی قابل تحمل‌تر از پرش بزرگ به نظر می‌رسد.",
		example: "اول سؤال بی‌ضرر، بعد وقت پنج‌دقیقه‌ای، بعد معرفی به مدیر، قبل از اینکه موضوع اصلی گفته شود.",
		detect: "مقصد از اول پیدا نیست و هر پله با «حالا که تا اینجا آمدی» توجیه می‌شود.",
		counter: "مقصد را بپرس. اگر نگفتند، از پله پایین بیا: «ادامه را بعد از گفتن هدف نهایی می‌دهم.»",
		useNote: "آموزش مرحله‌ای صادقانه خوب است. پنهان کردن مقصد توصیه نمی‌شود.",
		mistakes: "هر پیشرفت تدریجی پروژه را نردبان فریب دیدن.",
		signals: [
			"حالا که تا اینجا",
			"فقط یک قدم دیگه",
			"هدف نهایی",
			"پله"
		],
		keywords: [
			"پله",
			"مقصد",
			"سازگاری",
			"نه"
		]
	}),
	t({
		id: "soft-dhv",
		en: "Soft DHV",
		fa: "نمایش نرم ارزش",
		ethics: "controversial",
		evidence: "experiential",
		basis: "DHV مخفف demonstration of higher value در ادبیات جذب است. اصطلاح علمی روان‌شناسی نیست.",
		summary: "توانایی، روابط یا سبک زندگی طوری وسط حرف می‌آید که انگار تصادفی است اما هدفش بالا بردن جایگاه است.",
		mechanism: "خودستایی مستقیم مقاومت می‌آورد. نسخهٔ «اتفاقی» مقاومت را کم می‌کند.",
		example: "بی‌مناسبت آوردن سفر، دسترسی به افراد معروف، یا درآمد، در لابه‌لای یک خاطره.",
		detect: "قصه به نقطه‌ای می‌رسد که فقط جایگاه را نشان می‌دهد و به موضوع تو برنمی‌گردد.",
		counter: "لازم نیست رقابت کنی یا تحسین کنی. موضوع را برگردان به چیزی که قابل مشاهده در رفتار است.",
		useNote: "حرف زدن طبیعی از زندگی ممنوع نیست. چیدن ویترین برای برتری توصیه نمی‌شود.",
		mistakes: "هر موفقیت واقعی را نمایش ارزش دانستن.",
		signals: [
			"اتفاقی گفتم",
			"جایگاه",
			"dhv",
			"ویترین"
		],
		keywords: [
			"جایگاه",
			"خودستایی",
			"قصه",
			"رقابت"
		]
	}),
	t({
		id: "cold-reading",
		en: "Cold Reading",
		fa: "خوانش سرد",
		ethics: "manipulative",
		evidence: "scientific",
		basis: "نزدیک به اثر بارنوم/فورر: توصیف‌های کلی را شخصی حس می‌کنیم. در شبه‌علم و شیادی شناخته شده است.",
		summary: "جمله‌های کلی که برای خیلی‌ها راست است، طوری گفته می‌شود که انگار بینش خصوصی دربارهٔ توست.",
		mechanism: "شنونده جزئیات زندگی خودش را جای خالی می‌گذارد و دقت گوینده را بیشتر از واقع می‌بیند.",
		example: "«بیرون اجتماعی هستی ولی داخل خسته‌ای و کسی واقعاً نمی‌فهمدت.»",
		detect: "جمله را روی دوستت هم امتحان کن. اگر برای او هم «دقیق» بود، شخصی نیست.",
		counter: "تحسین نکن. بخواه پیش‌بینی مشخص و قابل خطا بدهد، نه جمله‌ای که هر جوری بشود تأیید کرد.",
		useNote: "استفاده برای القای بینش ویژه توصیه نمی‌شود. اگر می‌خواهی بفهمی، سؤال مشخص بپرس.",
		mistakes: "هر همدلی خوب را خوانش سرد دانستن. همدلی به جزئیات واقعی همان شخص وصل است.",
		signals: [
			"کسی نمی‌فهمدت",
			"درون‌گرا ولی",
			"خوانش سرد",
			"دقیق بود"
		],
		keywords: [
			"کلی",
			"شخصی",
			"پیش‌بینی",
			"همدلی"
		]
	}),
	t({
		id: "future-pacing",
		en: "Future Pacing",
		fa: "تصویرسازی آینده",
		ethics: "controversial",
		evidence: "experiential",
		basis: "اصطلاح رایج NLP. تصویرسازی ذهنی پژوهش دارد؛ این تکنیک به‌عنوان ابزار نفوذ، ادعای تجربی است.",
		summary: "آینده را با جزئیات حسی طوری تعریف می‌کنند که انگار همین حالا در حال اتفاق است.",
		mechanism: "تصویر روشن، احساس آشنایی می‌سازد و مقاومت در برابر پیشنهاد را کم می‌کند.",
		example: "«تصور کن شش ماه دیگر صبح‌ها بدون این اضطراب بیدار می‌شوی و اولین نفری هستی که...» قبل از گفتن محدودیت روش.",
		detect: "تصویر نتیجه آمده ولی هزینه، شکست احتمالی و حق انتخاب نیامده.",
		counter: "از تصویر بیرون بیا: «نتیجه را شنیدم. محدودیت و اگر جواب نداد چیست؟»",
		useNote: "تصویر هدف در آموزش می‌تواند مفید باشد اگر واقع‌بین باشد. جایگزینیِ تصویر به‌جای رضایت آگاهانه توصیه نمی‌شود.",
		mistakes: "هر برنامهٔ آینده را این تکنیک دانستن.",
		signals: [
			"تصور کن",
			"شش ماه دیگر",
			"همین حالا حس کن",
			"nlp"
		],
		keywords: [
			"تصویر",
			"محدودیت",
			"رضایت",
			"آینده"
		]
	}),
	t({
		id: "tease-release",
		en: "Tease and Release",
		fa: "شوخی و رهاسازی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "الگوی تجربی. رها کردن آخرش، اثر زخم قبلی را خودکار پاک نمی‌کند.",
		summary: "یک شوخی گزنده می‌زنند و قبل از آنکه جدی شود خودشان آن را پس می‌گیرند.",
		mechanism: "زخم کوچک توجه را تیز می‌کند و پس گرفتن، گوینده را منصف نشان می‌دهد.",
		example: "«این لباس یک کم زیادی تلاش کرده... شوخی شوخی، بهت میاد.»",
		detect: "اگر جملهٔ اول را تنها بگذاری توهین است و جملهٔ دوم فقط درِ فرار است.",
		counter: "رهاسازی را نپذیر که اولی پاک شود: «بخش اول ماند. تکرار نشود.»",
		useNote: "توصیه نمی‌شود به‌عنوان روش جذابیت. شوخی را از اول بی‌گزند بگو.",
		mistakes: "هر اصلاح سریع را فریب دانستن. فرق است بین عذرخواهی واقعی و «شوخی شوخی».",
		signals: [
			"شوخی شوخی",
			"بهت میاد ولی",
			"رهاسازی",
			"گزنده"
		],
		keywords: [
			"شوخی",
			"پس‌گرفتن",
			"توهین",
			"عذر"
		]
	}),
	t({
		id: "high-value-statement",
		en: "High-Value Statement",
		fa: "جملهٔ ارزش بالا",
		ethics: "controversial",
		evidence: "experiential",
		basis: "ادبیات عامیانهٔ جایگاه. روان‌شناسی اجتماعی جایگاه را جدی می‌گیرد اما این جمله‌ها دستور علمی نیستند.",
		summary: "جمله‌ای که استاندارد شخصی را طوری اعلام می‌کند که شنونده پایین‌تر بایستد.",
		mechanism: "اعلام استاندارد می‌تواند غربال صادقانه باشد یا تحقیر پوشیده. تفاوت در این است که شنونده حق خروج برابر دارد یا باید تحت تأثیر بماند.",
		example: "ناسالم: «من با هر کسی وقت نمی‌گذرانم.» اگر زمینه‌اش تحقیر مخاطب حاضر باشد.",
		detect: "جمله دربارهٔ معیار است یا دربارهٔ کوچک کردن کسی که روبه‌رو ایستاده؟",
		counter: "برای تحت تأثیر ماندن تلاش نکن. «معیار داشتن حق توست. من هم وقت را با تحقیر نمی‌گذرانم.»",
		useNote: "استاندارد محترمانه مفید است. جملهٔ بالا به قصد کوچک کردن توصیه نمی‌شود.",
		mistakes: "هر حرفی دربارهٔ معیار شخصی را تکبر دانستن.",
		signals: [
			"با هر کسی",
			"سطح من",
			"ارزش بالا",
			"نمی‌گذرانم"
		],
		keywords: [
			"استاندارد",
			"تحقیر",
			"جایگاه",
			"خروج"
		]
	}),
	t({
		id: "pattern-interrupt",
		en: "Pattern Interrupt",
		fa: "قطع الگو",
		ethics: "neutral",
		evidence: "experiential",
		basis: "اصطلاح NLP و مهارت گفت‌وگو. با شکست الگو خویشاوند است؛ اینجا تأکید بر قطع رفتار خودکار خودِ شنونده است.",
		summary: "یک محرک غیرمنتظرهٔ کوتاه، پاسخ خودکار را قطع می‌کند تا حرف تازه شنیده شود.",
		mechanism: "عادت کلامی (دفاع، عجله، جوک) با وقفهٔ نامعمول مکث می‌کند.",
		example: "وقتی خودت داری عذرخواهی طولانی می‌کنی، ایست و بگو: «دارم از موضوع فرار می‌کنم. درخواستم این است.»",
		detect: "قطع خوب، مسیر را روشن‌تر می‌کند. قطع بد، فقط سلطه یا تمسخر است.",
		counter: "اگر کسی مکالمه را با حرکت نمایشی می‌دزدد: «ادامه بده تا حرف قبلی تمام شود.»",
		useNote: "برای بیرون آمدن از عادت خودت مفید است. برای دستپاچه کردن دیگری به قصد سلطه نه.",
		mistakes: "یکی گرفتن کامل با شکست الگو. اینجا تمرکز روی عادت خودکار است.",
		signals: [
			"قطع الگو",
			"پاسخ خودکار",
			"مکث",
			"سلطه"
		],
		keywords: [
			"عادت",
			"وقفه",
			"روشن",
			"سلطه"
		]
	}),
	t({
		id: "disqualify-requalify",
		en: "Soft Disqualify and Requalify",
		fa: "رد و تأیید دوباره",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "ترکیب تجربیِ رد نرم و جذب دوباره. همان نوسان را کوتاه‌تر می‌کند.",
		summary: "اول آرام می‌گویند مناسب نیستی، و درست وقتی ناراحت می‌شوی دوباره تأییدت می‌کنند.",
		mechanism: "تأیید بعد از رد، قوی‌تر از تأیید ساده حس می‌شود چون تنش را تسکین می‌دهد.",
		example: "«فکر نکنم حوصلهٔ این حرف‌ها را داشته باشی... وای نه، اتفاقاً دقیقاً تو می‌فهمی.»",
		detect: "آرامش فقط بعد از نیش می‌آید. بدون نیش، تأییدی در کار نیست.",
		counter: "برای تسکین نمان. «همان جملهٔ اول کافی بود. تأیید بعدی پاکش نمی‌کند.»",
		useNote: "توصیه نمی‌شود.",
		mistakes: "عذرخواهی واقعی بعد از حرف بد را با این چرخه یکی دانستن، اگر رفتار عوض شود.",
		signals: [
			"فکر نکنم حوصله",
			"اتفاقاً تو",
			"تأیید بعد از رد",
			"نیش"
		],
		keywords: [
			"رد",
			"تأیید",
			"تسکین",
			"چرخه"
		]
	}),
	t({
		id: "ambiguous-compliment",
		en: "Ambiguous Compliment",
		fa: "تعریف مبهم",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "خویشاوند تحقیر ملایم. اصطلاح تجربی.",
		summary: "جمله‌ای که هم می‌تواند تعریف باشد هم کم‌ارزش کردن، و گوینده هر دو برداشت را برای خودش نگه می‌دارد.",
		mechanism: "شنونده برای حفظ برداشت خوب، اعتراض نمی‌کند و جملهٔ بد در فضا می‌ماند.",
		example: "«برای کسی با شروع تو، خیلی خوب حرف زدی.»",
		detect: "اگر تعریف را بدون بخش مقایسه‌ای بگویی، چیزی از آن نمی‌ماند.",
		counter: "بخش زخم را تکرار کن و تعریف را نپذیر: «شروع من موضوع این حرف نبود. این مقایسه لازم نیست.»",
		useNote: "تعریف مستقیم بهتر است. تعریف دوپهلو توصیه نمی‌شود.",
		mistakes: "هر تعریف ناقص را نقشه دانستن. گاهی آدم‌ها فقط بد جمله می‌سازند. اثر را بگو و واکنش را ببین.",
		signals: [
			"برای کسی با",
			"نسبت به بقیه بد نیستی",
			"تعریف مبهم",
			"دوپهلو"
		],
		keywords: [
			"تعریف",
			"مقایسه",
			"ابهام",
			"اثر"
		]
	}),
	t({
		id: "micro-rejection",
		en: "Micro-Rejection",
		fa: "رد ریز",
		ethics: "manipulative",
		evidence: "experiential",
		basis: "الگوی تجربی بی‌ثبات کردن. با آزمون مرز هم‌خانواده است.",
		summary: "رد کردن‌های خیلی کوچک و مکرر: اصلاح لحن، مسخرهٔ انتخاب کوچک، یا مکثِ تحقیرآمیز.",
		mechanism: "هر کدام به‌تنهایی ناچیز است. جمع‌شان خودسنجی را بالا می‌برد و جرئت مخالفت را کم.",
		example: "چند بار در یک ساعت: اصلاح بی‌اهمیت طرز نشستن، خنده به سفارش غذا، تکرار طعنه‌دار یک کلمهٔ تو.",
		detect: "بعد از دیدار حس می‌کنی کوچک شده‌ای اما یک مثال «به اندازهٔ کافی بزرگ» پیدا نمی‌کنی. چند مثال کوچک را بنویس.",
		counter: "کوچک‌ها را جمع کن و یک جا بگو. اگر انکار شد، به حافظهٔ مکتوب خودت اعتماد کن نه به جو.",
		useNote: "توصیه نمی‌شود.",
		mistakes: "یک اصلاح مؤدبانهٔ واحد را رد ریز دانستن.",
		signals: [
			"کوچک شده‌ام",
			"چند بار مسخره",
			"رد ریز",
			"ناچیز بود"
		],
		keywords: [
			"تکرار",
			"کوچک",
			"تحقیر",
			"مکتوب"
		]
	}),
	t({
		id: "controlled-silence",
		en: "Controlled Silence",
		fa: "سکوت کنترل‌شده",
		ethics: "controversial",
		evidence: "educational",
		basis: "سکوت در مذاکره اثر واقعی دارد. استفاده برای وادار کردن دیگری به امتیاز، بحث‌برانگیز است.",
		summary: "بعد از حرف طرف، عامدانه ساکت می‌مانند تا او سکوت را با مخالفت پر کند و کوتاه بیاید.",
		mechanism: "بسیاری از آدم‌ها سکوت را تنش می‌دانند و برای پایان تنش، اطلاعات یا امتیاز اضافی می‌دهند.",
		example: "بعد از گفتن قیمت، فروشنده هیچ نمی‌گوید تا مشتری خودش تخفیف را پیشنهاد کند.",
		detect: "سکوت بعد از یک درخواست مشخص است و با زبان بدن انتظار همراه است، نه فکر کردن.",
		counter: "سکوت را تو پر نکن. جملهٔ آخرت را تکرار کن یا بگو «منتظر جواب مشخص‌ام.»",
		useNote: "مکث برای فکر کردن درست است. سکوت برای کشیدن امتیاز، اگر پنهانی باشد، توصیه نمی‌شود. در مذاکرهٔ آشکار می‌توانی بگویی نیاز به مکث داری.",
		mistakes: "هر سکوت را حمله دانستن. بعضی آدم‌ها کند فکر می‌کنند.",
		signals: [
			"سکوت قیمت",
			"پر کردن سکوت",
			"منتظر جواب",
			"مکث عمدی"
		],
		keywords: [
			"سکوت",
			"امتیاز",
			"مکث",
			"جواب"
		]
	}),
	t({
		id: "story-hook",
		en: "Story Hook",
		fa: "قلاب داستانی",
		ethics: "neutral",
		evidence: "educational",
		basis: "مهارت روایت و آموزش. با حلقهٔ باز فرق دارد چون قلاب باید به مطلب وصل شود.",
		summary: "شروع با یک صحنهٔ مشخص که سؤال می‌سازد، به‌جای تعریف انتزاعی.",
		mechanism: "جزئیات حسی توجه می‌گیرد و مفهوم انتزاعی را به حافظه وصل می‌کند.",
		example: "به‌جای «مرز مهم است»، شروع: «وسط شام بلند شد و رفت، چون شوخی دربارهٔ خانواده‌اش تکرار شد.»",
		detect: "اگر قلاب به درس وصل نشود، فقط قصه‌گویی خودنما است.",
		counter: "بپرس این صحنه کدام نکته را نشان می‌دهد. قلاب بدون نکته را رها کن.",
		useNote: "در آموزش و توضیح تجربه توصیه می‌شود، به شرط صداقت صحنه.",
		mistakes: "ساخت قصهٔ جعلی برای اعتماد. آن دیگر قلاب آموزشی نیست.",
		signals: [
			"بگذار برات بگم",
			"صحنه",
			"قلاب",
			"نکته"
		],
		keywords: [
			"صحنه",
			"نکته",
			"صداقت",
			"شروع"
		]
	}),
	t({
		id: "selective-vulnerability",
		en: "Selective Vulnerability",
		fa: "آسیب‌پذیری گزینشی",
		ethics: "healthy",
		evidence: "educational",
		basis: "خودافشایی در پژوهش رابطه نقش دارد. سالم بودنش به راست بودن و متناسب بودن عمق با اعتماد بستگی دارد.",
		summary: "یک ضعف واقعی، محدود و به‌جا گفته می‌شود؛ نه برای ایجاد بدهی عاطفی و نه برای نمایش.",
		mechanism: "افشای متناسب اعتماد می‌سازد چون ریسک کوچک و صادقانه دیده می‌شود. افشای زودرس یا ساختگی اثر برعکس دارد.",
		example: "«ارائه برایم سخت است و گاهی تند حرف می‌زنم. اگر دیدی بگو.» نه تعریف تراژدی سنگین در دیدار اول برای قفل کردن همدلی.",
		detect: "آیا بعد از افشا از تو مراقبت، راز یا امتیاز خواسته می‌شود؟ اگر بله، گزینشی به معنی طعمه است.",
		counter: "همدلی را از تعهد جدا کن: «این را شنیدم. هنوز برای راز یا قول بزرگ زود است.»",
		useNote: "نسخهٔ راست و محدود توصیه می‌شود. ساختن ضعف برای جذب توصیه نمی‌شود.",
		mistakes: "هر حرف شخصی را یا کاملاً مقدس یا کاملاً دستکاری دانستن.",
		signals: [
			"ضعف واقعی",
			"بدهی عاطفی",
			"راز",
			"متناسب"
		],
		keywords: [
			"افشا",
			"اعتماد",
			"عمق",
			"صداقت"
		]
	}),
	t({
		id: "frame-flip",
		en: "Frame Flip",
		fa: "چرخش چارچوب",
		ethics: "controversial",
		evidence: "experiential",
		basis: "فن مذاکره و فروش. می‌تواند مسئولیت را درست تقسیم کند یا فشار را پنهان کند.",
		summary: "جای متقاعدکننده و متقاعدشونده عوض می‌شود: «من نباید ثابت کنم؛ تو تصمیم می‌گیری این به دردت می‌خورد یا نه.»",
		mechanism: "فشار مستقیم کم می‌شود و گاهی بررسی هم همراهش کم می‌شود، چون شنونده نمی‌خواهد «نیازمند» به نظر برسد.",
		example: "سالم در مرز شخصی. در فروش اگر جایگزین بررسی محصول شود، چرخشِ طفره است.",
		detect: "بپرس سؤال عملی‌ات جواب گرفت یا فقط جایگاهت در گفت‌وگو عوض شد.",
		counter: "جایگاه را نپذیر به‌جای جواب: «تصمیم با من است و برای تصمیم، همان جواب مشخص را لازم دارم.»",
		useNote: "برای خروج از التماس کردن مفید است. برای فرار از سؤال خریدار توصیه نمی‌شود.",
		mistakes: "هر جمله‌ای که التماس نمی‌کند را چرخش چارچوب دانستن.",
		signals: [
			"تو تصمیم بگیر",
			"نباید ثابت کنم",
			"چارچوب",
			"نیازمند"
		],
		keywords: [
			"جایگاه",
			"سؤال",
			"التماس",
			"جواب"
		]
	}),
	t({
		id: "soft-exit",
		en: "Soft Exit",
		fa: "خروج نرم",
		ethics: "healthy",
		evidence: "educational",
		basis: "مهارت مرز و پایان گفت‌وگو. با پس‌گرفتن نمایشی اشتباه نشود.",
		summary: "گفت‌وگو یا جمع را بدون تحقیر، بدون تنبیه و بدون بازگشت نمایشی ترک می‌کنند.",
		mechanism: "خروج روشن، چرخه را تمام می‌کند. نرمی یعنی بدون حمله، نه یعنی مبهم.",
		example: "«برای من کافی است. شب خوبی داشته باشی.» و بعد واقعاً رفتن، بدون پیام دنباله‌دار.",
		detect: "اگر خروج فقط جمله است و شخص می‌ماند تا اثرش را ببیند، نرم نیست؛ نمایشی است.",
		counter: "خروج سالم دیگران را تعقیب نکن و امتیاز نده. اگر خودت خارج می‌شوی، توضیح بلند الزامی نیست.",
		useNote: "توصیه می‌شود وقتی ادامه ضرر یا فرسودگی است.",
		mistakes: "خروج نرم را بی‌ادبی دانستن، یا برعکس قهر مبهم را خروج نرم نامیدن.",
		signals: [
			"برای من کافی است",
			"بدون تنبیه",
			"قهر",
			"خروج"
		],
		keywords: [
			"خروج",
			"روشن",
			"تنبیه",
			"پایان"
		]
	}),
	t({
		id: "mirroring",
		en: "Mirroring",
		fa: "آینه‌سازی",
		ethics: "healthy",
		evidence: "scientific",
		basis: "اثر آفتاب‌پرست در پژوهش چارترند و بارگ: تقلید طبیعی می‌تواند به هماهنگی ربط داشته باشد. تقلید عمدیِ واضح آزارنده است.",
		summary: "بازتاب آرامِ واژه یا حالت طرف، برای اینکه حس کند فهمیده شده. نسخهٔ سالم بازتاب معنی است نه کپی حرکات.",
		mechanism: "شباهت ملایم، آشنایی می‌سازد. کپی دقیق، وارسی و بی‌اعتمادی می‌آورد.",
		example: "«اگر درست باشد، نگران زمان هستی نه خود کار.» به‌جای تکرار عمدی دست به سینه.",
		detect: "اگر حس می‌کنی حرکاتت کپی می‌شود، به هماهنگی ربطی ندارد.",
		counter: "بگو: «لطفاً حرفم را با معنی خودت بگو، لازم نیست ادا دربیاوری.»",
		useNote: "بازتاب معنی توصیه می‌شود. تقلید بدن برای نفوذ توصیه نمی‌شود.",
		mistakes: "هر هماهنگی طبیعی را نقشه دانستن.",
		signals: [
			"کپی حرکت",
			"اگر درست باشد",
			"آینه",
			"ادا"
		],
		keywords: [
			"بازتاب",
			"معنی",
			"تقلید",
			"هماهنگی"
		]
	}),
	t({
		id: "pace-lead",
		en: "Pace and Lead",
		fa: "هم‌گامی و هدایت",
		ethics: "controversial",
		evidence: "experiential",
		basis: "الگوی NLP. هم‌گامیِ همدلانه بخش قابل دفاعی دارد؛ هدایت پنهان بحث‌برانگیز است.",
		summary: "اول با تجربهٔ فعلی طرف همراه می‌شوند و بعد آرام نتیجه را به سمت دلخواه می‌برند.",
		mechanism: "همراهی اولیه مقاومت را کم می‌کند. اگر هدایت اعلام نشود، شنونده فکر می‌کند نتیجه مال خودش است.",
		example: "«حق داری خسته‌ای… پس بهترین کار این است که همین امشب ثبت‌نام کنی.» خستگی راست بوده، پرش به نتیجه نه.",
		detect: "جملهٔ همراهی را از جملهٔ نتیجه جدا کن. ببین دومی از اولی واقعاً درمی‌آید؟",
		counter: "همراهی را بپذیر و نتیجه را جدا کن: «خستگی را درست گفتی. ثبت‌نام از آن درنمی‌آید.»",
		useNote: "همدلی قبل از پیشنهاد، اگر پیشنهاد جدا و قابل رد باشد، اشکال ندارد. دوختن نتیجه به همدلی توصیه نمی‌شود.",
		mistakes: "هر همدلی که بعدش پیشنهاد دارد را فریب دانستن.",
		signals: [
			"حق داری پس",
			"هم‌گامی",
			"هدایت",
			"درنمی‌آید"
		],
		keywords: [
			"همدلی",
			"نتیجه",
			"پرش",
			"پیشنهاد"
		]
	}),
	t({
		id: "assumptive-close",
		en: "Assumptive Close",
		fa: "بستن فرضی",
		ethics: "controversial",
		evidence: "experiential",
		basis: "فن فروش. فرض گرفتن موافقت، رضایت را کمرنگ می‌کند.",
		summary: "به‌جای پرسیدن «می‌خواهی یا نه»، جزئیات بعد از بله را می‌پرسند تا موافقت پیش‌فرض شود.",
		mechanism: "مخالفت با جزئیات سخت‌تر از مخالفت با اصل به نظر می‌رسد.",
		example: "«ارسال را برای پنجشنبه بگذارم یا جمعه؟» در حالی که خرید هنوز تأیید نشده.",
		detect: "اصل معامله هنوز گفته نشده و انتخاب‌ها فقط بین دو بله هستند.",
		counter: "به عقب برگرد: «هنوز خود خرید را تأیید نکرده‌ام. اول همان.»",
		useNote: "وقتی موافقت اصل قبلاً روشن است، پرسیدن جزئیات طبیعی است. جایگزین کردن آن به‌جای بله توصیه نمی‌شود.",
		mistakes: "هر سؤال لجستیکی بعد از توافق واقعی را این فن دانستن.",
		signals: [
			"پنجشنبه یا جمعه",
			"فرض موافقت",
			"هنوز تأیید نکردم",
			"بستن"
		],
		keywords: [
			"فرض",
			"موافقت",
			"جزئیات",
			"اصل"
		]
	}),
	t({
		id: "curiosity-gap",
		en: "Curiosity Gap",
		fa: "شکاف کنجکاوی",
		ethics: "controversial",
		evidence: "educational",
		basis: "نظریهٔ شکاف اطلاعاتی لوونشتاین در حد معرفی. در عنوان‌های تبلیغاتی زیاده‌روی می‌شود.",
		summary: "بین آنچه می‌دانی و آنچه گفته می‌شود یک فاصلهٔ کوچک نشان می‌دهند تا ادامه را بخواهی.",
		mechanism: "کنجکاوی وقتی برانگیخته می‌شود که کمبود مشخص باشد نه وقتی هیچ نمی‌دانی.",
		example: "عنوان: «یک جمله که قرار فروش را عوض کرد.» اگر داخل متن آن جمله نباشد، شکاف طعمه است.",
		detect: "شکاف بسته می‌شود یا فقط به صفحهٔ بعد و پرداخت حواله می‌شود؟",
		counter: "برای تصمیم، کنجکاوی را دلیل کافی ندان. بخواه همان اطلاعات جاافتاده را همین‌جا بگویند.",
		useNote: "در آموزش اگر جواب واقعاً بیاید مناسب است. عنوان توخالی توصیه نمی‌شود.",
		mistakes: "هر سؤال خوب را شکاف دستکاری‌گرانه نامیدن.",
		signals: [
			"باورت نمی‌شود",
			"یک جمله",
			"ادامه مطلب",
			"شکاف"
		],
		keywords: [
			"کنجکاوی",
			"عنوان",
			"جواب",
			"طعمه"
		]
	}),
	t({
		id: "status-demo",
		en: "Status Demonstration",
		fa: "نمایش جایگاه",
		ethics: "controversial",
		evidence: "educational",
		basis: "رفتار منزلت در روان‌شناسی اجتماعی و رفتارشناسی بحث می‌شود. نمایش عمدی برای تحت تأثیر گذاشتن، کاربرد بحث‌برانگیز است.",
		summary: "با فضا، وقت، معرفی دیگران یا طرز حرف زدن نشان می‌دهند در سلسله‌مراتب بالاترند.",
		mechanism: "آدم‌ها گاهی صلاحیت را از نشانه‌های جایگاه حدس می‌زنند، حتی وقتی بی‌ربط باشد.",
		example: "معطل کردن عمدی، صحبت از حلقهٔ درونی، یا گرفتن بهترین جا برای نمایش نه برای نیاز.",
		detect: "نشانه به کارِ مورد بحث ربط دارد یا فقط رتبه را صدا می‌کند؟",
		counter: "بحث را به معیار برگردان: سابقهٔ قابل بررسی، نمونه، یا رفتار همین گفت‌وگو.",
		useNote: "جایگاه واقعی را انکار نکن، اما از روی نمایش تصمیم نگیر و خودت هم ویترین رتبه نساز.",
		mistakes: "اعتمادبه‌نفس آرام را با نمایش جایگاه یکی دانستن.",
		signals: [
			"جایگاه",
			"حلقه درونی",
			"معطل کردن",
			"رتبه"
		],
		keywords: [
			"جایگاه",
			"معیار",
			"نمایش",
			"صلاحیت"
		]
	}),
	t({
		id: "reciprocity-soft",
		en: "Reciprocity Soft",
		fa: "عمل متقابل نرم",
		ethics: "neutral",
		evidence: "scientific",
		basis: "اصل مقابله‌به‌مثل در پژوهش اقناع. هدیهٔ بدون انتظار سالم است؛ هدیه برای بدهی پنهان نه.",
		summary: "یک لطف کوچک داده می‌شود و حس بدهی احتمال بلهٔ بعدی را بالا می‌برد.",
		mechanism: "هنجار جواب لطف، حتی به لطف ناخواسته، در بسیاری فرهنگ‌ها قوی است.",
		example: "سالم: کمک بدون پیگیری. تحت فشار: هدیهٔ نخواسته و بلافاصله درخواست معرفی یا خرید.",
		detect: "فاصلهٔ بین لطف و درخواست چقدر است و آیا می‌توانی لطف را بدون شرم رد یا جبران نکنی؟",
		counter: "بدهی را از تصمیم جدا کن: «ممنون از فایل. خرید را جدا بررسی می‌کنم و جواب لطف را خرید نمی‌دانم.»",
		useNote: "سخاوت بدون قلاب توصیه می‌شود. لطف به‌عنوان اهرم نه.",
		mistakes: "هر مهربانی را نقشه دانستن. به درخواستِ چسبیده به لطف نگاه کن.",
		signals: [
			"حالا که برات فرستادم",
			"بدهی",
			"لطف کوچک",
			"مقابله به مثل"
		],
		keywords: [
			"لطف",
			"بدهی",
			"درخواست",
			"جدا"
		]
	}),
	t({
		id: "contrast",
		en: "Contrast Principle",
		fa: "اصل تضاد",
		ethics: "neutral",
		evidence: "scientific",
		basis: "اصل تضاد در ادراک و اقناع. اثر واقعی است؛ چیدن گزینهٔ بد برای فریب، غیراخلاقی است.",
		summary: "چیزها را مطلق نمی‌سنجیم؛ نسبت به چیزی که درست قبلش دیده‌ایم می‌سنجیم.",
		mechanism: "گزینهٔ متوسط بعد از گزینهٔ خیلی بد یا خیلی گران، بهتر از واقع به نظر می‌رسد.",
		example: "اول طرح بسیار گران، بعد طرح متوسط که ناگهان «منطقی» حس می‌شود. اگر هر دو واقعی باشند شفاف‌سازی است؛ اگر اولی ساختگی باشد فریب.",
		detect: "گزینهٔ اول جدی و قابل خرید است یا فقط چاشنی است؟",
		counter: "گزینه‌ها را جدا و با معیار قبلی خودت بسنج، نه نسبت به آیتم کناری.",
		useNote: "مقایسهٔ راستِ گزینه‌ها مفید است. گزینهٔ مترسک برای هل دادن به انتخاب توصیه نمی‌شود.",
		mistakes: "هر جدول مقایسه را فریب دانستن.",
		signals: [
			"نسبت به قبلی",
			"گزینه مترسک",
			"گران اول",
			"تضاد"
		],
		keywords: [
			"مقایسه",
			"معیار",
			"گزینه",
			"فریب"
		]
	}),
	t({
		id: "nested-loop",
		en: "Nested Loop",
		fa: "حلقهٔ تودرتو",
		ethics: "neutral",
		evidence: "experiential",
		basis: "فن قصه‌گویی، گاهی در NLP ادعاهای بزرگ دارد. خودِ ساختار داستان ادعای علمی عجیبی نیست.",
		summary: "داستانی را نیمه‌کاره می‌گذارند، داخلش داستان دوم را می‌گویند، و بعد بیرونی را می‌بندند.",
		mechanism: "توجه برای بستن چند حلقه می‌ماند. اگر محتوا راست و مرتبط باشد ابزار آموزش است؛ اگر برای قاطی کردن مخالفت باشد منحرف‌کننده است.",
		example: "در درس: مثال کوتاه داخل توضیح اصلی و برگشت به نکته. در فروش پرفشار: قصه‌های پی‌درپی تا سؤال قیمت فراموش شود.",
		detect: "آخرش به سؤال تو برگشتند یا سؤال زیر قصه دفن شد؟",
		counter: "قصه را قطع کن و سؤال را تکرار کن. سرگرمی دلیل فراموشی سؤال نیست.",
		useNote: "برای آموزش با بازگشت به نکته مناسب است. برای دفن مخالفت نه.",
		mistakes: "هر مثال داخل حرف را دستکاری پیچیده دانستن.",
		signals: [
			"داستان تو داستان",
			"سؤال دفن",
			"برگردیم سر نکته",
			"حلقه"
		],
		keywords: [
			"قصه",
			"سؤال",
			"بازگشت",
			"توجه"
		]
	}),
	t({
		id: "soft-close",
		en: "Soft Close",
		fa: "بستن نرم",
		ethics: "neutral",
		evidence: "educational",
		basis: "مهارت فروش و دعوت کم‌فشار. با بستن فرضی فرق دارد چون نه هنوز آسان است.",
		summary: "درخواست پایانی کوچک و بدون تهدید است و نه گفتن هزینهٔ اجتماعی ندارد.",
		mechanism: "فشار کم، جواب راست‌تر می‌گیرد. اگر «نرم» فقط لحن باشد و عجله پنهان باشد، همان فشار است.",
		example: "«اگر بخواهی، یک نسخهٔ آزمایشی ده‌دقیقه‌ای هست. اگر نه، همین توضیح کافی است.»",
		detect: "بعد از نه، تنبیه، طعنه یا کمیابی ساختگی می‌آید یا نه؟",
		counter: "نه را کوتاه بگو. بستن نرم درست، نه را باز نمی‌کند.",
		useNote: "توصیه می‌شود به‌جای فشار، به شرط اینکه نه واقعاً پذیرفته شود.",
		mistakes: "لحن آرام با محتوای تهدید را بستن نرم نامیدن.",
		signals: [
			"اگر نه کافی است",
			"نسخه آزمایشی",
			"بستن نرم",
			"طعنه بعد از نه"
		],
		keywords: [
			"نه",
			"فشار",
			"درخواست",
			"لحن"
		]
	}),
	t({
		id: "anchoring",
		en: "Anchoring",
		fa: "لنگرسازی",
		ethics: "controversial",
		evidence: "scientific",
		basis: "اثر لنگر در قضاوت، از پژوهش تورسکی و کاهنمن. اثر واقعی است؛ لنگر فریبنده بحث‌برانگیز است.",
		summary: "اولین عدد یا تصویر، تخمین‌های بعدی را حتی وقتی بی‌ربط باشد به سمت خودش می‌کشد.",
		mechanism: "ذهن از نقطهٔ شروع تعدیل می‌کند و معمولاً تعدیل ناکافی است.",
		example: "گفتن قیمت بسیار بالا در اول مذاکره، بعد «تخفیف» به قیمتی که از اول هدف بوده. اگر قیمت اول ساختگی باشد فریب است.",
		detect: "عدد اول از کجا آمده؟ اگر فقط برای جابه‌جا کردن توقع است، لنگر تاکتیکی است.",
		counter: "قبل از شنیدن عدد، بازهٔ خودت را بنویس. عدد اول طرف را نقطهٔ میانه حساب نکن.",
		useNote: "دانستنش برای دفاع لازم است. ساختن عدد دروغ به‌عنوان لنگر توصیه نمی‌شود. شروع از محدودهٔ واقعی در مذاکره قابل دفاع است.",
		mistakes: "هر اولین پیشنهاد صادقانه را فریب دانستن.",
		signals: [
			"عدد اول",
			"لنگر",
			"بازه",
			"تخفیف از قیمت ساختگی"
		],
		keywords: [
			"عدد",
			"بازه",
			"تعدیل",
			"قیمت"
		]
	})
];
var domains = [
	...domainsPartA,
	...domainsPartB,
	...domainsPartC
];
function allModules() {
	const out = [];
	for (const domain of domains) for (const course of domain.courses) for (const chapter of course.chapters) for (const module of chapter.modules) out.push({
		domain,
		courseTitle: course.title,
		chapterTitle: chapter.title,
		module
	});
	return out;
}
function getDomain(id) {
	return domains.find((d) => d.id === id);
}
function getModule(id) {
	return allModules().find((m) => m.module.id === id);
}
function mergeTechniques(custom) {
	const ids = new Set(techniques.map((t) => t.id));
	return [...techniques, ...custom.filter((t) => !ids.has(t.id))];
}
function getTechnique(id, custom = []) {
	return mergeTechniques(custom).find((t) => t.id === id);
}
var ethicsLabel = {
	healthy: "سالم",
	neutral: "خنثی",
	controversial: "بحث‌برانگیز",
	manipulative: "دستکاری‌گرانه"
};
var evidenceLabel = {
	scientific: "پشتوانهٔ پژوهشی",
	educational: "تفسیر آموزشی",
	experiential: "اصطلاح یا تجربهٔ میدانی"
};
var stageNames = [
	"شروع‌نشده",
	"آشنایی",
	"فهم مفهوم",
	"تشخیص در مثال",
	"تشخیص در موقعیت تازه",
	"پاسخ عملی",
	"تحلیل رفتار",
	"مقابله",
	"آزمون ترکیبی",
	"تسلط"
];
function norm(input) {
	return input.replace(/\u200c/g, " ").replace(/[ي]/g, "ی").replace(/[ك]/g, "ک").replace(/[أإآ]/g, "ا").toLowerCase().trim();
}
function pickOther(list, avoid, n) {
	const out = [];
	for (const item of list) {
		if (item === avoid) continue;
		out.push(item);
		if (out.length === n) break;
	}
	return out;
}
function moduleQuizzes(hit) {
	const decoys = pickOther(allModules().map((m) => m.module), hit.module, 2);
	return [
		{
			prompt: `کدام توضیح به «${hit.module.title}» نزدیک‌تر است؟`,
			options: [
				hit.module.summary,
				decoys[0]?.summary ?? "این موضوع فقط حفظ یک جمله است.",
				decoys[1]?.why ?? "در موقعیت واقعی هیچ کاربردی ندارد."
			],
			correct: 0,
			explain: "گزینهٔ درست همان تعریف سادهٔ درس است. گزینه‌های دیگر به درس دیگری یا به حفظ طوطی‌وار تعلق دارند."
		},
		{
			prompt: "کدام موقعیت به مثال این درس شبیه‌تر است؟",
			options: [
				hit.module.example,
				"حفظ کردن نام درس و رد شدن از مثال واقعی.",
				decoys[0]?.example ?? "یک موقعیت نامرتبط بدون مشاهدهٔ مشخص."
			],
			correct: 0,
			explain: "تشخیص یعنی دیدن همان الگو در موقعیت، نه تکرار عنوان."
		},
		{
			prompt: "در یک موقعیت تازه، قدم قابل دفاع‌تر کدام است؟",
			options: [
				hit.module.modelAnswer,
				"همان تکنیک یا عادت را شدیدتر تکرار کن تا نتیجه عوض شود.",
				"نتیجه را قطعی اعلام کن و نیازی به مشاهدهٔ مشخص نیست."
			],
			correct: 0,
			explain: hit.module.basis
		}
	];
}
function techniqueQuizzes(tech, all) {
	const decoys = pickOther(all, tech, 2);
	return [
		{
			prompt: `کدام جمله هدف احتمالی «${tech.fa}» را بهتر می‌گوید؟`,
			options: [
				tech.mechanism,
				decoys[0]?.mechanism ?? "هیچ اثری ندارد.",
				"فقط یک نام قشنگ است و رفتار را عوض نمی‌کند."
			],
			correct: 0,
			explain: "هدف احتمالی را از اثر جدا کن. دانستن اثر به معنی توصیهٔ استفاده نیست."
		},
		{
			prompt: "کدام نمونه به این تکنیک نزدیک‌تر است؟",
			options: [
				tech.example,
				decoys[0]?.example ?? "یک گفت‌وگوی معمولی بدون الگو.",
				decoys[1]?.counter ?? "یک مرز روشن و بدون نمایش."
			],
			correct: 0,
			explain: tech.detect
		},
		{
			prompt: "پاسخ قابل دفاع‌تر در برابر این تکنیک کدام است؟",
			options: [
				tech.counter,
				"همان الگو را شدیدتر برگردان تا کوتاه بیاید.",
				"هیچ چیز نگو و بعداً با تحقیر تلافی کن."
			],
			correct: 0,
			explain: tech.useNote
		}
	];
}
function scoreAnswer(answer, keywords, ethics) {
	const text = norm(answer);
	const words = answer.trim().split(/\s+/).filter(Boolean);
	const strengths = [];
	const gaps = [];
	if (words.length < 8) return {
		score: 12,
		strengths,
		gaps: ["پاسخ کوتاه است. حداقل دو جمله بنویس: چه دیدی و چه کار می‌کنی."]
	};
	let score = 22;
	if (words.length >= 18) {
		score += 8;
		strengths.push("پاسخ به اندازهٔ کافی باز شده است.");
	}
	const hits = keywords.filter((k) => text.includes(norm(k)));
	if (hits.length) {
		score += Math.min(36, hits.length * 12);
		strengths.push(`به مفهوم‌های مرتبط اشاره شد: ${hits.slice(0, 3).join("، ")}.`);
	} else gaps.push("به مفهوم اصلی این مورد اشارهٔ روشنی نشده.");
	const care = [
		"رضایت",
		"احترام",
		"صداقت",
		"مرز",
		"شفاف",
		"نه "
	].filter((w) => text.includes(norm(w)));
	if (ethics === "manipulative" || ethics === "controversial") {
		if (care.length) {
			score += 18;
			strengths.push("قید اخلاق یا مرز در جواب هست.");
		} else gaps.push("برای این مورد باید دربارهٔ شفافیت، احترام یا مرز هم حرف بزنی.");
		if ([
			"برگردون",
			"تلافی",
			"باید استفاده",
			"ولش کن تا",
			"تحقیرش کن",
			"نشون بده برتری"
		].some((p) => text.includes(norm(p)))) {
			score -= 28;
			gaps.push("جواب، اجرای تکنیک یا تلافی را پیشنهاد می‌کند. اینجا مقابلهٔ محترمانه ملاک است.");
		}
	} else if (care.length) score += 8;
	if (/همیشه|قطعا|صد در صد|۱۰۰/.test(answer) && ethics) {
		score -= 6;
		gaps.push("قطعیت زیاد است. اثر تکنیک را محتمل بگو نه حتمی.");
	}
	return {
		score: Math.max(0, Math.min(100, score)),
		strengths,
		gaps
	};
}
function detectTechniques(text, all) {
	const hay = norm(text);
	return all.map((tech) => {
		const hits = tech.signals.filter((s) => hay.includes(norm(s)));
		const nameHit = hay.includes(norm(tech.fa)) || hay.includes(tech.en.toLowerCase()) ? 1 : 0;
		return {
			tech,
			hits,
			score: hits.length * 2 + nameHit
		};
	}).filter((row) => row.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
}
function searchAll(query, custom) {
	const q = norm(query);
	if (!q) return [];
	const refs = [];
	for (const hit of allModules()) if (norm([
		hit.module.title,
		hit.module.summary,
		hit.domain.title
	].join(" ")).includes(q)) refs.push({
		kind: "module",
		id: hit.module.id,
		title: hit.module.title,
		kicker: hit.domain.title,
		domainId: hit.domain.id
	});
	for (const tech of mergeTechniques(custom)) if (norm([
		tech.fa,
		tech.en,
		tech.summary
	].join(" ")).includes(q)) refs.push({
		kind: "technique",
		id: tech.id,
		title: tech.fa,
		kicker: tech.en
	});
	return refs.slice(0, 12);
}
function localTutor(question, custom, voice = "plain") {
	const all = mergeTechniques(custom);
	const found = detectTechniques(question, all);
	if (question.trim().length > 70 && found.length) {
		const body = found.map((row) => `«${row.tech.fa}» محتمل است. ${row.tech.mechanism} مقابله: ${row.tech.counter}`).join("\n\n");
		return voice === "socratic" ? `قبل از برچسب زدن: کدام جملهٔ مشخص این برداشت را ساخته؟\n\n${body}` : body;
	}
	const q = norm(question);
	let best = null;
	for (const hit of allModules()) {
		const score = [hit.module.title, ...hit.module.keywords].reduce((n, k) => n + (q.includes(norm(k)) ? 2 : 0), 0);
		if (!best || score > best.score) best = {
			score,
			text: `${hit.module.title}\n${hit.module.summary}\n\nمثال: ${hit.module.example}\n\nاین پاسخ از دانشنامهٔ محلی است، نه از مدل.`
		};
	}
	for (const tech of all) {
		const score = [
			tech.fa,
			tech.en,
			...tech.keywords,
			...tech.signals
		].reduce((n, k) => n + (q.includes(norm(k)) ? 2 : 0), 0);
		if (!best || score > best.score) best = {
			score,
			text: `${tech.fa} (${tech.en})\n${tech.summary}\n\nاثر احتمالی: ${tech.mechanism}\n\nتوصیه: ${tech.useNote}\n\nاین پاسخ از بانک تکنیک است، نه از مدل.`
		};
	}
	if (best && best.score >= 2) {
		if (voice === "socratic") return `یک سؤال قبل از جواب کامل: در موقعیت خودت کدام بخشش را واقعاً دیدی؟\n\n${best.text}`;
		return best.text;
	}
	return "در دانشنامهٔ محلی چیز دقیقی برای این سؤال پیدا نشد. نام تکنیک یا درس را بگو، یا از آکادمی یک مسیر را باز کن. اگر مدل روشن باشد، می‌توانی همان سؤال را برای پاسخ گسترده‌تر بفرستی.";
}
var sampleChat = `فقط یه لحظه وقت دارم. راستی تو جذابی ولی زیادی سعی می‌کنی خاص به نظر برسی. شوخی بود، خیلی حساسی. افراد زیادی دنبال وقت من هستند و معلوم نیست جواب بدم، سرم شلوغه.`;
var levels = [
	{
		xp: 0,
		name: "مدار صفر"
	},
	{
		xp: 40,
		name: "ناظر"
	},
	{
		xp: 120,
		name: "شاگرد مدار"
	},
	{
		xp: 240,
		name: "تحلیل‌گر"
	},
	{
		xp: 420,
		name: "مربی مبتدی"
	},
	{
		xp: 680,
		name: "مداربان"
	}
];
function levelFor(xp) {
	let current = levels[0];
	let next = levels[1];
	for (let i = 0; i < levels.length; i++) if (xp >= levels[i].xp) {
		current = levels[i];
		next = levels[i + 1];
	}
	const span = next ? next.xp - current.xp : 1;
	const into = next ? Math.min(1, (xp - current.xp) / span) : 1;
	return {
		name: current.name,
		next: next?.name ?? null,
		into,
		index: levels.indexOf(current) + 1
	};
}
function emptyItem(seed) {
	return {
		seen: false,
		quizPassed: [],
		bestText: 0,
		attempts: 0,
		errors: 0,
		lastPracticed: null,
		nextReview: null,
		interval: 0,
		reviews: 0,
		...seed
	};
}
function localDate(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function plusDays(days) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + days);
	return localDate(d);
}
function withStreak(state) {
	const today = localDate();
	if (state.lastActive === today) return state;
	const y = /* @__PURE__ */ new Date();
	y.setDate(y.getDate() - 1);
	const streak = state.lastActive === localDate(y) ? state.streak + 1 : 1;
	return {
		...state,
		streak,
		lastActive: today
	};
}
var useOrbit = create()(persist((set) => ({
	name: "کاوشگر",
	xp: 0,
	streak: 0,
	lastActive: null,
	items: {},
	saved: [],
	notes: {},
	edits: {},
	threads: [],
	activeThread: null,
	customTechniques: [],
	placementDomain: null,
	seenAchievements: [],
	voice: "plain",
	markSeen: (id) => set((s) => {
		const prev = s.items[id];
		if (prev?.seen) return withStreak(s);
		return withStreak({
			...s,
			xp: s.xp + 5,
			items: {
				...s.items,
				[id]: emptyItem({
					...prev,
					seen: true
				})
			}
		});
	}),
	recordQuiz: (id, index, ok) => {
		let gained = 0;
		set((s) => {
			const prev = emptyItem(s.items[id]);
			const passed = new Set(prev.quizPassed);
			if (ok && !passed.has(index)) {
				passed.add(index);
				gained = 12;
			}
			const errors = ok ? prev.errors : prev.errors + 1;
			const nextReview = ok ? prev.nextReview : plusDays(1);
			return withStreak({
				...s,
				xp: s.xp + gained,
				items: {
					...s.items,
					[id]: {
						...prev,
						seen: true,
						quizPassed: [...passed],
						errors,
						nextReview,
						lastPracticed: localDate(),
						interval: ok ? prev.interval : 1
					}
				}
			});
		});
		return gained;
	},
	recordText: (id, score) => {
		let gained = 0;
		set((s) => {
			const prev = emptyItem(s.items[id]);
			if (prev.bestText < 60 && score >= 60) gained += 20;
			if (prev.bestText < 85 && score >= 85) gained += 15;
			if (gained === 0 && score > prev.bestText && score >= 45) gained += 8;
			const interval = score >= 80 ? Math.max(1, (prev.interval || 1) * 2) : 1;
			return withStreak({
				...s,
				xp: s.xp + gained,
				items: {
					...s.items,
					[id]: {
						...prev,
						seen: true,
						bestText: Math.max(prev.bestText, score),
						attempts: prev.attempts + 1,
						errors: score >= 60 ? prev.errors : prev.errors + 1,
						lastPracticed: localDate(),
						interval,
						nextReview: plusDays(interval)
					}
				}
			});
		});
		return gained;
	},
	toggleSave: (id) => set((s) => ({
		...s,
		saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id]
	})),
	setNote: (id, body) => set((s) => ({
		...s,
		notes: {
			...s.notes,
			[id]: body
		}
	})),
	setEdit: (id, patch) => set((s) => ({
		...s,
		edits: {
			...s.edits,
			[id]: {
				...s.edits[id],
				...patch
			}
		}
	})),
	setName: (name) => set({ name }),
	setPlacement: (placementDomain) => set({ placementDomain }),
	addTechnique: (tech) => set((s) => ({
		...s,
		customTechniques: [tech, ...s.customTechniques.filter((t) => t.id !== tech.id)]
	})),
	removeTechnique: (id) => set((s) => ({
		...s,
		customTechniques: s.customTechniques.filter((t) => t.id !== id)
	})),
	resetItem: (id) => set((s) => {
		const items = { ...s.items };
		delete items[id];
		return {
			...s,
			items
		};
	}),
	resetMemory: () => set({
		xp: 0,
		streak: 0,
		lastActive: null,
		items: {},
		placementDomain: null,
		seenAchievements: []
	}),
	markAchievement: (id) => set((s) => s.seenAchievements.includes(id) ? s : {
		...s,
		seenAchievements: [...s.seenAchievements, id]
	}),
	setVoice: (voice) => set({ voice }),
	recordReview: (id, quality) => {
		let gained = 0;
		set((s) => {
			const prev = emptyItem(s.items[id]);
			let interval = prev.interval || 0;
			let errors = prev.errors;
			if (quality === 0) {
				interval = 1;
				errors += 1;
			} else if (quality === 1) {
				interval = Math.max(1, interval || 1);
				gained = 6;
			} else {
				interval = Math.min(21, Math.max(2, (interval || 1) * 2));
				gained = 10;
			}
			return withStreak({
				...s,
				xp: s.xp + gained,
				items: {
					...s.items,
					[id]: {
						...prev,
						seen: true,
						errors,
						reviews: (prev.reviews ?? 0) + 1,
						interval,
						lastPracticed: localDate(),
						nextReview: plusDays(interval)
					}
				}
			});
		});
		return gained;
	},
	importBackup: (data) => set({
		name: data.name,
		xp: data.xp,
		streak: data.streak,
		lastActive: data.lastActive,
		items: data.items,
		saved: data.saved,
		notes: data.notes,
		edits: data.edits,
		threads: data.threads,
		activeThread: data.activeThread,
		customTechniques: data.customTechniques,
		placementDomain: data.placementDomain,
		seenAchievements: data.seenAchievements,
		voice: data.voice
	}),
	ensureThread: () => {
		let id = "";
		set((s) => {
			if (s.activeThread && s.threads.some((t) => t.id === s.activeThread)) {
				id = s.activeThread;
				return s;
			}
			id = `t-${Date.now()}`;
			const thread = {
				id,
				title: "گفت‌وگوی تازه",
				messages: [],
				updated: (/* @__PURE__ */ new Date()).toISOString()
			};
			return {
				...s,
				activeThread: id,
				threads: [thread, ...s.threads].slice(0, 12)
			};
		});
		return id;
	},
	appendMessage: (threadId, message) => set((s) => ({
		...s,
		threads: s.threads.map((thread) => {
			if (thread.id !== threadId) return thread;
			const messages = [...thread.messages, message].slice(-24);
			const title = thread.messages.length === 0 && message.role === "user" ? message.content.slice(0, 42) : thread.title;
			return {
				...thread,
				messages,
				title,
				updated: (/* @__PURE__ */ new Date()).toISOString()
			};
		})
	})),
	removeThread: (threadId) => set((s) => {
		const threads = s.threads.filter((t) => t.id !== threadId);
		return {
			...s,
			threads,
			activeThread: s.activeThread === threadId ? threads[0]?.id ?? null : s.activeThread
		};
	})
}), {
	name: "orbit-v1",
	skipHydration: true
}));
function stageOf(item) {
	if (!item?.seen) return 0;
	const quizzes = item.quizPassed.filter((n) => n <= 2).length;
	let stage = 1;
	if (quizzes >= 1) stage = 2;
	if (quizzes >= 2) stage = 3;
	if (quizzes >= 3) stage = 4;
	if (item.bestText >= 45) stage = Math.max(stage, 5);
	if (item.bestText >= 60) stage = Math.max(stage, 6);
	if (item.bestText >= 68 && quizzes >= 2) stage = Math.max(stage, 7);
	if (item.bestText >= 75 && quizzes >= 2) stage = Math.max(stage, 8);
	if (item.bestText >= 85 && quizzes >= 3) stage = 9;
	return stage;
}
function achievementDefs(state) {
	const values = Object.values(state.items);
	const techSeen = Object.keys(state.items).filter((id) => id.startsWith("tech:") && state.items[id]?.seen).length;
	return [
		{
			id: "first-seen",
			name: "اولین مدار",
			detail: "یک درس یا تکنیک را باز کردی.",
			ok: values.some((i) => i.seen)
		},
		{
			id: "first-text",
			name: "پاسخ مکتوب",
			detail: "یک تمرین نوشتاری ثبت شد.",
			ok: values.some((i) => i.attempts > 0)
		},
		{
			id: "three-tech",
			name: "سه تکنیک",
			detail: "سه تکنیک را دیدی.",
			ok: techSeen >= 3
		},
		{
			id: "streak-3",
			name: "سه روز پیاپی",
			detail: "سه روز پشت سر هم برگشتی.",
			ok: state.streak >= 3
		},
		{
			id: "mastery",
			name: "یک تسلط",
			detail: "یک مورد به مرحلهٔ تسلط رسید.",
			ok: values.some((i) => stageOf(i) >= 9)
		},
		{
			id: "library",
			name: "کتابخانه",
			detail: "چیزی را برای بعد ذخیره کردی.",
			ok: state.saved.length > 0
		}
	];
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var nav = [
	{
		to: "/",
		label: "خانه",
		icon: House,
		exact: true
	},
	{
		to: "/academy",
		label: "آموزش",
		icon: GraduationCap,
		exact: false
	},
	{
		to: "/techniques",
		label: "تکنیک",
		icon: Sparkles,
		exact: false
	},
	{
		to: "/assistant",
		label: "دستیار",
		icon: MessagesSquare,
		exact: false
	},
	{
		to: "/profile",
		label: "پروفایل",
		icon: UserRound,
		exact: false
	}
];
var moreLinks = [
	{
		to: "/review",
		label: "مدار امروز",
		icon: Orbit
	},
	{
		to: "/analyze",
		label: "تحلیل مکالمه",
		icon: ScanSearch
	},
	{
		to: "/library",
		label: "کتابخانه",
		icon: BookOpen
	},
	{
		to: "/tools",
		label: "ابزارها",
		icon: Wrench
	},
	{
		to: "/admin",
		label: "استودیو",
		icon: Sparkles
	}
];
function usePath() {
	return useRouterState({ select: (s) => s.location.pathname });
}
function active(path, to, exact) {
	if (exact) return path === to;
	return path === to || path.startsWith(`${to}/`);
}
function Shell({ children }) {
	const path = usePath();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [more, setMore] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const custom = useOrbit((s) => s.customTechniques);
	const xp = useOrbit((s) => s.xp);
	const streak = useOrbit((s) => s.streak);
	const items = useOrbit((s) => s.items);
	const saved = useOrbit((s) => s.saved);
	const results = (0, import_react.useMemo)(() => searchAll(q, custom), [q, custom]);
	const dueCount = Object.values(items).filter((item) => item.nextReview && item.nextReview <= localDate()).length;
	(0, import_react.useEffect)(() => {
		const pending = useOrbit.persist.rehydrate();
		if (pending) pending.then(() => setReady(true));
		else setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const state = useOrbit.getState();
		for (const item of achievementDefs(state)) if (item.ok && !state.seenAchievements.includes(item.id)) {
			toast(item.name, { description: item.detail });
			state.markAchievement(item.id);
		}
	}, [
		ready,
		xp,
		streak,
		items,
		saved
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				dir: "rtl",
				theme: "dark",
				position: "top-center",
				toastOptions: { style: {
					background: "var(--color-surface)",
					color: "var(--color-fg)",
					border: "1px solid var(--color-border)",
					fontFamily: "var(--font-sans)"
				} }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-e border-border px-4 py-6 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-bold tracking-wide text-primary",
								children: "ORBIT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted",
								children: "مدار یادگیری"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 flex flex-col gap-1",
							children: nav.map((item) => {
								const on = active(path, item.to, item.exact);
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm", on ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", on && "text-primary") }), item.label === "آموزش" ? "آکادمی" : item.label === "تکنیک" ? "تکنیک‌ها" : item.label]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex flex-col gap-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, {
									to: "/review",
									icon: Orbit,
									label: dueCount ? `مدار امروز · ${dueCount}` : "مدار امروز",
									path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, {
									to: "/analyze",
									icon: ScanSearch,
									label: "تحلیل مکالمه",
									path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, {
									to: "/library",
									icon: BookOpen,
									label: "کتابخانه",
									path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, {
									to: "/tools",
									icon: Wrench,
									label: "ابزارها",
									path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, {
									to: "/admin",
									icon: Sparkles,
									label: "استودیو",
									path
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur md:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "font-display text-lg font-bold tracking-wide text-primary md:hidden",
									children: "ORBIT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-xl border border-border md:hidden",
									"aria-expanded": more,
									"aria-label": "بخش‌های دیگر",
									onClick: () => setMore((value) => !value),
									children: more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "relative ms-auto w-full max-w-md",
									onSubmit: (e) => {
										e.preventDefault();
										if (results[0]) go(results[0].kind, results[0].id);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: q,
											onChange: (e) => {
												setQ(e.target.value);
												setOpen(true);
											},
											onFocus: () => setOpen(true),
											placeholder: "جست‌وجوی درس یا تکنیک",
											className: "h-11 w-full rounded-xl border border-border bg-surface ps-10 pe-10 text-sm outline-none placeholder:text-muted",
											"aria-label": "جست‌وجو"
										}),
										q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "absolute end-2 top-1/2 -translate-y-1/2 p-2 text-muted",
											onClick: () => setQ(""),
											"aria-label": "پاک کردن",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										}),
										open && q && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute z-30 mt-2 w-full rounded-xl border border-border bg-surface p-2 shadow-lg",
											children: [results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "px-2 py-3 text-sm text-muted",
												children: "چیزی پیدا نشد."
											}), results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "flex w-full flex-col rounded-lg px-2 py-2 text-start hover:bg-elevated",
												onClick: () => go(item.kind, item.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: item.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted",
													children: item.kicker
												})]
											}, `${item.kind}-${item.id}`))]
										})
									]
								})
							]
						}), more && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-2 gap-2 md:hidden",
							children: moreLinks.map((item) => {
								const Icon = item.icon;
								const on = active(path, item.to, false);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									onClick: () => setMore(false),
									className: cn("flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-border px-3 text-sm", on ? "bg-elevated text-fg" : "text-muted"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" }), item.label]
								}, item.to);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 px-4 py-5 md:px-8 md:py-8 pb-nav md:pb-10",
						children
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto flex max-w-lg items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]",
					children: nav.map((item) => {
						const on = active(path, item.to, item.exact);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]", on ? "text-primary" : "text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
							})
						}, item.to);
					})
				})
			})
		]
	});
	function go(kind, id) {
		setQ("");
		setOpen(false);
		if (kind === "module") navigate({
			to: "/learn/$moduleId",
			params: { moduleId: id }
		});
		else navigate({
			to: "/technique/$techniqueId",
			params: { techniqueId: id }
		});
	}
}
function SideLink({ to, label, icon: Icon, path }) {
	const on = active(path, to, false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex min-h-11 items-center gap-3 rounded-xl px-3", on ? "bg-elevated text-fg" : "text-muted hover:bg-elevated hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
var styles_default = "/assets/styles-F2F1KkF3.css";
var Route$14 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ORBIT" },
			{
				name: "description",
				content: "مدار یادگیری: دستیار، آکادمی و تمرین مهارت به فارسی."
			},
			{
				name: "theme-color",
				content: "#0c1014"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$13 = () => import("./routes-B09w-7n5.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "ORBIT · مدار یادگیری" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./academy-BzEvQQAo.mjs");
var Route$12 = createFileRoute("/academy")({
	head: () => ({ meta: [{ title: "آکادمی · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin-Ck31-3W1.mjs");
var Route$11 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "استودیو · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./analyze-BV91C19b.mjs");
var Route$10 = createFileRoute("/analyze")({
	head: () => ({ meta: [{ title: "تحلیل · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./assistant-JSfqYXxg.mjs");
var Route$9 = createFileRoute("/assistant")({
	head: () => ({ meta: [{ title: "دستیار · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./library-QEZofvaH.mjs");
var Route$8 = createFileRoute("/library")({
	head: () => ({ meta: [{ title: "کتابخانه · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./placement-0PS0fR2e.mjs");
var Route$7 = createFileRoute("/placement")({
	head: () => ({ meta: [{ title: "تعیین سطح · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./profile-jNUANBqM.mjs");
var Route$6 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "پروفایل · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./review-C-zKY0pf.mjs");
var Route$5 = createFileRoute("/review")({
	head: () => ({ meta: [{ title: "مدار امروز · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./techniques-CsxKWiYS.mjs");
var Route$4 = createFileRoute("/techniques")({
	head: () => ({ meta: [{ title: "تکنیک‌ها · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./tools-DE1hWuoO.mjs");
var Route$3 = createFileRoute("/tools")({
	head: () => ({ meta: [{ title: "ابزارها · ORBIT" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./academy._domainId-C7E-DWwI.mjs");
var Route$2 = createFileRoute("/academy/$domainId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./learn._moduleId-Bfw_zfOe.mjs");
var Route$1 = createFileRoute("/learn/$moduleId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./technique._techniqueId-BbiaNpDg.mjs");
var Route = createFileRoute("/technique/$techniqueId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AcademyRoute = Route$12.update({
	id: "/academy",
	path: "/academy",
	getParentRoute: () => Route$14
});
var AdminRoute = Route$11.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$14
});
var AnalyzeRoute = Route$10.update({
	id: "/analyze",
	path: "/analyze",
	getParentRoute: () => Route$14
});
var AssistantRoute = Route$9.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => Route$14
});
var LibraryRoute = Route$8.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$14
});
var PlacementRoute = Route$7.update({
	id: "/placement",
	path: "/placement",
	getParentRoute: () => Route$14
});
var ProfileRoute = Route$6.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$14
});
var ReviewRoute = Route$5.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$14
});
var TechniquesRoute = Route$4.update({
	id: "/techniques",
	path: "/techniques",
	getParentRoute: () => Route$14
});
var ToolsRoute = Route$3.update({
	id: "/tools",
	path: "/tools",
	getParentRoute: () => Route$14
});
var AcademyDomainIdRoute = Route$2.update({
	id: "/$domainId",
	path: "/$domainId",
	getParentRoute: () => AcademyRoute
});
var LearnModuleIdRoute = Route$1.update({
	id: "/learn/$moduleId",
	path: "/learn/$moduleId",
	getParentRoute: () => Route$14
});
var TechniqueTechniqueIdRoute = Route.update({
	id: "/technique/$techniqueId",
	path: "/technique/$techniqueId",
	getParentRoute: () => Route$14
});
var AcademyRouteChildren = { AcademyDomainIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AcademyRoute: AcademyRoute._addFileChildren(AcademyRouteChildren),
	AdminRoute,
	AnalyzeRoute,
	AssistantRoute,
	LibraryRoute,
	PlacementRoute,
	ProfileRoute,
	ReviewRoute,
	TechniquesRoute,
	ToolsRoute,
	LearnModuleIdRoute,
	TechniqueTechniqueIdRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { scoreAnswer as C, sampleChat as S, techniqueQuizzes as T, getTechnique as _, cn as a, mergeTechniques as b, stageOf as c, detectTechniques as d, domains as f, getModule as g, getDomain as h, Route$2 as i, useOrbit as l, evidenceLabel as m, Route as n, achievementDefs as o, ethicsLabel as p, Route$1 as r, localDate as s, router_exports as t, allModules as u, levelFor as v, stageNames as w, moduleQuizzes as x, localTutor as y };
