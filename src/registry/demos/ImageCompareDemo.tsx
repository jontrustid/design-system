import { useState } from 'react';
import ImageCompare from '../../blocks/media/ImageCompare';
import { docImage } from './fixtures';

export default function ImageCompareDemo() {
  const [answer, setAnswer] = useState<string>();
  return (
    <ImageCompare
      images={[
        { label: 'Captured face', src: docImage('CAPTURED', '#e8edf2', '#4a5a68', '#14679e') },
        { label: 'RFID chip photo', src: docImage('CHIP', '#dadede', '#333c3c', '#5a6e6e') },
      ]}
      question="Are these images the same person?"
      answer={answer}
      onAnswer={setAnswer}
    />
  );
}
