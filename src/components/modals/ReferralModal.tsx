import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSite } from "@/components/SiteProvider";

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `SOSYNC-${out}`;
}

export function ReferralModal() {
  const { modal, closeModal, addReferral } = useSite();
  const open = modal === "referral";
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [code, setCode] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("All fields are required to issue a referral code.");
      return;
    }
    const newCode = makeCode();
    addReferral({ ...form, code: newCode });
    setCode(newCode);
    toast.success("Referral code generated.");
  };

  const reset = () => {
    setCode(null);
    setForm({ name: "", phone: "", email: "" });
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && reset()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Refer a client, earn 10% commission</DialogTitle>
          <DialogDescription>
            Share your code. When the referred project is signed and paid, 10% of the value is yours.
          </DialogDescription>
        </DialogHeader>
        {code ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">Your unique referral code</p>
            <p className="rounded-lg border border-primary/40 bg-primary/10 py-4 text-2xl font-bold tracking-widest text-primary">
              {code}
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                void navigator.clipboard?.writeText(code);
                toast.success("Code copied.");
              }}
            >
              Copy Code
            </Button>
            <Button className="w-full" onClick={reset}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="r-name">Your name</Label>
              <Input id="r-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-phone">Phone</Label>
              <Input id="r-phone" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-email">Email</Label>
              <Input id="r-email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">
              Generate My Code
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
