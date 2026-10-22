import { useState } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface SidePanelProps extends ComponentPropsWithRef<'aside'> {
  title?: string;
  /** Which edge the panel sits on; collapse toggle flips accordingly. */
  position?: 'left' | 'right';
  /** Controlled collapsed state. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Footer slot pinned to the bottom of the panel. */
  footer?: ReactNode;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function SidePanel({
  title,
  position = 'right',
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  footer,
  children,
  className,
  ref,
  ...rest
}: SidePanelProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;

  function toggle() {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  const arrow = position === 'right' ? (isCollapsed ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7') : (isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7');

  return (
    <aside
      ref={ref}
      {...rest}
      className={cx(
        'flex h-full flex-col border-base-300 bg-base-100 transition-all',
        position === 'right' ? 'border-l' : 'border-r',
        isCollapsed ? 'w-10' : 'w-72',
        className,
      )}
    >
      <div className={cx('flex items-center gap-2 border-b border-base-300 p-2', isCollapsed && 'justify-center')}>
        {!isCollapsed && title && <h3 className="flex-1 px-2 text-sm font-semibold">{title}</h3>}
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-square"
          onClick={toggle}
          aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={arrow} />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="flex-1 overflow-y-auto p-3">{children}</div>
          {footer && <div className="border-t border-base-300 p-3">{footer}</div>}
        </>
      )}
    </aside>
  );
}
