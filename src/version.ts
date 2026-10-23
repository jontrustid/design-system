import pkg from '../package.json';

/** One entry in the deployed site's versions.json manifest. */
export interface VersionEntry {
  id: string;
  label: string;
  /** Site-relative path with trailing slash ("0.1.0/", "latest/") or an
   * absolute URL — the manifest uses the latter for the dev-server link. */
  path: string;
}

/** External (cross-origin) entries navigate directly rather than resolving ../. */
export function isExternalPath(path: string): boolean {
  return /^https?:\/\//i.test(path);
}

/**
 * True when a dev server answers at `url`. Absolute (cross-origin) targets
 * use no-cors — an opaque response means something is listening. Same-origin
 * targets (the /dev/ proxy) can check res.ok directly.
 */
export async function devServerReachable(url: string): Promise<boolean> {
  try {
    if (isExternalPath(url)) {
      await fetch(url, { mode: 'no-cors', cache: 'no-store' });
      return true;
    }
    const res = await fetch(url, { cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

/** Version of the build currently running (package.json at build time). */
export const CURRENT_VERSION = pkg.version;

/**
 * The versioned site is served as <root>/<version>/ — the manifest lives one
 * level up so every build, however old, sees newly published versions.
 * Resolves to /versions.json when running unversioned (dev server).
 */
function versionsUrl(): string {
  const self = new URL(window.location.href);
  self.hash = '';
  self.search = '';
  if (!self.pathname.endsWith('/')) self.pathname += '/';
  return new URL('../versions.json', self).href;
}

/** Manifest entries, or [] when no manifest exists (dev, unversioned host). */
export async function fetchVersions(): Promise<VersionEntry[]> {
  try {
    const res = await fetch(versionsUrl());
    if (!res.ok) return [];
    return (await res.json()) as VersionEntry[];
  } catch {
    return [];
  }
}

/** Which manifest entry this build is, matched by URL path segment or version. */
export function currentEntryId(entries: VersionEntry[]): string {
  const byPath = entries.find((v) =>
    window.location.pathname.includes(`/${v.path.replace(/\/$/, '')}/`),
  );
  if (byPath) return byPath.id;
  const byVersion = entries.find(
    (v) => v.id === CURRENT_VERSION || v.id === `v${CURRENT_VERSION}`,
  );
  return byVersion?.id ?? 'dev';
}
