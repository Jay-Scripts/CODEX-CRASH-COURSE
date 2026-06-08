import type { LucideIcon } from "lucide-react";

export type SkillGroup = {
  icon: LucideIcon;
  skills: string[];
  title: string;
};

export type ProjectCategory =
  | "stand-alone"
  | "website"
  | "mobile"
  | "user-manuals"
  | "system-flowcharts";

export type ProjectFilterValue = "all" | ProjectCategory;

export type FlowchartPreview = {
  alt: string;
  id: string;
  label: string;
  src: string;
};

export type ProjectResourceLink = {
  href: string;
  label: string;
};

export type ProjectDocumentLayout = "auto" | "single-page";

export type Project = {
  architecture: string[];
  categories: ProjectCategory[];
  primaryCategory: ProjectCategory;
  challenges: string[];
  documentLayout?: ProjectDocumentLayout;
  features: string[];
  flowchartActivities?: string[];
  flowchartPreviews?: FlowchartPreview[];
  githubUrl: string;
  id: string;
  liveDemoUrl: string;
  previewAlt?: string;
  previewDialogSrc?: string;
  previewSrc?: string;
  resourceLinks?: ProjectResourceLink[];
  summary: string;
  techStack: string[];
  title: string;
};

export type Experience = {
  highlights: string[];
  icon: LucideIcon;
  organization: string;
  period: string;
  role: string;
};

export type Profile = {
  email: string;
  facebookUrl?: string;
  githubUrl: string;
  linkedinUrl: string;
  logoAlt: string;
  logoSrc: string;
  location: string;
  name: string;
  resumeUrl: string;
  role: string;
  summary: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type AboutEntry = {
  description: string[];
  icon: LucideIcon;
  title: string;
};

export type ServiceOffering = {
  description: string;
  icon: LucideIcon;
  title: string;
};
