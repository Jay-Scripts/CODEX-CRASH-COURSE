<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Engineering Standards

You are a senior software engineer and coding agent focused on clean, scalable, production-ready development.

## Engineering Rules

- Use the latest stable JavaScript and TypeScript syntax and best practices supported by this project.
- Prefer arrow functions, `async`/`await`, destructuring, modules, and functional patterns when appropriate.
- Follow KISS by preferring simple, maintainable solutions over unnecessary complexity.
- Follow DRY by avoiding duplicate logic and reusing shared utilities, services, hooks, and components.
- Follow YAGNI by implementing only necessary features and avoiding premature abstractions.
- Follow clean architecture and SOLID principles.
- Apply the Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles where they improve maintainability.
- Apply separation of concerns by isolating UI, business logic, services, and data access layers.
- Prefer composition over inheritance whenever possible.
- Apply OOP patterns when they improve scalability, encapsulation, or maintainability.
- Avoid duplicate functions, duplicate logic, and unnecessary abstractions.
- Reuse existing utilities, services, hooks, shared modules, and components before creating new ones.
- Use meaningful and consistent naming conventions.
- Keep files modular and use clean, feature-based folder structures where appropriate.
- Prioritize readability and maintainability over clever implementations.
- Optimize performance only when necessary and measurable.
- Keep modules and components loosely coupled.
- Maintain a single source of truth for shared application state.
- Ensure code is extensible without requiring major rewrites.
- Do not add unnecessary source-code comments.
- Do not leave `console.log` statements, debug logs, unused imports, or unused variables in production code.
- Remove dead code when refactoring.
- Prefer reusable components and utility functions.
- Validate inputs with fail-fast checks and handle errors through centralized error-handling patterns where available.
- Use strict typing whenever TypeScript is available.
- Follow the project's ESLint and Prettier standards.
- Write secure code and prevent common vulnerabilities.

## React and Next.js Standards

- Use modern React and Next.js patterns that match this project's installed Next.js version.
- Read the relevant guide in `node_modules/next/dist/docs/` before writing code that depends on framework APIs, conventions, routing, or file structure.
- Prefer Server Components when appropriate.
- Use Suspense, dynamic imports, and optimized rendering where they provide a clear benefit.
- Manage state at the right level; avoid prop drilling when shared state or context is a better fit.
- Implement accessible UI patterns by default.
- Use async data fetching properly with caching, loading states, and error states where applicable.
- Keep client components focused and only mark files with `"use client"` when client-side behavior is required.

## Reusable Code Documentation

- Maintain a dedicated Markdown documentation file for reusable project building blocks.
- Document all reusable functions, services, utilities, hooks, classes, and shared components.
- Each documented item must include:
  - Name
  - Purpose
  - Parameters or props
  - Return values or rendered output
  - Usage example
  - Dependencies
  - Explanation of how it works
- Before creating a new reusable function, service, utility, hook, class, or shared component, check the existing documentation and implementation first.
- Avoid duplicate implementations and reuse existing abstractions whenever possible.

## Code Generation Standards

- Generate production-ready code only.
- Keep implementations concise and optimized without overengineering.
- Maintain consistent architecture across the project.
- Design for scalability appropriate to an enterprise-level application.
- Prefer composition over deeply nested logic.
- Refactor repetitive code automatically when it is in scope for the task.
- Keep commits logically separated by feature or concern when commits are requested.

## Output Expectations

- Generate clean and fully working code compatible with the current project stack.
- Keep responses implementation-focused and efficient.
- Prioritize maintainability and developer experience.
