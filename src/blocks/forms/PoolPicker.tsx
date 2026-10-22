import { useState } from 'react';
import type { ComponentPropsWithRef } from 'react';
import Modal from '../overlay/Modal';

export interface Pool {
  id: string;
  label: string;
  description?: string;
  /** Number of applications currently in the pool. */
  count?: number;
  disabled?: boolean;
}

export interface PoolPickerProps
  extends Omit<ComponentPropsWithRef<'dialog'>, 'open' | 'onSelect'> {
  open: boolean;
  pools: Pool[];
  /** Pre-selected pool. */
  selectedId?: string;
  title?: string;
  /** Fired when a pool is confirmed (dialog closes). */
  onOpenPool?: (pool: Pool) => void;
  onClose?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function PoolPicker({
  open,
  pools,
  selectedId,
  title = 'Open work pool',
  onOpenPool,
  onClose,
  ...rest
}: PoolPickerProps) {
  const [pickedId, setPickedId] = useState<string | undefined>(selectedId);
  const picked = pools.find((p) => p.id === pickedId);

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      actions={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!picked}
            onClick={() => picked && onOpenPool?.(picked)}
          >
            Open pool
          </button>
        </>
      }
      {...rest}
    >
      <ul className="mt-2 flex flex-col gap-1">
        {pools.map((pool) => (
          <li key={pool.id}>
            <label
              className={cx(
                'flex cursor-pointer items-center gap-3 rounded-box border px-3 py-2 transition-colors',
                pool.id === pickedId
                  ? 'border-primary bg-primary/5'
                  : 'border-base-300 hover:bg-base-200/50',
                pool.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <input
                type="radio"
                name="pool-picker"
                className="radio radio-sm"
                checked={pool.id === pickedId}
                disabled={pool.disabled}
                onChange={() => setPickedId(pool.id)}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{pool.label}</span>
                {pool.description && (
                  <span className="block truncate text-xs text-base-content/60">
                    {pool.description}
                  </span>
                )}
              </span>
              {pool.count !== undefined && (
                <span className="badge badge-sm">{pool.count}</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
