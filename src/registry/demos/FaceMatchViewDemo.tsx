import { useState } from 'react';
import FaceMatchView from '../../blocks/media/FaceMatchView';
import { docImage } from './fixtures';

export default function FaceMatchViewDemo() {
  const [answer, setAnswer] = useState<string>();
  return (
    <FaceMatchView
      capturedSrc={docImage('FACE', '#e8edf2', '#4a5a68', '#14679e')}
      referenceSrc={docImage('CHIP FACE', '#eef2ee', '#46604e', '#2fa463')}
      similarityScore={0.74}
      answer={answer}
      onAnswer={setAnswer}
      onZoom={() => console.log('zoom requested')}
    />
  );
}
