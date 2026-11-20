# daycare — Layout Showcase

A generic childcare / early-learning landing page layout — a reusable Capote
Design starting point for the next project with a warm, playful, kid-friendly
brief, kept as its own standalone repo so it's easy to clone instead of
digging it out of a larger agency showcase project. Originally built for a
real client (Treasure Early Learning) and rebranded here to a generic
"daycare" identity, with generic photography, so it can be cloned and
reskinned for any client without carrying over someone else's brand.

Scroll-driven sections: animated hero with a draw-on logo, a safety-first
feature section, age-banded rooms, a four-step "getting started" flow, a
pinned FAQ stack, educator highlights, and a tour CTA. Built with Next.js App
Router, Tailwind CSS v4, [Motion](https://motion.dev) and
[Lenis](https://lenis.darkroom.engineering/) smooth scrolling.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the homepage *is* the
layout (no separate `/preview` route).

## Using this as a starting point for a new project

1. Clone this repo (or use it as a GitHub template).
2. Swap the brand: replace `public/brand/daycare-wordmark.svg`, the colour
   tokens in `src/app/globals.css` (`--color-*`), and the copy in each
   component under `src/app/_components/`.
3. Replace the photography in `public/images/` — see the licensing note
   below for what's already safe to keep.
4. `AnimatedLogo.tsx` inlines a specific SVG lockup (wordmark → subtitle →
   tagline draw-on groups) — for a new brand, either adapt its draw-on
   animation to the new logo's paths, or drop it for a static
   `<img>`/`next/image` logo if the new mark doesn't suit a stroke animation.

## Licensing note

Heading/body typography (Quicksand, via `next/font/google`) and all
photography in `public/images/` are either the free Unsplash/Pexels License
(no attribution required) or generic stock, sourced specifically for this
generic showcase — safe to reuse as-is on a new client project, though it's
still worth swapping for real photography of the actual centre once the
client has some. The decorative "kiddy" wordmark font used only in the
original Treasure build's logo was never carried into this repo at all —
not needed for layout/code, and its commercial licence was never confirmed.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion ·
Lenis · TypeScript.

---

Part of the Capote Design agency's layout collection — see
[showcase.capote.design](https://showcase.capote.design) for the full
catalog.
