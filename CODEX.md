# CODEX.md

> Read this file before every task. Then read `functions.md` and `components.md`.

---

## Pre-Task Checklist

- [ ] Read `CODEX.md` (this file)
- [ ] Read `functions.md` — check before adding any function, hook, util, or validator
- [ ] Read `components.md` — check before adding any component

After every task, update the relevant file:

| What changed                       | Update                  |
| ---------------------------------- | ----------------------- |
| Function / hook / util / validator | `functions.md`          |
| Reusable component                 | `components.md`         |
| New dependency                     | `CODEX.md` → Tech Stack |

---

## Architecture (always follow this order)

```
Page/Route
→ Page Section Components      (components/sections/<page>/)
→ shadcn/ui Reusable Components (components/ui/, cards/, forms/, common/)
→ Hook / Utility / Validator   (hooks/, utils/, validators/)
→ Static Data / Constants      (constants/)
```

Pages only compose sections. Sections use components. Components use hooks/utils. Repeated data lives in constants.

---

## Tech Stack

```json
{
  "next": "16.2.6",
  "react": "19.2.6",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12.38.0",
  "lucide-react": "^1.14.0",
  "next-themes": "^0.4.6",
  "shadcn/ui": "components/ui/ (copied in)",
  "@radix-ui/react-slot": "^1.2.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

When adding a dependency that came from a shadcn/ui component, add it here.

---

## Folder Structure

```
app/                          # Routes, layouts, metadata, error/loading/not-found
components/
  ui/                         # shadcn/ui base components only
  sections/
    home/                     # HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection
    about/                    # AboutHeroSection, AboutTimelineSection, AboutSkillsSection
    projects/                 # ProjectsHeroSection, ProjectsGridSection, FeaturedProjectsSection
  cards/                      # ProjectCard, ExperienceCard
  forms/                      # ContactForm
  layout/                     # Header, Footer, Nav
  common/                     # SectionHeading, SkillBadge, FadeInSection
  modals/
hooks/                        # useModal, useActiveSection, useScrollProgress, useDebounce
validators/                   # email.validator.ts, contact.validator.ts, name.validator.ts
utils/                        # cn.ts, date.utils.ts, format.utils.ts, string.utils.ts
types/                        # project.types.ts, skill.types.ts, experience.types.ts
constants/                    # projects.constants.ts, skills.constants.ts, social-links.constants.ts
lib/                          # cn helper, shared config
```

---

## Decision Trees

### Should I create a new component?

```
Does a shadcn/ui component already do this?
  YES → Use components/ui/. Do not create a custom one.
  NO  → Is it reused across pages?
          YES → components/common/, cards/, forms/, or layout/
          NO  → Is it a page-specific section?
                  YES → components/sections/<page>/
                  NO  → Keep it inline (small, not worth extracting)
```

### Server Component or Client Component?

```
Does the component need any of:
  useState / useReducer / useEffect
  onClick / onChange / any event handler
  Browser APIs (window, document, etc.)
  Framer Motion animated components
  Form interaction
    YES → Add "use client" at the top
    NO  → Leave it as a Server Component (default)
```

### Should data live in constants?

```
Is the data used in more than one place, OR is it a list of 3+ items?
  YES → Move to constants/<name>.constants.ts
  NO  → Inline is fine
```

---

## Naming Conventions

| Type          | Format               | Example                 |
| ------------- | -------------------- | ----------------------- |
| Components    | PascalCase           | `ProjectCard.tsx`       |
| Page sections | PascalCase + Section | `HeroSection.tsx`       |
| Hooks         | `useName.ts`         | `useActiveSection.ts`   |
| Validators    | `name.validator.ts`  | `email.validator.ts`    |
| Utils         | `name.utils.ts`      | `date.utils.ts`         |
| Constants     | `name.constants.ts`  | `projects.constants.ts` |
| Types         | `name.types.ts`      | `project.types.ts`      |

---

## Code Style

- `const` by default. `let` only when reassignment is needed. Never `var`.
- Arrow functions for components and helpers.
- `async/await`, not `.then()` chains.
- Named exports everywhere. Default export only when Next.js requires it (pages, layouts).
- Destructure props.
- Early returns to avoid deep nesting.
- Template literals, not string concatenation.
- Optional chaining (`?.`) and nullish coalescing (`??`) where appropriate.

---

## Design Consistency Rules

### Color Rules

- Use semantic theme tokens only: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, etc.
- Do not hardcode colors in components with hex, rgb, oklch, or arbitrary Tailwind values unless you are updating the global theme in `app/globals.css`.
- Treat `primary` as the single main accent color for CTAs, active states, focus states, and key highlights.
- Use `secondary`, `muted`, and `accent` for support surfaces only. Do not introduce extra accent palettes per section.
- Keep light and dark mode behavior aligned by updating tokens in `app/globals.css`, not by styling one-off overrides in component files.
- New reusable components must inherit the existing border, background, and foreground tokens instead of defining their own visual system.

### Font Rules

- Use the global font setup already defined in `app/layout.tsx` and `app/globals.css`.
- Default UI, headings, labels, buttons, and body copy use `font-sans`.
- Use `font-mono` only for code, numbers that benefit from alignment, or technical metadata.
- Do not introduce extra font families unless explicitly requested.
- Keep heading hierarchy consistent: one clear page hero heading, then descending section and card headings. Do not mix oversized display text into small UI surfaces.
- Prefer weight and size changes over switching fonts to create emphasis.

### UI Consistency Rules

- Reuse the same spacing rhythm, radii, shadows, and border treatments across sections and components.
- Keep interactive states consistent: hover, focus, active, and disabled states should follow the same token-based pattern across buttons, links, cards, and inputs.
- If a new visual pattern will appear in more than one place, extract it into a reusable component or shared variant instead of restyling each instance separately.
- Before adding a new color, text treatment, or surface style, check whether an existing shadcn/ui variant or shared component already solves it.

---

## Semantic HTML and SEO Rules

- Use semantic layout tags whenever they match the content: `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- Do not use `div` when a semantic element communicates structure more clearly.
- Every page must have one primary `h1`, with headings descending in order (`h2`, `h3`, etc.) without skipping levels unnecessarily.
- Use `section` only when the content has a meaningful heading or grouped purpose.
- Use `article` for standalone, reusable content blocks such as project cards, blog entries, or case studies when appropriate.
- Navigation links belong inside `nav`, and the main page content belongs inside `main`.
- Buttons must be real `<button>` elements for actions; links must be real `<a>` elements for navigation.
- Use descriptive link text and accessible labels so structure is clear to users and search engines.
- Preserve SEO metadata in Next.js route files: title, description, and relevant Open Graph / Twitter metadata should stay accurate for each page.

---

## Required Comment Format

Every exported function, hook, util, validator, and component needs a JSDoc comment:

```ts
/**
 * Displays a reusable project card for portfolio project lists.
 */
export const ProjectCard = ({ title, description, techStack }: ProjectCardProps) => { ... };
```

Use structured block comments for validation, sanitization, async logic, forms, and security:

```ts
// ==========================================================================
// Validate Contact Form
//
// Reject invalid values before allowing the message to be submitted.
// ==========================================================================
```

Do not comment obvious one-liners.

---

## Forms Checklist

Every form must:

- [ ] Sanitize inputs in `onChange` (call a validator, not inline regex)
- [ ] Validate all fields before submit
- [ ] Show user-friendly errors — never expose internals or stack traces
- [ ] Use shadcn/ui form components (Input, Textarea, Label, Button)
- [ ] Use accessible `<Label htmlFor>` on all inputs
- [ ] Wrap submit logic in `try/catch`
- [ ] Never use `dangerouslySetInnerHTML`

---

## Animation Rules

- Use Framer Motion for: section reveal, hero intro, card hover, page transitions, skill badges.
- Do not animate every element.
- Extract reusable animation variants to `components/common/` or `utils/animations.utils.ts`.
- Never put animation logic directly inside a page file.

---

## Security Rules

- Always validate and sanitize user input before using it.
- Use allowlists in sanitizers (allow known-safe characters, strip the rest).
- External links must include `rel="noopener noreferrer"` on `target="_blank"`.
- Never log: contact messages, tokens, API keys, or sensitive personal data.
- Safe to log: failed validation events (without raw values), unexpected submission errors.

---

## File Length

| File type                | Target                             |
| ------------------------ | ---------------------------------- |
| Page (`app/**/page.tsx`) | < 50 lines — only compose sections |
| Section component        | < 200 lines                        |
| Any other file           | < 300–400 lines                    |

If a file is getting long: extract reusable UI, split sections, move data to constants, extract hooks/utils.

---

## Core Principles (quick ref)

| Principle              | What it means here                                            |
| ---------------------- | ------------------------------------------------------------- |
| KISS                   | Simple readable code. No overengineering.                     |
| DRY                    | Extract repeated JSX, logic, and data. Reuse before creating. |
| YAGNI                  | No API routes, DB, or auth unless explicitly asked.           |
| Single Responsibility  | One clear purpose per file, function, hook, and component.    |
| Single Source of Truth | Reused content → constants. Validation rules → validators.    |
