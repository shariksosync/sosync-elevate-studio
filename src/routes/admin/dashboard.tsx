import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  CalendarClock,
  LogOut,
  MessageSquareQuote,
  PhoneCall,
  Settings as SettingsIcon,
  Star,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ADMIN_SESSION_KEY,
  useSite,
  type EnquiryStatus,
  type SiteSettings,
} from "@/components/SiteProvider";
import type { PortfolioProject } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Management Console | SOSync AI Tech" },
      { name: "description", content: "Internal console for enquiries, bookings, portfolio and site settings." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Management Console | SOSync AI Tech" },
      { property: "og:description", content: "Internal console for SOSync AI Tech staff." },
    ],
  }),
  component: AdminDashboard,
});

const MODULES = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "enquiries", label: "Service Enquiries", icon: MessageSquareQuote },
  { id: "callbacks", label: "Callback Requests", icon: PhoneCall },
  { id: "demos", label: "Demo Bookings", icon: CalendarClock },
  { id: "projects", label: "Portfolio Projects", icon: Briefcase },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "settings", label: "Website Settings", icon: SettingsIcon },
] as const;

type ModuleId = (typeof MODULES)[number]["id"];

const STATUSES: EnquiryStatus[] = ["Pending", "Contacted", "In Progress", "Closed"];

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<ModuleId>("overview");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(ADMIN_SESSION_KEY)) {
      navigate({ to: "/admin/login", replace: true });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) return <div className="p-16 text-center text-sm text-muted-foreground">Checking session…</div>;

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8">
      <aside
        className={cn(
          "w-60 shrink-0 space-y-1 rounded-xl border border-border bg-card p-3",
          navOpen ? "block" : "hidden lg:block",
        )}
      >
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActive(m.id);
              setNavOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
              active === m.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            <m.icon className="h-4 w-4" /> {m.label}
          </button>
        ))}
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <p className="text-sm font-semibold">SOSync Console</p>
              <p className="text-xs text-muted-foreground">Signed in as staff</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem(ADMIN_SESSION_KEY);
              navigate({ to: "/admin/login", replace: true });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Exit
          </Button>
        </header>

        <div className="mt-6">
          {active === "overview" && <Overview />}
          {active === "enquiries" && <Enquiries />}
          {active === "callbacks" && <Callbacks />}
          {active === "demos" && <Demos />}
          {active === "projects" && <Projects />}
          {active === "testimonials" && <TestimonialsAdmin />}
          {active === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty({ what }: { what: string }) {
  return <p className="text-sm text-muted-foreground">No {what} yet.</p>;
}

function Overview() {
  const { enquiries, callbacks, demos, projects, testimonials } = useSite();
  const avg = testimonials.length
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : "—";
  const cards = [
    { label: "Total Enquiries", value: enquiries.length },
    { label: "Pending Callbacks", value: callbacks.filter((c) => c.status === "Pending").length },
    { label: "Demo Bookings", value: demos.length },
    { label: "Active Projects", value: projects.length },
    { label: "Average Rating", value: avg },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
          <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
        </div>
      ))}
    </div>
  );
}

function Enquiries() {
  const { enquiries, updateEnquiryStatus } = useSite();
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      enquiries.filter((e) =>
        `${e.name} ${e.company} ${e.email} ${e.service}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [enquiries, q],
  );

  return (
    <Panel title="Service Enquiries">
      <Input placeholder="Search by name, company, email or service" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="mt-4 overflow-x-auto">
        {rows.length === 0 ? (
          <Empty what="enquiries" />
        ) : (
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2">Name</th>
                <th>Service</th>
                <th>Contact</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-t border-border align-top">
                  <td className="py-3">
                    <p className="font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.company}</p>
                  </td>
                  <td className="py-3">{e.service}</td>
                  <td className="py-3 text-xs text-muted-foreground">
                    {e.phone}
                    <br />
                    {e.email}
                  </td>
                  <td className="py-3">{e.budget}</td>
                  <td className="py-3">
                    <select
                      className="h-9 rounded-md border border-input bg-background px-2 text-xs"
                      value={e.status}
                      onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value as EnquiryStatus)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Panel>
  );
}

function Callbacks() {
  const { callbacks, toggleCallback } = useSite();
  return (
    <Panel title="Callback Requests">
      {callbacks.length === 0 ? (
        <Empty what="callback requests" />
      ) : (
        <ul className="space-y-3">
          {callbacks.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.phone} · {c.preferredTime}
                </p>
              </div>
              <Button size="sm" variant={c.status === "Called" ? "secondary" : "default"} onClick={() => toggleCallback(c.id)}>
                {c.status}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function Demos() {
  const { demos } = useSite();
  return (
    <Panel title="Demo Bookings">
      {demos.length === 0 ? (
        <Empty what="demo bookings" />
      ) : (
        <ul className="space-y-3">
          {demos.map((d) => (
            <li key={d.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-medium">
                  {d.name} · <span className="text-muted-foreground">{d.company}</span>
                </p>
                <p className="text-xs text-primary">{d.preferredDate}</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {d.phone} · {d.email} · {d.service}
              </p>
              {d.notes && <p className="mt-2 text-sm text-muted-foreground">{d.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

const BLANK_PROJECT: PortfolioProject = {
  id: "",
  title: "",
  category: "E-Commerce",
  summary: "",
  description: "",
  metrics: [],
  stack: [],
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  featured: false,
};

function Projects() {
  const { projects, saveProject, deleteProject, toggleFeatured } = useSite();
  const [draft, setDraft] = useState<PortfolioProject | null>(null);

  const save = () => {
    if (!draft) return;
    if (!draft.title.trim()) {
      toast.error("Project title is required.");
      return;
    }
    saveProject({ ...draft, id: draft.id || Math.random().toString(36).slice(2, 10) });
    setDraft(null);
    toast.success("Project saved.");
  };

  return (
    <Panel title="Portfolio Projects">
      <Button size="sm" onClick={() => setDraft({ ...BLANK_PROJECT })}>
        Add Project
      </Button>

      {draft && (
        <div className="mt-4 space-y-3 rounded-lg border border-primary/40 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="p-title">Title</Label>
              <Input id="p-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-cat">Category</Label>
              <select
                id="p-cat"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as PortfolioProject["category"] })}
              >
                <option>E-Commerce</option>
                <option>ERP / Software</option>
                <option>Portals</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-image">Image URL</Label>
            <Input id="p-image" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-summary">Summary</Label>
            <Input id="p-summary" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-desc">Description</Label>
            <Textarea id="p-desc" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-stack">Tech stack (comma separated)</Label>
            <Input
              id="p-stack"
              value={draft.stack.join(", ")}
              onChange={(e) => setDraft({ ...draft, stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={save}>Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setDraft(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <ul className="mt-5 space-y-3">
        {projects.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <img src={p.image} alt={p.title} className="h-12 w-16 rounded object-cover" />
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={p.featured ? "default" : "outline"} onClick={() => toggleFeatured(p.id)}>
                {p.featured ? "Featured" : "Not featured"}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setDraft(p)}>Edit</Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm(`Delete "${p.title}"? This cannot be undone.`)) {
                    deleteProject(p.id);
                    toast.success("Project deleted.");
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function TestimonialsAdmin() {
  const { testimonials, setTestimonialApproved } = useSite();
  return (
    <Panel title="Testimonials & Feedback">
      {testimonials.length === 0 ? (
        <Empty what="reviews" />
      ) : (
        <ul className="space-y-3">
          {testimonials.map((t) => (
            <li key={t.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {t.name} · <span className="text-muted-foreground">{t.company}</span>
                  </p>
                  <p className="text-xs text-primary">{"★".repeat(t.rating)}</p>
                </div>
                <Button
                  size="sm"
                  variant={t.approved ? "secondary" : "default"}
                  onClick={() => setTestimonialApproved(t.id, !t.approved)}
                >
                  {t.approved ? "Hide from site" : "Approve"}
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.review}</p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function SettingsPanel() {
  const { settings, updateSettings } = useSite();
  const [form, setForm] = useState<SiteSettings>(settings);

  const field = (key: keyof SiteSettings, label: string) => (
    <div className="space-y-2">
      <Label htmlFor={`s-${key}`}>{label}</Label>
      <Input id={`s-${key}`} value={String(form[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
    </div>
  );

  return (
    <Panel title="Website Settings">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("phone", "Primary phone")}
        {field("altPhone", "Alternate phone")}
        {field("email", "Email")}
        {field("hours", "Operating hours")}
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="s-address">Address</Label>
        <Textarea id="s-address" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="s-ann">Announcement banner text</Label>
        <Textarea id="s-ann" rows={2} value={form.announcementText} onChange={(e) => setForm({ ...form, announcementText: e.target.value })} />
      </div>
      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Switch
            id="s-ann-on"
            checked={form.announcementEnabled}
            onCheckedChange={(v) => setForm({ ...form, announcementEnabled: v })}
          />
          <Label htmlFor="s-ann-on">Announcement enabled</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="s-maint"
            checked={form.maintenanceMode}
            onCheckedChange={(v) => setForm({ ...form, maintenanceMode: v })}
          />
          <Label htmlFor="s-maint">Maintenance mode</Label>
        </div>
      </div>
      <Button
        className="mt-6"
        onClick={() => {
          updateSettings(form);
          toast.success("Settings saved.");
        }}
      >
        Save Settings
      </Button>
    </Panel>
  );
}
