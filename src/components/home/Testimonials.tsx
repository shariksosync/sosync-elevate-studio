import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials, openModal } = useSite();
  const approved = testimonials.filter((t) => t.approved);
  const [i, setI] = useState(0);
  const current = approved[i % Math.max(approved.length, 1)];

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Client voices</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What our clients say</h2>

      {current ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-8">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={cn("h-5 w-5", n <= current.rating ? "fill-primary text-primary" : "text-muted-foreground")}
              />
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">“{current.review}”</p>
          <p className="mt-6 font-semibold">{current.name}</p>
          <p className="text-sm text-muted-foreground">{current.company}</p>

          {approved.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <Button
                size="icon"
                variant="outline"
                aria-label="Previous review"
                onClick={() => setI((v) => (v - 1 + approved.length) % approved.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                aria-label="Next review"
                onClick={() => setI((v) => (v + 1) % approved.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted-foreground">No reviews published yet.</p>
      )}

      <Button variant="secondary" className="mt-8" onClick={() => openModal("feedback")}>
        Leave Your Feedback
      </Button>
    </section>
  );
}
