export type ServiceCategory =
  | "Website Development"
  | "Software & ERP"
  | "Enterprise IT"
  | "Growth Marketing"
  | "Graphic Design"
  | "AI Automation";

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  features: string[];
  image: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Website Development",
  "Software & ERP",
  "Enterprise IT",
  "Growth Marketing",
  "Graphic Design",
  "AI Automation",
];

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Website Development",
    category: "Website Development",
    description:
      "Blazing-fast corporate sites, e-commerce storefronts and web portals engineered for conversion and SEO.",
    features: [
      "Custom React / Next.js builds",
      "E-commerce & payment gateways",
      "Core Web Vitals optimisation",
      "CMS & multilingual support",
    ],
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "software-erp",
    title: "Software & ERP Systems",
    category: "Software & ERP",
    description:
      "Custom ERP, CRM and billing platforms that replace spreadsheets with one reliable source of truth.",
    features: [
      "Inventory, billing & HRMS modules",
      "Role-based access control",
      "Tally / Razorpay integrations",
      "Real-time analytics dashboards",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "enterprise-it",
    title: "Enterprise IT Infrastructure",
    category: "Enterprise IT",
    description:
      "Cloud architecture, networking and managed DevOps for organisations that cannot afford downtime.",
    features: [
      "AWS / Azure cloud migration",
      "CI-CD pipelines with Docker",
      "Security hardening & audits",
      "24x7 monitoring & backups",
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "growth-marketing",
    title: "Growth & Digital Marketing",
    category: "Growth Marketing",
    description:
      "Performance marketing engineered around pipeline, not vanity metrics.",
    features: [
      "Technical & local SEO",
      "Google / Meta ad management",
      "Content & social calendars",
      "Conversion rate optimisation",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Branding",
    category: "Graphic Design",
    description:
      "Identity systems, packaging and campaign creatives that make brands unmistakable.",
    features: [
      "Logo & brand identity kits",
      "Packaging & print collateral",
      "Social media creative packs",
      "Motion graphics & explainers",
    ],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ai-automation",
    title: "AI Automation & Agents",
    category: "AI Automation",
    description:
      "RAG assistants, workflow bots and document intelligence that remove repetitive human effort.",
    features: [
      "Custom AI chatbots & RAG search",
      "Document & invoice extraction",
      "Workflow automation pipelines",
      "Predictive analytics models",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
];

export interface PortfolioProject {
  id: string;
  title: string;
  category: "E-Commerce" | "ERP / Software" | "Portals";
  summary: string;
  description: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  image: string;
  featured: boolean;
}

export const PORTFOLIO_CATEGORIES = ["All", "E-Commerce", "ERP / Software", "Portals"] as const;

export const DEFAULT_PORTFOLIO: PortfolioProject[] = [
  {
    id: "morpankh",
    title: "Morpankh Saree",
    category: "E-Commerce",
    summary: "Premium saree storefront with catalogue automation.",
    description:
      "A high-conversion e-commerce experience for a heritage saree label, featuring bulk catalogue upload, live inventory sync, Razorpay checkout and a WhatsApp order concierge.",
    metrics: [
      { label: "Conversion lift", value: "+38%" },
      { label: "Page load", value: "1.2s" },
      { label: "SKUs live", value: "1,400+" },
    ],
    stack: ["React", "Node.js", "Razorpay", "AWS"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "sp-art-hubs",
    title: "SP Art Hubs",
    category: "Portals",
    summary: "Curated art marketplace and artist portal.",
    description:
      "A gallery-grade portal where artists onboard, publish collections and track commissions, backed by a moderation dashboard and integrated logistics tracking.",
    metrics: [
      { label: "Artists onboarded", value: "220+" },
      { label: "Avg. session", value: "6m 40s" },
      { label: "Uptime", value: "99.9%" },
    ],
    stack: ["Next.js", "PostgreSQL", "Docker", "Cloudflare"],
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "suraj-naturo",
    title: "Suraj Naturo Dry Fruits",
    category: "E-Commerce",
    summary: "D2C dry fruit brand with subscription boxes.",
    description:
      "Direct-to-consumer commerce with subscription boxes, pincode-based delivery slots, loyalty wallet and an automated re-order reminder engine.",
    metrics: [
      { label: "Repeat orders", value: "46%" },
      { label: "Cart recovery", value: "+27%" },
      { label: "Launch time", value: "3 weeks" },
    ],
    stack: ["React", "Node.js", "MongoDB", "Razorpay"],
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "sonai-school",
    title: "Sonai Residential World School",
    category: "Portals",
    summary: "Admissions and parent communication portal.",
    description:
      "A residential school portal with online admissions, fee receipts, hostel management and a parent notification hub with SMS and email broadcasting.",
    metrics: [
      { label: "Admissions online", value: "92%" },
      { label: "Staff hours saved", value: "60/mo" },
      { label: "Parents active", value: "1,800+" },
    ],
    stack: ["React", "Python", "PostgreSQL", "AWS"],
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "karyon-college",
    title: "Karyon College",
    category: "ERP / Software",
    summary: "Campus ERP with attendance and fee automation.",
    description:
      "A full campus ERP covering department management, biometric attendance sync, fee ledgers, examination records and a PowerBI reporting layer for management.",
    metrics: [
      { label: "Modules live", value: "9" },
      { label: "Records migrated", value: "45k" },
      { label: "Fee reconciliation", value: "Same day" },
    ],
    stack: ["React", "Node.js", "PowerBI", "Docker"],
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "sona-i-group",
    title: "Sona I Group of Institutes",
    category: "ERP / Software",
    summary: "Multi-campus administration suite.",
    description:
      "A multi-campus administration suite unifying five institutes under one dashboard with consolidated finance, staff payroll and centralised document vaults.",
    metrics: [
      { label: "Campuses unified", value: "5" },
      { label: "Reporting time", value: "-70%" },
      { label: "Users", value: "3,200+" },
    ],
    stack: ["Next.js", "Python", "AWS", "PowerBI"],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
];

export const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
  "AI/ML",
  "NLP",
  "RAG",
  "PowerBI",
  "Razorpay",
];

export const PROCESS_STEPS = [
  { title: "Requirement Analysis", detail: "Deep-dive workshops to map goals, users and constraints." },
  { title: "Architecture Roadmap", detail: "System design, stack selection and delivery milestones." },
  { title: "UI/UX Prototype", detail: "Clickable prototypes signed off before a line of code." },
  { title: "Development", detail: "Agile sprints with weekly demos and transparent tracking." },
  { title: "QA & Security", detail: "Automated tests, load checks and vulnerability scanning." },
  { title: "Client Demo", detail: "Full walkthrough on a staging environment for approval." },
  { title: "Cloud Deployment", detail: "Zero-downtime release with CI/CD and monitoring." },
  { title: "Handover", detail: "Source code, documentation and team training — 100% IP yours." },
  { title: "6 Months Free Support Warranty", detail: "Bug fixes and minor updates on us, worth ₹25,000+." },
];

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export const LEADERSHIP: TeamMember[] = [
  {
    name: "Shashant Shekhar",
    role: "Founder & Chief Executive",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Omkar Bachanatti",
    role: "Director — Technology",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sanika Chougule",
    role: "Head of Design",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vivek Dhumal",
    role: "Head of Delivery",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Aslam Pathan",
    role: "Head of Client Success",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  },
];

export const SENIOR_SQUAD: TeamMember[] = [
  {
    name: "Tridev Sharma",
    role: "Senior Full-Stack Engineer",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sharik Ahmed",
    role: "Senior AI Engineer",
    photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Vicky Kumar",
    role: "Senior Cloud & DevOps Engineer",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ashish Ranjan",
    role: "Senior Backend Engineer",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Anurag Kumar",
    role: "Senior QA & Security Lead",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
  },
];

export const HERO_SLIDES = [
  {
    badge: "AI-First Engineering",
    title: "Build Smarter. Automate Faster. Scale Further",
    subtitle:
      "Custom software, AI agents and cloud infrastructure delivered by a senior-only engineering squad.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
  },
  {
    badge: "ERP & Enterprise Software",
    title: "One Platform to Run Your Entire Operation",
    subtitle:
      "Replace spreadsheets and disconnected tools with an ERP built precisely around how your business works.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  },
  {
    badge: "Delivery in 1–3 Weeks",
    title: "Ship Production-Grade Products, Not Prototypes",
    subtitle:
      "Fixed timelines, 100% IP ownership and six months of free support with every engagement.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
  },
];

export const FAQS = [
  {
    q: "How quickly can you deliver a project?",
    a: "Most websites and focused software modules go live in 1–3 weeks. Large ERP rollouts are phased, with the first usable module typically live within four weeks.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. You receive 100% intellectual property ownership, complete source code and documentation at handover.",
  },
  {
    q: "What does the ₹1 demo include?",
    a: "A full consultation with a senior engineer, a walkthrough of a relevant working build and a scoped delivery plan with pricing.",
  },
  {
    q: "What is covered in the 6 months free support?",
    a: "Bug fixes, security patches, minor content and layout updates, and deployment assistance — a package worth ₹25,000 or more.",
  },
  {
    q: "How does the 10% referral commission work?",
    a: "Generate a referral code, share it with a business that needs us, and receive 10% of the project value once the engagement is signed and paid.",
  },
];

export const CONTACT = {
  phone: "+91 91724 03714",
  phoneHref: "+919172403714",
  email: "support@sosyncaitech.in",
  address: "Kharadi, Pune, Maharashtra 411014, India",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  mapSrc:
    "https://www.google.com/maps?q=Kharadi,+Pune,+Maharashtra+411014&output=embed",
};
