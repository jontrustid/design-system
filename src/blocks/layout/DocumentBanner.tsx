import type { ComponentPropsWithRef } from 'react';
import StatusBadge from '../feedback/StatusBadge';
import type { ApplicationStatus } from '../feedback/StatusBadge';

export interface DocumentBannerMeta {
  label: string;
  value: string;
}

export interface DocumentBannerProps extends ComponentPropsWithRef<'div'> {
  /** e.g. "Passport (NGA) - Amara Okafor" */
  title: string;
  status: ApplicationStatus;
  /** Operator holding the lock; renders a lock line when set. */
  lockedBy?: string;
  /** Referral reason; renders a warning strip when set. */
  referralReason?: string;
  meta?: DocumentBannerMeta[];
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function DocumentBanner({
  title,
  status,
  lockedBy,
  referralReason,
  meta = [],
  className,
  ref,
  ...rest
}: DocumentBannerProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'rounded-box border border-base-300 bg-base-100',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <StatusBadge status={status} size="sm" />
        <dl className="ms-auto flex flex-wrap items-center gap-x-5 gap-y-1">
          {meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5 text-sm">
              <dt className="text-base-content/50">{m.label}</dt>
              <dd className="font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {(lockedBy || referralReason) && (
        <div className="flex flex-col gap-1 border-t border-base-300 px-4 py-2">
          {lockedBy && (
            <p className="flex items-center gap-2 text-sm text-base-content/70">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Locked by {lockedBy}
            </p>
          )}
          {referralReason && (
            <p className="text-sm text-warning">
              Referred: {referralReason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
