# CLAUDE.md

## 1. Project Overview

**VOID OS** is a gamified portfolio styled as the desktop of a fictional retro operating system (Win95/98-adjacent chrome, own branding), shipped as a static site on GitHub Pages.

Content is **hardcoded in this repo** — `src/data/projects.ts` (case studies) and `src/i18n/{ua,en}.ts` (all UI copy) are the only sources of truth. There is **no CMS, no backend, no API**. Do not invent `fetch` calls, loading states for remote data, or environment-driven content sources — if content needs to change, edit the data files directly.

## 2. Architecture

Single full-viewport React app. There are no routes — "windows" are pure client state, not URLs.

**State is split by responsibility, not centralized in one store:**

- `store/windowManager.ts` (zustand) — window chrome ONLY: `{id, kind, key?, x, y, w, h, z, minimized, maximized}[]`, plus `open/close/closeAll/focus/minimize/toggleMaximize/patch`. This is the piece with the most test coverage — keep it free of DOM/timer access so it stays trivially testable.
- `store/system.ts` (zustand) — OS-level chrome: `lang`, `wallpaper`, `muted`, Start menu open/sub state, selected icon, assistant visibility/mute. Only `assistantMuted` persists (to `localStorage`), matching the original design.
- **App-specific state stays inside the app component**, not in a global store: Terminal history/input, Pager log/input/typing (Pager log persists to `localStorage`, capped at 40 entries), Minesweeper board, boot progress. Don't lift these into `windowManager` or `system` — that was tried in the original design mock (one mega class-component) and is exactly the pattern this split avoids.
- The tray clock ticks on its **own** local `setInterval` (`hooks/useClock.ts`), isolated so a once-a-second tick doesn't re-render the whole desktop tree.

**Data model** (`types/project.ts`, `types/i18n.ts`):

```ts
interface Project {
  id: string;
  tag: string;
  color1: string;
  color2: string;
  repo: string;
  ua: ProjectContent;
  en: ProjectContent;
}
interface ProjectContent {
  file: string;
  kicker: string;
  name: string;
  sub: string;
  shot: string;
  meta: ProjectMeta[];
  sections: ProjectSection[];
  tags: string[];
  cta: string;
}
```

`UiStrings` (in `types/i18n.ts`) is the single interface both `i18n/ua.ts` and `i18n/en.ts` must satisfy — TypeScript itself guarantees no key is missing in either locale. Don't add a third locale without updating that interface first.

**File layout:**

```
src/
  components/os/     Desktop, DesktopIcon, Taskbar, StartMenu, Window, BootScreen, Assistant, ShutdownDialog
  components/apps/   ProjectExplorer, DocViewer, TextViewer, ListViewer, Terminal, Pager, Minesweeper
  data/              projects.ts, desktop-icons.ts — source of truth for content
  i18n/              ua.ts, en.ts, index.ts (useT hook)
  store/             windowManager.ts, system.ts, windowGeometry.ts (pure drag-clamp helper)
  hooks/             useBeep, useClock, useMediaQuery, useViewportSize, useAssistantTimer
  types/             window.ts, project.ts, i18n.ts
```

**Do NOT:**

- Add server code or an API layer of any kind.
- Add `react-router` or any routing that needs a server-side rewrite without a `404.html` fallback — this app has no routes.
- Add a UI kit (react95, 98.css, etc.) — the visuals are a bespoke skin driven by `styles/tokens.css`, not a stock Win95 theme.
- Add `howler` or audio files — sound is synthesized WebAudio square waves in `hooks/useBeep.ts`.
- Wire a real email/form service into Pager without being asked — it's an intentional client-only demo (see Security).

## 3. Tech Stack (pinned)

- `react` `18.3.1`, `react-dom` `18.3.1`
- `typescript` `~5.6.2`
- `vite` `^5.4.x`, `@vitejs/plugin-react` `^4.3.x`
- `zustand` `^4.5.x`
- `vitest` `^2.1.x`, `@testing-library/react` `^16.x`, `@testing-library/jest-dom` `^6.x`
- ESLint 9 flat config (`eslint.config.js`) + `typescript-eslint` + `prettier`
- `husky` + `lint-staged`
- `clsx` for conditional class names

Don't bump major versions casually — if a dependency needs a major upgrade, do it as its own PR with the changelog reviewed, not bundled into a feature change.

## 4. Code Style

- ESLint + Prettier configs in this repo are authoritative — don't propose a different formatting style.
- TypeScript `strict: true`, `noUncheckedIndexedAccess: true`. `@typescript-eslint/no-explicit-any` is an error — no `any`, use proper types or `unknown` + narrowing.
- One component per file. PascalCase for components (`Window.tsx`), kebab-case for non-component files (`window-geometry.ts` style is used as `windowGeometry.ts` camelCase for existing utils — follow the casing already used in the sibling file you're editing).
- Code comments in English, and only where the _why_ isn't obvious from the code itself.

## 5. Security

- No backend exists, so there are no server secrets to leak. Pager is an intentional client-only demo (localStorage log + scripted replies + `mailto:` fallback) — it does not send data anywhere.
- If a real email/form service (EmailJS, Formspree, etc.) is added later: its **public** key can live in the client bundle, but **no private/secret key ever goes in `.env`** — Vite inlines every `import.meta.env.VITE_*` value into the built JS, so anything placed there is public.
- Sanitize any future user input (e.g. if Pager's message box ever gets wired to a real transport) before it's sent or rendered.
- Keep Dependabot and `pnpm audit` enabled on this repo.

## 6. Infrastructure

- Hosting: GitHub Pages **user site**, `voidmain69.github.io` — repo name must match exactly.
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`), triggered on push to `main`.
- `vite.config.ts` has `base: '/'` because this is a user-site root domain deploy, not a project page. If this ever moves to a project page (`username.github.io/repo-name`), `base` must become `/repo-name/` or every asset path breaks.

## 7. CI/CD

Two workflows:

1. `.github/workflows/ci.yml` — on every PR and push: `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `pnpm build`. This is the required status check for branch protection on `main`.
2. `.github/workflows/deploy.yml` — on push to `main` only: build → `actions/upload-pages-artifact` → `actions/deploy-pages`.

## 8. GitHub Pages Specifics

- `public/.nojekyll` exists so Vite copies it into `dist/` on **every** build automatically — this is the standard fix for GH Pages' default Jekyll processing silently dropping `_`-prefixed asset directories. Don't remove it or move the `.nojekyll` creation into a separate CI step; keeping it in `public/` means it can't be forgotten on a rebuild.
- Build command: `pnpm build` (runs `tsc --noEmit && vite build`). Output dir: `dist`.
- No client-side routing exists in this app (see Architecture), so there is no `404.html` SPA-fallback hack to maintain. If routing is ever added, it must ship with a `404.html` fallback or use `HashRouter`.

## 9. Git Culture

- Branches: `feature/*`, `fix/*`, `chore/*`.
- Commits: Conventional Commits, in English (`feat: add ICQ chat window`, `fix: window z-index on drag`).
- PR descriptions may be in Ukrainian.
- Small, atomic PRs; squash-merge into `main`.
- `main` is protected: required PR review + passing CI, no direct pushes, no `--force` to shared branches.

## 10. Testing

Covered (Vitest + Testing Library where components are involved):

- `store/windowManager.test.ts` — open/close/focus/minimize/maximize/closeAll semantics.
- `store/windowGeometry.test.ts` — drag-position clamping.
- `components/apps/Minesweeper/board.test.ts` — first-click safety, flood fill, win/loss conditions, flag toggling.
- `components/apps/Terminal/commands.test.ts` — every terminal command plus the unknown-command fallback.
- `i18n/parity.test.ts` — `ua` and `en` dictionaries have identical key structure.

Intentionally not covered: OS chrome visuals (`Desktop`, `Taskbar`, `StartMenu`, `Window` rendering) — these are low-risk, high-churn presentational components; add tests only if a real regression shows up there.
