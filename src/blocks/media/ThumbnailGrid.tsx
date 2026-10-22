import type { ComponentPropsWithRef, KeyboardEvent } from 'react';

export interface Thumbnail {
  id: string;
  src: string;
  label?: string;
  badge?: string;
}

export interface ThumbnailGridProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'> {
  thumbnails: Thumbnail[];
  selectedId?: string;
  columns?: 2 | 3 | 4;
  onSelect?: (thumbnail: Thumbnail) => void;
  /** Double-click or Enter. */
  onOpen?: (thumbnail: Thumbnail) => void;
}

const COLUMN_CLASSES: Record<NonNullable<ThumbnailGridProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ThumbnailGrid({
  thumbnails,
  selectedId,
  columns = 3,
  onSelect,
  onOpen,
  className,
  ref,
  ...rest
}: ThumbnailGridProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>, thumbnail: Thumbnail) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onOpen?.(thumbnail);
    } else if (event.key === ' ') {
      event.preventDefault();
      onSelect?.(thumbnail);
    }
  }

  return (
    <div ref={ref} {...rest} className={cx('grid gap-3', COLUMN_CLASSES[columns], className)}>
      {thumbnails.map((thumb) => {
        const selected = thumb.id === selectedId;
        return (
          <figure
            key={thumb.id}
            tabIndex={0}
            aria-selected={selected}
            className={cx(
              'group cursor-pointer overflow-hidden rounded-box border-2 bg-base-100 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
              selected ? 'border-primary' : 'border-base-300 hover:border-base-content/30',
            )}
            onClick={() => onSelect?.(thumb)}
            onDoubleClick={() => onOpen?.(thumb)}
            onKeyDown={(e) => handleKeyDown(e, thumb)}
          >
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden bg-neutral">
              <img src={thumb.src} alt={thumb.label ?? thumb.id} className="h-full w-full object-cover" />
            </div>
            {(thumb.label || thumb.badge) && (
              <figcaption className="flex items-center justify-between gap-2 px-2 py-1.5">
                {thumb.label && <span className="truncate text-xs">{thumb.label}</span>}
                {thumb.badge && <span className="badge badge-xs">{thumb.badge}</span>}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
