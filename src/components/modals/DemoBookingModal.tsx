import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/components/SiteProvider";
import { SERVICES } from "@/lib/site-data";

export function DemoBookingModal() {
  const { modal, closeModal, addDemo, activeService } = useSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: activeService ?? SERVICES[0]?.title ?? "",
    date: "",
    notes: "",
  });

  const open = modal === "demo";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please add your name, email and phone.");
      return;
    }
    addDemo({
      ...form,
      service: form.service || SERVICES[0]?.title || "",
    });
    toast.success("Demo booked — our team will confirm your slot shortly.");
    setForm({ name: "", email: "", phone: "", service: SERVICES[0]?.title ?? "", date: "", notes: "" });
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book your ₹1 consultation demo</DialogTitle>
          <DialogDescription>
            A senior engineer walks you through a working build and a scoped delivery plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="d-name">Full name</Label>
              <Input id="d-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-phone">Phone</Label>
              <Input id="d-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="d-email">Email</Label>
            <Input id="d-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="d-service">Service</Label>
              <select
                id="d-service"
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
              <Label htmlFor="d-date">Preferred date</Label>
              <Input id="d-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="d-notes">Notes</Label>
            <Textarea id="d-notes" rows={3} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">
            Confirm ₹1 Demo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
