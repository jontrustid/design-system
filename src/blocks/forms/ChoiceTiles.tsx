import type { ComponentPropsWithRef } from 'react';
import Button from './Button';

export interface ChoiceTileOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ChoiceTilesProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  options: ChoiceTileOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/** Single-select tile grid — like RadioGroup but rendered as outline/primary buttons. */
export default function ChoiceTiles({
  options,
  value,
  onChange,
  disabled = false,
  size = 'sm',
  className,
  ref,
  ...rest
}: ChoiceTilesProps) {
  return (
    <div
      ref={ref}
      {...rest}
      role="radiogroup"
      className={['flex flex-wrap gap-2', className].filter(Boolean).join(' ')}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          role="radio"
          aria-checked={opt.value === value}
          tone={opt.value === value ? 'primary' : undefined}
          variant={opt.value === value ? 'solid' : 'outline'}
          size={size}
          disabled={disabled || opt.disabled}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
