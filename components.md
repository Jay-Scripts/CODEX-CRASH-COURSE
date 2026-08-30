# components.md

## Layout

### `SiteHeader`

- Purpose: Renders the raised neomorphic sticky site navigation with staggered top-slide entrance motion across the logo, links, command search, theme toggle, and mobile menu control.
- Location: `components/layout/site-header.tsx`

### `SiteFooter`

- Purpose: Renders a raised neomorphic recruiter-focused footer with general IT positioning, site navigation, location, and outbound profile links including optional Facebook access when present in profile data.
- Location: `components/layout/site-footer.tsx`

### `ThemeToggle`

- Purpose: Switches immediately between light and dark modes without expensive full-page snapshots or transition resets.
- Location: `components/layout/theme-toggle.tsx`

### `CommandMenu`

- Purpose: Provides the keyboard-first portfolio command search used from the site header across desktop and mobile navigation.
- Location: `components/layout/command-menu.tsx`

## Common

### `AnimatedSection`, `RevealGroup`, `RevealItem`, `SectionHeading`, `ScrollProgress`, `ScrollToTopButton`, `SectionAccentBackdrop`, `InteractiveConstellation`

- Purpose: Provide shared motion wrappers with a minimum one-viewport section rhythm, staggered reveal helpers, consistent section headings, solid neomorphic section surfaces, viewport-wide raised relief shapes, a 20%-denser pointer-responsive constellation canvas whose continuously drifting nodes form and release proximity links across the non-hero home-page sections, viewport-aware skill-carousel motion, the global scroll progress indicator, and a floating back-to-top button used across the site shell.
- Location: `components/common/*`

## Cards

### `ProjectCard`, `ExperienceCard`

- Purpose: Render recruiter-facing project and experience content as reusable card patterns with stronger semantic structure, including maximized mobile project previews, compact phone content density, side-by-side technical summaries, flexible portrait or landscape preview surfaces, and on-demand supporting-material previews that avoid hidden responsive duplicates and defer video loading until playback.
- Location: `components/cards/*`

### `GitHubActivityCard`

- Purpose: Displays a recruiter-facing GitHub activity summary and contribution preview inside the experience section.
- Location: `components/cards/github-activity-card.tsx`

### `ExperienceProofGallery`

- Purpose: Handles compact mobile proof buttons that open the full gallery, responsive desktop hover proof layouts for tighter and wider screens, lazy hover video previews, and raised neomorphic in-app proof modals with adjacent-image preloading for immediate navigation between internship certificates, screenshots, videos, and spreadsheet previews without sending users to a new tab.
- Location: `components/cards/experience-proof-gallery.tsx`

### `ProjectFlowchartCarousel`, `ProjectFlowchartOverlay`

- Purpose: Display ordered project flowchart previews and a raised neomorphic fullscreen inspection overlay for system diagrams with inset viewing space, built-in zoom controls, open-in-tab access, centered carousel-style navigation, and smoother diagram switching without duplicating that interaction logic inside sections.
- Location: `components/cards/*`

### `ProjectDocumentOverlay`

- Purpose: Displays a raised neomorphic fullscreen document preview modal for project assets and resume PDFs with an inset viewer, centered in-view navigation, zoom controls, non-transforming swipe gestures that keep first-open canvas rendering correctly oriented, and optional direct download access while keeping the portfolio page in place underneath.
- Location: `components/cards/project-document-overlay.tsx`

### `ProjectPreviewGalleryModal`

- Purpose: Displays a raised neomorphic fullscreen image gallery modal for project screenshot previews with an inset viewer, categorized tabs, keyboard navigation, adjacent-image preloading for immediate previous/next navigation, and direct image opening without leaving the portfolio.
- Location: `components/cards/project-preview-gallery-modal.tsx`

### `ProjectSystemPreviewModal`

- Purpose: Opens raised neomorphic in-page placeholder or real project walkthrough previews for project cards without redirecting users away from the portfolio.
- Location: `components/cards/project-system-preview-modal.tsx`

### `ProjectRecognitionModal`

- Purpose: Opens raised neomorphic in-page project recognition and award proofs for project cards without redirecting users away from the portfolio.
- Location: `components/cards/project-recognition-modal.tsx`

## Forms

### `ContactForm`

- Purpose: Validates, sanitizes, and renders the reusable recruiter contact form with shared shadcn form controls, EmailJS submission, and a raised neomorphic success dialog.
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

- Purpose: Shared shadcn-style primitives used throughout the app for actions, typography, classic soft-UI surfaces that share the page material, compact upper-left/lower-right relief shadows, inset form controls, and matched light- and dark-mode depth.
- Location: `components/ui/*`

## Home Sections

### `HeroSection`, `HeroIconConnections`, `ServicesSection`, `AboutSection`, `SkillsSection`, `SkillsCarouselRow`, `SkillsCategoryModal`, `ProjectsSection`, `ExperienceSection`, `CertificatesSection`, `CertificatePreviewModal`, `ContactSection`

- Purpose: Compose recruiter-facing home page sections with responsive neomorphic layouts across mobile and desktop, including cursor-triggered connection lines between nearby floating hero technology icons without particle dots; a compact two-column mobile contribution grid with a centered final card, softly raised surfaces, inset icon wells, and a staggered alternating 3D fan-in reveal; a compact two-column About layout whose paired cards hinge inward from opposite edges; mobile Technical Skills toolbelt lanes with compact pills, category counts, directional cues, edge fades, and alternating tool-drawer reveals; a condensed mobile Experience timeline with compact proof buttons and timeline-fold card reveals; a two-column mobile certificate gallery with compact document tiles and alternating certificate-stamp reveals; load-aware floating app-development and technical-support experience metrics with an elliptic slide-in reveal in the hero; generalized positioning for software development, technical support, software testing, and QA opportunities; clickable skill-category headings that open a responsive modal inventory of every categorized tool; GitHub activity inside the About section; and accessible full-width skill carousels with a minimal two-copy loop, smooth deterministic motion, pointer dragging, eased pause states, and reduced-motion support.
- Location: `components/sections/home/*`

HeroSection and SkillsCarouselRow serve their tiny SVG skill logos without the Next.js image optimizer so remote icon CDNs load directly instead of failing through Vercel's external-image proxy.

AboutSection keeps Personal details and About my goals side by side from mobile upward, with compact phone typography and a paired 3D hinge entrance from opposite outer edges.

HeroSection’s responsive rotating decorative layer displays flat, brand-colored icons for JavaScript, TypeScript, PHP, React, React Native, HTML, CSS, Tailwind CSS, Bootstrap 5, Next.js, Node.js, shadcn/ui, Lucide React, MySQL, PostgreSQL, Claude, Claude Code, Codex, ChatGPT, Git, GitHub, Cursor, and VS Code. Phones receive a compact nine-logo edge rail, tablets add four supporting tools, and wide desktops retain the full constellation; every tier scales its icons for the viewport, stays behind the hero content, and pops in after a two-second staggered entrance without glow or shadow effects.

### `ProjectFilter`

- Purpose: Supports interactive category-tab filtering for featured projects with a scrollbar-free two-column mobile tab grid, maximized phone-width project cards, and alternating blueprint-unfold reveals before handing each visible result to the shared project card layer.
- Location: `components/sections/home/project-filter.tsx`
