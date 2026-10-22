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
  registry/catalogue.tsx              # resolves registry -> demos + source artifacts
  registry/demos/<BlockName>Demo.tsx  # wiring/usage example per block
  registry/demos/fixtures.tsx         # shared demo fixtures
  App.tsx                             # catalogue page
  index.css                           # Tailwind 4 + daisyUI 5 + trustid theme
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

To satisfy a request like "build me a form":

1. Read `blocks.json` and match the request against `useCases`,
   `description`, `name` and `category`.
2. Copy the file at `path` into the target app.
3. **Also copy every block listed in `dependencies`** (they import each other
   via relative paths, e.g. `ApplicationsTable` imports
   `../feedback/StatusBadge`). Dependencies may have their own dependencies —
   copy the transitive closure.
4. Use the `usage` artifact as the wiring reference for props/callbacks; use
   the `html` artifact (rendered markup) when targeting a non-React stack.
5. Blocks are presentation-only: typed props in, callbacks out. There are no
   API calls and no app-state dependencies to stub.

Block requirements in the target app: **React 19+, Tailwind CSS 4, daisyUI 5**
(for the `.tsx` component/usage artifacts — the HTML artifact needs only
Tailwind + daisyUI). They use daisyUI semantic classes only (`btn`, `card`,
`badge`, `table`, `steps`, `drawer`, ...), so they pick up whatever daisyUI
theme the host app defines — ideally the `trustid` theme from `src/index.css`.
No hard-coded hex colours are allowed, which keeps this true.

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
