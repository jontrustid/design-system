import type { ComponentPropsWithRef } from 'react';
import TextField from './TextField';
import DropdownMenu from '../overlay/DropdownMenu';

export interface PresetGroup {
  category: string;
  items: string[];
}

export interface PresetTextFieldProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  label: string;
  value: string;
  onValueChange?: (value: string) => void;
  /** Categorised canned text inserted on pick. */
  presets?: PresetGroup[];
  presetsLabel?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

/** Text input with an attached dropdown of canned/preset phrases. */
export default function PresetTextField({
  label,
  value,
  onValueChange,
  presets = [],
  presetsLabel = 'Insert preset',
  placeholder,
  readOnly,
  disabled,
  className,
  ref,
  ...rest
}: PresetTextFieldProps) {
  return (
    <div
      ref={ref}
      {...rest}
      className={['flex items-end gap-2', className].filter(Boolean).join(' ')}
    >
      <TextField
        label={label}
        className="w-full"
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        onChange={(e) => onValueChange?.(e.target.value)}
      />
      {presets.length > 0 && (
        <DropdownMenu
          label={presetsLabel}
          disabled={disabled || readOnly}
          buttonClassName="btn-outline btn-sm"
          menuClassName="max-h-80 w-96 flex-nowrap overflow-auto"
          items={presets.map((g) => ({
            label: g.category,
            items: g.items.map((c) => ({ label: c, onClick: () => onValueChange?.(c) })),
          }))}
        />
      )}
    </div>
  );
}
