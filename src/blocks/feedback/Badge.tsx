import type { ComponentPropsWithRef } from 'react';

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  /** Semantic colour; omit for the default badge. */
  tone?: BadgeTone;
  soft?: boolean;
  outline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Generic labelled chip — use StatusBadge for the application-status enum. */
export default function Badge({
  tone,
  soft = false,
  outline = false,
  size = 'md',
  className,
  children,
  ref,
  ...rest
}: BadgeProps) {
  return (
    <span
      ref={ref}
      {...rest}
      className={cx(
        'badge',
        tone && `badge-${tone}`,
        soft && 'badge-soft',
        outline && 'badge-outline',
        size !== 'md' && `badge-${size}`,
        className,
      )}
    >
      {children}
    </span>
  );
}
