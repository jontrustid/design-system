// Builds the versioned catalogue site:
//   site/latest/      — catalogue built from the current working tree
//   site/<ver>/       — catalogue built from each git tag matching v*
//   site/versions.json — manifest the in-app version picker reads (../versions.json)
//   site/index.html   — redirect to latest/
// Deploy the contents of site/ to any static host as the site root.
import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = join(root, 'site');
const wtRoot = join(root, '.version-worktrees');
const npmCli = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
const node = process.execPath;

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: 'inherit' });

function buildVersion(workDir, outDir, label) {
  console.log(`\n=== building ${label} -> ${outDir} ===`);
  run(node, [join('node_modules', 'typescript', 'bin', 'tsc'), '-b'], workDir);
  run(node, [join('node_modules', 'vite', 'bin', 'vite.js'), 'build', '--outDir', outDir, '--emptyOutDir'], workDir);
  run(node, [join(root, 'tools', 'copy-css.mjs'), outDir], workDir);
}

const tags = execSync('git tag -l "v*"', { cwd: root, encoding: 'utf8' })
  .split('\n')
  .map((t) => t.trim())
  .filter(Boolean)
  .sort((a, b) => {
    const pa = a.slice(1).split('.').map(Number);
    const pb = b.slice(1).split('.').map(Number);
    for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return (pb[i] ?? 0) - (pa[i] ?? 0);
    return 0;
  });

rmSync(siteDir, { recursive: true, force: true });
rmSync(wtRoot, { recursive: true, force: true });
mkdirSync(siteDir, { recursive: true });

const versions = [{ id: 'latest', label: 'latest', path: 'latest/' }];

try {
  buildVersion(root, join(siteDir, 'latest'), 'working tree');

  for (const tag of tags) {
    const ver = tag.replace(/^v/, '');
    const wt = join(wtRoot, tag);
    run('git', ['worktree', 'add', '--detach', wt, tag], root);
    run(node, [npmCli, 'install', '--no-audit', '--no-fund'], wt);
    buildVersion(wt, join(siteDir, ver), tag);
    versions.push({ id: ver, label: tag, path: `${ver}/` });
  }
} finally {
  execSync(`git worktree list --porcelain`, { cwd: root, encoding: 'utf8' })
    .split('\n')
    .filter((l) => l.startsWith('worktree ') && l.includes('.version-worktrees'))
    .forEach((l) => run('git', ['worktree', 'remove', '--force', l.slice(9).trim()], root));
  rmSync(wtRoot, { recursive: true, force: true });
}

writeFileSync(join(siteDir, 'versions.json'), JSON.stringify(versions, null, 2));
writeFileSync(
  join(siteDir, 'index.html'),
  '<!doctype html><meta http-equiv="refresh" content="0; url=latest/">',
);

const pkgVersion = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
console.log(`\nsite/ ready — latest (v${pkgVersion}) + ${tags.length} tagged version(s): ${tags.join(', ') || 'none'}`);
console.log('Preview: node tools/serve-site.mjs');
