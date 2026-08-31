import { ShieldCheck, Timer, LifeBuoy } from "lucide-react";

const ITEMS = [
  {
    icon: LifeBuoy,
    title: "6 Months Free Support",
    badge: "Worth ₹25,000+",
    text: "Bug fixes, security patches and minor updates included after go-live — no retainer required.",
  },
  {
    icon: ShieldCheck,
    title: "100% IP Ownership",
    badge: "Source code yours",
    text: "You receive the complete source code, documentation and infrastructure access at handover.",
  },
  {
    icon: Timer,
    title: "Rapid 1–3 Weeks Delivery",
    badge: "Fixed timeline",
    text: "Senior-only squads and pre-built foundations mean production launches in weeks, not quarters.",
  },
];

export function ValueProps() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 md:grid-cols-3">
        {ITEMS.map((i) => (
          <div key={i.title} className="rounded-xl border border-border bg-background p-7">
            <i.icon className="h-9 w-9 text-primary" />
            <span className="mt-5 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {i.badge}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
