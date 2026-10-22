import MrzDisplay from '../../blocks/media/MrzDisplay';

export default function MrzDisplayDemo() {
  return (
    <MrzDisplay
      lines={[
        'P<NGAOKAFOR<<AMARA<NGOZI<<<<<<<<<<<<<<<<<',
        'A08I435927NGA9104177F3108028<<<<<<<<<<<04',
      ]}
      highlights={[{ line: 1, start: 9, end: 10 }]}
      showRuler
    />
  );
}
