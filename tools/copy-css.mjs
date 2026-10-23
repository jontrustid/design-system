// Copies the compiled Tailwind/daisyUI stylesheet emitted by `vite build`
// (dist/assets/index-*.css) to a stable path so consumers that don't run
// Tailwind can import '@trustid/design-system/design-system.css'.
import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'dist', 'assets');

const cssFiles = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => ({ f, size: statSync(join(assetsDir, f)).size }))
  .sort((a, b) => b.size - a.size);

if (cssFiles.length === 0) {
  console.error('copy-css: no .css found in dist/assets — did vite build run?');
  process.exit(1);
}

copyFileSync(join(assetsDir, cssFiles[0].f), join(root, 'dist', 'design-system.css'));
console.log(`dist/design-system.css written from assets/${cssFiles[0].f}`);
