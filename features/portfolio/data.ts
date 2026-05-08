import {
  BriefcaseBusiness,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Headphones,
  LineChart,
  Server,
  ShieldCheck,
  TestTube2,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export type ProjectCategory = "all" | "full-stack" | "dashboard" | "qa";

export type Project = {
  id: string;
  title: string;
  summary: string;
  category: Exclude<ProjectCategory, "all">;
  techStack: string[];
  architecture: string[];
  features: string[];
  challenges: string[];
  githubUrl: string;
  liveDemoUrl: string;
};

export type Experience = {
  role: string;
  organization: string;
  period: string;
  icon: LucideIcon;
  highlights: string[];
};

export const profile = {
  name: "Cornelio Jay Scripts",
  role: "Junior Full-Stack Developer",
  email: "hello@example.com",
  location: "Philippines",
  linkedinUrl: "https://www.linkedin.com/",
  githubUrl: "https://github.com/",
  resumeUrl: "/resume.pdf",
  summary:
    "BSIT developer focused on reliable full-stack systems, QA discipline, database design, and enterprise-ready user experiences.",
};

export const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["Next.js", "React", "JavaScript ES6", "Tailwind CSS", "Bootstrap"],
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
    category: "full-stack",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Chart.js", "Tailwind CSS"],
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
    githubUrl: "https://github.com/",
    liveDemoUrl: "https://example.com/",
  },
  {
    id: "car-rental",
    title: "Car Rental Management System",
    summary:
      "Booking and fleet management platform with admin workflows, notifications, reporting, and database-first planning.",
    category: "dashboard",
    techStack: ["PHP", "MySQL", "Bootstrap", "XAMPP", "MySQL Workbench"],
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
    challenges: [
      "Mapped rental workflows into maintainable database relationships.",
      "Improved admin visibility through reporting and vehicle status views.",
      "Handled booking data with clear validation boundaries.",
    ],
    githubUrl: "https://github.com/",
    liveDemoUrl: "https://example.com/",
  },
];

export const experiences: Experience[] = [
  {
    role: "IT Intern",
    organization: "Little Ark Foundation",
    period: "Internship",
    icon: BriefcaseBusiness,
    highlights: [
      "Supported technical workflows and documentation.",
      "Practiced debugging, issue tracking, and stakeholder communication.",
      "Worked with client-server concepts and database-backed systems.",
    ],
  },
  {
    role: "IT Support Assistant",
    organization: "Technical Support Experience",
    period: "Support role",
    icon: Headphones,
    highlights: [
      "Assisted users with troubleshooting and system support.",
      "Resolved issues through step-by-step diagnosis.",
      "Translated technical problems into clear user guidance.",
    ],
  },
  {
    role: "Service Crew",
    organization: "McDonald's",
    period: "Customer service",
    icon: ShieldCheck,
    highlights: [
      "Built teamwork, discipline, and customer-first communication.",
      "Handled fast-paced operational pressure with consistency.",
      "Strengthened accountability and service reliability.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  specialization: "Full-stack development, QA testing, database design, and system analysis",
  coursework: [
    "Client-server architecture",
    "Database management systems",
    "Software engineering",
    "Web application development",
    "Systems analysis and design",
  ],
};

export const techStats = [
  { label: "Primary focus", value: "Full-stack", icon: Server },
  { label: "Architecture", value: "Database-first", icon: Database },
  { label: "Quality", value: "QA-driven", icon: ShieldCheck },
  { label: "Versioning", value: "Git workflow", icon: GitBranch },
];

export const recentRepositories = [
  {
    name: "smart-pos-system",
    description: "POS, kiosk, analytics, and inventory workflow prototype.",
    stack: "Next.js, Supabase, PostgreSQL",
  },
  {
    name: "car-rental-management",
    description: "Booking, admin reporting, vehicle tracking, and notification flows.",
    stack: "PHP, MySQL, Bootstrap",
  },
  {
    name: "qa-test-documentation",
    description: "Functional, integration, and UAT documentation samples.",
    stack: "Testing, QA, Documentation",
  },
];

export const aboutHighlights = [
  {
    title: "Full-stack foundation",
    icon: Server,
    description:
      "Comfortable connecting UI flows to backend services, relational data models, and operational dashboards.",
  },
  {
    title: "QA mindset",
    icon: ShieldCheck,
    description:
      "Uses functional testing, integration testing, UAT, and bug documentation to improve delivery quality.",
  },
  {
    title: "Systems thinking",
    icon: LineChart,
    description:
      "Focuses on client-server architecture, database structure, workflows, and maintainable feature boundaries.",
  },
  {
    title: "Continuous learning",
    icon: GraduationCap,
    description:
      "Builds with modern frontend tooling while strengthening backend, database, and enterprise delivery habits.",
  },
];
