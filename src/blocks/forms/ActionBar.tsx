import type { ComponentPropsWithRef, ReactNode } from 'react';
import Button from './Button';
import type { ButtonTone, ButtonVariant } from './Button';

export interface ActionItem {
  key: string;
  label: ReactNode;
  tone?: ButtonTone;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  onClick?: () => void;
  /** Renders the label in the error colour (destructive-but-ghost actions). */
  danger?: boolean;
}

export interface ActionBarProps extends ComponentPropsWithRef<'div'> {
  actions: ActionItem[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'end' | 'between';
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** A row of related action buttons — decisions, footer buttons, toolbars. */
export default function ActionBar({
  actions,
  size = 'sm',
  justify = 'start',
  className,
  ref,
  ...rest
}: ActionBarProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'flex flex-wrap items-center gap-2',
        justify === 'end' && 'justify-end',
        justify === 'between' && 'justify-between',
        className,
      )}
    >
      {actions.map((a) => (
        <Button
          key={a.key}
          tone={a.tone}
          variant={a.variant}
          size={size}
          disabled={a.disabled}
          loading={a.loading}
          title={a.title}
          onClick={a.onClick}
          className={a.danger ? 'text-error' : undefined}
        >
          {a.label}
        </Button>
      ))}
    </div>
  );
}
