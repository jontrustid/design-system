import type { ComponentPropsWithRef } from 'react';

export interface LoadingSpinnerProps extends ComponentPropsWithRef<'div'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Optional caption under the spinner. */
  text?: string;
  /** Fill the parent (position-relative) with a dimmed overlay spinner. */
  overlay?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function LoadingSpinner({
  size = 'lg',
  text,
  overlay = false,
  className,
  ref,
  ...rest
}: LoadingSpinnerProps) {
  return (
    <div
      ref={ref}
      role="status"
      {...rest}
      className={cx(
        'flex flex-col items-center justify-center gap-3',
        overlay && 'absolute inset-0 z-10 bg-base-100/70',
        !overlay && 'p-6',
        className,
      )}
    >
      <span
        className={cx('loading loading-spinner text-primary', size !== 'md' && `loading-${size}`)}
      />
      {text && <span className="text-sm text-base-content/70">{text}</span>}
      <span className="sr-only">{text ?? 'Loading'}</span>
    </div>
  );
}
