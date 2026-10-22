import { useState } from 'react';
import TextField from '../../blocks/forms/TextField';

export default function TextFieldDemo() {
  const [name, setName] = useState('');
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <TextField label="Surname" value={name} onChange={(e) => setName(e.target.value)} hint="As printed on the document" />
      <TextField label="Password" type="password" error="Minimum 12 characters" />
    </div>
  );
}
