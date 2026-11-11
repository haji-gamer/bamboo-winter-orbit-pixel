import { _ as getTechnique, c as stageOf, f as domains, g as getModule, s as localDate } from "./router-CezrZMOo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-9Vknut8w.js
function lessonBits(id, custom) {
	if (id.startsWith("mod:")) {
		const hit = getModule(id.slice(4));
		if (!hit) return null;
		return {
			kind: "module",
			title: hit.module.title,
			kicker: hit.domain.title,
			prompt: hit.module.practice,
			answer: hit.module.modelAnswer,
			moduleId: hit.module.id
		};
	}
	if (id.startsWith("tech:")) {
		const tech = getTechnique(id.slice(5), custom);
		if (!tech) return null;
		return {
			kind: "technique",
			title: tech.fa,
			kicker: tech.en,
			prompt: `چطور «${tech.fa}» را تشخیص می‌دهی و چه پاسخ محترمانه‌ای می‌دهی؟`,
			answer: tech.counter,
			techniqueId: tech.id
		};
	}
	return null;
}
function dueIds(items, today = localDate()) {
	return Object.entries(items).filter(([, item]) => item.nextReview && item.nextReview <= today).sort((a, b) => (a[1].nextReview ?? "").localeCompare(b[1].nextReview ?? "")).map(([id]) => id);
}
function nextUnseenId(items, placement) {
	const ordered = [...domains.filter((d) => d.id === placement), ...domains.filter((d) => d.id !== placement)];
	for (const domain of ordered) for (const course of domain.courses) for (const chapter of course.chapters) for (const module of chapter.modules) {
		const id = `mod:${module.id}`;
		if (!items[id]?.seen) return id;
	}
	return null;
}
function circuitPlan(items, placement) {
	const due = dueIds(items).slice(0, 4);
	const weak = Object.entries(items).filter(([id, item]) => !due.includes(id) && item.errors > 0 && stageOf(item) < 9).sort((a, b) => b[1].errors - a[1].errors).slice(0, 2).map(([id]) => id);
	const next = nextUnseenId(items, placement);
	const ids = [...due, ...weak];
	if (next && !ids.includes(next)) ids.push(next);
	if (!ids.length) {
		const low = Object.entries(items).filter(([, item]) => stageOf(item) < 9).sort((a, b) => stageOf(a[1]) - stageOf(b[1]))[0];
		if (low) ids.push(low[0]);
	}
	return ids.map((id) => ({
		id,
		reason: due.includes(id) ? "due" : id === next ? "next" : "weak"
	}));
}
var reasonLabel = {
	due: "مرور سررسید",
	weak: "نقطهٔ ضعف",
	next: "درس بعدی"
};
function todayScript(items, placement, custom) {
	const plan = circuitPlan(items, placement);
	if (!plan.length) return "مدار امروز ORBIT خلوت است. یک درس تازه از آکادمی باز کن.";
	return [
		"مدار امروز ORBIT",
		...plan.map((row, index) => {
			const bits = lessonBits(row.id, custom);
			return `${index + 1}. ${bits?.title ?? "مورد"} — ${reasonLabel[row.reason]}`;
		}),
		"هر مورد را با پاسخ خودت ببند، نه با حفظ تعریف."
	].join("\n");
}
//#endregion
export { todayScript as a, reasonLabel as i, dueIds as n, lessonBits as r, circuitPlan as t };
