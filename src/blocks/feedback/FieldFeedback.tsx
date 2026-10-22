import type { ComponentPropsWithRef } from 'react';

export type FeedbackSeverity = 'pass' | 'info' | 'warning' | 'fail';

export interface FieldFeedbackItem {
  id: string;
  label: string;
  severity: FeedbackSeverity;
  message: string;
  /** Extra detail shown when the item is expanded. */
  details?: string;
}

export interface FieldFeedbackProps extends ComponentPropsWithRef<'div'> {
  items: FieldFeedbackItem[];
  /** id of the item to render expanded on first paint. */
  defaultExpandedId?: string;
}

const SEVERITY_STYLES: Record<FeedbackSeverity, { badge: string; label: string; icon: string }> = {
  pass: { badge: 'badge-success', label: 'Pass', icon: 'M5 13l4 4L19 7' },
  info: { badge: 'badge-info', label: 'Info', icon: 'M13 16h-1v-4h-1m1-4h.01' },
  warning: {
    badge: 'badge-warning',
    label: 'Warning',
    icon: 'M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  },
  fail: { badge: 'badge-error', label: 'Fail', icon: 'M6 18L18 6M6 6l12 12' },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function FieldFeedback({
  items,
  defaultExpandedId,
  className,
  ref,
  ...rest
}: FieldFeedbackProps) {
  return (
    <div ref={ref} {...rest} className={cx('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const style = SEVERITY_STYLES[item.severity];
        return (
          <div
            key={item.id}
            className="collapse collapse-arrow border border-base-300 bg-base-100"
          >
            <input type="checkbox" defaultChecked={item.id === defaultExpandedId} />
            <div className="collapse-title flex items-center gap-3 py-3 pe-10">
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
              <span className="flex-1 font-medium">{item.label}</span>
              <span className={cx('badge badge-sm', style.badge)}>{style.label}</span>
            </div>
            <div className="collapse-content text-sm">
              <p>{item.message}</p>
              {item.details && <p className="mt-2 text-base-content/70">{item.details}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
