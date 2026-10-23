# TrustID Design System

UI block registry for the future React rewrite of **VeriScan** (our WPF
document-verification app). It is both a browsable catalogue and a **versioned,
importable package** (`@trustid/design-system`) — apps pin a version, import
blocks, and pick a theme by ID.

Stack: **Vite + React 19 + TypeScript + Tailwind CSS 4 + daisyUI 5**. Themes are
defined in `src/themes.css`: `veriscan`, `veriscan-dark`, `test`, `test-dark`.
Switch at runtime by setting `data-theme="<themeId>"` on `<html>`.

## Run it

```bash
npm install
npm run dev        # catalogue at http://localhost:5173/dev/ (hot reload)
npm run build      # type-check + production build + dist/design-system.css
```

The catalogue page lists every block grouped by category, with a live preview
and a "View source" toggle.

## Versioned catalogue site

```bash
npm run build:site     # -> site/ : latest/ + one dir per v* git tag
npm run preview:site   # static-serve site/ at http://localhost:5180
npm run dev:site       # :5180 + vite dev server behind the /dev/ proxy
```

`build-versions.mjs` builds the working tree into `site/latest/` and each
`v*` git tag (via temporary worktrees) into `site/<ver>/`, then writes
`site/versions.json` + a `latest/` redirect. Deploy `site/` to any static
host as the site root — the header's version dropdown fetches
`../versions.json`, so older builds automatically list newer releases.
Each version dir also carries that release's `design-system.css`.

The dropdown's **dev (hot reload)** entry points at `/dev/` on the site
server. `preview:site` proxies `/dev/*` — including the HMR websocket — to the
vite dev server, so `dev:site` gives you one URL for everything: released
versions, `latest`, and the live working tree. The entry is probed on load and
shown disabled when no dev server is reachable (e.g. a deployed static host).
`npm run dev` alone still works — vite serves under `/dev/` itself so both
access paths resolve identically.

Release flow: bump `version` in package.json -> `npm run build` -> commit ->
`git tag vX.Y.Z` -> `npm run build:site` -> deploy `site/`.

## Using it in an app

Add the dependency (git tag while unpublished; swap for a registry version once
published):

```json
"@trustid/design-system": "git+https://github.com/<org>/design-system.git#v0.1.0"
```

or during local development:

```json
"@trustid/design-system": "file:../design-system"
```

Import blocks from the barrel (or per-file for tree-shaken subpaths):

```ts
import { AppShell, StatusBadge } from '@trustid/design-system';
import type { ApplicationStatus } from '@trustid/design-system';
// or: import AppShell from '@trustid/design-system/blocks/layout/AppShell';
```

Wire the themes into the app's Tailwind 4 entry CSS:

```css
@import "tailwindcss";
@import "@trustid/design-system/themes.css";
@source "../node_modules/@trustid/design-system/src";
```

- `themes.css` registers the daisyUI themes — set `data-theme="veriscan"` etc.
- `@source` is **required**: Tailwind 4 only emits classes it can scan, and it
  does not scan `node_modules` by default. Adjust the relative path if the app
  isn't installed at a standard `node_modules` depth (or use an absolute path).

For apps that don't run Tailwind themselves (or to drop a ready-made stylesheet
into e.g. a Razor page), `npm run build` emits a precompiled
`dist/design-system.css` — every theme + every class the catalogue exercises:

```html
<link rel="stylesheet" href=".../design-system.css" />
<!-- then set data-theme on <html> and use daisyUI classes directly -->
```

Peer requirements: **React 19+**. For `themes.css` you also need
**Tailwind CSS 4 + daisyUI 5** in the app (the blocks emit daisyUI semantic
classes — `btn`, `card`, `badge`, `steps`, `drawer` — which pick up whichever
`data-theme` is active; no hard-coded hex colours allowed).

## Repo layout

```
src/
  index.ts                            # package barrel — re-exports every block + types
  index.css                           # catalogue entry: Tailwind 4 + ./themes.css
  themes.css                          # daisyUI theme definitions (package theme export)
  blocks/<category>/<BlockName>.tsx   # the blocks themselves
  registry/blocks.json                # machine-readable catalogue
  registry/catalogue.tsx              # resolves registry -> demos + source artifacts
  registry/demos/<BlockName>Demo.tsx  # wiring/usage example per block
  registry/demos/fixtures.tsx         # shared demo fixtures
  App.tsx                             # catalogue page
tools/
  copy-css.mjs                        # post-build: dist/assets/*.css -> dist/design-system.css
```

## Source artifacts

Every block exposes several source artifacts (the tabs under "View source").
These are declared per block in `blocks.json`:

- **Component (.tsx)** — `id: "component"`, the block itself. This is what you
  copy into an app.
- **Usage / wiring (.tsx)** — `id: "usage"`, the demo component from
  `src/registry/demos/`. The React analogue of controller code: shows how to
  hold state, pass props and handle callbacks.
- **HTML template** — `id: "html"`, marked `"source": "rendered-demo"`. Not a
  file — the catalogue generates it on the fly by rendering the demo with
  `renderToStaticMarkup`, so it's always in sync with the component. Lift this
  markup into non-React targets (Razor views, static pages, etc.) — it's pure
  HTML + daisyUI classes.

The artifact list is extensible: to ship e.g. a `.razor` or `.vue` variant of a
block, add the file and another `artifacts` entry pointing at it.

## Consuming blocks (for Devin / AI sessions)

`src/registry/blocks.json` is the entry point. Each entry:

```json
{
  "name": "ApplicationsTable",
  "category": "data",
  "status": "ready",
  "path": "src/blocks/data/ApplicationsTable.tsx",
  "description": "...",
  "useCases": ["table", "inbox", "queue", ...],
  "dependencies": ["StatusBadge"],
  "artifacts": [
    { "id": "component", "label": "Component (.tsx)", "path": "src/blocks/data/ApplicationsTable.tsx" },
    { "id": "usage", "label": "Usage / wiring (.tsx)", "path": "src/registry/demos/ApplicationsTableDemo.tsx" },
    { "id": "html", "label": "HTML template", "source": "rendered-demo" }
  ]
}
```

`status` is `"ready"` (implemented, has demo + artifacts) or `"planned"`
(audited but not yet built — entries record the intended path/useCases so
sessions know the gap exists).

To satisfy a request like "build me a form":

1. Read `blocks.json` and match the request against `useCases`,
   `description`, `name` and `category`.
2. Import the block (`import { X } from '@trustid/design-system'`) — block
   `dependencies` resolve automatically inside the package. If the app isn't
   consuming the package, copy the file at `path` **plus the transitive
   closure of its `dependencies`** (they import each other via relative
   paths, e.g. `ApplicationsTable` imports `../feedback/StatusBadge`).
3. Use the `usage` artifact as the wiring reference for props/callbacks; use
   the `html` artifact (rendered markup) when targeting a non-React stack.
4. Blocks are presentation-only: typed props in, callbacks out. There are no
   API calls and no app-state dependencies to stub.

Known limitation: `className` merging is plain concatenation (no
`tailwind-merge`), so passing a class that conflicts with a block's own
structural classes (e.g. `w-full` vs `max-w-sm`) yields both classes rather
than an override. To restyle a block's layout, wrap it in a parent element.
If a block needs a behaviour change, fix it **here** and release a new
version — the package is the source of truth.

## Importing designs (Figma → registry)

To update the registry from a design: copy HTML/CSS from Figma Dev Mode
(Inspect panel → "Copy as HTML", or a plugin like html.to.design) and prompt
a Devin session:

> Update the design-system repo so this screen can be built from blocks —
> adjust/create blocks and theme tokens as needed:
> `<pasted figma html>`

The session normalises the auto-generated markup (inline styles, hex
colours, absolute positioning) into the registry's conventions: daisyUI
semantic classes, theme tokens in `index.css`, and new blocks registered in
`blocks.json`. See `.devin/devin.md` for the conversion rules.

## Adding a new block

1. Create `src/blocks/<category>/<BlockName>.tsx`. Conventions:
   - default-exported component, typed props interface named
     `<BlockName>Props` (exported)
   - presentation-only: no fetch, no routing, no global state
   - daisyUI semantic classes only — no hard-coded hex/inline colour styles
   - export shared types (e.g. `ApplicationStatus`) so other blocks can
     depend on them
   - `<BlockName>Props` extends the root element's props
     (`ComponentPropsWithRef<'div'>` etc., with `Omit` for name clashes):
     destructure `className`/`ref`, merge `className` into the root's classes
     (consumer classes last), and spread `...rest` onto the root so callers
     can pass `data-*`, `aria-*`, ids and refs
   - a local `cx(...classes)` helper is used for conditional classes —
     keep it in-file so blocks stay self-contained
   - interactive elements must be keyboard-usable (focusable, Enter/Space
     handlers, `aria-selected`/`aria-current`/`aria-pressed` as appropriate)
2. Create `src/registry/demos/<BlockName>Demo.tsx` — a default-exported
   component that mounts the block with realistic fixtures and callback
   handlers (this is both the live preview and the `usage`/`html` artifacts).
   Shared fixtures live in `src/registry/demos/fixtures.tsx`.
3. Add an entry to `src/registry/blocks.json` (`name`, `category`, `path`,
   `description`, `useCases`, `dependencies`, `artifacts`).
4. Verify: `npm run build`.

`catalogue.tsx` discovers block/demo sources with `import.meta.glob` — no
manual `?raw` imports needed as long as naming conventions are followed.
