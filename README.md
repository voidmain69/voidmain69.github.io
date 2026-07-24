# VOID OS — portfolio

A gamified portfolio styled as the desktop of a fictional retro operating system. Static site, no backend, deployed to GitHub Pages.

Live: https://voidmain69.github.io

## Stack

React 18 · TypeScript · Vite · Zustand · Vitest — see [CLAUDE.md](./CLAUDE.md) for the full architecture and pinned versions.

## Development

```bash
pnpm install
pnpm dev        # start the dev server
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest
pnpm build      # tsc --noEmit && vite build -> dist/
pnpm preview    # serve the production build locally
```

## Content

Case-study content lives in [src/data/projects.ts](./src/data/projects.ts). UI copy (UA/EN) lives in [src/i18n/ua.ts](./src/i18n/ua.ts) and [src/i18n/en.ts](./src/i18n/en.ts). There is no CMS — edit these files directly and open a PR.

## Deployment

Push to `main` (via a reviewed PR) triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages automatically.
