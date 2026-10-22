export type ApplicationStatus =
  | 'pending'
  | 'in-review'
  | 'verified'
  | 'rejected'
  | 'referred'
  | 'on-hold'
  | 'completed'
  | 'failed';

export interface StatusBadgeProps {
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

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { className, label } = STATUS_STYLES[status];
  const sizeClass = size === 'md' ? '' : `badge-${size}`;
  return <span className={`badge ${className} ${sizeClass}`.trim()}>{label}</span>;
}
