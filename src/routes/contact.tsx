import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSite } from "@/components/SiteProvider";
import { CONTACT, FAQS, SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SOSync AI Tech | Kharadi, Pune" },
      {
        name: "description",
        content:
          "Talk to SOSync AI Tech in Kharadi, Pune. Call +91 91724 03714, email support@sosyncaitech.in, or send a project enquiry.",
      },
      { property: "og:title", content: "Contact SOSync AI Tech | Kharadi, Pune" },
      {
        property: "og:description",
        content: "Reach our Pune team for websites, ERP software, cloud and AI automation projects.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings, addEnquiry } = useSite();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    notes: "",
    service: SERVICES[0]?.title ?? "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Name, phone and email are required.");
      return;
    }
    addEnquiry({ ...form, budget: "Not specified" });
    toast.success("Message sent — we reply within one business day.");
    setForm({ name: "", company: "", phone: "", email: "", notes: "", service: SERVICES[0]?.title ?? "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Let's scope your next build</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ct-name">Full name</Label>
              <Input id="ct-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ct-company">Company</Label>
              <Input id="ct-company" maxLength={120} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ct-phone">Phone</Label>
              <Input id="ct-phone" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ct-email">Email</Label>
              <Input id="ct-email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ct-service">Service of interest</Label>
            <select
              id="ct-service"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ct-notes">How can we help?</Label>
            <Textarea id="ct-notes" rows={5} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>

        <div className="space-y-4">
          <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Call us</p>
              <p className="text-sm text-muted-foreground">{settings.phone}</p>
            </div>
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Email us</p>
              <p className="text-sm text-muted-foreground">{settings.email}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Office</p>
              <p className="text-sm text-muted-foreground">{settings.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Working hours</p>
              <p className="text-sm text-muted-foreground">{settings.hours}</p>
            </div>
          </div>
          <iframe
            title="SOSync AI Tech, Kharadi Pune map"
            src={CONTACT.mapSrc}
            className="h-64 w-full rounded-xl border border-border"
            loading="lazy"
          />
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
