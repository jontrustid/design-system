import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonTone =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Semantic colour; omit for the default (neutral-styled) button. */
  tone?: ButtonTone;
  variant?: ButtonVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Shows a spinner before the label and implies the action is in-flight. */
  loading?: boolean;
  icon?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Button({
  tone,
  variant = 'solid',
  size = 'md',
  loading = false,
  icon,
  className,
  children,
  disabled,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      {...rest}
      className={cx(
        'btn',
        tone && `btn-${tone}`,
        variant === 'outline' && 'btn-outline',
        variant === 'ghost' && 'btn-ghost',
        variant === 'soft' && 'btn-soft',
        variant === 'link' && 'btn-link',
        size !== 'md' && `btn-${size}`,
        className,
      )}
    >
      {loading && <span className="loading loading-spinner loading-xs" />}
      {icon}
      {children}
    </button>
  );
}
