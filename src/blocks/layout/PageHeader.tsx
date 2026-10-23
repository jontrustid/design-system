import type { ComponentPropsWithRef, ReactNode } from 'react';
import Button from '../forms/Button';

export interface PageHeaderProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title: ReactNode;
  /** Renders a ghost back button (host wires navigation). */
  onBack?: () => void;
  backLabel?: string;
  /** Status chips / badges rendered next to the title. */
  children?: ReactNode;
  /** Muted trailing context, e.g. "id · pool". */
  meta?: ReactNode;
  /** Right-aligned action slot (buttons, menus). */
  actions?: ReactNode;
}

export default function PageHeader({
  title,
  onBack,
  backLabel = 'Back',
  children,
  meta,
  actions,
  className,
  ref,
  ...rest
}: PageHeaderProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={['flex flex-wrap items-center gap-3', className].filter(Boolean).join(' ')}
    >
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          &larr; {backLabel}
        </Button>
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
      {meta && <span className="text-sm text-base-content/60">{meta}</span>}
      {actions && <div className="ms-auto flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
