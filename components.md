# components.md

## Layout

### `SiteHeader`

- Purpose: Renders the sticky site navigation with desktop links, a mobile menu, command search, and theme controls.
- Location: `components/layout/site-header.tsx`

### `SiteFooter`

- Purpose: Renders a mobile-first footer with centered phone layout, smoother tablet-to-desktop responsiveness, and outbound profile links including optional Facebook access when present in profile data.
- Location: `components/layout/site-footer.tsx`

### `ThemeToggle`

- Purpose: Switches between light and dark theme modes.
- Location: `components/layout/theme-toggle.tsx`

### `CommandMenu`

- Purpose: Provides the keyboard-first portfolio command search used from the site header across desktop and mobile navigation.
- Location: `components/layout/command-menu.tsx`

## Common

### `AnimatedSection`, `RevealGroup`, `RevealItem`, `SectionHeading`, `ScrollProgress`, `SectionAccentBackdrop`

- Purpose: Provide shared motion wrappers, staggered reveal helpers, consistent section headings, shared section grid backgrounds, subtle rotating section accents, and the global scroll progress indicator used across the site shell.
- Location: `components/common/*`

## Cards

### `ProjectCard`, `ExperienceCard`

- Purpose: Render recruiter-facing project and experience content as reusable card patterns with stronger semantic structure, including experience-side supporting material previews for certificates, photos, reports, and hover-preview videos.
- Location: `components/cards/*`

### `ExperienceProofGallery`

- Purpose: Handles mobile proof lists, responsive desktop hover proof layouts for tighter and wider screens, and in-app proof modals for internship certificates, screenshots, videos, and spreadsheet previews without sending users to a new tab.
- Location: `components/cards/experience-proof-gallery.tsx`

### `ProjectFlowchartCarousel`, `ProjectFlowchartOverlay`

- Purpose: Display ordered project flowchart previews and a fullscreen inspection overlay for system diagrams with built-in zoom controls, open-in-tab access, centered carousel-style navigation, and smoother diagram switching without duplicating that interaction logic inside sections.
- Location: `components/cards/*`

### `ProjectDocumentOverlay`

- Purpose: Displays a fullscreen document preview modal for project assets and resume PDFs with centered in-view navigation, zoom controls, and optional direct download access while keeping the portfolio page in place underneath.
- Location: `components/cards/project-document-overlay.tsx`

### `ProjectSystemPreviewModal`

- Purpose: Opens in-page placeholder or real project walkthrough previews for project cards without redirecting users away from the portfolio.
- Location: `components/cards/project-system-preview-modal.tsx`

## Forms

### `ContactForm`

- Purpose: Validates, sanitizes, and renders the reusable recruiter contact form with shared shadcn form controls.
- Location: `components/forms/contact-form.tsx`

## Providers

### `ThemeProvider`

- Purpose: Wraps `next-themes` for class-based theme handling.
- Location: `components/providers/theme-provider.tsx`

## UI Primitives

### `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `Skeleton`, `Separator`

- Purpose: Shared shadcn-style primitives used throughout the app for actions, surfaces, typography, and form controls.
- Location: `components/ui/*`

## Home Sections

### `HeroSection`, `ServicesSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ExperienceSection`, `CertificatesSection`, `CertificatePreviewModal`, `ContactSection`

- Purpose: Compose the recruiter-facing home page sections with responsive layouts across mobile and desktop, including a stronger hero introduction and a dedicated certificates area with in-page preview modals for training and credential highlights.
- Location: `components/sections/home/*`

### `ProjectFilter`

- Purpose: Supports interactive category-tab filtering for featured projects before handing each visible result to the shared project card layer.
- Location: `components/sections/home/project-filter.tsx`
