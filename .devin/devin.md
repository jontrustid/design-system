# Devin session rules — TrustID Design System

This repo is a **block registry** for the VeriScan React rewrite. Blocks are
copyable source (shadcn-style), not a published package.

## Stack

- Vite + React 19 + TypeScript (strict, `verbatimModuleSyntax`,
  `erasableSyntaxOnly` — use `import type` for type-only imports)
- Tailwind CSS 4 via `@tailwindcss/vite`
- daisyUI 5 via `@plugin "daisyui"`; the `trustid` theme is defined in
  `src/index.css` with `@plugin "daisyui/theme"`

## Block conventions

- Location: `src/blocks/<category>/<BlockName>.tsx`, one component per file,
  default export, exported `<BlockName>Props` interface.
- Presentation-only: typed props in, callbacks out. **No** fetch/API calls,
  routing, global state, or side effects.
- Styling: daisyUI semantic classes only (`btn`, `card`, `badge`, `table`,
  `steps`, `drawer`, `input`, `select`, `fieldset`...). **No hard-coded hex
  colours or inline colour styles** — blocks must work under any daisyUI
  theme. Opacity modifiers like `bg-primary/10` are fine.
- Blocks may import other blocks via relative paths; record every such import
  in the block's `dependencies` in `blocks.json` (by block `name`).

## Registry

`src/registry/blocks.json` is the machine-readable catalogue that AI sessions
read first. Fields: `name`, `category`, `path`, `description`, `useCases`
(matching keywords), `dependencies` (other block names).

**Always keep `blocks.json` in sync.** Any block added, removed, renamed, or
re-categorised must be reflected in the same change.

## Adding/changing a block — checklist

1. Create/edit `src/blocks/<category>/<BlockName>.tsx`.
2. Update `src/registry/blocks.json`.
3. Update `src/registry/catalogue.tsx`: component import, `?raw` source
   import, `sources` entry, `demos` entry (keyed by `name`).
4. Run `npm run build` — it must pass (`tsc -b && vite build`).

## When asked to "build a form/table/page" using this registry

1. Read `blocks.json`, match the request to `useCases`/`description`.
2. Copy the block file(s) plus the transitive `dependencies` closure into the
   target app (preserving their relative layout or fixing import paths).
3. Wire the host app's data/callbacks into the block's props — never edit the
   block to fetch data itself.
