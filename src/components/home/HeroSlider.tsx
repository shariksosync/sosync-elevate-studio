import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";
import { HERO_SLIDES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const { openModal } = useSite();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.title}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/60" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20">
        {HERO_SLIDES.map((s, i) => (
          <div key={s.badge} className={cn("max-w-2xl", i === index ? "block" : "hidden")}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {s.badge}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {s.title}
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">{s.subtitle}</p>
          </div>
        ))}

        <div className="mt-9 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => openModal("demo")}>
            Book ₹1 Demo
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>

        <div className="mt-10 flex gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.image}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-10 bg-primary" : "w-5 bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
