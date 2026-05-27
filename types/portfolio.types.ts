import type { LucideIcon } from "lucide-react";

export type SkillGroup = {
  icon: LucideIcon;
  skills: string[];
  title: string;
};

export type ProjectCategory = "all" | "full-stack" | "dashboard" | "qa";

export type FlowchartPreview = {
  alt: string;
  id: string;
  label: string;
  src: string;
};

export type Project = {
  architecture: string[];
  category: Exclude<ProjectCategory, "all">;
  challenges: string[];
  features: string[];
  flowchartActivities?: string[];
  flowchartPreviews?: FlowchartPreview[];
  githubUrl: string;
  id: string;
  liveDemoUrl: string;
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
  githubUrl: string;
  linkedinUrl: string;
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

export type Education = {
  coursework: string[];
  degree: string;
  specialization: string;
};

export type TechStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type RecentRepository = {
  description: string;
  name: string;
  stack: string;
};

export type AboutHighlight = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export type ServiceOffering = {
  description: string;
  icon: LucideIcon;
  title: string;
};
