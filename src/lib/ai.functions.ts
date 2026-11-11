import { createServerFn } from "@tanstack/react-start";

type Turn = { role: "user" | "assistant"; content: string };

const systems = {
  chat: `تو دستیار ORBIT هستی. فارسی ساده و مبتدی حرف بزن. اصطلاح تخصصی را همان‌جا معنی کن.
تکنیک ارتباطی را توضیح بده اما استفاده از تکنیک دستکاری‌گرانه را توصیه نکن. بین شناخت، توضیح، و توصیه فرق بگذار.
اگر شواهد کم است بگو تفسیر آموزشی یا تجربهٔ میدانی است نه قانون علمی. پاسخ را کوتاه و مشخص نگه دار.`,
  evaluate: `پاسخ تمرینی کاربر را فارسی و دقیق ارزیابی کن. نمرهٔ ۰ تا ۱۰۰ بده.
ساختار: نمره، دو نقطهٔ قوت یا یک جمله اگر ضعیف است، اشتباه اصلی، یک پاسخ بهتر.
حفظ تعریف به‌تنهایی نمرهٔ تسلط نگیرد. اگر پاسخ، تکنیک دستکاری را توصیه کند نمره را کم کن و دلیل اخلاقی بگو.`,
  analyze: `مکالمه را برای تکنیک‌های ارتباطی محتمل بررسی کن. برای هر مورد: نام، هدف احتمالی، اثر روانی محتمل، و یک پاسخ محترمانه.
قطعیت را بالا نبر. اگر شاهد کم است بگو نامطمئن. توصیه به استفاده از دستکاری نده.`,
} as const;

export const aiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { available: Boolean(process.env.XAI_API_KEY), model: "grok-4.5" };
});

export const askOrbit = createServerFn({ method: "POST" })
  .validator((input: { mode?: keyof typeof systems; messages?: Turn[]; context?: string }) => {
    const mode = input.mode ?? "chat";
    if (!(mode in systems)) throw new Error("حالت نامعتبر است");
    const messages = Array.isArray(input.messages) ? input.messages.slice(-8) : [];
    if (!messages.length) throw new Error("پیامی نیست");
    const clean = messages.map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: String(m.content ?? "").slice(0, 2000),
    }));
    if (clean[clean.length - 1]?.role !== "user") throw new Error("آخرین پیام باید از کاربر باشد");
    return { mode, messages: clean, context: String(input.context ?? "").slice(0, 3500) };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "unavailable" };
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: data.mode === "chat" ? 700 : 520,
          messages: [
            { role: "system", content: systems[data.mode] + (data.context ? `\n\nزمینه:\n${data.context}` : "") },
            ...data.messages,
          ],
        }),
      });
      if (!res.ok) return { ok: false as const, error: `خطای مدل (${res.status})` };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "پاسخ خالی بود" };
      return { ok: true as const, text, model: "grok-4.5" };
    } catch {
      return { ok: false as const, error: "ارتباط با مدل برقرار نشد" };
    }
  });
