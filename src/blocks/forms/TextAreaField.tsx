import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface TextAreaFieldProps extends ComponentPropsWithRef<'textarea'> {
  label: string;
  hint?: string;
  error?: string;
  /** Extra classes applied to the textarea itself (className styles the wrapper). */
  textareaClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function TextAreaField({
  label,
  hint,
  error,
  className,
  textareaClassName,
  id,
  ref,
  ...rest
}: TextAreaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-msg`;

  return (
    <fieldset className={cx('fieldset', className)}>
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        id={inputId}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
        className={cx('textarea w-full', error && 'textarea-error', textareaClassName)}
      />
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
