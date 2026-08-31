import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/SiteProvider";
import { PORTFOLIO_CATEGORIES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const { projects, openModal } = useSite();
  const [filter, setFilter] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Selected work</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Products in production, not slideware</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => openModal("caseStudy", { project: p })}
              className="group overflow-hidden rounded-xl border border-border bg-background text-left transition-colors hover:border-primary/60"
            >
              <div className="relative">
                <img src={p.image} alt={p.title} loading="lazy" className="h-48 w-full object-cover" />
                {p.featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-primary">{p.category}</p>
                <h3 className="mt-2 flex items-center gap-1 text-lg font-semibold">
                  {p.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
