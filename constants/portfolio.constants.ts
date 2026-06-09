import {
  BriefcaseBusiness,
  Code2,
  Database,
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
  Experience,
  FlowchartPreview,
  NavigationItem,
  Profile,
  Project,
  ServiceOffering,
  SkillGroup,
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
  role: "Junior Web Developer",
  email: "corneliogatbontonjr21@gmail.com",
  location: "Philippines",
  logoAlt: "JayScript brand logo",
  logoSrc: "/Logo/JayScript%20Logo.svg",
  linkedinUrl:
    "https://www.linkedin.com/in/corneliogatbonton/?skipRedirect=true",
  facebookUrl: "https://www.facebook.com/corneliogatbonton/",
  githubUrl: "https://github.com/Jay-Scripts",
  resumeUrl: "/resume.pdf",
  summary:
    "Junior Web Developer focused on building reliable, maintainable, and user-friendly applications while continuously improving as a developer.",
};

export const navigationItems: NavigationItem[] = [
  { label: "Services", href: "#services" },
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
    title: "QA/Tester",
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
      "Flowbite",
      "shadcn/ui",
      "Lucide React",
      "Bootstrap",
    ],
  },
  {
    title: "Backend and Database",
    icon: Database,
    skills: ["Supabase", "PostgreSQL", "PHP", "MySQL", "Node.js"],
  },
  {
    title: "Testing and QA/Tester",
    icon: TestTube2,
    skills: [
      "Functional Testing",
      "Integration Testing",
      "UAT",
      "Bug Documentation",
    ],
  },
  {
    title: "Development Tooling",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "npm",
      "pnpm",
      "Vercel",
      "XAMPP",
      "Laragon",
      "MySQL Workbench",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "smart-pos",
    title: "Smart POS System",
    summary:
      "Enterprise-style point-of-sale ecosystem with service-specific views, real-time analytics, inventory workflows, and QA testing coverage.",
    primaryCategory: "stand-alone",
    categories: ["stand-alone", "mobile"],
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
    challenges: [
      "Connected multiple service views without duplicating business logic.",
      "Designed inventory updates around clear transaction states.",
      "Documented UAT findings for operational reliability.",
    ],
    githubUrl: "https://github.com/Jay-Scripts/CAPSTONE-SMART-POS.git",
    liveDemoUrl: "https://example.com/",
  },
  {
    id: "smart-pos-system-flowchart",
    title: "Smart POS System Flowchart",
    summary:
      "System flow documentation for the Smart POS ecosystem showing how kiosk, cashier, customer display, barista, manager, CRM, and database modules connect.",
    primaryCategory: "system-flowcharts",
    categories: ["system-flowcharts"],
    techStack: [
      "System Analysis",
      "Process Mapping",
      "Workflow Documentation",
      "Module Architecture",
    ],
    architecture: [
      "Cashier POS workflow",
      "Self-service kiosk flow",
      "Customer view status updates",
      "Barista preparation routing",
      "Manager and CRM module links",
      "Database synchronization path",
    ],
    features: [
      "Module-by-module system diagrams",
      "Cross-screen operational flow mapping",
      "Database relationship visibility",
      "Documentation for planning and QA review",
    ],
    flowchartActivities: [
      "Customer order entry from cashier POS or self-service kiosk",
      "Automatic ticket routing to the barista preparation screen",
      "Live order status updates reflected on the customer view display",
      "Completed sales posting to inventory and analytics records",
    ],
    flowchartPreviews: smartPosFlowchartPreviews,
    previewAlt: "Smart POS system flowchart preview for the options module",
    previewSrc: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
    challenges: [
      "Mapped multiple Smart POS modules into one readable operational system.",
      "Clarified handoffs between ordering, fulfillment, customer display, and reporting.",
      "Turned implementation logic into diagrams useful for planning and QA validation.",
    ],
    githubUrl: "https://github.com/Jay-Scripts",
    liveDemoUrl: "/sysflow-svg/SYSTEM FLOW SMART POS-Options Module.drawio.svg",
  },
  {
    id: "car-rental",
    title: "Car Rental Management System",
    summary:
      "Booking and fleet management platform with admin workflows, notifications, reporting, and database-first planning.",
    primaryCategory: "website",
    categories: ["website", "mobile"],
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
    githubUrl: "https://github.com/Jay-Scripts/CAR-RENTAL-SYSTEM-.git",
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
    previewAlt: "Smart POS user manual front page cover preview",
    previewDialogSrc:
      "/user-manual/SMART%20POS%20USER%20MANUAL.pdf#page=1&view=FitH",
    previewSrc: "/user-manual/SMART%20POS%20FRONT%20PAGE.png",
  },
];

export const experiences: Experience[] = [
  {
    role: "Junior Web Developer (Intern)",
    organization: "Little Ark Foundation Inc.",
    period: "Jan 2026 - Present",
    icon: Code2,
    isTechRelated: true,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    highlights: [
      "Assisted in developing a Next.js and Supabase web application with authentication, protected routes, and role-based database access using Row Level Security.",
      "Designed and implemented relational database schemas in Supabase/PostgreSQL, including normalized tables, relationships, and access rules for secure data handling.",
      "Developed responsive UI improvements using Tailwind CSS, enabling the application to support desktop, tablet, and mobile users instead of being limited to desktop-only access.",
      "Developed and executed 700+ structured QA test case entries to validate responsiveness, RBAC permissions, security risks, UX issues, design inconsistencies, input validation, and end-to-end system workflows before deployment.",
      "Documented and reported system bugs through structured QA testing and helped resolve issues that improved workflow reliability, validation behavior, and usability.",
      "Coordinated with stakeholders to provide progress updates, gather feedback, and implement UX improvements, including mobile usability, detailed input helper messages, auto-focus validation, and a camera-based QR code scanning feature for faster tablet and mobile workflows.",
    ],
  },
  {
    role: "Service Crew",
    organization: "Golden Arches Development Corporation - McDonald's",
    period: "Aug 2022 - Jun 2026",
    icon: ShieldCheck,
    highlights: [
      "Handled customer orders, food preparation, cleanliness, and customer service while supporting daily store operations.",
      "Performed basic store equipment maintenance and troubleshooting, including monitors, keyboards, mouse devices, HDMI/VGA connections, and cash register/POS-related issues.",
      "Conducted initial hardware issue checks before escalation to the company IT team, helping reduce unnecessary IT support requests and site visit requests.",
      "Supported unit cleaning, equipment checking, and basic preventive maintenance to keep store systems and workstations operational.",
    ],
  },
  {
    role: "IT Support Assistant (Student Assistant)",
    organization: "Global Reciprocal Colleges",
    period: "Jul 2022 - Jul 2026",
    icon: Headphones,
    isTechRelated: true,
    highlights: [
      "Assisted in setting up and maintaining 2 computer laboratories, including workstation preparation, hardware arrangement, and basic system configuration.",
      "Performed PC hardware maintenance and repairs, including soldering, component replacement, system upgrades, and peripheral troubleshooting.",
      "Installed and reinstalled operating systems, configured software, printers, and basic lab equipment to support classroom and office operations.",
      "Provided technical support to faculty, staff, and departments by troubleshooting internet connectivity, printer issues, system access problems, and hardware-related concerns.",
      "Supported lab maintenance tasks, including cleaning, equipment checking, hardware transfers, and basic preventive maintenance.",
    ],
  },
  {
    role: "Stock Clerk",
    organization: "Be Connected Management Services - Bench",
    period: "Jun 2021 - Jul 2022",
    icon: BriefcaseBusiness,
    highlights: [
      "Managed stockroom organization, inventory checking, and item monitoring to support daily store operations.",
      "Performed basic store maintenance support, including cable and wiring cleanup, system unit maintenance, and equipment checking.",
      "Assisted in troubleshooting POS-related hardware issues, including non-working monitors and other output device concerns.",
      "Helped identify and report defective store fixtures such as LED lights and light transformers for repair or replacement.",
    ],
  },
  {
    role: "Bagger",
    organization: "Rustan Supercenters, Inc. - Shopwise",
    period: "Jun 2020 - Nov 2020",
    icon: BriefcaseBusiness,
    highlights: [
      "Packed customer purchases efficiently and assisted customers during checkout and carry-out support.",
    ],
  },
  {
    role: "Service Crew",
    organization: "Jollibee Food Corporation - Jollibee",
    period: "Sep 2018 - Sep 2019",
    icon: ShieldCheck,
    highlights: [
      "Supported customer service, order taking, food preparation, and store cleanliness in a fast-paced team environment.",
    ],
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
      "My goal is to grow as a well-rounded developer who can build, test, document, and improve real-world systems.",
      "I want to keep improving in UI/UX, responsive frontend work, backend systems, and QA so I can contribute across the full delivery process.",
    ],
  },
];

export const aboutHighlights = [
  "Full-stack growth",
  "QA mindset",
  "Responsive UI",
  "System thinking",
] as const;
