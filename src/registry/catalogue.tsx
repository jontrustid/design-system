import { useState } from 'react';
import type { ReactElement } from 'react';
import registry from './blocks.json';

import LoginForm from '../blocks/forms/LoginForm';
import DocumentFieldsForm from '../blocks/forms/DocumentFieldsForm';
import SearchFilterBar from '../blocks/forms/SearchFilterBar';
import ApplicationsTable from '../blocks/data/ApplicationsTable';
import StatusBadge from '../blocks/feedback/StatusBadge';
import FieldFeedback from '../blocks/feedback/FieldFeedback';
import WizardStepper from '../blocks/navigation/WizardStepper';
import ImageViewer from '../blocks/media/ImageViewer';
import AppShell from '../blocks/layout/AppShell';
import type { ApplicationRow } from '../blocks/data/ApplicationsTable';
import type { ApplicationStatus } from '../blocks/feedback/StatusBadge';

import loginFormSource from '../blocks/forms/LoginForm.tsx?raw';
import documentFieldsFormSource from '../blocks/forms/DocumentFieldsForm.tsx?raw';
import searchFilterBarSource from '../blocks/forms/SearchFilterBar.tsx?raw';
import applicationsTableSource from '../blocks/data/ApplicationsTable.tsx?raw';
import statusBadgeSource from '../blocks/feedback/StatusBadge.tsx?raw';
import fieldFeedbackSource from '../blocks/feedback/FieldFeedback.tsx?raw';
import wizardStepperSource from '../blocks/navigation/WizardStepper.tsx?raw';
import imageViewerSource from '../blocks/media/ImageViewer.tsx?raw';
import appShellSource from '../blocks/layout/AppShell.tsx?raw';

export interface CatalogueEntry {
  name: string;
  category: string;
  path: string;
  description: string;
  useCases: string[];
  dependencies: string[];
  source: string;
  demo: ReactElement;
}

const sources: Record<string, string> = {
  LoginForm: loginFormSource,
  DocumentFieldsForm: documentFieldsFormSource,
  SearchFilterBar: searchFilterBarSource,
  ApplicationsTable: applicationsTableSource,
  StatusBadge: statusBadgeSource,
  FieldFeedback: fieldFeedbackSource,
  WizardStepper: wizardStepperSource,
  ImageViewer: imageViewerSource,
  AppShell: appShellSource,
};

/* ---------- demo fixtures ---------- */

function docImage(label: string, bg: string, fg: string, accent: string) {
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

const SAMPLE_ROWS: ApplicationRow[] = [
  { id: 'VS-1042', applicant: 'Amara Okafor', documentType: 'Passport (NGA)', status: 'pending', pool: 'KYC', receivedAt: '2026-10-22 08:14' },
  { id: 'VS-1041', applicant: 'Liam Gallagher', documentType: 'Driving licence (GBR)', status: 'in-review', pool: 'KYC', lockedBy: 'j.chen', receivedAt: '2026-10-22 07:52' },
  { id: 'VS-1039', applicant: 'Priya Raman', documentType: 'National ID (IND)', status: 'referred', pool: 'Fraud', lockedBy: 's.amjad', receivedAt: '2026-10-21 16:40' },
  { id: 'VS-1036', applicant: 'Tomás Silva', documentType: 'Passport (PRT)', status: 'verified', pool: 'KYC', receivedAt: '2026-10-21 15:03' },
  { id: 'VS-1034', applicant: 'Grace Mbeki', documentType: 'Residence permit (ZAF)', status: 'on-hold', pool: 'Compliance', receivedAt: '2026-10-21 11:27' },
  { id: 'VS-1031', applicant: 'Jonas Weber', documentType: 'Passport (DEU)', status: 'completed', pool: 'KYC', receivedAt: '2026-10-20 17:45' },
  { id: 'VS-1028', applicant: 'Fatima Noor', documentType: 'Passport (PAK)', status: 'failed', pool: 'Fraud', receivedAt: '2026-10-20 14:19' },
  { id: 'VS-1025', applicant: 'Erik Larsen', documentType: 'Driving licence (DNK)', status: 'rejected', pool: 'KYC', receivedAt: '2026-10-20 09:31' },
];

const ALL_STATUSES: ApplicationStatus[] = [
  'pending',
  'in-review',
  'verified',
  'rejected',
  'referred',
  'on-hold',
  'completed',
  'failed',
];

/* ---------- stateful demo wrappers ---------- */

function ApplicationsTableDemo() {
  const [selectedId, setSelectedId] = useState<string>();
  return (
    <ApplicationsTable
      rows={SAMPLE_ROWS}
      selectedId={selectedId}
      onSelect={(row) => setSelectedId(row.id)}
      onOpen={(row) => setSelectedId(row.id)}
    />
  );
}

function WizardStepperDemo() {
  const [index, setIndex] = useState(1);
  return (
    <WizardStepper
      steps={[
        { id: 'scan', label: 'Scan document' },
        { id: 'fields', label: 'Extract fields' },
        { id: 'verify', label: 'Verify checks' },
        { id: 'notes', label: 'Operator notes', optional: true },
        { id: 'submit', label: 'Submit' },
      ]}
      currentIndex={index}
      onBack={() => setIndex((i) => Math.max(0, i - 1))}
      onNext={() => setIndex((i) => i + 1)}
      onStepClick={setIndex}
    />
  );
}

function AppShellDemo() {
  const [active, setActive] = useState('inbox');
  const icon = (d: string) => (
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
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-box border border-base-300">
      <AppShell
        navItems={[
          { id: 'inbox', label: 'Inbox', badge: '8', icon: icon('M22 12h-6l-2 3h-4l-2-3H2m20 0v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6m20 0l-3.5-7h-13L2 12') },
          { id: 'verify', label: 'Verify document', icon: icon('M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z') },
          { id: 'pools', label: 'Work pools', icon: icon('M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4m4 4a4 4 0 01-4-4') },
          { id: 'admin', label: 'Administration', roles: ['admin', 'supervisor'], icon: icon('M10.3 4.3a1.7 1.7 0 013.4 0 1.7 1.7 0 002.6 1 1.7 1.7 0 012.4 2.4 1.7 1.7 0 001 2.6 1.7 1.7 0 010 3.4 1.7 1.7 0 00-1 2.6 1.7 1.7 0 01-2.4 2.4 1.7 1.7 0 00-2.6 1 1.7 1.7 0 01-3.4 0 1.7 1.7 0 00-2.6-1 1.7 1.7 0 01-2.4-2.4 1.7 1.7 0 00-1-2.6 1.7 1.7 0 010-3.4 1.7 1.7 0 001-2.6 1.7 1.7 0 012.4-2.4 1.7 1.7 0 002.6-1zM15 12a3 3 0 11-6 0 3 3 0 016 0z') },
          { id: 'audit', label: 'Audit log', roles: ['admin'], icon: icon('M9 5h6M9 9h6M9 13h4M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z') },
        ]}
        activeNavId={active}
        user={{ name: 'J. Tremelling', role: 'operator', org: 'TrustID Demo Org' }}
        onNavigate={setActive}
      >
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base">Page content</h3>
            <p className="text-sm text-base-content/70">
              The active section is <code>{active}</code>. The sidebar filters
              items by role - the demo user is an <code>operator</code>, so
              admin-only items are hidden.
            </p>
          </div>
        </div>
      </AppShell>
    </div>
  );
}

/* ---------- catalogue ---------- */

const demos: Record<string, ReactElement> = {
  LoginForm: (
    <LoginForm
      environments={[
        { id: 'prod', label: 'Production' },
        { id: 'uat', label: 'UAT' },
        { id: 'dev', label: 'Development' },
      ]}
      requireMfa
    />
  ),
  DocumentFieldsForm: (
    <DocumentFieldsForm
      fields={[
        { key: 'surname', label: 'Surname', value: 'OKAFOR', confidence: 0.99 },
        { key: 'givenNames', label: 'Given names', value: 'Amara Ngozi', confidence: 0.97 },
        { key: 'docNumber', label: 'Document number', value: 'A08I43592', confidence: 0.61 },
        { key: 'dob', label: 'Date of birth', value: '1991-04-17', confidence: 0.94, type: 'date' },
        { key: 'expiry', label: 'Expiry date', value: '2031-08-02', confidence: 0.58, type: 'date' },
        { key: 'nationality', label: 'Nationality', value: 'NGA', confidence: 0.99 },
      ]}
    />
  ),
  SearchFilterBar: (
    <SearchFilterBar
      filters={[
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: ALL_STATUSES.map((s) => ({ value: s, label: s })),
        },
        {
          key: 'pool',
          label: 'Pool',
          type: 'select',
          options: [
            { value: 'kyc', label: 'KYC' },
            { value: 'fraud', label: 'Fraud' },
            { value: 'compliance', label: 'Compliance' },
          ],
        },
        { key: 'docType', label: 'Document type', type: 'text', placeholder: 'e.g. Passport' },
        { key: 'receivedFrom', label: 'Received from', type: 'date' },
      ]}
    />
  ),
  ApplicationsTable: <ApplicationsTableDemo />,
  StatusBadge: (
    <div className="flex flex-wrap items-center gap-2">
      {ALL_STATUSES.map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>
  ),
  FieldFeedback: (
    <FieldFeedback
      defaultExpandedId="mrz"
      items={[
        {
          id: 'mrz',
          label: 'MRZ checksum',
          severity: 'fail',
          message: 'Composite check digit does not match.',
          details: 'Expected 4 at position 44, found 7. Re-capture or verify the document number manually.',
        },
        {
          id: 'expiry',
          label: 'Expiry date',
          severity: 'warning',
          message: 'Document expires within 90 days.',
        },
        {
          id: 'photo',
          label: 'Photo quality',
          severity: 'info',
          message: 'Slight glare detected on the portrait region.',
        },
        {
          id: 'uv',
          label: 'UV pattern',
          severity: 'pass',
          message: 'UV security features match the document template.',
        },
      ]}
    />
  ),
  WizardStepper: <WizardStepperDemo />,
  ImageViewer: (
    <ImageViewer
      channels={[
        { id: 'colour', label: 'Colour', src: docImage('COLOUR', '#e8edf2', '#4a5a68', '#14679e') },
        { id: 'ir', label: 'IR', src: docImage('IR', '#dadede', '#333c3c', '#5a6e6e') },
        { id: 'uv', label: 'UV', src: docImage('UV', '#241d4d', '#9d8fef', '#6a4fd0') },
      ]}
      referenceSrc={docImage('TEMPLATE', '#eef2ee', '#46604e', '#2fa463')}
      referenceLabel="Template reference"
    />
  ),
  AppShell: <AppShellDemo />,
};

export const catalogue: CatalogueEntry[] = registry.blocks.map((block) => ({
  ...block,
  source: sources[block.name] ?? '',
  demo: demos[block.name] ?? <p>No demo registered.</p>,
}));
