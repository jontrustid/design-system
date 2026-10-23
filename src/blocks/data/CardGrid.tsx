import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface CardGridItem {
  id: string;
  /** Optional image shown at the top of the card. */
  src?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  disabled?: boolean;
}

export interface CardGridProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onSelect'> {
  items: CardGridItem[];
  onSelect?: (item: CardGridItem) => void;
  selectedId?: string;
  columns?: 2 | 3 | 4;
  /** Placeholder shown when an item has no image. */
  emptyIcon?: ReactNode;
}

const COLUMN_CLASSES: Record<NonNullable<CardGridProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Selectable card tiles with an optional image header — pickers and reference catalogues. */
export default function CardGrid({
  items,
  onSelect,
  selectedId,
  columns = 4,
  emptyIcon,
  className,
  ref,
  ...rest
}: CardGridProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx('grid gap-4', COLUMN_CLASSES[columns], className)}
    >
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => onSelect?.(item)}
            className={cx(
              'card border bg-base-100 text-left transition-colors',
              selected ? 'border-primary' : 'border-base-300 hover:border-primary/50',
              item.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {(item.src !== undefined || emptyIcon !== undefined) && (
              <div className="flex h-32 items-center justify-center overflow-hidden rounded-t-box bg-neutral/5">
                {item.src ? (
                  <img src={item.src} alt="" className="max-h-full object-contain" />
                ) : (
                  emptyIcon ?? <span className="text-3xl text-base-content/20">&#128196;</span>
                )}
              </div>
            )}
            <div className="card-body p-3">
              <div className="text-sm font-medium">{item.title}</div>
              {item.subtitle && (
                <div className="text-xs text-base-content/50">{item.subtitle}</div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
