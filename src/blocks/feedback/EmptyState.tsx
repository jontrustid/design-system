import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface EmptyStateProps extends ComponentPropsWithRef<'div'> {
  title: string;
  message?: string;
  /** Optional action slot (e.g. a button to clear filters or create an item). */
  action?: ReactNode;
  icon?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function EmptyState({
  title,
  message,
  action,
  icon,
  className,
  ref,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'flex flex-col items-center justify-center gap-3 rounded-box border-2 border-dashed border-base-300 p-10 text-center',
        className,
      )}
    >
      {icon ?? (
        <svg
          className="h-10 w-10 text-base-content/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 12h-6l-2 3h-4l-2-3H2m20 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6m20 0l-3.5-7h-13L2 12" />
        </svg>
      )}
      <p className="font-medium">{title}</p>
      {message && <p className="max-w-sm text-sm text-base-content/60">{message}</p>}
      {action}
    </div>
  );
}
