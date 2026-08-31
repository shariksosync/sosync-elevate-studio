import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/components/SiteProvider";
import { SERVICES } from "@/lib/site-data";

const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹2,00,000", "₹2,00,000 – ₹5,00,000", "₹5,00,000+"];

export function ServiceEnquiryModal() {
  const { modal, closeModal, addEnquiry, activeService } = useSite();
  const open = modal === "enquiry";
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    budget: BUDGETS[0] ?? "",
    notes: "",
    service: activeService ?? SERVICES[0]?.title ?? "",
  });

  useEffect(() => {
    if (open) setForm((f) => ({ ...f, service: activeService ?? SERVICES[0]?.title ?? "" }));
  }, [open, activeService]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Name, phone and email are required.");
      return;
    }
    addEnquiry(form);
    toast.success("Enquiry received — we reply within one business day.");
    setForm({ name: "", company: "", phone: "", email: "", budget: BUDGETS[0] ?? "", notes: "", service: form.service });
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enquire about {form.service || "our services"}</DialogTitle>
          <DialogDescription>Tell us about the project and we will send a scoped proposal.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="e-service">Service</Label>
            <select
              id="e-service"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.service}
              onChange={(ev) => setForm({ ...form, service: ev.target.value })}
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="e-name">Full name</Label>
              <Input id="e-name" maxLength={100} value={form.name} onChange={(ev) => setForm({ ...form, name: ev.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-company">Company</Label>
              <Input id="e-company" maxLength={120} value={form.company} onChange={(ev) => setForm({ ...form, company: ev.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-phone">Phone</Label>
              <Input id="e-phone" maxLength={20} value={form.phone} onChange={(ev) => setForm({ ...form, phone: ev.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="e-email">Email</Label>
              <Input id="e-email" type="email" maxLength={255} value={form.email} onChange={(ev) => setForm({ ...form, email: ev.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-budget">Budget range</Label>
            <select
              id="e-budget"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.budget}
              onChange={(ev) => setForm({ ...form, budget: ev.target.value })}
            >
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="e-notes">Project notes</Label>
            <Textarea id="e-notes" rows={4} maxLength={1000} value={form.notes} onChange={(ev) => setForm({ ...form, notes: ev.target.value })} />
          </div>
          <Button type="submit" className="w-full">
            Send Enquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
