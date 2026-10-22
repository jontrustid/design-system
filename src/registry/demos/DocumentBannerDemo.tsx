import DocumentBanner from '../../blocks/layout/DocumentBanner';

export default function DocumentBannerDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <DocumentBanner
        title="Passport (NGA) - Amara Okafor"
        status="in-review"
        meta={[
          { label: 'Doc no.', value: 'A08I43592' },
          { label: 'Captured', value: '2026-10-22 08:14' },
          { label: 'Pool', value: 'KYC' },
        ]}
      />
      <DocumentBanner
        title="National ID (IND) - Priya Raman"
        status="referred"
        lockedBy="s.amjad"
        referralReason="MRZ checksum failed twice"
        meta={[{ label: 'Doc no.', value: 'I7721-9934' }]}
      />
    </div>
  );
}
