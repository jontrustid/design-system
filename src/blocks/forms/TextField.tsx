import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface TextFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  hint?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /** Extra classes applied to the input itself (className styles the wrapper). */
  inputClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function TextField({
  label,
  hint,
  error,
  type = 'text',
  className,
  inputClassName,
  id,
  ref,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-msg`;

  return (
    <fieldset className={cx('fieldset', className)}>
      <legend className="fieldset-legend">{label}</legend>
      <input
        id={inputId}
        ref={ref}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
        className={cx('input w-full', error && 'input-error', inputClassName)}
      />
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
