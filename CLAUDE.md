# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Type-check with tsc, then build for production
npm run preview   # Serve the production build locally
```

No linter or test runner is configured.

## Architecture

Single-page React portfolio built with Vite + TypeScript + Tailwind CSS. All content is static — no backend, no routing library.

**Page structure** — `src/App.tsx` composes the full page as a vertical stack of section components:
`Navbar → GlowyWavesHero → About → Services → Projects → Stack → WhyMe → Contact → Footer`

**Theme system** — `src/context/ThemeContext.tsx` provides a `ThemeProvider` and `useTheme` hook. Dark mode is toggled by adding the `dark` class to `<html>` and stored in `localStorage`. CSS variables defined in `src/index.css` drive all colors; Tailwind is configured to consume them via `hsl(var(--...))`.

**Component layers:**
- `src/components/` — section-level components (one file per page section)
- `src/components/ui/` — low-level primitives (buttons, cards, inputs, carousel, etc.) and heavier pre-built blocks sourced from shadcn/ui and shadcnblocks
- `src/components/blocks/` — not used directly in App; contains extra block variants

**Path alias** — `@` resolves to `src/`, configured in `vite.config.ts` and `tsconfig.json`.

**Styling conventions:**
- All color tokens come from CSS variables, never hard-coded hex/hsl values
- `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) is used for conditional class merging
- `.gradient-text` and `.section-label` are custom utility classes defined in `src/index.css`
- Inter is the global font (loaded externally, declared in `tailwind.config.ts`)
