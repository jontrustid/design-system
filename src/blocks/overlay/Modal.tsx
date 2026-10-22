import { useEffect, useId, useRef } from 'react';
import type {
  ComponentPropsWithRef,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from 'react';

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

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const boxRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    restoreFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const box = boxRef.current;
    const target = box?.querySelector<HTMLElement>(FOCUSABLE);
    (target ?? box)?.focus();
    return () => restoreFocus.current?.focus();
  }, [open]);

  function trapTab(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const box = boxRef.current;
    if (!box) return;
    const items = Array.from(box.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) {
      event.preventDefault();
      box.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      {...rest}
      className={cx('modal modal-open', className)}
      onKeyDown={trapTab}
      onCancel={(e) => {
        e.preventDefault();
        onClose?.();
      }}
    >
      <div ref={boxRef} tabIndex={-1} className={cx('modal-box', boxClassName)}>
        {title && (
          <h3 id={titleId} className="text-lg font-bold">
            {title}
          </h3>
        )}
        {children}
        {actions && <div className="modal-action">{actions}</div>}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
