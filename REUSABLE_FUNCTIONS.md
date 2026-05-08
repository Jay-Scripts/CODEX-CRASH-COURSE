# Reusable Functions, Hooks, Services, and Components

## `cn`

- Purpose: Merges conditional class names and resolves Tailwind class conflicts.
- Parameters: `...inputs: ClassValue[]`
- Returns: A merged class name string.
- Usage:

```ts
cn("rounded-md", isActive && "bg-primary")
```

- Dependencies: `clsx`, `tailwind-merge`
- How it works: `clsx` builds a conditional class string and `twMerge` removes conflicting Tailwind utilities.

## `useMounted`

- Purpose: Detects whether a Client Component has mounted.
- Parameters: None.
- Returns: `boolean`
- Usage:

```ts
const mounted = useMounted()
```

- Dependencies: React `useSyncExternalStore`
- How it works: Returns `false` for the server snapshot and `true` for the client snapshot to avoid hydration mismatches.

## `useCommandShortcut`

- Purpose: Registers the Ctrl/Cmd + K shortcut for command menu toggling.
- Parameters: `{ enabled?: boolean; onToggle: () => void }`
- Returns: `void`
- Usage:

```ts
useCommandShortcut({ onToggle: () => setOpen((value) => !value) })
```

- Dependencies: React `useEffect`
- How it works: Adds a keydown listener while enabled and removes it on cleanup.

## `getGitHubActivity`

- Purpose: Provides async GitHub/activity data for the portfolio activity section.
- Parameters: None.
- Returns: `Promise<{ contributionWeeks: number[]; recentRepositories: Repository[]; techStats: TechStat[] }>`
- Usage:

```ts
const activity = await getGitHubActivity()
```

- Dependencies: Portfolio data constants.
- How it works: Simulates an async data source and returns contribution, repository, and tech-stat data.

## UI Components

### `Button`

- Purpose: Reusable action primitive with shadcn-style variants and `asChild` composition.
- Parameters: Standard button props, `variant`, `size`, `asChild`.
- Returns: A styled button or slotted child.
- Usage:

```tsx
<Button asChild>
  <Link href="#projects">View Projects</Link>
</Button>
```

- Dependencies: `@radix-ui/react-slot`, `class-variance-authority`, `cn`.
- How it works: Uses CVA for variants and Radix Slot when rendering another element as the button target.

### `Badge`

- Purpose: Displays compact status, category, and technology labels.
- Parameters: Standard div props and `variant`.
- Returns: A styled label element.
- Usage:

```tsx
<Badge variant="outline">Next.js</Badge>
```

- Dependencies: `class-variance-authority`, `cn`.
- How it works: Applies variant classes through CVA.

### `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

- Purpose: Provides consistent content surfaces.
- Parameters: Standard HTML props for each element.
- Returns: Styled card layout primitives.
- Usage:

```tsx
<Card>
  <CardContent>Content</CardContent>
</Card>
```

- Dependencies: `cn`.
- How it works: Wraps semantic elements with consistent border, background, spacing, and text styles.

### `Input`

- Purpose: Reusable text input primitive.
- Parameters: Standard input props.
- Returns: A styled input element.
- Usage:

```tsx
<Input placeholder="Email" type="email" />
```

- Dependencies: `cn`.
- How it works: Applies accessible focus, disabled, placeholder, and theme-token classes.

### `Textarea`

- Purpose: Reusable multiline input primitive.
- Parameters: Standard textarea props.
- Returns: A styled textarea element.
- Usage:

```tsx
<Textarea placeholder="Message" />
```

- Dependencies: `cn`.
- How it works: Applies consistent sizing, border, focus, and theme-token styles.

### `Skeleton`

- Purpose: Loading placeholder for Suspense and route loading states.
- Parameters: Standard div props.
- Returns: A pulsing placeholder block.
- Usage:

```tsx
<Skeleton className="h-24" />
```

- Dependencies: `cn`.
- How it works: Applies an animated muted background with caller-controlled dimensions.

### `Separator`

- Purpose: Thin visual divider.
- Parameters: Standard div props.
- Returns: A horizontal divider.
- Usage:

```tsx
<Separator />
```

- Dependencies: `cn`.
- How it works: Renders a themed one-pixel divider.

## Layout Components

### `ThemeProvider`

- Purpose: Wraps `next-themes` for class-based light and dark mode.
- Parameters: `next-themes` provider props and children.
- Returns: Theme context provider.
- Usage:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark">...</ThemeProvider>
```

- Dependencies: `next-themes`.
- How it works: Delegates theme management to `next-themes`.

### `ThemeToggle`

- Purpose: Toggles between light and dark mode.
- Parameters: None.
- Returns: Icon button.
- Usage:

```tsx
<ThemeToggle />
```

- Dependencies: `next-themes`, `useMounted`, `Button`, Lucide icons.
- How it works: Waits for client mount, reads current theme, and switches to the opposite theme.

### `SiteHeader`

- Purpose: Sticky navigation shell with links, command menu, and theme toggle.
- Parameters: None.
- Returns: Header element.
- Usage:

```tsx
<SiteHeader />
```

- Dependencies: `Button`, `CommandMenu`, `ThemeToggle`, portfolio data.
- How it works: Maps navigation constants into accessible anchor links and keeps interaction islands isolated.

### `SiteFooter`

- Purpose: Footer with build stack summary and social links.
- Parameters: None.
- Returns: Footer element.
- Usage:

```tsx
<SiteFooter />
```

- Dependencies: `Separator`, portfolio profile data, Lucide icons.
- How it works: Renders shared profile links from centralized data.

## Portfolio Feature Components

### `AnimatedSection`

- Purpose: Adds subtle viewport-entry animation to section wrappers.
- Parameters: Framer Motion section props.
- Returns: Animated section element.
- Usage:

```tsx
<AnimatedSection id="about">...</AnimatedSection>
```

- Dependencies: `framer-motion`, `cn`.
- How it works: Uses `whileInView` with a small opacity and vertical offset transition.

### `SectionHeading`

- Purpose: Standard section heading block.
- Parameters: `eyebrow`, `title`, `description`.
- Returns: Centered heading content.
- Usage:

```tsx
<SectionHeading eyebrow="About" title="Profile" description="..." />
```

- Dependencies: None.
- How it works: Normalizes heading hierarchy and spacing across portfolio sections.

### `HeroSection`

- Purpose: Primary recruiter-facing introduction and CTA section.
- Parameters: None.
- Returns: Hero section.
- Usage:

```tsx
<HeroSection />
```

- Dependencies: `next/image`, `Button`, `Badge`, `Card`, portfolio profile data.
- How it works: Renders static profile content, CTA links, and the optimized hero portrait from centralized constants and public assets.

### `AboutSection`

- Purpose: Highlights full-stack foundation, QA mindset, systems thinking, and learning focus.
- Parameters: None.
- Returns: About section.
- Usage:

```tsx
<AboutSection />
```

- Dependencies: `AnimatedSection`, `SectionHeading`, `Card`, portfolio highlight data.
- How it works: Maps highlight data into reusable card surfaces.

### `SkillsSection`

- Purpose: Displays animated technical skill groups.
- Parameters: None.
- Returns: Skills section.
- Usage:

```tsx
<SkillsSection />
```

- Dependencies: `framer-motion`, `next/image`, `AnimatedSection`, `SectionHeading`, `Card`, `cn`, portfolio skill data, Lucide icons, external logo URLs.
- How it works: Builds a typed skill list from centralized data, matches each skill to a logo or Lucide icon, then renders the carousel and grouped skill cards.

### `ProjectFilter`

- Purpose: Filters featured projects by category.
- Parameters: `{ projects: Project[] }`
- Returns: Filter controls and project cards.
- Usage:

```tsx
<ProjectFilter projects={projects} />
```

- Dependencies: React `useMemo`, `useState`, `Button`, `Badge`, `Card`.
- How it works: Stores active filter state and derives visible projects from the supplied project list.

### `ProjectsSection`

- Purpose: Wraps featured project filtering with section copy.
- Parameters: None.
- Returns: Projects section.
- Usage:

```tsx
<ProjectsSection />
```

- Dependencies: `ProjectFilter`, `AnimatedSection`, `SectionHeading`, project data.
- How it works: Passes centralized project data into the interactive filter.

### `ExperienceSection`

- Purpose: Displays professional and service experience as a timeline.
- Parameters: None.
- Returns: Experience section.
- Usage:

```tsx
<ExperienceSection />
```

- Dependencies: `AnimatedSection`, `SectionHeading`, `Card`, experience data.
- How it works: Maps experience entries into alternating timeline cards.

### `EducationSection`

- Purpose: Displays BSIT degree, specialization, and relevant coursework.
- Parameters: None.
- Returns: Education section.
- Usage:

```tsx
<EducationSection />
```

- Dependencies: `AnimatedSection`, `SectionHeading`, `Card`, `Badge`, education data.
- How it works: Uses centralized education constants to render recruiter-relevant coursework.

### `GitHubActivitySection`

- Purpose: Displays async contribution placeholder, recent repositories, and technical stats.
- Parameters: None.
- Returns: Promise resolving to the activity section.
- Usage:

```tsx
<Suspense fallback={<GitHubActivitySkeleton />}>
  <GitHubActivitySection />
</Suspense>
```

- Dependencies: `getGitHubActivity`, `AnimatedSection`, `SectionHeading`, `Button`, `Card`, portfolio profile data, `next/link`, Lucide icons.
- How it works: Awaits service data in a Server Component, links to the centralized GitHub profile URL, and renders the activity dashboard.

### `GitHubActivitySkeleton`

- Purpose: Provides a loading state for GitHub activity.
- Parameters: None.
- Returns: Skeleton grid.
- Usage:

```tsx
<GitHubActivitySkeleton />
```

- Dependencies: `Skeleton`.
- How it works: Renders placeholder blocks with the same high-level layout as the loaded section.

### `CommandMenu`

- Purpose: Keyboard-first navigation and action menu.
- Parameters: None.
- Returns: Search dialog and trigger buttons.
- Usage:

```tsx
<CommandMenu />
```

- Dependencies: `useCommandShortcut`, `Button`, `Input`, portfolio navigation and project data.
- How it works: Toggles a modal, filters command items by query, and closes after navigation.

### `ScrollProgress`

- Purpose: Displays page scroll progress.
- Parameters: None.
- Returns: Fixed progress bar.
- Usage:

```tsx
<ScrollProgress />
```

- Dependencies: `framer-motion`.
- How it works: Binds a spring-smoothed scale transform to `scrollYProgress`.

### `ContactForm`

- Purpose: Validates recruiter contact details on the client.
- Parameters: None.
- Returns: Contact form.
- Usage:

```tsx
<ContactForm />
```

- Dependencies: React state, `Button`, `Input`, `Textarea`.
- How it works: Tracks form state, validates name, email, and message, then displays status feedback.

### `ContactSection`

- Purpose: Displays social links, resume CTA, and contact form.
- Parameters: None.
- Returns: Contact section.
- Usage:

```tsx
<ContactSection />
```

- Dependencies: `AnimatedSection`, `SectionHeading`, `ContactForm`, portfolio profile data.
- How it works: Maps profile contact links and composes them with the reusable form.
