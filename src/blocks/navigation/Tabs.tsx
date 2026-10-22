import type { ComponentPropsWithRef, KeyboardEvent as ReactKeyboardEvent } from 'react';

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
  const enabled = tabs.filter((t) => !t.disabled);
  // Roving tabindex: only one tab is in the tab order at a time.
  const focusableId = enabled.some((t) => t.id === activeId)
    ? activeId
    : enabled[0]?.id;

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const index = enabled.findIndex(
      (t) => t.id === (document.activeElement as HTMLElement)?.dataset.tabId,
    );
    if (index === -1) return;
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % enabled.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = enabled.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    event.currentTarget
      .querySelector<HTMLElement>(`[data-tab-id="${enabled[next].id}"]`)
      ?.focus();
    onChange?.(enabled[next].id);
  }

  return (
    <div
      ref={ref}
      role="tablist"
      {...rest}
      className={cx('tabs', `tabs-${variant}`, className)}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          data-tab-id={tab.id}
          aria-selected={tab.id === activeId}
          tabIndex={tab.id === focusableId ? 0 : -1}
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
