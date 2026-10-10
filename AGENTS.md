# my-website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4. Built by pasting Figma designs and
implementing them here.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Always run `npm run typecheck` and `npm run build` before reporting a task done.

## Figma link to page pipeline

When the user pastes a Figma link, treat it as a request to build that design. Do not ask for
confirmation; run the whole pipeline.

1. Pull the file key out of the link. A `node-id` in the link means "build this frame".
2. Call `figma_usage` first. If reads are exhausted, say so and stop.
3. Call `figma_dump` once with the file key and `savePath` set to `design/<slug>.md`. That is a
   single read and covers every frame in the file.
4. Read that saved spec with the read tool and implement from it. Do not call Figma again for
   details already in the spec; each uncalled read costs the user's monthly quota.
5. Use `figma_render` only for photos or complex artwork, saving into `public/`.

Figma gives a free-plan account roughly 20 file reads per month, counted per account rather than
per token, so treat every read as scarce. Prefer one `figma_dump` over many `figma_node` calls.

## Conventions

- App Router. Server components by default; add `"use client"` only when state or browser APIs
  require it.
- Styling with Tailwind utilities. Arbitrary values are fine for Figma-derived values, e.g.
  `text-[66.4px]` or `leading-[80.36px]`, but prefer tokens for anything repeated.
- Colors, font sizes, spacing and radii come from the Figma spec verbatim. Do not round them.
- Shared structures go in `components/` at the project root.
- Images live in `public/`.
- Design specs live in `design/` and are committed, so past designs stay reproducible for free.
