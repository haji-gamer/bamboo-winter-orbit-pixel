import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { localTutor } from "@/data/catalog";
import { askOrbit, aiStatus } from "@/lib/ai.functions";
import { useOrbit, type ChatMessage } from "@/lib/store";
import { Panel } from "@/components/bits";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "دستیار · ORBIT" }] }),
  component: AssistantPage,
});

const suggestions = ["تحقیر ملایم را ساده توضیح بده", "فرق مرز و تهدید چیست؟", "یک پرامپت مبتدی برای خلاصهٔ متن بساز"];

function AssistantPage() {
  const threads = useOrbit((s) => s.threads);
  const activeThread = useOrbit((s) => s.activeThread);
  const append = useOrbit((s) => s.appendMessage);
  const removeThread = useOrbit((s) => s.removeThread);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [modelOn, setModelOn] = useState<boolean | null>(null);
  const thread = threads.find((item) => item.id === activeThread) ?? null;

  useEffect(() => {
    void aiStatus().then((res) => setModelOn(res.available)).catch(() => setModelOn(false));
    const draft = sessionStorage.getItem("orbit-draft");
    if (draft) {
      setText(draft);
      sessionStorage.removeItem("orbit-draft");
    }
  }, []);

  function openNew() {
    const id = `t-${Date.now()}`;
    useOrbit.setState((s) => ({
      activeThread: id,
      threads: [{ id, title: "گفت‌وگوی تازه", messages: [], updated: new Date().toISOString() }, ...s.threads].slice(0, 12),
    }));
  }

  async function send(content: string) {
    const clean = content.trim();
    if (!clean || busy) return;
    setBusy(true);
    setText("");
    let threadId = useOrbit.getState().activeThread;
    if (!threadId || !useOrbit.getState().threads.some((item) => item.id === threadId)) {
      threadId = `t-${Date.now()}`;
      useOrbit.setState((s) => ({
        activeThread: threadId,
        threads: [{ id: threadId!, title: clean.slice(0, 42), messages: [], updated: new Date().toISOString() }, ...s.threads].slice(0, 12),
      }));
    }
    const userMsg: ChatMessage = { role: "user", content: clean, via: "user" };
    append(threadId, userMsg);
    const history = (useOrbit.getState().threads.find((item) => item.id === threadId)?.messages ?? []).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    try {
      const res = await askOrbit({ data: { mode: "chat", messages: history } });
      if (res.ok) append(threadId, { role: "assistant", content: res.text, via: "xai" });
      else append(threadId, { role: "assistant", content: localTutor(clean, useOrbit.getState().customTechniques, useOrbit.getState().voice), via: "local" });
    } catch {
      append(threadId, { role: "assistant", content: localTutor(clean, useOrbit.getState().customTechniques, useOrbit.getState().voice), via: "local" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
      <Panel className="space-y-2">
        <button type="button" onClick={openNew} className="min-h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-fg">گفت‌وگوی تازه</button>
        <p className="text-xs leading-5 text-muted">{modelOn ? "مدل Grok 4.5 روشن است. هر ارسال یک درخواست است." : modelOn === false ? "مدل خاموش است؛ پاسخ از دانشنامهٔ محلی می‌آید." : "در حال دیدن وضعیت مدل…"}</p>
        <ul className="space-y-1">
          {threads.map((item) => (
            <li key={item.id} className="flex gap-1">
              <button type="button" onClick={() => useOrbit.setState({ activeThread: item.id })} className="min-h-11 flex-1 truncate rounded-lg px-2 text-start text-sm hover:bg-elevated">
                {item.title}
              </button>
              <button type="button" aria-label="حذف گفت‌وگو" onClick={() => removeThread(item.id)} className="min-h-11 px-2 text-xs text-muted">حذف</button>
            </li>
          ))}
        </ul>
      </Panel>
      <section className="flex min-h-[60dvh] flex-col gap-3">
        <header>
          <h1 className="text-2xl font-bold">دستیار</h1>
          <p className="text-sm text-muted">پاسخ‌ها فارسی و مبتدی‌اند. تکنیک دستکاری توصیه نمی‌شود.</p>
        </header>
        <div className="flex-1 space-y-3">
          {(thread?.messages ?? []).map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ms-8 rounded-2xl bg-elevated p-3 text-sm leading-7" : "me-8 rounded-2xl border border-border p-3 text-sm leading-7"}>
              <p className="mb-1 text-[11px] text-muted">{message.role === "user" ? "تو" : message.via === "xai" ? "Grok 4.5" : "دانشنامهٔ محلی"}</p>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {!thread?.messages.length && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button key={item} type="button" onClick={() => void send(item)} className="min-h-11 rounded-full border border-border px-3 text-sm">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); void send(text); }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} dir="auto" rows={2} className="min-h-11 flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none" placeholder="سؤال، موقعیت، یا یک تکنیک" />
          <button type="submit" disabled={busy || !text.trim()} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-40">
            {busy ? "…" : "بفرست"}
          </button>
        </form>
      </section>
    </div>
  );
}
