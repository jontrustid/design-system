import { useState } from 'react';
import Tabs from '../../blocks/navigation/Tabs';

export default function TabsDemo() {
  const [tab, setTab] = useState('fields');
  return (
    <Tabs
      tabs={[
        { id: 'fields', label: 'Fields' },
        { id: 'images', label: 'Images', badge: '4' },
        { id: 'checks', label: 'Checks', badge: '2' },
        { id: 'audit', label: 'Audit', disabled: true },
      ]}
      activeId={tab}
      onChange={setTab}
    />
  );
}
