import { useState } from 'react';
import type { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Visible only to these roles. Omit to show to everyone. */
  roles?: string[];
  badge?: string;
}

export interface ShellUser {
  name: string;
  role: string;
  org: string;
}

export interface AppShellProps {
  appName?: string;
  navItems: NavItem[];
  activeNavId?: string;
  user: ShellUser;
  onNavigate?: (id: string) => void;
  onSignOut?: () => void;
  /** The shell fills its parent; give the parent a height (e.g. h-dvh). */
  children?: ReactNode;
}

export default function AppShell({
  appName = 'VeriScan',
  navItems,
  activeNavId,
  user,
  onNavigate,
  onSignOut,
  children,
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const visibleItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(user.role),
  );

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`drawer h-full min-h-0 ${drawerOpen ? 'drawer-open' : ''} lg:drawer-open`}>
      <input
        id="app-shell-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={(e) => setDrawerOpen(e.target.checked)}
      />

      <div className="drawer-content flex min-w-0 flex-col">
        <header className="navbar gap-2 border-b border-base-300 bg-base-100 px-4">
          <label
            htmlFor="app-shell-drawer"
            className="btn btn-ghost btn-sm btn-square lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <span className="text-lg font-semibold text-primary">{appName}</span>
          <span className="badge badge-outline badge-sm hidden sm:inline-flex">{user.org}</span>

          <div className="ms-auto flex items-center gap-3">
            <div className="hidden text-end sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs capitalize text-base-content/60">{user.role}</p>
            </div>
            <div className="dropdown dropdown-end">
              <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar avatar-placeholder">
                <span className="w-9 rounded-full bg-primary text-primary-content text-sm">
                  {initials}
                </span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-md"
              >
                <li className="menu-title">{user.name}</li>
                <li>
                  <a>My account</a>
                </li>
                <li>
                  <a>Preferences</a>
                </li>
                <li>
                  <a onClick={onSignOut}>Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-base-200 p-4">{children}</main>
      </div>

      <div className="drawer-side z-20">
        <label
          htmlFor="app-shell-drawer"
          className="drawer-overlay"
          aria-label="Close navigation"
        />
        <aside className="flex min-h-full w-64 flex-col bg-base-100">
          <div className="border-b border-base-300 p-4">
            <span className="text-lg font-semibold text-primary">{appName}</span>
            <p className="text-xs text-base-content/60">Document verification</p>
          </div>
          <ul className="menu flex-1 gap-1 p-3">
            {visibleItems.map((item) => (
              <li key={item.id}>
                <a
                  className={item.id === activeNavId ? 'menu-active' : ''}
                  onClick={() => {
                    onNavigate?.(item.id);
                    setDrawerOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="badge badge-sm">{item.badge}</span>}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
