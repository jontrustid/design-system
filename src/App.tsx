import { useEffect, useMemo, useState } from 'react';
import { catalogue } from './registry/catalogue';
import type { CatalogueEntry } from './registry/catalogue';
import ThemeSection from './theme/ThemeSection';

const THEMES = [
  { id: 'veriscan', label: 'VeriScan' },
  { id: 'test', label: 'Test' },
] as const;
type ThemeId = (typeof THEMES)[number]['id'];

function BlockCard({ entry }: { entry: CatalogueEntry }) {
  const [showSource, setShowSource] = useState(false);
  const [activeTab, setActiveTab] = useState('component');
  const [copied, setCopied] = useState(false);

  const active =
    entry.artifacts.find((a) => a.id === activeTab) ?? entry.artifacts[0];
  const planned = entry.status === 'planned';

  async function copySource() {
    await navigator.clipboard.writeText(active.source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section
      id={`block-${entry.name}`}
      className={`card scroll-mt-24 border bg-base-100 shadow-sm ${
        planned ? 'border-dashed border-base-300' : 'border-base-300'
      }`}
    >
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="card-title">{entry.name}</h3>
          {planned && <span className="badge badge-warning badge-sm">planned</span>}
          <code className="text-xs text-base-content/50">{entry.path}</code>
          {entry.dependencies.length > 0 && (
            <span className="text-xs text-base-content/60">
              depends on: {entry.dependencies.join(', ')}
            </span>
          )}
        </div>

        <p className="text-sm text-base-content/70">{entry.description}</p>

        {!planned && (
          <div className="rounded-box border border-base-300 bg-base-200/60 p-4">
            {entry.demo}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {entry.useCases.slice(0, 6).map((uc) => (
            <span key={uc} className="badge badge-ghost badge-sm">
              {uc}
            </span>
          ))}
          {entry.artifacts.length > 0 && (
            <button
              type="button"
              className="btn btn-outline btn-sm ms-auto"
              onClick={() => setShowSource((s) => !s)}
            >
              {showSource ? 'Hide source' : 'View source'}
            </button>
          )}
        </div>

        {showSource && active && (
          <div className="overflow-hidden rounded-box border border-base-300">
            <div role="tablist" className="tabs tabs-box flex-nowrap rounded-none bg-base-200">
              {entry.artifacts.map((artifact) => (
                <button
                  key={artifact.id}
                  type="button"
                  role="tab"
                  className={`tab ${artifact.id === active.id ? 'tab-active' : ''}`}
                  onClick={() => {
                    setActiveTab(artifact.id);
                    setCopied(false);
                  }}
                >
                  {artifact.label}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-ghost btn-sm ms-auto self-center"
                onClick={copySource}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="max-h-96 overflow-auto bg-neutral p-4 text-xs text-neutral-content">
              <code>{active.source}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const stored = localStorage.getItem('theme')?.replace('-dark', '');
    return THEMES.some((t) => t.id === stored) ? (stored as ThemeId) : 'veriscan';
  });
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme')?.endsWith('-dark') ?? false,
  );
  const theme = `${themeId}${dark ? '-dark' : ''}`;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const readyCount = catalogue.filter((b) => b.status === 'ready').length;
  const plannedCount = catalogue.length - readyCount;

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="navbar sticky top-0 z-30 gap-4 border-b border-base-300 bg-base-100 px-4 sm:px-6">
        <div>
          <h1 className="text-lg font-semibold text-primary">TrustID Design System</h1>
          <p className="text-xs text-base-content/60">
            {readyCount} blocks{plannedCount > 0 && ` + ${plannedCount} planned`}
          </p>
        </div>
        <input
          type="search"
          className="input input-sm ms-auto w-56 sm:w-72"
          placeholder='Filter blocks, e.g. "form" or "table"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select select-sm w-32"
          value={themeId}
          onChange={(e) => setThemeId(e.target.value as ThemeId)}
          aria-label="Theme"
        >
          {THEMES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <label className="label cursor-pointer gap-2">
          <span className="label-text text-sm">Dark</span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
            aria-label="Toggle dark mode"
          />
        </label>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-base-300 bg-base-100 p-3 lg:block">
          <ul className="menu menu-sm w-full">
            <li>
              <span className="menu-title uppercase">Foundation</span>
              <ul>
                <li>
                  <a href="#theme-tokens">
                    <span className="flex-1 truncate">Theme tokens</span>
                  </a>
                </li>
              </ul>
            </li>
            {grouped.map(([category, entries]) => (
              <li key={category}>
                <span className="menu-title uppercase">{category}</span>
                <ul>
                  {entries.map((entry) => (
                    <li key={entry.name}>
                      <a
                        href={`#block-${entry.name}`}
                        className={entry.status === 'planned' ? 'text-base-content/50' : ''}
                      >
                        <span className="flex-1 truncate">{entry.name}</span>
                        {entry.status === 'planned' && (
                          <span className="badge badge-warning badge-xs">planned</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-10 p-4 sm:p-6">
          <ThemeSection theme={theme} />
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
    </div>
  );
}
