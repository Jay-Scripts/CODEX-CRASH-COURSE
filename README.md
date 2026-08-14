# My Portfolio

This is my personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

I made this project to show my work, experience, certificates, and the kind of skills I can bring as a Full Stack Developer. I also use it to present some of my technical documentation work like system flowcharts and user manuals, not just UI screens.

## What's in the site

- Hero section with my intro, quick stats, and resume preview
- Services section for frontend, backend, documentation, UI/UX, and QA support
- About section with GitHub activity cards
- Skills section
- Projects section with filters
- Experience section with proof images, videos, documents, and spreadsheet previews
- Certificates section with in-page preview
- Contact section

## A few things I added

- Light mode is the default theme
- Users can still switch to dark mode
- Certificate count in the hero section syncs from the actual certificates data
- GitHub activity is shown inside the About section
- Resume, certificates, project files, and proofs open in overlays so visitors do not have to leave the page
- `Ctrl/Cmd + K` opens the command menu

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- next-themes
- lucide-react

There are also some installed packages for 3D-related work like `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, and `meshline`.

## Main content file

Most of the portfolio content is coming from:

```text
constants/portfolio.constants.ts
```

That includes:

- profile info
- services
- skills
- projects
- experiences
- certificates
- about content
- navigation links

So if I want to update the portfolio fast, that is usually the first file to edit.

## Project structure

```text
app/
components/
  cards/
  common/
  forms/
  layout/
  providers/
  sections/home/
  ui/
constants/
public/
```

## Run locally

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Notes

- Most images, PDFs, videos, certificates, and proof files are inside `public/`
- Reusable UI is inside `components/ui`, `components/common`, `components/cards`, and `components/forms`
- Page sections are inside `components/sections/home`
- The contact form uses EmailJS, so set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` in your env file
- The EmailJS template can use `from_name`, `from_email`, `reply_to`, and `message`; I send both `from_email` and `reply_to` from the form so the template can show the sender and still support replies cleanly

## Deployment

This project can be deployed on Vercel or any platform that supports Next.js.
