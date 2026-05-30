# components.md

## Layout

### `SiteHeader`

- Purpose: Renders the sticky site navigation with desktop links, a mobile menu, command search, and theme controls.
- Location: `components/layout/site-header.tsx`

### `SiteFooter`

- Purpose: Renders the footer stack summary and outbound profile links.
- Location: `components/layout/site-footer.tsx`

### `ThemeToggle`

- Purpose: Switches between light and dark theme modes.
- Location: `components/layout/theme-toggle.tsx`

### `CommandMenu`

- Purpose: Provides the keyboard-first portfolio command search used from the site header across desktop and mobile navigation.
- Location: `components/layout/command-menu.tsx`

## Common

### `AnimatedSection`, `RevealGroup`, `RevealItem`, `SectionHeading`, `ScrollProgress`

- Purpose: Provide shared motion wrappers, staggered reveal helpers, consistent section headings, and the global scroll progress indicator used across the site shell.
- Location: `components/common/*`

## Cards

### `ProjectCard`, `ExperienceCard`

- Purpose: Render recruiter-facing project and experience content as reusable card patterns with stronger semantic structure.
- Location: `components/cards/*`

### `ProjectFlowchartCarousel`, `ProjectFlowchartOverlay`

- Purpose: Display ordered project flowchart previews and a fullscreen inspection overlay for system diagrams without duplicating that interaction logic inside sections.
- Location: `components/cards/*`

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

### `HeroSection`, `ServicesSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ExperienceSection`, `EducationSection`, `GitHubActivitySection`, `ContactSection`

- Purpose: Compose the recruiter-facing home page sections with responsive layouts across mobile and desktop, including a stronger hero introduction.
- Location: `components/sections/home/*`

### `ProjectFilter`

- Purpose: Supports interactive category-tab filtering for featured projects before handing each visible result to the shared project card layer.
- Location: `components/sections/home/project-filter.tsx`
