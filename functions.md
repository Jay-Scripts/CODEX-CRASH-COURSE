# functions.md

## Hooks

### `useMounted`

- Purpose: Returns whether a client component has mounted to avoid hydration mismatch when reading browser-only theme state.
- Location: `hooks/use-mounted.ts`

### `useCommandShortcut`

- Purpose: Registers the `Ctrl/Cmd + K` keyboard shortcut that toggles the command menu.
- Location: `hooks/use-command-shortcut.ts`

## Utilities

### `cn`

- Purpose: Merges conditional Tailwind class names and resolves utility conflicts.
- Location: `lib/utils.ts`

### Motion utilities

- Purpose: Provide shared easing, transition settings, and explicit filtered-item states for reliable site-wide motion and responsive layout reflow.
- Location: `utils/animations.utils.ts`

## Validators

### `sanitizeContactField`

- Purpose: Sanitizes contact form input with allowlisted characters before saving it to state.
- Location: `validators/contact.validator.ts`

### `validateContactField`

- Purpose: Validates one contact field and returns a user-friendly error when invalid.
- Location: `validators/contact.validator.ts`

### `validateContactForm`

- Purpose: Validates the full contact form before submit.
- Location: `validators/contact.validator.ts`
