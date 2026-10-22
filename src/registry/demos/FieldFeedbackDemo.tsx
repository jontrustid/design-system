import FieldFeedback from '../../blocks/feedback/FieldFeedback';

export default function FieldFeedbackDemo() {
  return (
    <FieldFeedback
      defaultExpandedId="mrz"
      items={[
        {
          id: 'mrz',
          label: 'MRZ checksum',
          severity: 'fail',
          message: 'Composite check digit does not match.',
          details: 'Expected 4 at position 44, found 7. Re-capture or verify the document number manually.',
        },
        {
          id: 'expiry',
          label: 'Expiry date',
          severity: 'warning',
          message: 'Document expires within 90 days.',
        },
        {
          id: 'photo',
          label: 'Photo quality',
          severity: 'info',
          message: 'Slight glare detected on the portrait region.',
        },
        {
          id: 'uv',
          label: 'UV pattern',
          severity: 'pass',
          message: 'UV security features match the document template.',
        },
      ]}
    />
  );
}
