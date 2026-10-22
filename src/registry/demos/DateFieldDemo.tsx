import { useState } from 'react';
import DateField from '../../blocks/forms/DateField';

export default function DateFieldDemo() {
  const [dob, setDob] = useState('1991-04-17');
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <DateField label="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} />
      <DateField label="Expiry date" error="Document has expired" />
    </div>
  );
}
