import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSite } from "@/components/SiteProvider";
import { CONTACT } from "@/lib/site-data";
import { cn } from "@/lib/utils";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const GREETING: Msg = {
  from: "bot",
  text: "Hi! I'm SOSync Assist. Ask me about services, pricing, delivery timelines or book a ₹1 demo.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("budget"))
    return "Pricing depends on scope. Most websites start around ₹35,000 and ERP modules from ₹1,50,000. Book a ₹1 demo for an exact quote.";
  if (q.includes("time") || q.includes("deliver") || q.includes("week"))
    return "Typical delivery is 1–3 weeks for websites and focused software modules; larger ERP rollouts are phased.";
  if (q.includes("support") || q.includes("warranty"))
    return "Every engagement includes six months of free support — bug fixes, patches and minor updates, worth ₹25,000+.";
  if (q.includes("ai") || q.includes("automation") || q.includes("chatbot"))
    return "We build RAG assistants, document intelligence and workflow automation on Python, NLP and modern LLM stacks.";
  if (q.includes("contact") || q.includes("call") || q.includes("phone"))
    return `You can reach us at ${CONTACT.phone} or ${CONTACT.email}. Our office is in Kharadi, Pune.`;
  if (q.includes("demo"))
    return "Great — tap the 'Book ₹1 Demo' button and pick a slot. A senior engineer will walk you through a working build.";
  return "I've noted that. A consultant can go deeper — book a ₹1 demo or request a callback and we'll take it from there.";
}

export function AIChatbot() {
  const { openModal } = useSite();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }, { from: "bot", text: reply(text) }]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-30 h-12 gap-2 rounded-full shadow-lg"
          aria-label="Open AI assistant"
        >
          <Bot className="h-5 w-5" />
          <span className="hidden sm:inline">Ask AI</span>
        </Button>
      )}

      {open && (
        <div className="fixed bottom-6 right-4 z-40 flex h-[26rem] w-[min(22rem,calc(100vw-2rem))] flex-col rounded-xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-4 w-4 text-primary" /> SOSync Assist
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                  m.from === "bot"
                    ? "bg-secondary text-secondary-foreground"
                    : "ml-auto bg-primary text-primary-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <Button variant="secondary" size="sm" className="mb-2 w-full" onClick={() => openModal("demo")}>
              Book ₹1 Demo
            </Button>
            <form onSubmit={send} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question…" maxLength={300} />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
