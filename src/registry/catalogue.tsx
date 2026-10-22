import { createElement } from 'react';
import type { ComponentType, ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import registry from './blocks.json';

interface RegistryArtifact {
  id: string;
  label: string;
  path?: string;
  /** Special values (e.g. "rendered-demo") for artifacts without a file. */
  source?: string;
}

interface RegistryBlock {
  name: string;
  category: string;
  path: string;
  description: string;
  useCases: string[];
  dependencies: string[];
  artifacts: RegistryArtifact[];
}

export interface SourceArtifact {
  id: string;
  label: string;
  source: string;
}

export interface CatalogueEntry {
  name: string;
  category: string;
  path: string;
  description: string;
  useCases: string[];
  dependencies: string[];
  demo: ReactElement;
  /** Viewable/copyable source artifacts: component, usage wiring, HTML, ... */
  artifacts: SourceArtifact[];
}

/* ---------- raw sources, resolved by repo-relative path ---------- */

const componentSources = import.meta.glob('../blocks/**/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const demoSources = import.meta.glob('./demos/**/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const sourceByRepoPath: Record<string, string> = {};
for (const [key, src] of Object.entries(componentSources)) {
  sourceByRepoPath[key.replace('../blocks/', 'src/blocks/')] = src;
}
for (const [key, src] of Object.entries(demoSources)) {
  sourceByRepoPath[key.replace('./demos/', 'src/registry/demos/')] = src;
}

/* ---------- demo components, keyed the same way ---------- */

const demoComponents = import.meta.glob('./demos/*Demo.tsx', {
  import: 'default',
  eager: true,
}) as Record<string, ComponentType>;

const demoByRepoPath: Record<string, ComponentType> = {};
for (const [key, comp] of Object.entries(demoComponents)) {
  demoByRepoPath[key.replace('./demos/', 'src/registry/demos/')] = comp;
}

/* ---------- HTML template generation ---------- */

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'source', 'track', 'wbr',
]);

function formatHtml(markup: string): string {
  const tokens = markup.match(/<[^>]*>|[^<]+/g) ?? [];
  const lines: string[] = [];
  let depth = 0;
  for (const raw of tokens) {
    const token = raw.trim();
    if (!token) continue;
    const tagMatch = token.match(/^<(\/?)([a-zA-Z][\w-]*)/);
    if (!tagMatch) {
      lines.push('  '.repeat(depth) + token);
      continue;
    }
    const [, closing, tag] = tagMatch;
    const selfClosing = token.endsWith('/>') || VOID_ELEMENTS.has(tag.toLowerCase());
    if (closing) depth = Math.max(0, depth - 1);
    lines.push('  '.repeat(depth) + token);
    if (!closing && !selfClosing) depth++;
  }
  return lines.join('\n');
}

function renderedHtml(demo: ReactElement): string {
  try {
    return formatHtml(renderToStaticMarkup(demo));
  } catch {
    return '<!-- demo could not be rendered to static markup -->';
  }
}

/* ---------- catalogue ---------- */

const blocks = registry.blocks as RegistryBlock[];

export const catalogue: CatalogueEntry[] = blocks.map((block) => {
  const usageArtifact = block.artifacts.find((a) => a.id === 'usage');
  const demoPath =
    usageArtifact?.path ?? `src/registry/demos/${block.name}Demo.tsx`;
  const DemoComponent = demoByRepoPath[demoPath];
  const demo = DemoComponent ? (
    createElement(DemoComponent)
  ) : (
    <p className="text-sm text-base-content/60">
      No demo registered for this block.
    </p>
  );

  const artifacts: SourceArtifact[] = block.artifacts.map((artifact) => ({
    id: artifact.id,
    label: artifact.label,
    source:
      artifact.source === 'rendered-demo'
        ? renderedHtml(demo)
        : (artifact.path && sourceByRepoPath[artifact.path]) ||
          `// source not found: ${artifact.path}`,
  }));

  return { ...block, demo, artifacts };
});
