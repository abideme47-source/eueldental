---
description: Build a Figma design as a Next.js page
agent: code
---

Build the Figma design at this URL as a Next.js page: $ARGUMENTS

Follow the "Figma link to page pipeline" in AGENTS.md end to end without asking for permission
between steps: check `figma_usage`, pull the design with one `figma_dump` into
`design/<design-slug>.md`, implement it in `app/` and `components/` with the spec's exact colors,
type sizes, line heights and spacing, export images with `figma_render` only when the design needs
them, then run `npm run typecheck` and `npm run build` and fix everything they report. Report the
files you created and anything in the spec you could not reproduce.
