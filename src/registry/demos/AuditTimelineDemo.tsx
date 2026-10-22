import AuditTimeline from '../../blocks/data/AuditTimeline';

export default function AuditTimelineDemo() {
  return (
    <AuditTimeline
      events={[
        { id: 'e1', title: 'Application received', at: '22 Oct 08:14', actor: 'Scanner: AT9000-04', severity: 'info' },
        { id: 'e2', title: 'Locked for review', at: '22 Oct 08:31', actor: 'j.chen', severity: 'info' },
        { id: 'e3', title: 'OCR fields confirmed', at: '22 Oct 08:47', actor: 'j.chen', details: '2 fields corrected manually', severity: 'success' },
        { id: 'e4', title: 'MRZ checksum failed', at: '22 Oct 08:52', severity: 'error', details: 'Composite check digit mismatch' },
        { id: 'e5', title: 'Referred to supervisor', at: '22 Oct 09:03', actor: 'j.chen', severity: 'warning' },
      ]}
    />
  );
}
