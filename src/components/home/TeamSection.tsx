import { LEADERSHIP, SENIOR_SQUAD, type TeamMember } from "@/lib/site-data";

function Grid({ people }: { people: TeamMember[] }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {people.map((m) => (
        <div key={m.name} className="rounded-xl border border-border bg-card p-4 text-center">
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-primary/40"
          />
          <h3 className="mt-4 text-sm font-semibold">{m.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{m.role}</p>
        </div>
      ))}
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">The people</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Senior-only, no junior hand-offs</h2>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Leadership</h3>
        <Grid people={LEADERSHIP} />

        <h3 className="mt-12 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Senior Squad</h3>
        <Grid people={SENIOR_SQUAD} />
      </div>
    </section>
  );
}
