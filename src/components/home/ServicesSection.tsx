import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";
import { SERVICES, SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const { openModal } = useSite();
  const [active, setActive] = useState<ServiceCategory | "All">("All");
  const list = active === "All" ? SERVICES : SERVICES.filter((s) => s.category === active);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our divisions</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Six divisions, one accountable partner</h2>
        <p className="mt-4 text-muted-foreground">
          From the first wireframe to the production cluster, every capability you need sits under one roof.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", ...SERVICE_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <article
            key={s.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
          >
            <img src={s.image} alt={s.title} loading="lazy" className="h-40 w-full object-cover" />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                className="mt-6 w-full"
                onClick={() => openModal("enquiry", { service: s.title })}
              >
                Enquire Now
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
