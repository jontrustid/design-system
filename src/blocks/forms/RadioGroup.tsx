import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<ComponentPropsWithRef<'fieldset'>, 'onChange'> {
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Shared radio name; auto-generated when omitted. */
  name?: string;
  orientation?: 'horizontal' | 'vertical';
  hint?: string;
  error?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  name,
  orientation = 'vertical',
  hint,
  error,
  className,
  ref,
  ...rest
}: RadioGroupProps) {
  const autoName = useId();
  const radioName = name ?? autoName;
  const message = error ?? hint;

  return (
    <fieldset ref={ref} {...rest} className={cx('fieldset', className)}>
      <legend className="fieldset-legend">{label}</legend>
      <div
        role="radiogroup"
        className={cx('flex gap-4', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cx('label cursor-pointer gap-2', opt.disabled && 'opacity-50')}
          >
            <input
              type="radio"
              name={radioName}
              className="radio"
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
            />
            <span className="label-text">{opt.label}</span>
          </label>
        ))}
      </div>
      {message && (
        <p className={cx('fieldset-label', error && 'text-error')}>{message}</p>
      )}
    </fieldset>
  );
}
