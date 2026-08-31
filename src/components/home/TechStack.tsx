import { TECH_STACK } from "@/lib/site-data";

export function TechStack() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Engineering stack</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Proven technology, chosen deliberately</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {TECH_STACK.map((t) => (
          <span
            key={t}
            className="cursor-default rounded-full border border-border bg-card px-5 py-2.5 text-sm text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
