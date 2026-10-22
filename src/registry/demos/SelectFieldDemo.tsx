import { useState } from 'react';
import SelectField from '../../blocks/forms/SelectField';

export default function SelectFieldDemo() {
  const [pool, setPool] = useState('');
  return (
    <div className="w-full max-w-md">
      <SelectField
        label="Work pool"
        placeholder="Select a pool"
        options={[
          { value: 'kyc', label: 'KYC' },
          { value: 'fraud', label: 'Fraud' },
          { value: 'compliance', label: 'Compliance' },
          { value: 'archived', label: 'Archived', disabled: true },
        ]}
        value={pool}
        onChange={(e) => setPool(e.target.value)}
        hint="Where the application will be queued"
      />
    </div>
  );
}
