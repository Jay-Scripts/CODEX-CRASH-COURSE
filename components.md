# components.md

## Layout

### `SiteHeader`

- Purpose: Renders the sticky site navigation with staggered top-slide entrance motion across the logo, links, command search, theme toggle, and mobile menu control.
- Location: `components/layout/site-header.tsx`

### `SiteFooter`

- Purpose: Renders a mobile-first footer with centered phone layout, smoother tablet-to-desktop responsiveness, and outbound profile links including optional Facebook access when present in profile data.
- Location: `components/layout/site-footer.tsx`

### `ThemeToggle`

- Purpose: Switches between light and dark modes with a smooth compositor-level fade and an accessible reduced-motion fallback.
- Location: `components/layout/theme-toggle.tsx`

### `CommandMenu`

- Purpose: Provides the keyboard-first portfolio command search used from the site header across desktop and mobile navigation.
- Location: `components/layout/command-menu.tsx`

## Common

### `AnimatedSection`, `RevealGroup`, `RevealItem`, `SectionHeading`, `ScrollProgress`, `ScrollToTopButton`, `SectionAccentBackdrop`

- Purpose: Provide shared motion wrappers with a minimum one-viewport section rhythm, staggered reveal helpers, consistent section headings, fluid section surfaces, viewport-wide refractive glass lenses, viewport-aware skill-carousel motion, the global scroll progress indicator, and a floating back-to-top button used across the site shell.
- Location: `components/common/*`

## Cards

### `ProjectCard`, `ExperienceCard`

- Purpose: Render recruiter-facing project and experience content as reusable card patterns with stronger semantic structure, including flexible portrait or landscape project preview surfaces plus experience-side supporting material previews for certificates, photos, reports, and hover-preview videos.
- Location: `components/cards/*`

### `GitHubActivityCard`

- Purpose: Displays a recruiter-facing GitHub activity summary and contribution preview inside the experience section.
- Location: `components/cards/github-activity-card.tsx`

### `ExperienceProofGallery`

- Purpose: Handles mobile proof lists, responsive desktop hover proof layouts for tighter and wider screens, lazy hover video previews, and in-app proof modals for internship certificates, screenshots, videos, and spreadsheet previews without sending users to a new tab.
- Location: `components/cards/experience-proof-gallery.tsx`

### `ProjectFlowchartCarousel`, `ProjectFlowchartOverlay`

- Purpose: Display ordered project flowchart previews and a fullscreen inspection overlay for system diagrams with built-in zoom controls, open-in-tab access, centered carousel-style navigation, and smoother diagram switching without duplicating that interaction logic inside sections.
- Location: `components/cards/*`

### `ProjectDocumentOverlay`

- Purpose: Displays a fullscreen document preview modal for project assets and resume PDFs with centered in-view navigation, zoom controls, non-transforming swipe gestures that keep first-open canvas rendering correctly oriented, and optional direct download access while keeping the portfolio page in place underneath.
- Location: `components/cards/project-document-overlay.tsx`

### `ProjectPreviewGalleryModal`

- Purpose: Displays a fullscreen image gallery modal for project screenshot previews with categorized tabs, keyboard navigation, and direct image opening without leaving the portfolio.
- Location: `components/cards/project-preview-gallery-modal.tsx`

### `ProjectSystemPreviewModal`

- Purpose: Opens in-page placeholder or real project walkthrough previews for project cards without redirecting users away from the portfolio.
- Location: `components/cards/project-system-preview-modal.tsx`

### `ProjectRecognitionModal`

- Purpose: Opens in-page project recognition and award proofs for project cards without redirecting users away from the portfolio.
- Location: `components/cards/project-recognition-modal.tsx`

## Forms

### `ContactForm`

- Purpose: Validates, sanitizes, and renders the reusable recruiter contact form with shared shadcn form controls and EmailJS submission.
- Location: `components/forms/contact-form.tsx`

## Providers

### `ThemeProvider`

- Purpose: Wraps `next-themes` for class-based theme handling.
- Location: `components/providers/theme-provider.tsx`

### `MotionProvider`

- Purpose: Applies consistent Framer Motion timing and honors each visitor's reduced-motion preference across the site.
- Location: `components/providers/motion-provider.tsx`

## UI Primitives

### `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `Skeleton`, `Separator`

- Purpose: Shared shadcn-style primitives used throughout the app for actions, typography, fluid-glass card surfaces, and translucent form controls that remain legible in light and dark themes.
- Location: `components/ui/*`

## Home Sections

### `HeroSection`, `ServicesSection`, `AboutSection`, `SkillsSection`, `SkillsCarouselRow`, `ProjectsSection`, `ExperienceSection`, `CertificatesSection`, `CertificatePreviewModal`, `ContactSection`

- Purpose: Compose recruiter-facing home page sections with responsive layouts across mobile and desktop, including a staggered bottom-elliptic reveal for the “What I Can Provide” service cards; load-aware floating app-development and technical-support experience metrics with an elliptic slide-in reveal in the hero; generalized positioning for software development, technical support, software testing, and QA opportunities; a dedicated technical support and troubleshooting skills carousel with centered icon-free category headings; GitHub activity inside the About section; and accessible full-width skill carousels with smooth deterministic motion, pointer dragging, eased pause states, and reduced-motion support.
- Location: `components/sections/home/*`

AboutSection now gives its Personal details card a left-to-center 3D entrance and its About my goals card a right-to-center 3D entrance, matching the hero floating metric motion.

### `ProjectFilter`

- Purpose: Supports interactive category-tab filtering for featured projects before handing each visible result to the shared project card layer.
- Location: `components/sections/home/project-filter.tsx`
