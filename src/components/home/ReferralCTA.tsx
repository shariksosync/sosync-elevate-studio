import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/SiteProvider";

export function ReferralCTA() {
  const { openModal } = useSite();
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:text-left">
        <Gift className="h-12 w-12 shrink-0 text-primary" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Refer a client & earn 10% commission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate your personal SOSYNC code in seconds. When the project is signed and paid, your commission is
            released.
          </p>
        </div>
        <Button size="lg" onClick={() => openModal("referral")}>
          Get My Referral Code
        </Button>
      </div>
    </section>
  );
}
