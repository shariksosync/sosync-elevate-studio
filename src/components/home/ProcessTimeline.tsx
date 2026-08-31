import { PROCESS_STEPS } from "@/lib/site-data";

export function ProcessTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">How we deliver</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A nine-step process with no surprises</h2>
      </div>

      <ol className="mt-12 space-y-6 border-l border-border pl-6">
        {PROCESS_STEPS.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="absolute -left-[2.1rem] flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-background text-xs font-bold text-primary">
              {i + 1}
            </span>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
