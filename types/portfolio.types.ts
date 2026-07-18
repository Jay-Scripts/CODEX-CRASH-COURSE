import type { LucideIcon } from "lucide-react";

export type SkillGroup = {
  icon: LucideIcon;
  skills: string[];
  title: string;
};

export type ExperienceProofItem = {
  alt: string;
  href?: string;
  label: string;
  spreadsheetPreview?: ExperienceSpreadsheetPreview;
  src: string;
  type: "certificate" | "photo" | "document" | "video";
};

export type ExperienceSpreadsheetSheet = {
  columns: string[];
  name: string;
  rows: string[][];
};

export type ExperienceSpreadsheetPreview = {
  sheets: ExperienceSpreadsheetSheet[];
};

export type Certificate = {
  credentialId?: string;
  href?: string;
  imageAlt?: string;
  imageSrc?: string;
  issued: string;
  issuer: string;
  skills?: string[];
  title: string;
  type: string;
};

export type ProjectCategory =
  | "pos"
  | "booking-&-reservation"
  | "ai-chat-bot"
  | "android"
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

export type ProjectPreviewLayout = "portrait" | "landscape";
export type ProjectPreviewSurface = "compact" | "expanded";

export type ProjectPreviewImage = {
  alt: string;
  category: string;
  label: string;
  src: string;
};

export type ProjectPreviewCategory = {
  id: string;
  label: string;
};

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
  previewLayout?: ProjectPreviewLayout;
  previewSurface?: ProjectPreviewSurface;
  previewDialogSrc?: string;
  previewSrc?: string;
  previewImages?: ProjectPreviewImage[];
  previewCategories?: ProjectPreviewCategory[];
  projectBadges?: string[];
  recognitionPreviewAlt?: string;
  recognitionPreviewNote?: string;
  recognitionPreviewSrc?: string;
  recognitionPreviewTitle?: string;
  resourceLinks?: ProjectResourceLink[];
  summary: string;
  systemPreviewAlt?: string;
  systemPreviewNote?: string;
  systemPreviewSrc?: string;
  techStack: string[];
  title: string;
};

export type Experience = {
  highlights: string[];
  icon: LucideIcon;
  isTechRelated?: boolean;
  organization: string;
  period: string;
  proofItems?: ExperienceProofItem[];
  role: string;
  techStack?: string[];
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
  summary: string[];
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
