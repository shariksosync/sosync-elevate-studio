# SOSync Elevate Studio

MASTER CODE COMPLETION PROMPT — SOSync AI Tech IT Solutions
Repository: https://github.com/sharik10ahmed/sosync-elevate-studio-6201f2bb

You are a Principal Full-Stack React Engineer. 

Please immediately write and connect all remaining files in the following exact sequence so the entire application typechecks cleanly and renders:

Company: SOSync AI Tech IT Solutions (Brand: SOSync AI Tech)
Tagline: "Innovate. Integrate. Elevate. — Digital Solutions for a Smarter Tomorrow"
Color Palette: Carbon Obsidian (#0B0F17) canvas, Matte Charcoal (#1A1F2C), Solar Orange (#FF6A00) 10% CTA accent.

(Strict exclusion: No learning portals, courses, or academic training content).

---

### ⚡ STEP 1: FIX DEMO MODAL & BUILD REMAINING 4 MODALS
1. In `src/components/modals/DemoBookingModal.tsx`:
   - Add a safe fallback for `SERVICES[0]` (e.g. `SERVICES[0]?.title ?? ""`) to resolve the TypeScript undefined error.
2. Create `src/components/modals/ServiceEnquiryModal.tsx`:
   - Auto-selects active service from modal state, collects Full Name, Company, Phone, Email, Budget Range, Project Notes. Saves enquiry to `sosync_enquiries` via SiteProvider.
3. Create `src/components/modals/ReferralModal.tsx`:
   - Collects referrer Name, Phone, Email and generates a unique `SOSYNC-XXXXXX` code for 10% commission. Saves to `sosync_referrals`.
4. Create `src/components/modals/FeedbackModal.tsx`:
   - Collects Name, Company, Star Rating (1–5), and Review. Saves to `sosync_testimonials` with pending status.
5. Create `src/components/modals/CaseStudyModal.tsx`:
   - High-end detail drawer for the active portfolio project displaying full description, live metrics, tech stack chips, and an "Enquire About Similar Project" CTA.

---

### ⚡ STEP 2: COMPLETE ROOT SHELL (`src/routes/__root.tsx`)
In `src/routes/__root.tsx`:
- Wrap the tree with `SiteProvider` and mount `Toaster` (Sonner).
- Render `AnnouncementBar` at the very top.
- Render `Navbar`.
- Main content area: Render `MaintenanceModeView` if `settings.maintenanceMode === true` and route is NOT `/admin/*`; otherwise render `<Outlet />`.
- Render `Footer` (with direct contact info, map preview, social links, and link to `/admin/login`).
- Mount floating widgets: `FloatingCallbackButton` and `AIChatbot`.
- Mount all 5 modals: `DemoBookingModal`, `ServiceEnquiryModal`, `ReferralModal`, `FeedbackModal`, `CaseStudyModal`.

---

### ⚡ STEP 3: BUILD 11 HOMEPAGE SECTIONS & `src/routes/index.tsx`
Create modular components under `src/components/home/` and assemble `src/routes/index.tsx`:
1. `HeroSlider.tsx`: 3 rotating slides with unique high-res Unsplash tech images, animated badges, bold headlines ("Build Smarter. Automate Faster. Scale Further"), "Book ₹1 Demo" CTA, "Explore Services" CTA, and autoplay with pause on hover.
2. `StatsSection.tsx`: Animated counters for 50+ Projects Delivered, 50+ Happy Clients, 8+ Senior Engineers, 12+ Countries Served.
3. `ServicesSection.tsx`: Tabbed category filters across all 6 divisions (Website Dev, Software & ERP, Enterprise IT, Growth Marketing, Graphic Design, AI Automation) with feature checkmarks and "Enquire Now" triggers.
4. `ValueProps.tsx`: 6 Months Free Support badge card (worth ₹25,000+), 100% IP Ownership, and Rapid 1–3 Weeks Delivery.
5. `TechStack.tsx`: Interactive badges for React, Next.js, Node, Python, AWS, Docker, AI/ML, NLP, RAG, PowerBI, Razorpay.
6. `PortfolioSection.tsx`: Filterable portfolio grid (All, E-Commerce, ERP / Software, Portals) for Morpankh Saree, SP Art Hubs, Suraj Naturo Dry Fruits, Sonai Residential World School, Karyon College, Sona I Group of Institutes. Clicking opens `CaseStudyModal`.
7. `ProcessTimeline.tsx`: 9-step timeline (Requirement Analysis → Architecture Roadmap → UI/UX Prototype → Development → QA & Security → Client Demo → Cloud Deployment → Handover → 6 Months Free Support Warranty).
8. `TeamSection.tsx`: Leadership (Shashant Shekhar, Omkar Bachanatti, Sanika Chougule, Vivek Dhumal, Aslam Pathan) + Senior Squad (Tridev Sharma, Sharik Ahmed, Vicky Kumar, Ashish Ranjan, Anurag Kumar) with unique photos.
9. `Testimonials.tsx`: Dynamic carousel reading approved reviews from localStorage.
10. `ReferralCTA.tsx`: "Refer a client & earn 10% commission" button opening the referral modal.
11. `FinalCTA.tsx`: High-impact conversion banner with "Book ₹1 Demo" and "Contact Us" actions.

---

### ⚡ STEP 4: IMPLEMENT 3 PUBLIC PAGES
1. `src/routes/services.tsx`: Full directory of all 6 divisions with capability breakdowns, feature checkmarks, and instant enquiry triggers.
2. `src/routes/portfolio.tsx`: Filterable gallery with live metrics and "View Case Study" modal triggers.
3. `src/routes/contact.tsx`: Interactive contact form, direct phone/email actions (+91 91724 03714 / support@sosyncaitech.in), Kharadi Pune address, embedded Google Map iframe, and expandable FAQ accordion.

---

### ⚡ STEP 5: BUILD COMPLETE DEMO ADMIN PORTAL (`/admin`)
1. `src/routes/admin/login.tsx`:
   - Clean staff access screen. Sets authenticated session in localStorage and redirects to dashboard.
2. `src/routes/admin/dashboard.tsx`:
   - Protected route guard (redirects unauthenticated visitors to login).
   - Responsive sidebar + topbar with profile and exit button.
   - 7 Management Modules (connected to localStorage via SiteProvider):
     1. Overview Dashboard: Metric cards for Total Enquiries, Pending Callbacks, Demo Bookings, Active Projects, and Average Rating.
     2. Service Enquiries Manager: Searchable table with status toggles (Pending, Contacted, In Progress, Closed).
     3. Callback Requests Manager: List of callback requests with status toggle (Pending → Called).
     4. Demo Bookings Manager: View all demo consultation bookings with requested dates and notes.
     5. Portfolio Projects Manager: Add new project, edit existing, delete with confirmation, and toggle Featured status.
     6. Testimonials & Feedback Manager: Approve or hide client reviews for the public site.
     7. Website Settings Manager: Edit phone numbers, email, physical address, operating hours, announcement banner text/toggle, and maintenance mode toggle.

Please generate and connect all components now. Ensure clean mobile responsiveness and unique Unsplash images.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f0bd9b7c-1ce1-465f-8a75-17386549693d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
