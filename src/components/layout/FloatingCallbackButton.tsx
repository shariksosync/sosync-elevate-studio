import { useState } from "react";
import { PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSite } from "@/components/SiteProvider";

export function FloatingCallbackButton() {
  const { addCallback } = useSite();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", topic: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required.");
      return;
    }
    addCallback(form);
    toast.success("Callback requested — we will ring you shortly.");
    setForm({ name: "", phone: "", topic: "" });
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 h-12 gap-2 rounded-full shadow-lg"
        aria-label="Request a callback"
      >
        <PhoneCall className="h-4 w-4" />
        <span className="hidden sm:inline">Request Callback</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request a callback</DialogTitle>
            <DialogDescription>Leave your number and a senior consultant will call you back.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-phone">Phone</Label>
              <Input id="c-phone" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-topic">What is it about?</Label>
              <Input id="c-topic" maxLength={200} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Request Call</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
