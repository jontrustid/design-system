import type { ComponentPropsWithRef } from 'react';

export interface ProgressIndicatorProps
  extends Omit<ComponentPropsWithRef<'progress'>, 'value' | 'max'> {
  /** 0-100. Ignored when indeterminate. */
  value?: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  /** Unknown duration - animates without a value. */
  indeterminate?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ProgressIndicator({
  value = 0,
  max = 100,
  label,
  showPercent = false,
  indeterminate = false,
  color = 'primary',
  className,
  ref,
  ...rest
}: ProgressIndicatorProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="flex w-full flex-col gap-1.5">
      {(label || showPercent) && (
        <div className="flex items-baseline justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercent && !indeterminate && (
            <span className="tabular-nums text-base-content/60">{percent}%</span>
          )}
        </div>
      )}
      <progress
        ref={ref}
        aria-label={label}
        {...rest}
        className={cx('progress w-full', `progress-${color}`, className)}
        value={indeterminate ? undefined : value}
        max={max}
      />
    </div>
  );
}
