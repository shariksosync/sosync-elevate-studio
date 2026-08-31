import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";

export function FinalCTA() {
  const { openModal } = useSite();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="rounded-2xl border border-primary/30 bg-[image:var(--gradient-solar)] p-10 text-center text-primary-foreground sm:p-16">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Innovate. Integrate. Elevate.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
          Book a ₹1 consultation and leave with a scoped delivery plan — timeline, stack and pricing, no obligation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="secondary" onClick={() => openModal("demo")}>
            Book ₹1 Demo
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary-foreground/40 bg-transparent">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
