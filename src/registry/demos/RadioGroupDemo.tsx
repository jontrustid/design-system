import { useState } from 'react';
import RadioGroup from '../../blocks/forms/RadioGroup';

export default function RadioGroupDemo() {
  const [answer, setAnswer] = useState('yes');
  const [orientation, setOrientation] = useState('portrait');
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <RadioGroup
        label="Are these images the same?"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'Cannot tell' },
        ]}
        value={answer}
        onChange={setAnswer}
        orientation="horizontal"
      />
      <RadioGroup
        label="Document orientation"
        options={[
          { value: 'portrait', label: 'Portrait' },
          { value: 'landscape', label: 'Landscape' },
          { value: 'upside-down', label: 'Upside down', disabled: true },
        ]}
        value={orientation}
        onChange={setOrientation}
      />
    </div>
  );
}
