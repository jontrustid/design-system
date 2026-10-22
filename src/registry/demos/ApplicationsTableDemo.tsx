import { useState } from 'react';
import ApplicationsTable from '../../blocks/data/ApplicationsTable';
import { SAMPLE_ROWS } from './fixtures';

export default function ApplicationsTableDemo() {
  const [selectedId, setSelectedId] = useState<string>();
  return (
    <ApplicationsTable
      rows={SAMPLE_ROWS}
      selectedId={selectedId}
      onSelect={(row) => setSelectedId(row.id)}
      onOpen={(row) => console.log('open', row.id)}
    />
  );
}
