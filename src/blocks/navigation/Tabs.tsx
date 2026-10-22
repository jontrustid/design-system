import type { ComponentPropsWithRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  disabled?: boolean;
}

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  tabs: TabItem[];
  activeId: string;
  onChange?: (id: string) => void;
  variant?: 'box' | 'border' | 'lift';
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({
  tabs,
  activeId,
  onChange,
  variant = 'border',
  className,
  ref,
  ...rest
}: TabsProps) {
  return (
    <div
      ref={ref}
      role="tablist"
      {...rest}
      className={cx('tabs', `tabs-${variant}`, className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeId}
          disabled={tab.disabled}
          className={cx('tab gap-1.5', tab.id === activeId && 'tab-active')}
          onClick={() => onChange?.(tab.id)}
        >
          {tab.label}
          {tab.badge && <span className="badge badge-sm">{tab.badge}</span>}
        </button>
      ))}
    </div>
  );
}
