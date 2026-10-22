import SearchFilterBar from '../../blocks/forms/SearchFilterBar';
import { ALL_STATUSES } from './fixtures';

export default function SearchFilterBarDemo() {
  return (
    <SearchFilterBar
      filters={[
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: ALL_STATUSES.map((s) => ({ value: s, label: s })),
        },
        {
          key: 'pool',
          label: 'Pool',
          type: 'select',
          options: [
            { value: 'kyc', label: 'KYC' },
            { value: 'fraud', label: 'Fraud' },
            { value: 'compliance', label: 'Compliance' },
          ],
        },
        { key: 'docType', label: 'Document type', type: 'text', placeholder: 'e.g. Passport' },
        { key: 'receivedFrom', label: 'Received from', type: 'date' },
      ]}
      onApply={(criteria) => console.log('apply', criteria)}
      onClear={() => console.log('clear')}
    />
  );
}
