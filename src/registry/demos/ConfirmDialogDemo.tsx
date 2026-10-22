import { useState } from 'react';
import ConfirmDialog from '../../blocks/overlay/ConfirmDialog';

export default function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-error btn-outline" onClick={() => setOpen(true)}>
        Reject application
      </button>
      <ConfirmDialog
        open={open}
        severity="danger"
        title="Reject application?"
        message="This will mark VS-1042 as rejected and release the lock. The applicant is not notified automatically."
        confirmLabel="Reject"
        onConfirm={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
