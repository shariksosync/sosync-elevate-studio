import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";
import { PORTFOLIO_CATEGORIES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio & Case Studies | SOSync AI Tech" },
      {
        name: "description",
        content:
          "Explore live e-commerce stores, campus ERP systems and portals delivered by SOSync AI Tech, with real performance metrics.",
      },
      { property: "og:title", content: "Portfolio & Case Studies | SOSync AI Tech" },
      {
        property: "og:description",
        content: "Production software delivered for retail, education and D2C brands across India.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { projects, openModal } = useSite();
  const [filter, setFilter] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Portfolio</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Work that is live, measured and maintained</h1>

      <div className="mt-8 flex flex-wrap gap-2">
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

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <img src={p.image} alt={p.title} loading="lazy" className="h-48 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-primary">{p.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {p.metrics.map((m) => (
                  <div key={m.label} className="rounded-md border border-border p-2 text-center">
                    <p className="text-sm font-bold text-primary">{m.value}</p>
                    <p className="text-[10px] text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                className="mt-5 w-full"
                onClick={() => openModal("caseStudy", { project: p })}
              >
                View Case Study
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
