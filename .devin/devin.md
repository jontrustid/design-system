# Devin session rules — TrustID Design System

This repo is a **block registry** for the VeriScan React rewrite. Blocks are
copyable source (shadcn-style), not a published package.

## Stack

- Vite + React 19 + TypeScript (strict, `verbatimModuleSyntax`,
  `erasableSyntaxOnly` — use `import type` for type-only imports)
- Tailwind CSS 4 via `@tailwindcss/vite`
- daisyUI 5 via `@plugin "daisyui"`; the `veriscan` theme (plus a `test`
  alternate) is defined in `src/index.css` with `@plugin "daisyui/theme"`

## Block conventions

- Location: `src/blocks/<category>/<BlockName>.tsx`, one component per file,
  default export, exported `<BlockName>Props` interface.
- Presentation-only: typed props in, callbacks out. **No** fetch/API calls,
  routing, global state, or side effects.
- Styling: daisyUI semantic classes only (`btn`, `card`, `badge`, `table`,
  `steps`, `drawer`, `input`, `select`, `fieldset`...). **No hard-coded hex
  colours or inline colour styles** — blocks must work under any daisyUI
  theme. Opacity modifiers like `bg-primary/10` are fine.
- `<BlockName>Props` extends the root element's props via
  `ComponentPropsWithRef<'el'>` (`Omit` any prop-name clashes, e.g.
  `onSubmit`/`onSelect`/`onReset`). Destructure `className`/`ref`, merge
  `className` into the root classes (consumer classes last), spread `...rest`
  onto the root element.
- Conditional classes use a local `cx(...)` helper kept inside the block file
  (blocks must remain self-contained for drop-in copying — no shared util
  imports outside `dependencies`).
- Interactive elements must be keyboard-usable: focusable (`tabIndex`),
  Enter/Space handlers where applicable, and `aria-selected`/`aria-current`/
  `aria-pressed`/`aria-label` as appropriate.
- Blocks may import other blocks via relative paths; record every such import
  in the block's `dependencies` in `blocks.json` (by block `name`).

## Registry

`src/registry/blocks.json` is the machine-readable catalogue that AI sessions
read first. Fields per block: `name`, `category`, `status` (`"ready"` =
implemented; `"planned"` = audited gap, no file yet), `path`, `description`,
`useCases` (matching keywords), `dependencies` (other block names),
`artifacts` (omit for planned blocks).

`artifacts` lists the viewable/copyable sources for the block:

- `{ "id": "component", "path": "src/blocks/..." }` — the block itself.
- `{ "id": "usage", "path": "src/registry/demos/<Name>Demo.tsx" }` — the demo
  component; the React analogue of controller code (state + prop wiring +
  callbacks).
- `{ "id": "html", "source": "rendered-demo" }` — HTML template generated at
  view time from the demo via `renderToStaticMarkup` (not a file). For
  non-React targets.
- Additional file artifacts (e.g. `.razor`, `.vue`) may be added the same
  way: `{ "id": ..., "label": ..., "path": ... }`.

**Always keep `blocks.json` in sync.** Any block or artifact added, removed,
renamed, or moved must be reflected in the same change.

## Adding/changing a block — checklist

1. Create/edit `src/blocks/<category>/<BlockName>.tsx`.
2. Create/edit `src/registry/demos/<BlockName>Demo.tsx` (default export,
   realistic fixtures — it powers the preview AND the usage/html artifacts).
3. Update `src/registry/blocks.json` including `artifacts`.
4. Run `npm run build` — it must pass.

`catalogue.tsx` resolves component/demo sources via `import.meta.glob` —
follow the naming conventions and no per-block wiring is required.

## When asked to "build a form/table/page" using this registry

1. Read `blocks.json`, match the request to `useCases`/`description`.
2. Copy the block file(s) plus the transitive `dependencies` closure into the
   target app (preserving their relative layout or fixing import paths).
3. Use the `usage` artifact as the wiring reference — wire the host app's
   data/callbacks into the block's props the same way.
4. For non-React targets, use the `html` artifact (rendered markup + daisyUI
   classes) as the template.
