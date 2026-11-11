import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-a98MZAb2.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var systems = {
	chat: `تو دستیار ORBIT هستی. فارسی ساده و مبتدی حرف بزن. اصطلاح تخصصی را همان‌جا معنی کن.
تکنیک ارتباطی را توضیح بده اما استفاده از تکنیک دستکاری‌گرانه را توصیه نکن. بین شناخت، توضیح، و توصیه فرق بگذار.
اگر شواهد کم است بگو تفسیر آموزشی یا تجربهٔ میدانی است نه قانون علمی. پاسخ را کوتاه و مشخص نگه دار.`,
	evaluate: `پاسخ تمرینی کاربر را فارسی و دقیق ارزیابی کن. نمرهٔ ۰ تا ۱۰۰ بده.
ساختار: نمره، دو نقطهٔ قوت یا یک جمله اگر ضعیف است، اشتباه اصلی، یک پاسخ بهتر.
حفظ تعریف به‌تنهایی نمرهٔ تسلط نگیرد. اگر پاسخ، تکنیک دستکاری را توصیه کند نمره را کم کن و دلیل اخلاقی بگو.`,
	analyze: `مکالمه را برای تکنیک‌های ارتباطی محتمل بررسی کن. برای هر مورد: نام، هدف احتمالی، اثر روانی محتمل، و یک پاسخ محترمانه.
قطعیت را بالا نبر. اگر شاهد کم است بگو نامطمئن. توصیه به استفاده از دستکاری نده.`
};
var aiStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("eb2ee64070a95f5ca231302b02ebc4033bc4338affec0d905e7b745c92a76c32"));
var askOrbit = createServerFn({ method: "POST" }).validator((input) => {
	const mode = input.mode ?? "chat";
	if (!(mode in systems)) throw new Error("حالت نامعتبر است");
	const messages = Array.isArray(input.messages) ? input.messages.slice(-8) : [];
	if (!messages.length) throw new Error("پیامی نیست");
	const clean = messages.map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: String(m.content ?? "").slice(0, 2e3)
	}));
	if (clean[clean.length - 1]?.role !== "user") throw new Error("آخرین پیام باید از کاربر باشد");
	return {
		mode,
		messages: clean,
		context: String(input.context ?? "").slice(0, 3500)
	};
}).handler(createSsrRpc("f6717bba64fa78c171d7b6f95687c48995aa654f373ab149fbf9c43de8e26736"));
//#endregion
export { askOrbit as n, aiStatus as t };
