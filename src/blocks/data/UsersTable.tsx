import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface UserRow {
  id: string;
  name: string;
  username: string;
  role: string;
  org?: string;
  enabled: boolean;
  lastActive?: string;
}

export interface UsersTableProps extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'> {
  rows: UserRow[];
  selectedId?: string;
  /** Row action slot, e.g. Edit/Disable buttons. */
  actions?: (user: UserRow) => ReactNode;
  onSelect?: (user: UserRow) => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function UsersTable({
  rows,
  selectedId,
  actions,
  onSelect,
  className,
  ref,
  ...rest
}: UsersTableProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'overflow-x-auto rounded-box border border-base-300 bg-base-100',
        className,
      )}
    >
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Organisation</th>
            <th>Status</th>
            <th>Last active</th>
            {actions && <th className="w-0" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((user) => (
            <tr
              key={user.id}
              className={cx(
                onSelect && 'cursor-pointer',
                user.id === selectedId && 'bg-primary/10',
              )}
              onClick={onSelect ? () => onSelect(user) : undefined}
            >
              <td className="font-medium">{user.name}</td>
              <td className="font-mono text-sm">{user.username}</td>
              <td className="capitalize">{user.role}</td>
              <td>{user.org ?? '-'}</td>
              <td>
                <span className={cx('badge badge-sm', user.enabled ? 'badge-success' : 'badge-neutral')}>
                  {user.enabled ? 'Active' : 'Disabled'}
                </span>
              </td>
              <td className="whitespace-nowrap text-sm text-base-content/70">
                {user.lastActive ?? 'Never'}
              </td>
              {actions && <td>{actions(user)}</td>}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={actions ? 7 : 6} className="py-8 text-center text-base-content/60">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
