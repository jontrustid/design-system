import type { ComponentPropsWithRef } from 'react';

export type AuditSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AuditEvent {
  id: string;
  title: string;
  /** Display timestamp, e.g. "22 Oct 2026 08:14". */
  at: string;
  actor?: string;
  details?: string;
  severity?: AuditSeverity;
}

export interface AuditTimelineProps extends ComponentPropsWithRef<'ul'> {
  events: AuditEvent[];
  /** Show oldest first instead of newest first. */
  oldestFirst?: boolean;
}

const DOT_STYLES: Record<AuditSeverity, string> = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function AuditTimeline({
  events,
  oldestFirst = false,
  className,
  ref,
  ...rest
}: AuditTimelineProps) {
  const ordered = oldestFirst ? events : [...events].reverse();

  return (
    <ul ref={ref} {...rest} className={cx('timeline timeline-vertical', className)}>
      {ordered.map((event, index) => (
        <li key={event.id}>
          {index > 0 && <hr />}
          <div className="timeline-start whitespace-nowrap text-sm text-base-content/60">
            {event.at}
          </div>
          <div className="timeline-middle">
            <span
              className={cx(
                'inline-block h-3 w-3 rounded-full',
                DOT_STYLES[event.severity ?? 'info'],
              )}
            />
          </div>
          <div className="timeline-end timeline-box mb-4 w-full">
            <p className="font-medium">{event.title}</p>
            {event.actor && (
              <p className="text-xs text-base-content/60">{event.actor}</p>
            )}
            {event.details && (
              <p className="mt-1 text-sm text-base-content/70">{event.details}</p>
            )}
          </div>
          {index < ordered.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
}
