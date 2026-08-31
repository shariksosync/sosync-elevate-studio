import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Senior Engineers" },
  { value: 12, suffix: "+", label: "Countries Served" },
];

function Counter({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const total = 50;
    const id = setInterval(() => {
      frame += 1;
      setN(Math.round((target * frame) / total));
      if (frame >= total) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [run, target]);
  return (
    <span className="text-4xl font-extrabold text-primary sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <Counter target={s.value} suffix={s.suffix} run={visible} />
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
