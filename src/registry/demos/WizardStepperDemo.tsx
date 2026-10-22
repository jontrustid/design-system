import { useState } from 'react';
import WizardStepper from '../../blocks/navigation/WizardStepper';

export default function WizardStepperDemo() {
  const [index, setIndex] = useState(1);
  return (
    <WizardStepper
      steps={[
        { id: 'scan', label: 'Scan document' },
        { id: 'fields', label: 'Extract fields' },
        { id: 'verify', label: 'Verify checks' },
        { id: 'notes', label: 'Operator notes', optional: true },
        { id: 'submit', label: 'Submit' },
      ]}
      currentIndex={index}
      onBack={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => i + 1)}
      onStepClick={setIndex}
    />
  );
}
