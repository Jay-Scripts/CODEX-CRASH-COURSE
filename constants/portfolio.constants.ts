import {
  BriefcaseBusiness,
  Code2,
  Database,
  GitBranch,
  Headphones,
  Info,
  MonitorSmartphone,
  Palette,
  Server,
  ShieldCheck,
  Target,
  TestTube2,
  Wrench,
} from "lucide-react";
import type {
  AboutEntry,
  Education,
  Experience,
  FlowchartPreview,
  NavigationItem,
  Profile,
  Project,
  RecentRepository,
  ServiceOffering,
  SkillGroup,
  TechStat,
} from "@/types/portfolio.types";

const smartPosFlowchartPreviews: FlowchartPreview[] = [
  {
    id: "options",
    label: "Options",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
    alt: "Smart POS system flowchart preview for options module",
  },
  {
    id: "kiosk",
    label: "Kiosk",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-KIOSK Module.drawio.svg",
    alt: "Smart POS system flowchart preview for kiosk module",
  },
  {
    id: "pos",
    label: "POS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-POS Module .drawio.svg",
    alt: "Smart POS system flowchart preview for POS module",
  },
  {
    id: "bvs",
    label: "BVS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-BVS Module.drawio.svg",
    alt: "Smart POS system flowchart preview for BVS module",
  },
  {
    id: "managers",
    label: "Managers",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Manager's Module.drawio.svg",
    alt: "Smart POS system flowchart preview for managers module",
  },
  {
    id: "cvs",
    label: "CVS",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-CVS Module.drawio.svg",
    alt: "Smart POS system flowchart preview for CVS module",
  },
  {
    id: "crm",
    label: "CRM",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-CRM Module.drawio.svg",
    alt: "Smart POS system flowchart preview for CRM module",
  },
  {
    id: "db",
    label: "DB",
    src: "/sysflow-svg/SYSTEM FLOW SMART POS-Smart POS DB.drawio.svg",
    alt: "Smart POS system flowchart preview for database module",
  },
];

export const profile: Profile = {
  name: "Cornelio A. Gatbonton Jr",
  role: "Junior Full-Stack Developer",
  email: "corneliogatbontonjr21@gmail.com",
  location: "Philippines",
  linkedinUrl:
    "https://www.linkedin.com/in/corneliogatbonton/?skipRedirect=true",
  githubUrl: "https://github.com/Jay-Scripts",
  resumeUrl: "/resume.pdf",
  summary:
    "BSIT developer focused on reliable full-stack systems, QA discipline, database design, and enterprise-ready user experiences.",
};

export const navigationItems: NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Full-stack Development",
    icon: Server,
    description:
      "Build complete web applications from interface to backend logic and data flow.",
  },
  {
    title: "Responsive Design",
    icon: MonitorSmartphone,
    description:
      "Create layouts that stay clear, usable, and polished across mobile and desktop screens.",
  },
  {
    title: "UI/UX",
    icon: Palette,
    description:
      "Design interfaces that feel intuitive, visually consistent, and easy to navigate.",
  },
  {
    title: "QA",
    icon: ShieldCheck,
    description:
      "Support quality with testing, validation, and careful attention to user-facing details.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      "Next.js",
      "React",
      "JavaScript ES6",
      "Tailwind CSS",
      "shadcn/ui",
      "Lucide React",
      "Bootstrap",
    ],
  },
  {
    title: "Backend and Database",
    icon: Database,
    skills: ["Supabase", "PostgreSQL", "PHP", "MySQL"],
  },
  {
    title: "Testing and QA",
    icon: TestTube2,
    skills: [
      "Functional Testing",
      "Integration Testing",
      "UAT",
      "Bug Documentation",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "XAMPP", "MySQL Workbench"],
  },
];

export const projects: Project[] = [
  {
    id: "smart-pos",
    title: "Smart POS System",
    summary:
      "Enterprise-style point-of-sale ecosystem with service-specific views, real-time analytics, inventory workflows, and QA testing coverage.",
    primaryCategory: "stand-alone",
    categories: ["stand-alone", "qa"],
    techStack: [
      "HTML",
      "Tailwind CSS4",
      "MySQL",
      "Chart.js",
      "PHP",
      "Flowbite",
    ],
    architecture: [
      "POS interface",
      "Self-Service Kiosk",
      "Customer View System",
      "Barista View System",
      "Manager Dashboard",
      "Inventory automation",
    ],
    features: [
      "Real-time analytics dashboards",
      "Chart.js business metrics",
      "Role-based operational screens",
      "QA testing workflows",
    ],
    flowchartActivities: [
      "Customer order entry from cashier POS or self-service kiosk",
      "Automatic ticket routing to the barista preparation screen",
      "Live order status updates reflected on the customer view display",
      "Completed sales posting to inventory and analytics records",
    ],
    flowchartPreviews: smartPosFlowchartPreviews,
    challenges: [
      "Connected multiple service views without duplicating business logic.",
      "Designed inventory updates around clear transaction states.",
      "Documented UAT findings for operational reliability.",
    ],
    githubUrl: "https://github.com/",
    liveDemoUrl: "https://example.com/",
  },
  {
    id: "car-rental",
    title: "Car Rental Management System",
    summary:
      "Booking and fleet management platform with admin workflows, notifications, reporting, and database-first planning.",
    primaryCategory: "cloud-hosted",
    categories: ["cloud-hosted"],
    techStack: [
      "HTML",
      "Tailwind CSS4",
      "JavaScript ES6",
      "Node Mailer",
      "PHP",
      "MySQL",
      "Chart.js",
      "Flowbite",
    ],
    architecture: [
      "Booking system",
      "Admin dashboard",
      "Vehicle tracking",
      "Email notifications",
      "Reporting analytics",
      "Database architecture",
    ],
    features: [
      "Reservation lifecycle management",
      "Fleet status monitoring",
      "Admin reports",
      "Flowcharts and ERD planning",
    ],
    flowchartActivities: [
      "Customer submits a booking request with rental details",
      "Admin reviews vehicle availability and approves the reservation",
      "System updates fleet status for pickup, return, or maintenance",
      "Rental completion triggers report generation and record archiving",
    ],
    challenges: [
      "Mapped rental workflows into maintainable database relationships.",
      "Improved admin visibility through reporting and vehicle status views.",
      "Handled booking data with clear validation boundaries.",
    ],
    githubUrl: "https://github.com/",
    liveDemoUrl: "https://example.com/",
  },
  {
    id: "smart-pos-user-manual",
    title: "Smart POS User Manual",
    summary:
      "Step-by-step product documentation covering core Smart POS workflows, guided usage, and operator reference material for day-to-day system handling.",
    primaryCategory: "user-manuals",
    categories: ["user-manuals"],
    techStack: ["PDF Documentation", "Process Mapping", "User Guidance"],
    architecture: [
      "Introduction and system overview",
      "User navigation instructions",
      "Operational workflow walkthroughs",
      "Reference material for daily usage",
    ],
    features: [
      "Step-by-step usage guidance",
      "Operator-facing workflow instructions",
      "Clear task sequencing for common actions",
      "Documentation support for onboarding",
    ],
    challenges: [
      "Organized technical workflows into instructions that are easy for end users to follow.",
      "Balanced clarity and completeness so the manual stays useful during actual operations.",
      "Turned system behavior into documentation that supports training and consistency.",
    ],
    githubUrl: "https://github.com/Jay-Scripts",
    liveDemoUrl: "/user-manual/SMART%20POS%20USER%20MANUAL.pdf",
    previewAlt: "First page preview of the Smart POS user manual PDF",
    previewSrc:
      "/user-manual/SMART%20POS%20USER%20MANUAL.pdf#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0",
  },
];

export const experiences: Experience[] = [
  {
    role: "Service Crew",
    organization: "Golden Arches Development Corporation - McDonald's",
    period: "Aug 2023 - Present",
    icon: ShieldCheck,
    highlights: [
      "Handled customer orders, prepared meals, maintained dining area cleanliness, and ensured a welcoming environment.",
      "Delivered friendly, efficient service while using product knowledge to help customers make informed meal choices.",
    ],
  },
  {
    role: "IT Support Assistant",
    organization: "Global Reciprocal Colleges",
    period: "Jul 2023 - Dec 2025",
    icon: Headphones,
    highlights: [
      "Performed hardware maintenance and repairs, including soldering, component replacement, and peripheral troubleshooting.",
      "Installed and configured operating systems, software, printers, and laboratory equipment.",
      "Provided technical support to users by diagnosing and resolving hardware, software, and system issues.",
    ],
  },
  {
    role: "Stock Clerk",
    organization: "Be Connected Management Services - Bench",
    period: "Jul 2021 - Aug 2022",
    icon: BriefcaseBusiness,
    highlights: [
      "Analyzed inventory to identify excess, slow-moving, and obsolete stock for proper disposition.",
      "Prepared regular inventory reports for upper management and recommended improvements for inventory control.",
    ],
  },
  {
    role: "Bagger",
    organization: "Rustan Supercenters, Inc. - Shopwise",
    period: "Jun 2020 - Nov 2020",
    icon: BriefcaseBusiness,
    highlights: [
      "Packed customer purchases efficiently and carefully while assisting cashiers during checkout.",
      "Provided polite and helpful customer assistance, including cart support and grocery carry-out service.",
    ],
  },
  {
    role: "Service Crew",
    organization: "Jollibee Food Corporation - Jollibee",
    period: "Sep 2018 - Sep 2019",
    icon: ShieldCheck,
    highlights: [
      "Served as part of the customer service team by taking orders, preparing food, and maintaining cleanliness.",
      "Provided attentive customer service while demonstrating product knowledge and responsiveness to customer needs.",
    ],
  },
];

export const education: Education = {
  degree: "Bachelor of Science in Information Technology",
  specialization:
    "Full-stack development, QA testing, database design, and system analysis",
  coursework: [
    "Client-server architecture",
    "Database management systems",
    "Software engineering",
    "Web application development",
    "Systems analysis and design",
  ],
};

export const techStats: TechStat[] = [
  { label: "Primary focus", value: "Full-stack", icon: Server },
  { label: "Architecture", value: "Database-first", icon: Database },
  { label: "Quality", value: "QA-driven", icon: ShieldCheck },
  { label: "Versioning", value: "Git workflow", icon: GitBranch },
];

export const recentRepositories: RecentRepository[] = [
  {
    name: "smart-pos-system",
    description: "POS, kiosk, analytics, and inventory workflow prototype.",
    stack: "Next.js, Supabase, PostgreSQL",
  },
  {
    name: "car-rental-management",
    description:
      "Booking, admin reporting, vehicle tracking, and notification flows.",
    stack: "PHP, MySQL, Bootstrap",
  },
  {
    name: "qa-test-documentation",
    description: "Functional, integration, and UAT documentation samples.",
    stack: "Testing, QA, Documentation",
  },
];

export const aboutEntries: AboutEntry[] = [
  {
    title: "Personal details",
    icon: Info,
    description: [
      profile.summary,
      "Built to show enterprise-ready delivery traits: quality, clarity, system thinking, and maintainable execution.",
    ],
  },
  {
    title: "About my goals",
    icon: Target,
    description: [
      "My goal is to grow into a dependable full-stack developer who helps teams ship thoughtful, maintainable products.",
      "I want to keep improving in UI/UX, responsive frontend work, backend systems, and QA so I can contribute across the full delivery process.",
    ],
  },
];
