import type { ComponentPropsWithRef } from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import DateField from './DateField';
import CheckboxField from './CheckboxField';
import TextAreaField from './TextAreaField';

export type FlexibleFieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'date'
  | 'checkbox'
  | 'textarea';

export interface FlexibleFieldDef {
  key: string;
  label: string;
  type: FlexibleFieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  hint?: string;
  placeholder?: string;
}

export type FlexibleFieldValues = Record<string, string | boolean>;

export interface FlexibleFieldsProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  /** Per-organisation field schema. */
  fields: FlexibleFieldDef[];
  values: FlexibleFieldValues;
  onChange?: (key: string, value: string | boolean) => void;
  errors?: Record<string, string>;
  /** Read-only review mode: inputs get readOnly, selects/checkboxes get disabled. */
  readOnly?: boolean;
  /** Grid columns at sm breakpoint and up. */
  columns?: 1 | 2;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function FlexibleFields({
  fields,
  values,
  onChange,
  errors = {},
  readOnly = false,
  columns = 2,
  className,
  ref,
  ...rest
}: FlexibleFieldsProps) {
  function renderField(field: FlexibleFieldDef) {
    const value = values[field.key];
    const common = {
      label: field.label,
      hint: field.hint,
      error: errors[field.key],
      required: field.required,
    };

    switch (field.type) {
      case 'select':
        return (
          <SelectField
            {...common}
            options={field.options ?? []}
            placeholder={field.placeholder}
            value={typeof value === 'string' ? value : ''}
            disabled={readOnly}
            onChange={(e) => onChange?.(field.key, e.target.value)}
          />
        );
      case 'date':
        return (
          <DateField
            {...common}
            value={typeof value === 'string' ? value : ''}
            readOnly={readOnly}
            onChange={(e) => onChange?.(field.key, e.target.value)}
          />
        );
      case 'checkbox':
        return (
          <CheckboxField
            {...common}
            checked={value === true}
            disabled={readOnly}
            onChange={(e) => onChange?.(field.key, e.target.checked)}
          />
        );
      case 'textarea':
        return (
          <TextAreaField
            {...common}
            placeholder={field.placeholder}
            value={typeof value === 'string' ? value : ''}
            readOnly={readOnly}
            onChange={(e) => onChange?.(field.key, e.target.value)}
          />
        );
      default:
        return (
          <TextField
            {...common}
            type={field.type === 'number' ? 'number' : 'text'}
            placeholder={field.placeholder}
            value={typeof value === 'string' ? value : ''}
            readOnly={readOnly}
            onChange={(e) => onChange?.(field.key, e.target.value)}
          />
        );
    }
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'grid grid-cols-1 gap-2',
        columns === 2 && 'sm:grid-cols-2',
        className,
      )}
    >
      {fields.map((field) => (
        <div
          key={field.key}
          className={cx(
            (field.type === 'textarea' || field.type === 'checkbox') && 'sm:col-span-2',
          )}
        >
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}
