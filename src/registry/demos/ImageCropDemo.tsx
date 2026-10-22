import { useState } from 'react';
import ImageCrop from '../../blocks/media/ImageCrop';
import type { CropRect } from '../../blocks/media/ImageCrop';
import { docImage } from './fixtures';

export default function ImageCropDemo() {
  const [rect, setRect] = useState<CropRect>();
  return (
    <div className="w-full max-w-md">
      <ImageCrop
        src={docImage('FRONT', '#e8edf2', '#4a5a68', '#14679e')}
        defaultRect={{ x: 15, y: 10, width: 60, height: 45 }}
        onCropChange={setRect}
      />
      {rect && (
        <p className="mt-2 text-xs text-base-content/50">
          Emitted rect: {JSON.stringify(rect, (_k, v) => typeof v === 'number' ? Math.round(v) : v)}
        </p>
      )}
    </div>
  );
}
