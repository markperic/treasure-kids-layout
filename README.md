# Treasure Kids — Layout Showcase

A childcare / early-learning landing page layout, extracted from the
[Treasure Early Learning](https://treasure.kids) site build so it can be
cloned as a standalone starting point for the next project with a similar
warm, playful, kid-friendly brief — instead of digging it out of a larger
agency showcase project.

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
2. Swap the brand: replace `public/brand/treasure-wordmark.svg`, the colour
   tokens in `src/app/globals.css` (`--color-*`), and the copy in each
   component under `src/app/_components/`.
3. Replace the photography in `public/images/` — the current images came from
   the Treasure build; confirm licensing before reusing them as-is on a new
   client project (see note below).
4. `AnimatedLogo.tsx` inlines a specific SVG lockup — for a new brand, either
   adapt its draw-on animation to the new logo's paths, or drop it for a
   static `<img>`/`next/image` logo if the new mark doesn't suit a stroke
   animation.

## Licensing note

This repo keeps the real photography and heading/body typography (Quicksand,
via `next/font/google`) from the original Treasure build. The decorative
"kiddy" wordmark font used only in the logo SVG (KG Miss Kindy) was **not**
carried over — it wasn't needed for layout/code and its commercial licence
was never confirmed for the Treasure project. If a future project wants that
look, re-license it properly first. Likewise, confirm the stock/AI-generated
photos in `public/images/` are cleared for reuse before shipping them on a
different client's site — they were sourced for the Treasure project
specifically, not verified for general redistribution.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion ·
Lenis · TypeScript.

---

Part of the Capote Design agency's layout collection — see
[showcase.capote.design](https://showcase.capote.design) for the full
catalog.
