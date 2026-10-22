import Modal from './Modal';
import type { ReactNode } from 'react';

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** danger renders the confirm action in error colour. */
  severity?: 'info' | 'warning' | 'danger';
  onConfirm?: () => void;
  onClose?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  severity = 'info',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      actions={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={cx(
              'btn',
              severity === 'danger' && 'btn-error',
              severity === 'warning' && 'btn-warning',
              severity === 'info' && 'btn-primary',
            )}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      {typeof message === 'string' ? (
        <p className="py-4 text-sm text-base-content/80">{message}</p>
      ) : (
        message
      )}
    </Modal>
  );
}
