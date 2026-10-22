import { useState } from 'react';
import FlexibleFields from '../../blocks/forms/FlexibleFields';
import type { FlexibleFieldValues } from '../../blocks/forms/FlexibleFields';

export default function FlexibleFieldsDemo() {
  const [values, setValues] = useState<FlexibleFieldValues>({ vat: 'GB' });
  return (
    <div className="w-full max-w-2xl">
      <FlexibleFields
        fields={[
          { key: 'reference', label: 'Customer reference', type: 'text', required: true },
          { key: 'vat', label: 'VAT region', type: 'select', options: [
            { value: 'GB', label: 'United Kingdom' },
            { value: 'IE', label: 'Ireland' },
            { value: 'EU', label: 'Other EU' },
          ] },
          { key: 'startDate', label: 'Check valid from', type: 'date' },
          { key: 'maxValue', label: 'Max transaction value', type: 'number' },
          { key: 'pep', label: 'Politically exposed person', type: 'checkbox' },
          { key: 'notes', label: 'Additional notes', type: 'textarea', placeholder: 'Org-specific requirements...' },
        ]}
        values={values}
        onChange={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        errors={{ reference: values.reference ? '' : 'Required by this organisation' }}
      />
    </div>
  );
}
