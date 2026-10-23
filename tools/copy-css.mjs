// Copies the compiled Tailwind/daisyUI stylesheet emitted by `vite build`
// (<outDir>/assets/index-*.css) to a stable path so consumers that don't run
// Tailwind can import '@trustid/design-system/design-system.css'.
// Usage: node tools/copy-css.mjs [outDir]   (default: dist)
import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, process.argv[2] ?? 'dist');
const assetsDir = join(outDir, 'assets');

const cssFiles = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => ({ f, size: statSync(join(assetsDir, f)).size }))
  .sort((a, b) => b.size - a.size);

if (cssFiles.length === 0) {
  console.error(`copy-css: no .css found in ${assetsDir} — did vite build run?`);
  process.exit(1);
}

copyFileSync(join(assetsDir, cssFiles[0].f), join(outDir, 'design-system.css'));
console.log(`${process.argv[2] ?? 'dist'}/design-system.css written from assets/${cssFiles[0].f}`);
