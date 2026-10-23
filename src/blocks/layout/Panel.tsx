import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface PanelProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title?: ReactNode;
  /** Slot at the right of the title row (buttons, links, badges). */
  actions?: ReactNode;
  /** Muted helper text under the title. */
  hint?: ReactNode;
  /** Remove the border (default is a bordered card). */
  unstyled?: boolean;
  /** Extra classes on the inner body container. */
  bodyClassName?: string;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Bordered card with an optional title row — the app's standard content container. */
export default function Panel({
  title,
  actions,
  hint,
  unstyled = false,
  bodyClassName,
  className,
  children,
  ref,
  ...rest
}: PanelProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'card bg-base-100',
        !unstyled && 'border border-base-300',
        className,
      )}
    >
      <div className={cx('card-body gap-3', bodyClassName)}>
        {(title || actions) && (
          <div className="flex items-center justify-between gap-3">
            {title && <h2 className="card-title text-base">{title}</h2>}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        {hint && <p className="text-xs text-base-content/60">{hint}</p>}
        {children}
      </div>
    </div>
  );
}
