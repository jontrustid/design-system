import type { ComponentPropsWithRef, ReactNode } from 'react';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends ComponentPropsWithRef<'div'> {
  severity?: AlertSeverity;
  title?: string;
  /** Renders a dismiss button when provided. */
  onDismiss?: () => void;
  children?: ReactNode;
}

const SEVERITY_STYLES: Record<AlertSeverity, { alert: string; icon: string }> = {
  info: { alert: 'alert-info', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  success: { alert: 'alert-success', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  warning: {
    alert: 'alert-warning',
    icon: 'M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  },
  error: { alert: 'alert-error', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Alert({
  severity = 'info',
  title,
  onDismiss,
  className,
  children,
  ref,
  ...rest
}: AlertProps) {
  const style = SEVERITY_STYLES[severity];
  return (
    <div ref={ref} role="alert" {...rest} className={cx('alert', style.alert, className)}>
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={style.icon} />
      </svg>
      <div className="flex-1">
        {title && <h3 className="font-bold">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-square"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
