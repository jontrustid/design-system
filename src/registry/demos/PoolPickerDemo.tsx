import { useState } from 'react';
import PoolPicker from '../../blocks/forms/PoolPicker';

export default function PoolPickerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-outline" onClick={() => setOpen(true)}>
        Open work pool...
      </button>
      <PoolPicker
        open={open}
        pools={[
          { id: 'kyc', label: 'KYC', description: 'Standard identity checks', count: 14 },
          { id: 'fraud', label: 'Fraud', description: 'Referred for fraud review', count: 3 },
          { id: 'compliance', label: 'Compliance', description: 'Regulatory spot checks', count: 7 },
          { id: 'archived', label: 'Archived', description: 'Read-only historical pool', disabled: true },
        ]}
        onOpenPool={(pool) => {
          console.log('open pool', pool.id);
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
