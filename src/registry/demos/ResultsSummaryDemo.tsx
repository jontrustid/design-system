import ResultsSummary from '../../blocks/data/ResultsSummary';

export default function ResultsSummaryDemo() {
  return (
    <ResultsSummary
      verdict="referred"
      summary="2 checks failed and 1 requires manual review. Referred to the fraud pool."
      groups={[
        {
          label: 'Authenticity',
          items: [
            { id: 'uv', label: 'UV pattern', severity: 'pass', message: 'UV security features match the document template.' },
            { id: 'mrz', label: 'MRZ checksum', severity: 'fail', message: 'Composite check digit does not match.', details: 'Expected 4 at position 44, found 7.' },
          ],
        },
        {
          label: 'Biometric',
          items: [
            { id: 'face', label: 'Face match', severity: 'warning', message: 'Similarity score 74% - below auto-pass threshold.' },
          ],
        },
        {
          label: 'Data',
          items: [
            { id: 'expiry', label: 'Expiry date', severity: 'pass', message: 'Document valid until 2031-08-02.' },
          ],
        },
      ]}
    />
  );
}
