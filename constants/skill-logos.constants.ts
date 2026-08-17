import {
  ClipboardCheck,
  FileText,
  FileWarning,
  GitBranch,
  HardDrive,
  Headphones,
  MonitorCog,
  Network,
  PackageCheck,
  ScanSearch,
  Sparkles,
  UserCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type SkillLogoMeta = {
  darkLogo?: string;
  icon?: LucideIcon;
  logo?: string;
  logoClassName?: string;
};

/** Maps portfolio skill names to their visual logo or fallback icon. */
export const skillLogoMap: Record<string, SkillLogoMeta> = {
  "Basic Network Troubleshooting": { icon: Network },
  Bootstrap: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  CSS: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  "Bug Documentation": { icon: FileWarning },
  Claude: {
    logo: "https://cdn.simpleicons.org/claude/D97757",
  },
  "Claude Code": { logo: "https://cdn.simpleicons.org/claudecode/D97757" },
  Codex: {
    logo: "/codex.svg",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  Cursor: {
    logo: "https://cdn.simpleicons.org/cursor/000000",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "EAS Build": {
    logo: "https://cdn.simpleicons.org/expo/000020",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  Flowbite: { icon: Sparkles },
  "Functional Testing": { icon: ClipboardCheck },
  Git: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  GitHub: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "Integration Testing": { icon: GitBranch },
  "Hardware & Peripheral Setup": { icon: HardDrive },
  "Incident Documentation": { icon: FileText },
  "Issue Diagnosis": { icon: ScanSearch },
  "JavaScript ES6": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  ChatGPT: {
    logo: "/gpt.svg",
  },
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  HTML: {
    logo: "https://cdn.simpleicons.org/html5/E34F26",
  },
  Laragon: { logo: "https://cdn.simpleicons.org/laragon/0E83CD" },
  "Lucide React": {
    logo: "https://cdn.simpleicons.org/lucide",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  MySQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  "MySQL Workbench": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  "Next.js": {
    darkLogo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    logo: "https://cdn.simpleicons.org/nextdotjs/000000",
  },
  "Node.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  npm: { logo: "https://cdn.simpleicons.org/npm/CB3837" },
  PHP: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  pnpm: { logo: "https://cdn.simpleicons.org/pnpm/F69220" },
  PostgreSQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  "React Native": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnative/reactnative-original.svg",
  },
  "Software Installation & Configuration": { icon: PackageCheck },
  "Software Troubleshooting": { icon: Wrench },
  "shadcn/ui": {
    logo: "https://cdn.simpleicons.org/shadcnui",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  Supabase: { logo: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  "Tailwind CSS": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  UAT: { icon: UserCheck },
  "User Support": { icon: Headphones },
  Vercel: {
    logo: "https://cdn.simpleicons.org/vercel",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "VS Code": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  XAMPP: { logo: "https://cdn.simpleicons.org/xampp/FB7A24" },
  "Windows Support": { icon: MonitorCog },
};
