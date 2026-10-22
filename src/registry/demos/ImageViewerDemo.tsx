import ImageViewer from '../../blocks/media/ImageViewer';
import { docImage } from './fixtures';

export default function ImageViewerDemo() {
  return (
    <ImageViewer
      channels={[
        { id: 'colour', label: 'Colour', src: docImage('COLOUR', '#e8edf2', '#4a5a68', '#14679e') },
        { id: 'ir', label: 'IR', src: docImage('IR', '#dadede', '#333c3c', '#5a6e6e') },
        { id: 'uv', label: 'UV', src: docImage('UV', '#241d4d', '#9d8fef', '#6a4fd0') },
      ]}
      referenceSrc={docImage('TEMPLATE', '#eef2ee', '#46604e', '#2fa463')}
      referenceLabel="Template reference"
    />
  );
}
