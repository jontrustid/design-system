import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface ModalProps extends Omit<ComponentPropsWithRef<'dialog'>, 'open'> {
  open: boolean;
  title?: string;
  /** Footer slot - put your buttons here. */
  actions?: ReactNode;
  onClose?: () => void;
  /** Extra classes on the modal box (className styles the dialog backdrop layer). */
  boxClassName?: string;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Modal({
  open,
  title,
  actions,
  onClose,
  boxClassName,
  className,
  children,
  ref,
  ...rest
}: ModalProps) {
  if (!open) return null;

  return (
    <dialog
      ref={ref}
      {...rest}
      className={cx('modal modal-open', className)}
      onCancel={(e) => {
        e.preventDefault();
        onClose?.();
      }}
    >
      <div className={cx('modal-box', boxClassName)}>
        {title && <h3 className="text-lg font-bold">{title}</h3>}
        {children}
        {actions && <div className="modal-action">{actions}</div>}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
