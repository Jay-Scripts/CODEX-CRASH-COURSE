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

## Providers

### `ThemeProvider`

- Purpose: Wraps `next-themes` for class-based theme handling.
- Location: `components/providers/theme-provider.tsx`

## UI Primitives

### `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `Skeleton`, `Separator`

- Purpose: Shared shadcn-style primitives used throughout the app for actions, surfaces, typography, and form controls.
- Location: `components/ui/*`

## Home Sections

### `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `ExperienceSection`, `EducationSection`, `GitHubActivitySection`, `ContactSection`

- Purpose: Compose the recruiter-facing home page sections.
- Location: `components/sections/home/*`

### `ProjectFilter`, `ContactForm`, `CommandMenu`, `AnimatedSection`, `RevealGroup`, `RevealItem`, `SectionHeading`, `ScrollProgress`

- Purpose: Support interactive filtering, contact validation, an anchored command search dropdown, synchronized scroll-reveal animation, consistent headings, and progress feedback on the home page.
- Location: `components/sections/home/*`
