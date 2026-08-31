import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ValueProps } from "@/components/home/ValueProps";
import { TechStack } from "@/components/home/TechStack";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TeamSection } from "@/components/home/TeamSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ReferralCTA } from "@/components/home/ReferralCTA";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOSync AI Tech | Websites, ERP & AI Automation in Pune" },
      {
        name: "description",
        content:
          "Innovate. Integrate. Elevate. SOSync AI Tech builds websites, ERP software, cloud infrastructure and AI automation with 6 months free support.",
      },
      { property: "og:title", content: "SOSync AI Tech | Websites, ERP & AI Automation" },
      {
        property: "og:description",
        content: "Senior-only engineering squads delivering production software in 1–3 weeks. Book a ₹1 demo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <ServicesSection />
      <ValueProps />
      <TechStack />
      <PortfolioSection />
      <ProcessTimeline />
      <TeamSection />
      <Testimonials />
      <ReferralCTA />
      <FinalCTA />
    </>
  );
}
