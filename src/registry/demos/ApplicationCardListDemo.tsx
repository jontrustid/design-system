import { useState } from 'react';
import ApplicationCardList from '../../blocks/data/ApplicationCardList';
import { SAMPLE_ROWS, docImage } from './fixtures';

export default function ApplicationCardListDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <ApplicationCardList
      items={SAMPLE_ROWS.slice(0, 5).map((row, i) => ({
        ...row,
        thumbnailSrc: i % 2 === 0 ? docImage(row.id, '#e8edf2', '#4a5a68', '#14679e') : undefined,
      }))}
      selectedId={selected}
      onSelect={(item) => setSelected(item.id)}
      onOpen={(item) => console.log('open', item.id)}
    />
  );
}
