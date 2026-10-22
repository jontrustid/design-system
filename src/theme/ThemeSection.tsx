import { useEffect, useState } from 'react';

interface Swatch {
  token: string;
  /** Token used for the sample glyph colour. */
  contentToken?: string;
}

interface TokenGroup {
  label: string;
  swatches: Swatch[];
}

const GROUPS: TokenGroup[] = [
  {
    label: 'Brand',
    swatches: [
      { token: '--color-primary', contentToken: '--color-primary-content' },
      { token: '--color-secondary', contentToken: '--color-secondary-content' },
      { token: '--color-accent', contentToken: '--color-accent-content' },
    ],
  },
  {
    label: 'Semantic',
    swatches: [
      { token: '--color-info', contentToken: '--color-info-content' },
      { token: '--color-success', contentToken: '--color-success-content' },
      { token: '--color-warning', contentToken: '--color-warning-content' },
      { token: '--color-error', contentToken: '--color-error-content' },
    ],
  },
  {
    label: 'Surface',
    swatches: [
      { token: '--color-base-100', contentToken: '--color-base-content' },
      { token: '--color-base-200', contentToken: '--color-base-content' },
      { token: '--color-base-300', contentToken: '--color-base-content' },
      { token: '--color-base-content', contentToken: '--color-base-100' },
      { token: '--color-neutral', contentToken: '--color-neutral-content' },
      { token: '--color-neutral-content', contentToken: '--color-neutral' },
    ],
  },
];

const RADIUS_TOKENS = ['--radius-selector', '--radius-field', '--radius-box'];

const TYPE_SCALE = [
  { cls: 'text-xs', label: 'text-xs' },
  { cls: 'text-sm', label: 'text-sm' },
  { cls: 'text-base', label: 'text-base' },
  { cls: 'text-lg', label: 'text-lg' },
  { cls: 'text-xl', label: 'text-xl' },
  { cls: 'text-2xl', label: 'text-2xl' },
  { cls: 'text-3xl', label: 'text-3xl' },
];

const ALL_TOKENS = [
  ...GROUPS.flatMap((g) => g.swatches.map((s) => s.token)),
  ...RADIUS_TOKENS,
];

export default function ThemeSection({ theme }: { theme: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setValues(
      Object.fromEntries(
        ALL_TOKENS.map((token) => [token, styles.getPropertyValue(token).trim()]),
      ),
    );
  }, [theme]);

  return (
    <section id="theme-tokens" className="flex scroll-mt-24 flex-col gap-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
          Theme tokens
        </h2>
        <p className="mt-1 text-sm text-base-content/70">
          Live values from the <code>{theme}</code> theme - blocks resolve these
          tokens, so a rebrand only touches <code>src/index.css</code>.
        </p>
      </div>

      {GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {group.swatches.map((swatch) => (
              <div key={swatch.token} className="overflow-hidden rounded-box border border-base-300 bg-base-100">
                <div
                  className="flex h-16 items-center justify-center text-xl font-semibold"
                  style={{ backgroundColor: `var(${swatch.token})` }}
                >
                  <span style={{ color: `var(${swatch.contentToken ?? '--color-base-content'})` }}>
                    Aa
                  </span>
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate font-mono text-xs">{swatch.token.replace('--color-', '')}</p>
                  <p className="font-mono text-xs text-base-content/50">
                    {values[swatch.token] ?? '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
          Radius
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {RADIUS_TOKENS.map((token) => (
            <div key={token} className="overflow-hidden rounded-box border border-base-300 bg-base-100">
              <div className="flex h-16 items-center justify-center bg-base-200/60">
                <div
                  className="h-10 w-16 border-2 border-primary bg-primary/10"
                  style={{ borderRadius: `var(${token})` }}
                />
              </div>
              <div className="px-2 py-1.5">
                <p className="truncate font-mono text-xs">{token.replace('--radius-', '')}</p>
                <p className="font-mono text-xs text-base-content/50">
                  {values[token] ?? '...'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
          Type scale
        </h3>
        <div className="rounded-box border border-base-300 bg-base-100 p-4">
          {TYPE_SCALE.map((t) => (
            <div key={t.cls} className="flex items-baseline gap-4 border-b border-base-200 py-1 last:border-0">
              <code className="w-20 shrink-0 text-xs text-base-content/50">{t.label}</code>
              <span className={t.cls}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
