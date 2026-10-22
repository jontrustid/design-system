import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface CheckboxFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  hint?: string;
  error?: string;
  /** Extra classes applied to the input itself (className styles the wrapper). */
  inputClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function CheckboxField({
  label,
  hint,
  error,
  className,
  inputClassName,
  id,
  ref,
  ...rest
}: CheckboxFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-msg`;

  return (
    <fieldset className={cx('fieldset', className)}>
      <label className="label cursor-pointer justify-start gap-2" htmlFor={inputId}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
          className={cx('checkbox', error && 'checkbox-error', inputClassName)}
        />
        <span className="label-text">{label}</span>
      </label>
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
