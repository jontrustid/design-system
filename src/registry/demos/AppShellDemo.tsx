import { useState } from 'react';
import AppShell from '../../blocks/layout/AppShell';
import { navIcon } from './fixtures';

export default function AppShellDemo() {
  const [active, setActive] = useState('inbox');
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-box border border-base-300">
      <AppShell
        navItems={[
          { id: 'inbox', label: 'Inbox', badge: '8', icon: navIcon('M22 12h-6l-2 3h-4l-2-3H2m20 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6m20 0l-3.5-7h-13L2 12') },
          { id: 'verify', label: 'Verify document', icon: navIcon('M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z') },
          { id: 'pools', label: 'Work pools', icon: navIcon('M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4m4 4a4 4 0 01-4-4') },
          { id: 'admin', label: 'Administration', roles: ['admin', 'supervisor'], icon: navIcon('M10.3 4.3a1.7 1.7 0 013.4 0 1.7 1.7 0 002.6 1 1.7 1.7 0 012.4 2.4 1.7 1.7 0 001 2.6 1.7 1.7 0 010 3.4 1.7 1.7 0 00-1 2.6 1.7 1.7 0 01-2.4 2.4 1.7 1.7 0 00-2.6 1 1.7 1.7 0 01-3.4 0 1.7 1.7 0 00-2.6-1 1.7 1.7 0 01-2.4-2.4 1.7 1.7 0 001-2.6 1.7 1.7 0 010-3.4 1.7 1.7 0 001-2.6 1.7 1.7 0 012.4-2.4 1.7 1.7 0 012.4-2.4 1.7 1.7 0 002.6-1zM15 12a3 3 0 11-6 0 3 3 0 016 0z') },
          { id: 'audit', label: 'Audit log', roles: ['admin'], icon: navIcon('M9 5h6M9 9h6M9 13h4M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z') },
        ]}
        activeNavId={active}
        user={{ name: 'J. Tremelling', role: 'operator', org: 'TrustID Demo Org' }}
        onNavigate={setActive}
        onSignOut={() => console.log('sign out')}
      >
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base">Page content</h3>
            <p className="text-sm text-base-content/70">
              The active section is <code>{active}</code>. The sidebar filters
              items by role - the demo user is an <code>operator</code>, so
              admin-only items are hidden.
            </p>
          </div>
        </div>
      </AppShell>
    </div>
  );
}
