# Be Good — Event Consulting

A cinematic, single-page experience-studio site for **Be Good Event Consulting**
(Thiruvananthapuram, Kerala). Built with Next.js and deployed as a static export
to GitHub Pages.

> We don't just manage events. We create moments people remember.

## Stack

- **Next.js 16** (App Router, static export) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/app/globals.css`)
- **Motion** (entrance/reveal animations), **Lenis** (smooth scroll)
- **lucide-react** (icons)
- Fonts: **Space Grotesk** (display) + **DM Serif Display** (editorial serif),
  self-hosted via `next/font`

## Editing content

All copy, contact details and the event-type catalogue live in **`src/lib/site.ts`**
— edit there, not in the components.

## Imagery (pending)

The client is supplying landscape footage. When it arrives, drop files into
`public/` and slot them into two marked layers:

- Hero background — `src/components/hero/Hero.tsx` (comment: "Cinematic base")
- Planning-selector worlds — `src/components/planning/PlanningSelector.tsx`
  (comment: "Real event imagery/stills land in this layer")

## Develop

```bash
npm install
npm run dev       # http://localhost:3000/begood (basePath applies)
```

## Build & deploy

Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`) on
push to `main`: `next build` → upload `out/` → GitHub Pages.

```bash
npm run build     # static export to out/
```

The site is served from `https://AanandAB.github.io/begood/`, so `basePath` /
`assetPrefix` are set to `/begood` in `next.config.ts`. If it ever moves to a
custom domain, set both to `""` (asset paths go through `asset()` in
`src/lib/site.ts`, so nothing else needs to change).
