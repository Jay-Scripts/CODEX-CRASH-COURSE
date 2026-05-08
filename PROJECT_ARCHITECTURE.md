# Project Architecture

## Overview

This portfolio is a Next.js App Router application built with React 19, TypeScript strict mode, Tailwind CSS v4, shadcn/ui-style primitives, Framer Motion, Lucide React, and next-themes.

The architecture keeps static portfolio content in Server Components by default and isolates browser-only behavior into small Client Components. This preserves performance while supporting theme toggling, command search, scroll progress, subtle animations, project filtering, and contact form validation.

## Folder Structure

- `app/`: App Router entry points, metadata, global styles, loading UI, and the root layout.
- `components/layout/`: Shared site shell components such as header, footer, and theme toggle.
- `components/providers/`: Client providers used by the App Router layout.
- `components/ui/`: shadcn/ui-style primitives owned by the project.
- `features/portfolio/`: Portfolio feature data, services, and section components.
- `hooks/`: Reusable client hooks.
- `lib/`: Shared utilities.

## Rendering Strategy

- `app/page.tsx` is a Server Component that composes the full portfolio.
- Client Components are used only for interactive islands:
  - Command menu
  - Theme toggle
  - Scroll progress indicator
  - Animated sections
  - Skills animation
  - Project filtering
  - Contact form validation
- `GitHubActivitySection` is loaded through Suspense with a skeleton fallback to model async data loading.

## Styling and Design System

- Tailwind CSS v4 is configured through `app/globals.css`.
- shadcn-compatible theme tokens are exposed as CSS variables.
- Dark mode is class-based through `next-themes`.
- Geist Sans and Geist Mono are loaded through `next/font`.
- UI primitives live in `components/ui/` and use the shared `cn()` utility.

## Data Flow

- Static portfolio content is centralized in `features/portfolio/data.ts`.
- Async activity data is retrieved through `features/portfolio/services/github-activity.ts`.
- Page sections consume typed data and avoid duplicating project, skills, experience, education, and contact constants.

## Quality Standards

- TypeScript strict mode remains enabled.
- Components follow a feature-based structure.
- Shared primitives and utilities are documented in `REUSABLE_FUNCTIONS.md`.
- No production debug logs are used.
- UI is mobile-first, keyboard-accessible where interactive, and designed around recruiter scanning.
