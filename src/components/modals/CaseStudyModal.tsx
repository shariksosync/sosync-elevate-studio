import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSite } from "@/components/SiteProvider";

export function CaseStudyModal() {
  const { modal, closeModal, activeProject, openModal } = useSite();
  const open = modal === "caseStudy" && !!activeProject;
  if (!activeProject) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <img
          src={activeProject.image}
          alt={`${activeProject.title} case study`}
          className="h-56 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <DialogHeader>
          <Badge variant="secondary" className="w-fit">
            {activeProject.category}
          </Badge>
          <DialogTitle className="text-2xl">{activeProject.title}</DialogTitle>
          <DialogDescription>{activeProject.summary}</DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">{activeProject.description}</p>

        <div className="grid grid-cols-3 gap-3">
          {activeProject.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-lg font-bold text-primary">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {activeProject.stack.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        <Button className="w-full" onClick={() => openModal("enquiry", { service: "Website Development" })}>
          Enquire About a Similar Project
        </Button>
      </DialogContent>
    </Dialog>
  );
}
