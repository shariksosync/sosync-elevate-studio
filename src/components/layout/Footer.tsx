import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useSite } from "@/components/SiteProvider";
import { CONTACT } from "@/lib/site-data";
import logo from "@/assets/sosync-logo.png.asset.json";

export function Footer() {
  const { settings } = useSite();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="SOSync AI Tech logo" className="h-10 w-10 object-contain" />
            <span className="font-bold">
              SOSync <span className="text-primary">AI Tech</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Innovate. Integrate. Elevate. — Digital Solutions for a Smarter Tomorrow.
          </p>
          <div className="flex gap-3">
            {[Linkedin, Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">Company</h3>
          <Link to="/services" className="block text-muted-foreground hover:text-primary">Services</Link>
          <Link to="/portfolio" className="block text-muted-foreground hover:text-primary">Portfolio</Link>
          <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
          <Link to="/admin/login" className="block text-muted-foreground hover:text-primary">Staff Login</Link>
        </div>

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">Get in touch</h3>
          <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" /> {settings.phone}
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" /> {settings.email}
          </a>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {settings.address}
          </p>
          <p className="text-muted-foreground">{settings.hours}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Find us</h3>
          <iframe
            title="SOSync AI Tech office location"
            src={CONTACT.mapSrc}
            className="h-40 w-full rounded-lg border border-border"
            loading="lazy"
          />
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SOSync AI Tech IT Solutions. All rights reserved.
      </div>
    </footer>
  );
}
