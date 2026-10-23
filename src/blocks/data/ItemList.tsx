import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface ItemListItem {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Trailing right-aligned content (badges, timestamps). */
  meta?: ReactNode;
  /** Action slot rendered at the row's right edge (e.g. an Open button). */
  action?: ReactNode;
  disabled?: boolean;
}

export interface ItemListProps extends Omit<ComponentPropsWithRef<'ul'>, 'onSelect'> {
  items: ItemListItem[];
  /** Makes whole rows clickable. */
  onSelect?: (item: ItemListItem) => void;
  selectedId?: string;
  emptyTitle?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Divided rows of titled items — document lists, queued applications, report rows. */
export default function ItemList({
  items,
  onSelect,
  selectedId,
  emptyTitle,
  className,
  ref,
  ...rest
}: ItemListProps) {
  if (items.length === 0 && emptyTitle) {
    return <p className="py-8 text-center text-sm text-base-content/50">{emptyTitle}</p>;
  }

  return (
    <ul
      ref={ref}
      {...rest}
      className={cx('divide-y divide-base-300', className)}
    >
      {items.map((item) => {
        const body = (
          <>
            <div className="min-w-0">
              <div className="text-sm font-medium">{item.title}</div>
              {item.subtitle && (
                <div className="text-xs text-base-content/60">{item.subtitle}</div>
              )}
            </div>
            {item.meta && <div className="flex items-center gap-2">{item.meta}</div>}
            {item.action}
          </>
        );
        const selected = item.id === selectedId;
        return (
          <li key={item.id}>
            {onSelect ? (
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => onSelect(item)}
                className={cx(
                  'flex w-full items-center justify-between gap-3 px-2 py-2 text-left transition-colors',
                  selected ? 'bg-primary/10' : 'hover:bg-base-200/60',
                  item.disabled && 'opacity-50',
                )}
              >
                {body}
              </button>
            ) : (
              <div className="flex items-center justify-between gap-3 py-2">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
