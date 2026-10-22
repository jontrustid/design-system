import { useState } from 'react';
import ThumbnailGrid from '../../blocks/media/ThumbnailGrid';
import { docImage } from './fixtures';

export default function ThumbnailGridDemo() {
  const [selected, setSelected] = useState('front-colour');
  return (
    <ThumbnailGrid
      thumbnails={[
        { id: 'front-colour', label: 'Front - Colour', src: docImage('FRONT', '#e8edf2', '#4a5a68', '#14679e'), badge: 'CO' },
        { id: 'front-ir', label: 'Front - IR', src: docImage('FRONT IR', '#dadede', '#333c3c', '#5a6e6e'), badge: 'IR' },
        { id: 'front-uv', label: 'Front - UV', src: docImage('FRONT UV', '#241d4d', '#9d8fef', '#6a4fd0'), badge: 'UV' },
        { id: 'back-colour', label: 'Back - Colour', src: docImage('BACK', '#e8edf2', '#4a5a68', '#14679e'), badge: 'CO' },
        { id: 'chip', label: 'Chip photo', src: docImage('CHIP', '#eef2ee', '#46604e', '#2fa463') },
      ]}
      selectedId={selected}
      onSelect={(t) => setSelected(t.id)}
      onOpen={(t) => console.log('open', t.id)}
    />
  );
}
