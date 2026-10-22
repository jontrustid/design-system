import type { ComponentPropsWithRef } from 'react';

export type ApplicationStatus =
  | 'pending'
  | 'in-review'
  | 'verified'
  | 'rejected'
  | 'referred'
  | 'on-hold'
  | 'completed'
  | 'failed';

export interface StatusBadgeProps extends ComponentPropsWithRef<'span'> {
  status: ApplicationStatus;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const STATUS_STYLES: Record<ApplicationStatus, { className: string; label: string }> = {
  pending: { className: 'badge-neutral', label: 'Pending' },
  'in-review': { className: 'badge-info', label: 'In review' },
  verified: { className: 'badge-success', label: 'Verified' },
  rejected: { className: 'badge-error', label: 'Rejected' },
  referred: { className: 'badge-secondary', label: 'Referred' },
  'on-hold': { className: 'badge-warning', label: 'On hold' },
  completed: { className: 'badge-primary', label: 'Completed' },
  failed: { className: 'badge-error badge-outline', label: 'Failed' },
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function StatusBadge({
  status,
  size = 'md',
  className,
  children,
  ref,
  ...rest
}: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      ref={ref}
      {...rest}
      className={cx('badge', style.className, size !== 'md' && `badge-${size}`, className)}
    >
      {children ?? style.label}
    </span>
  );
}
