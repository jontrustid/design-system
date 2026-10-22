import DocumentFieldsForm from '../../blocks/forms/DocumentFieldsForm';

export default function DocumentFieldsFormDemo() {
  return (
    <DocumentFieldsForm
      fields={[
        { key: 'surname', label: 'Surname', value: 'OKAFOR', confidence: 0.99 },
        { key: 'givenNames', label: 'Given names', value: 'Amara Ngozi', confidence: 0.97 },
        { key: 'docNumber', label: 'Document number', value: 'A08I43592', confidence: 0.61 },
        { key: 'dob', label: 'Date of birth', value: '1991-04-17', confidence: 0.94, type: 'date' },
        { key: 'expiry', label: 'Expiry date', value: '2031-08-02', confidence: 0.58, type: 'date' },
        { key: 'nationality', label: 'Nationality', value: 'NGA', confidence: 0.99 },
      ]}
      onConfirm={(fields) => console.log('confirm', fields)}
      onReset={() => console.log('reset')}
    />
  );
}
