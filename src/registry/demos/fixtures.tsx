import type { ApplicationRow } from '../../blocks/data/ApplicationsTable';
import type { ApplicationStatus } from '../../blocks/feedback/StatusBadge';

export const SAMPLE_ROWS: ApplicationRow[] = [
  { id: 'VS-1042', applicant: 'Amara Okafor', documentType: 'Passport (NGA)', status: 'pending', pool: 'KYC', receivedAt: '2026-10-22 08:14' },
  { id: 'VS-1041', applicant: 'Liam Gallagher', documentType: 'Driving licence (GBR)', status: 'in-review', pool: 'KYC', lockedBy: 'j.chen', receivedAt: '2026-10-22 07:52' },
  { id: 'VS-1039', applicant: 'Priya Raman', documentType: 'National ID (IND)', status: 'referred', pool: 'Fraud', lockedBy: 's.amjad', receivedAt: '2026-10-21 16:40' },
  { id: 'VS-1036', applicant: 'Tomás Silva', documentType: 'Passport (PRT)', status: 'verified', pool: 'KYC', receivedAt: '2026-10-21 15:03' },
  { id: 'VS-1034', applicant: 'Grace Mbeki', documentType: 'Residence permit (ZAF)', status: 'on-hold', pool: 'Compliance', receivedAt: '2026-10-21 11:27' },
  { id: 'VS-1031', applicant: 'Jonas Weber', documentType: 'Passport (DEU)', status: 'completed', pool: 'KYC', receivedAt: '2026-10-20 17:45' },
  { id: 'VS-1028', applicant: 'Fatima Noor', documentType: 'Passport (PAK)', status: 'failed', pool: 'Fraud', receivedAt: '2026-10-20 14:19' },
  { id: 'VS-1025', applicant: 'Erik Larsen', documentType: 'Driving licence (DNK)', status: 'rejected', pool: 'KYC', receivedAt: '2026-10-20 09:31' },
];

export const ALL_STATUSES: ApplicationStatus[] = [
  'pending',
  'in-review',
  'verified',
  'rejected',
  'referred',
  'on-hold',
  'completed',
  'failed',
];

export function docImage(label: string, bg: string, fg: string, accent: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" fill="${bg}"/>
    <rect x="24" y="24" width="120" height="140" rx="6" fill="${accent}"/>
    <rect x="168" y="32" width="280" height="14" rx="4" fill="${fg}"/>
    <rect x="168" y="60" width="220" height="10" rx="4" fill="${fg}" opacity="0.7"/>
    <rect x="168" y="80" width="250" height="10" rx="4" fill="${fg}" opacity="0.7"/>
    <rect x="24" y="190" width="432" height="10" rx="4" fill="${fg}" opacity="0.5"/>
    <rect x="24" y="212" width="400" height="10" rx="4" fill="${fg}" opacity="0.5"/>
    <rect x="24" y="250" width="432" height="30" rx="4" fill="${accent}" opacity="0.4"/>
    <text x="240" y="305" font-family="sans-serif" font-size="14" fill="${fg}" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function navIcon(d: string) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
