import type { ComponentPropsWithRef, KeyboardEvent } from 'react';
import StatusBadge from '../feedback/StatusBadge';
import type { ApplicationRow } from './ApplicationsTable';

export interface ApplicationCard extends ApplicationRow {
  /** Document thumbnail shown on the left of the card. */
  thumbnailSrc?: string;
}

export interface ApplicationCardListProps
  extends Omit<ComponentPropsWithRef<'ul'>, 'onSelect'> {
  items: ApplicationCard[];
  selectedId?: string;
  /** Click or Space on a card. */
  onSelect?: (item: ApplicationCard) => void;
  /** Double-click or Enter on a card. */
  onOpen?: (item: ApplicationCard) => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ApplicationCardList({
  items,
  selectedId,
  onSelect,
  onOpen,
  className,
  ref,
  ...rest
}: ApplicationCardListProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>, item: ApplicationCard) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onOpen?.(item);
    } else if (event.key === ' ') {
      event.preventDefault();
      onSelect?.(item);
    }
  }

  return (
    <ul ref={ref} {...rest} className={cx('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <li
            key={item.id}
            tabIndex={0}
            aria-selected={selected}
            className={cx(
              'flex cursor-pointer items-center gap-4 rounded-box border bg-base-100 px-4 py-3 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
              selected ? 'border-primary bg-primary/5' : 'border-base-300 hover:bg-base-200/50',
            )}
            onClick={() => onSelect?.(item)}
            onDoubleClick={() => onOpen?.(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-field bg-neutral">
              {item.thumbnailSrc ? (
                <img src={item.thumbnailSrc} alt="" className="h-full w-full object-cover" />
              ) : (
                <svg className="h-6 w-6 text-neutral-content/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 15l4-4 4 4 4-4 6 6" />
                </svg>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.applicant}</p>
              <p className="truncate text-sm text-base-content/60">{item.documentType}</p>
            </div>

            <div className="hidden flex-col items-end gap-1 sm:flex">
              <StatusBadge status={item.status} size="sm" />
              <span className="text-xs text-base-content/50">{item.pool}</span>
            </div>

            {item.lockedBy && (
              <span className="badge badge-outline badge-sm shrink-0">{item.lockedBy}</span>
            )}

            <svg
              className="h-4 w-4 shrink-0 text-base-content/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </li>
        );
      })}
      {items.length === 0 && (
        <li className="rounded-box border border-dashed border-base-300 py-8 text-center text-base-content/60">
          No applications in this queue.
        </li>
      )}
    </ul>
  );
}
