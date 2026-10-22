import type { ComponentPropsWithRef } from 'react';
import StatusBadge from '../feedback/StatusBadge';
import FieldFeedback from '../feedback/FieldFeedback';
import type { ApplicationStatus } from '../feedback/StatusBadge';
import type { FieldFeedbackItem } from '../feedback/FieldFeedback';

export interface ResultGroup {
  label: string;
  items: FieldFeedbackItem[];
}

export interface ResultsSummaryProps extends ComponentPropsWithRef<'div'> {
  /** Overall application outcome. */
  verdict: ApplicationStatus;
  /** Heading next to the verdict badge, e.g. "Verification complete". */
  title?: string;
  summary?: string;
  /** Check results grouped by area (authenticity, biometric, data...). */
  groups: ResultGroup[];
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ResultsSummary({
  verdict,
  title = 'Verification outcome',
  summary,
  groups,
  className,
  ref,
  ...rest
}: ResultsSummaryProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx('card w-full bg-base-100 shadow-md', className)}
    >
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="card-title">{title}</h2>
          <StatusBadge status={verdict} />
        </div>

        {summary && <p className="text-sm text-base-content/70">{summary}</p>}

        <div className="flex flex-col gap-4">
          {groups.map((group) => {
            const failures = group.items.filter((i) => i.severity === 'fail').length;
            const warnings = group.items.filter((i) => i.severity === 'warning').length;
            return (
              <section key={group.label}>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
                    {group.label}
                  </h3>
                  {failures > 0 && <span className="badge badge-error badge-sm">{failures} failed</span>}
                  {failures === 0 && warnings > 0 && (
                    <span className="badge badge-warning badge-sm">{warnings} warnings</span>
                  )}
                </div>
                <FieldFeedback items={group.items} />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
