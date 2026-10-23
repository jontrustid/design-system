import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface DropdownMenuItem {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  /** Renders the item label in the error colour (destructive actions). */
  danger?: boolean;
}

export interface DropdownMenuGroup {
  /** Small group heading (menu-title). */
  label?: string;
  items: DropdownMenuItem[];
}

export interface DropdownMenuProps extends ComponentPropsWithRef<'div'> {
  /** Trigger button label. */
  label: ReactNode;
  /** Flat item list or labelled groups (pass DropdownMenuGroup[] for groups). */
  items: DropdownMenuItem[] | DropdownMenuGroup[];
  align?: 'start' | 'end';
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}

function isGroup(x: DropdownMenuItem | DropdownMenuGroup): x is DropdownMenuGroup {
  return 'items' in x;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function MenuItems({ items }: { items: DropdownMenuItem[] }) {
  return (
    <>
      {items.map((item, i) => (
        <li key={i}>
          <button
            type="button"
            disabled={item.disabled}
            title={item.title}
            onClick={item.onClick}
            className={item.danger ? 'text-error' : undefined}
          >
            {item.label}
          </button>
        </li>
      ))}
    </>
  );
}

/** daisyUI dropdown — trigger button plus a menu of actions, optionally grouped. */
export default function DropdownMenu({
  label,
  items,
  align = 'end',
  buttonClassName,
  menuClassName,
  disabled,
  className,
  ref,
  ...rest
}: DropdownMenuProps) {
  const grouped = items.length > 0 && isGroup(items[0]);
  return (
    <div
      ref={ref}
      {...rest}
      className={cx('dropdown', align === 'end' && 'dropdown-end', className)}
    >
      <button
        type="button"
        tabIndex={0}
        disabled={disabled}
        className={cx('btn', buttonClassName)}
      >
        {label}
      </button>
      <ul
        tabIndex={0}
        className={cx(
          'menu dropdown-content z-20 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow',
          menuClassName,
        )}
      >
        {grouped
          ? (items as DropdownMenuGroup[]).map((g, gi) => (
              <li key={gi}>
                {g.label && <span className="menu-title">{g.label}</span>}
                <ul>
                  <MenuItems items={g.items} />
                </ul>
              </li>
            ))
          : <MenuItems items={items as DropdownMenuItem[]} />}
      </ul>
    </div>
  );
}
