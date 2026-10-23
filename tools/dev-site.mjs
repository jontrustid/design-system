// One command, one URL: serves the versioned catalogue on :5180 and the vite
// dev server behind its /dev/ proxy. The picker's "dev (hot reload)" entry is
// then a live, same-origin target — no separate port to open.
// Ctrl+C stops both.
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const node = process.execPath;
const devPort = process.env.DEV_PORT ?? '5173';

const procs = [
  spawn(
    node,
    [
      join('node_modules', 'vite', 'bin', 'vite.js'),
      '--port', devPort,
      '--strictPort',
      '--base', '/dev/',
    ],
    { cwd: root, stdio: 'inherit' },
  ),
  spawn(node, [join('tools', 'serve-site.mjs')], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, DEV_TARGET: `http://localhost:${devPort}` },
  }),
];

const shutdown = () => procs.forEach((p) => p.kill('SIGTERM'));
process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});
process.on('SIGTERM', shutdown);
procs.forEach((p) =>
  p.on('exit', (code) => {
    console.log(`child exited (${code}) — shutting down dev:site`);
    shutdown();
    process.exit(code ?? 0);
  }),
);
