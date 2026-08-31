import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "IT Services & Divisions | SOSync AI Tech" },
      {
        name: "description",
        content:
          "Website development, ERP software, enterprise IT, growth marketing, graphic design and AI automation — full capability breakdown from SOSync AI Tech.",
      },
      { property: "og:title", content: "IT Services & Divisions | SOSync AI Tech" },
      {
        property: "og:description",
        content: "Six divisions covering web, software, cloud, marketing, design and AI automation.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { openModal } = useSite();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Services</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Everything your technology roadmap needs</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Six specialised divisions, one delivery standard: senior engineers, fixed timelines, 100% IP ownership and six
        months of free support.
      </p>

      <div className="mt-14 space-y-14">
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>figure]:order-2" : ""}`}
          >
            <figure className="overflow-hidden rounded-xl border border-border">
              <img src={s.image} alt={s.title} loading="lazy" className="h-64 w-full object-cover" />
            </figure>
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">{s.category}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-7" onClick={() => openModal("enquiry", { service: s.title })}>
                Enquire About {s.title}
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
