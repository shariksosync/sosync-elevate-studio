import { Megaphone } from "lucide-react";
import { useSite } from "@/components/SiteProvider";

export function AnnouncementBar() {
  const { settings } = useSite();
  if (!settings.announcementEnabled || !settings.announcementText) return null;
  return (
    <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground sm:text-sm">
      <span className="inline-flex items-center gap-2">
        <Megaphone className="h-4 w-4 shrink-0" />
        {settings.announcementText}
      </span>
    </div>
  );
}
