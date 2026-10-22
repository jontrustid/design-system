import { useState } from 'react';
import CheckboxField from '../../blocks/forms/CheckboxField';

export default function CheckboxFieldDemo() {
  const [confirm, setConfirm] = useState(false);
  const [flag, setFlag] = useState(true);
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <CheckboxField
        label="I confirm the document appears genuine"
        checked={confirm}
        onChange={(e) => setConfirm(e.target.checked)}
        hint="Required before submitting"
      />
      <CheckboxField
        label="Flag for supervisor review"
        checked={flag}
        onChange={(e) => setFlag(e.target.checked)}
      />
    </div>
  );
}
