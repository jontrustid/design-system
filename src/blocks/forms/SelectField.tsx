import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface SelectFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends ComponentPropsWithRef<'select'> {
  label: string;
  hint?: string;
  error?: string;
  options: SelectFieldOption[];
  /** Rendered as the empty-value first option (e.g. "All", "Select..."). */
  placeholder?: string;
  /** Extra classes applied to the select itself (className styles the wrapper). */
  selectClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectField({
  label,
  hint,
  error,
  options,
  placeholder,
  className,
  selectClassName,
  id,
  ref,
  ...rest
}: SelectFieldProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${selectId}-msg`;

  return (
    <fieldset className={cx('fieldset', className)}>
      <legend className="fieldset-legend">{label}</legend>
      <select
        id={selectId}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
        className={cx('select w-full', error && 'select-error', selectClassName)}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
