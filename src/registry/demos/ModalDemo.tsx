import { useState } from 'react';
import Modal from '../../blocks/overlay/Modal';

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal
        open={open}
        title="Application notes"
        onClose={() => setOpen(false)}
        actions={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
              Save
            </button>
          </>
        }
      >
        <textarea className="textarea mt-4 w-full" rows={4} placeholder="Add a note..." />
      </Modal>
    </div>
  );
}
