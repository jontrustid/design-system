import { useMemo, useState } from 'react';
import { catalogue } from './registry/catalogue';
import type { CatalogueEntry } from './registry/catalogue';

function BlockCard({ entry }: { entry: CatalogueEntry }) {
  const [showSource, setShowSource] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copySource() {
    await navigator.clipboard.writeText(entry.source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="card-title">{entry.name}</h3>
          <code className="text-xs text-base-content/50">{entry.path}</code>
          {entry.dependencies.length > 0 && (
            <span className="text-xs text-base-content/60">
              depends on: {entry.dependencies.join(', ')}
            </span>
          )}
        </div>

        <p className="text-sm text-base-content/70">{entry.description}</p>

        <div className="rounded-box border border-base-300 bg-base-200/60 p-4">
          {entry.demo}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {entry.useCases.slice(0, 6).map((uc) => (
            <span key={uc} className="badge badge-ghost badge-sm">
              {uc}
            </span>
          ))}
          <div className="ms-auto flex gap-2">
            {showSource && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={copySource}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setShowSource((s) => !s)}
            >
              {showSource ? 'Hide source' : 'View source'}
            </button>
          </div>
        </div>

        {showSource && (
          <pre className="max-h-96 overflow-auto rounded-box bg-neutral p-4 text-xs text-neutral-content">
            <code>{entry.source}</code>
          </pre>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogue;
    return catalogue.filter((entry) =>
      [entry.name, entry.category, entry.description, ...entry.useCases]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CatalogueEntry[]>();
    for (const entry of filtered) {
      map.set(entry.category, [...(map.get(entry.category) ?? []), entry]);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="navbar sticky top-0 z-10 gap-4 border-b border-base-300 bg-base-100 px-4 sm:px-6">
        <div>
          <h1 className="text-lg font-semibold text-primary">TrustID Design System</h1>
          <p className="text-xs text-base-content/60">
            Block registry - {catalogue.length} blocks
          </p>
        </div>
        <input
          type="search"
          className="input input-sm ms-auto w-56 sm:w-72"
          placeholder='Filter blocks, e.g. "form" or "table"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 p-4 sm:p-6">
        {grouped.map(([category, entries]) => (
          <section key={category} className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
              {category}
            </h2>
            {entries.map((entry) => (
              <BlockCard key={entry.name} entry={entry} />
            ))}
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="py-16 text-center text-base-content/60">
            No blocks match "{query}".
          </p>
        )}
      </main>
    </div>
  );
}
