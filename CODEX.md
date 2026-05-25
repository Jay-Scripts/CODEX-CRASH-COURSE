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
