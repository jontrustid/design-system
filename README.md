# TrustID Design System

UI block registry for the future React rewrite of **VeriScan** (our WPF
document-verification app). shadcn-style: blocks are **copyable source**, not an
npm package. Grab a file, drop it in your app, own it.

Stack: **Vite + React 19 + TypeScript + Tailwind CSS 4 + daisyUI 5** (custom
`trustid` theme defined in `src/index.css`).

## Run it

```bash
npm install
npm run dev      # catalogue at http://localhost:5173
npm run build    # type-check + production build
```

The catalogue page lists every block grouped by category, with a live preview
and a "View source" toggle.

## Repo layout

```
src/
  blocks/<category>/<BlockName>.tsx   # the blocks themselves
  registry/blocks.json                # machine-readable catalogue
  registry/catalogue.tsx              # wires blocks + ?raw sources + demos into the page
  App.tsx                             # catalogue page
  index.css                           # Tailwind 4 + daisyUI 5 + trustid theme
```

## Consuming blocks (for Devin / AI sessions)

`src/registry/blocks.json` is the entry point. Each entry:

```json
{
  "name": "ApplicationsTable",
  "category": "data",
  "path": "src/blocks/data/ApplicationsTable.tsx",
  "description": "...",
  "useCases": ["table", "inbox", "queue", ...],
  "dependencies": ["StatusBadge"]
}
```

To satisfy a request like "build me a form":

1. Read `blocks.json` and match the request against `useCases`,
   `description`, `name` and `category`.
2. Copy the file at `path` into the target app.
3. **Also copy every block listed in `dependencies`** (they import each other
   via relative paths, e.g. `ApplicationsTable` imports
   `../feedback/StatusBadge`). Dependencies may have their own dependencies —
   copy the transitive closure.
4. Blocks are presentation-only: typed props in, callbacks out. There are no
   API calls and no app-state dependencies to stub.

Block requirements in the target app: **React 19+, Tailwind CSS 4, daisyUI 5**.
They use daisyUI semantic classes only (`btn`, `card`, `badge`, `table`,
`steps`, `drawer`, ...), so they pick up whatever daisyUI theme the host app
defines — ideally the `trustid` theme from `src/index.css`. No hard-coded
hex colours are allowed, which keeps this true.

## Adding a new block

1. Create `src/blocks/<category>/<BlockName>.tsx`. Conventions:
   - default-exported component, typed props interface named
     `<BlockName>Props` (exported)
   - presentation-only: no fetch, no routing, no global state
   - daisyUI semantic classes only — no hard-coded hex/inline colour styles
   - export shared types (e.g. `ApplicationStatus`) so other blocks can
     depend on them
2. Add an entry to `src/registry/blocks.json` (`name`, `category`, `path`,
   `description`, `useCases`, `dependencies`).
3. In `src/registry/catalogue.tsx`: import the component, import its source
   via `?raw` (`import xSource from '../blocks/<cat>/X.tsx?raw'`), add both to
   the `sources` and `demos` maps keyed by block name.
4. Verify: `npm run build`.
