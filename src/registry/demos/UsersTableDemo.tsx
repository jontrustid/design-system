import UsersTable from '../../blocks/data/UsersTable';

export default function UsersTableDemo() {
  return (
    <UsersTable
      rows={[
        { id: 'u1', name: 'J. Tremelling', username: 'j.tremelling', role: 'admin', org: 'TrustID Demo Org', enabled: true, lastActive: '2026-10-22 09:02' },
        { id: 'u2', name: 'S. Amjad', username: 's.amjad', role: 'supervisor', org: 'TrustID Demo Org', enabled: true, lastActive: '2026-10-21 16:44' },
        { id: 'u3', name: 'J. Chen', username: 'j.chen', role: 'operator', org: 'TrustID Demo Org', enabled: true, lastActive: '2026-10-22 08:31' },
        { id: 'u4', name: 'M. Ferreira', username: 'm.ferreira', role: 'operator', org: 'TrustID Demo Org', enabled: false },
      ]}
      actions={(user) => (
        <div className="flex justify-end gap-1">
          <button type="button" className="btn btn-ghost btn-xs" onClick={() => console.log('edit', user.id)}>Edit</button>
          <button type="button" className="btn btn-ghost btn-xs" onClick={() => console.log('disable', user.id)}>
            {user.enabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      )}
    />
  );
}
