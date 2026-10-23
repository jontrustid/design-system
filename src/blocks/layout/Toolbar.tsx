import type { ComponentPropsWithRef } from 'react';

export interface ToolbarProps extends ComponentPropsWithRef<'div'> {
  /** Vertical alignment of items in the row. */
  align?: 'start' | 'center' | 'end';
}

/** Flex-wrap row for filters and action groups above content. */
export default function Toolbar({
  align = 'end',
  className,
  children,
  ref,
  ...rest
}: ToolbarProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={[
        'flex flex-wrap gap-3',
        align === 'center' && 'items-center',
        align === 'end' && 'items-end',
        align === 'start' && 'items-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
