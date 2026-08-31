import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CONTACT, DEFAULT_PORTFOLIO, type PortfolioProject } from "@/lib/site-data";

export type EnquiryStatus = "Pending" | "Contacted" | "In Progress" | "Closed";

export interface Enquiry {
  id: string;
  createdAt: string;
  service: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  budget: string;
  notes: string;
  status: EnquiryStatus;
}

export interface CallbackRequest {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  topic: string;
  status: "Pending" | "Called";
}

export interface DemoBooking {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes: string;
}

export interface Referral {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  code: string;
}

export interface Testimonial {
  id: string;
  createdAt: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  approved: boolean;
}

export interface SiteSettings {
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  hours: string;
  announcementText: string;
  announcementEnabled: boolean;
  maintenanceMode: boolean;
}

const KEYS = {
  enquiries: "sosync_enquiries",
  callbacks: "sosync_callbacks",
  demos: "sosync_demos",
  referrals: "sosync_referrals",
  testimonials: "sosync_testimonials",
  projects: "sosync_projects",
  settings: "sosync_settings",
} as const;

const DEFAULT_SETTINGS: SiteSettings = {
  phone: CONTACT.phone,
  altPhone: "+91 91724 03714",
  email: CONTACT.email,
  address: CONTACT.address,
  hours: CONTACT.hours,
  announcementText:
    "Book a ₹1 consultation demo this month — includes a free architecture roadmap.",
  announcementEnabled: true,
  maintenanceMode: false,
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    createdAt: new Date().toISOString(),
    name: "Rohit Kulkarni",
    company: "Morpankh Saree",
    rating: 5,
    review:
      "Our storefront went live in under three weeks and sales climbed almost immediately. The team is genuinely senior — no hand-holding needed.",
    approved: true,
  },
  {
    id: "t2",
    createdAt: new Date().toISOString(),
    name: "Dr. Meena Patil",
    company: "Sonai Residential World School",
    rating: 5,
    review:
      "Admissions used to take our staff weeks. The portal SOSync built handles it in days, and parents finally have one place for everything.",
    approved: true,
  },
  {
    id: "t3",
    createdAt: new Date().toISOString(),
    name: "Amit Shrivastav",
    company: "Karyon College",
    rating: 4,
    review:
      "The campus ERP replaced four separate tools. Reporting that took a week now takes an afternoon.",
    approved: true,
  },
];

export type ModalKind =
  | "demo"
  | "enquiry"
  | "referral"
  | "feedback"
  | "caseStudy"
  | null;

interface SiteContextValue {
  enquiries: Enquiry[];
  callbacks: CallbackRequest[];
  demos: DemoBooking[];
  referrals: Referral[];
  testimonials: Testimonial[];
  projects: PortfolioProject[];
  settings: SiteSettings;
  addEnquiry: (e: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  addCallback: (c: Omit<CallbackRequest, "id" | "createdAt" | "status">) => void;
  toggleCallback: (id: string) => void;
  addDemo: (d: Omit<DemoBooking, "id" | "createdAt">) => void;
  addReferral: (r: Omit<Referral, "id" | "createdAt">) => void;
  addTestimonial: (t: Omit<Testimonial, "id" | "createdAt" | "approved">) => void;
  setTestimonialApproved: (id: string, approved: boolean) => void;
  saveProject: (p: PortfolioProject) => void;
  deleteProject: (id: string) => void;
  toggleFeatured: (id: string) => void;
  updateSettings: (s: Partial<SiteSettings>) => void;
  modal: ModalKind;
  activeService: string | null;
  activeProject: PortfolioProject | null;
  openModal: (kind: Exclude<ModalKind, null>, payload?: { service?: string; project?: PortfolioProject }) => void;
  closeModal: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [demos, setDemos] = useState<DemoBooking[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [projects, setProjects] = useState<PortfolioProject[]>(DEFAULT_PORTFOLIO);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [modal, setModal] = useState<ModalKind>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    setEnquiries(read(KEYS.enquiries, [] as Enquiry[]));
    setCallbacks(read(KEYS.callbacks, [] as CallbackRequest[]));
    setDemos(read(KEYS.demos, [] as DemoBooking[]));
    setReferrals(read(KEYS.referrals, [] as Referral[]));
    setTestimonials(read(KEYS.testimonials, DEFAULT_TESTIMONIALS));
    setProjects(read(KEYS.projects, DEFAULT_PORTFOLIO));
    setSettings({ ...DEFAULT_SETTINGS, ...read(KEYS.settings, {} as Partial<SiteSettings>) });
  }, []);

  const persist = useCallback(<T,>(key: string, value: T, setter: (v: T) => void) => {
    setter(value);
    write(key, value);
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      enquiries,
      callbacks,
      demos,
      referrals,
      testimonials,
      projects,
      settings,
      addEnquiry: (e) =>
        persist(
          KEYS.enquiries,
          [{ ...e, id: uid(), createdAt: new Date().toISOString(), status: "Pending" as const }, ...enquiries],
          setEnquiries,
        ),
      updateEnquiryStatus: (id, status) =>
        persist(
          KEYS.enquiries,
          enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
          setEnquiries,
        ),
      addCallback: (c) =>
        persist(
          KEYS.callbacks,
          [{ ...c, id: uid(), createdAt: new Date().toISOString(), status: "Pending" as const }, ...callbacks],
          setCallbacks,
        ),
      toggleCallback: (id) =>
        persist(
          KEYS.callbacks,
          callbacks.map((c) =>
            c.id === id ? { ...c, status: c.status === "Pending" ? ("Called" as const) : ("Pending" as const) } : c,
          ),
          setCallbacks,
        ),
      addDemo: (d) =>
        persist(KEYS.demos, [{ ...d, id: uid(), createdAt: new Date().toISOString() }, ...demos], setDemos),
      addReferral: (r) =>
        persist(
          KEYS.referrals,
          [{ ...r, id: uid(), createdAt: new Date().toISOString() }, ...referrals],
          setReferrals,
        ),
      addTestimonial: (t) =>
        persist(
          KEYS.testimonials,
          [{ ...t, id: uid(), createdAt: new Date().toISOString(), approved: false }, ...testimonials],
          setTestimonials,
        ),
      setTestimonialApproved: (id, approved) =>
        persist(
          KEYS.testimonials,
          testimonials.map((t) => (t.id === id ? { ...t, approved } : t)),
          setTestimonials,
        ),
      saveProject: (p) =>
        persist(
          KEYS.projects,
          projects.some((x) => x.id === p.id)
            ? projects.map((x) => (x.id === p.id ? p : x))
            : [p, ...projects],
          setProjects,
        ),
      deleteProject: (id) =>
        persist(
          KEYS.projects,
          projects.filter((p) => p.id !== id),
          setProjects,
        ),
      toggleFeatured: (id) =>
        persist(
          KEYS.projects,
          projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
          setProjects,
        ),
      updateSettings: (s) => persist(KEYS.settings, { ...settings, ...s }, setSettings),
      modal,
      activeService,
      activeProject,
      openModal: (kind, payload) => {
        setActiveService(payload?.service ?? null);
        setActiveProject(payload?.project ?? null);
        setModal(kind);
      },
      closeModal: () => setModal(null),
    }),
    [enquiries, callbacks, demos, referrals, testimonials, projects, settings, modal, activeService, activeProject, persist],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
