import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSite } from "@/components/SiteProvider";
import { cn } from "@/lib/utils";

export function FeedbackModal() {
  const { modal, closeModal, addTestimonial } = useSite();
  const open = modal === "feedback";
  const [form, setForm] = useState({ name: "", company: "", review: "" });
  const [rating, setRating] = useState(5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.review.trim()) {
      toast.error("Please add your name and a short review.");
      return;
    }
    addTestimonial({ ...form, rating });
    toast.success("Thank you — your review is pending approval.");
    setForm({ name: "", company: "", review: "" });
    setRating(5);
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your feedback</DialogTitle>
          <DialogDescription>Approved reviews appear on our homepage.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="f-name">Name</Label>
              <Input id="f-name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="f-company">Company</Label>
              <Input id="f-company" maxLength={120} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star`}>
                  <Star className={cn("h-7 w-7", n <= rating ? "fill-primary text-primary" : "text-muted-foreground")} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="f-review">Review</Label>
            <Textarea id="f-review" rows={4} maxLength={1000} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
