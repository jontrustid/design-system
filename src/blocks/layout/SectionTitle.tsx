import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface SectionTitleProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
  /** Optional action slot (e.g. a small button) right-aligned on the row. */
  actions?: ReactNode;
}

/** Small uppercase section heading used inside panels. */
export default function SectionTitle({
  children,
  actions,
  className,
  ref,
  ...rest
}: SectionTitleProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={['flex items-center justify-between', className].filter(Boolean).join(' ')}
    >
      <h3 className="text-xs font-semibold uppercase text-base-content/50">{children}</h3>
      {actions}
    </div>
  );
}
