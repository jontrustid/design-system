import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
}

export interface KeyValueListProps extends ComponentPropsWithRef<'dl'> {
  items: KeyValueItem[];
}

/** Label/value pairs in a definition list — metadata and detail panels. */
export default function KeyValueList({
  items,
  className,
  ref,
  ...rest
}: KeyValueListProps) {
  return (
    <dl
      ref={ref}
      {...rest}
      className={['space-y-1 text-sm', className].filter(Boolean).join(' ')}
    >
      {items.map((item, i) => (
        <div key={i} className="flex justify-between gap-3">
          <dt className="text-base-content/60">{item.label}</dt>
          <dd className="text-right font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
