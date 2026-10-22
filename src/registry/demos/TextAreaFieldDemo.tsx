import { useState } from 'react';
import TextAreaField from '../../blocks/forms/TextAreaField';

export default function TextAreaFieldDemo() {
  const [notes, setNotes] = useState('');
  return (
    <div className="w-full max-w-md">
      <TextAreaField
        label="Operator notes"
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anything unusual about this application..."
        hint="Attached to the audit log"
      />
    </div>
  );
}
