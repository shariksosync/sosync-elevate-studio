import { Wrench } from "lucide-react";
import { useSite } from "@/components/SiteProvider";

export function MaintenanceModeView() {
  const { settings } = useSite();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Wrench className="h-12 w-12 text-primary" />
      <h1 className="mt-6 text-3xl font-bold">We are upgrading the site</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        SOSync AI Tech is performing scheduled maintenance. We will be back shortly — meanwhile, reach us on{" "}
        {settings.phone} or {settings.email}.
      </p>
    </div>
  );
}
