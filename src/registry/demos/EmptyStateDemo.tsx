import EmptyState from '../../blocks/feedback/EmptyState';

export default function EmptyStateDemo() {
  return (
    <EmptyState
      title="No applications match your filters"
      message="Try widening the date range or clearing the pool filter."
      action={<button type="button" className="btn btn-sm btn-outline">Clear filters</button>}
    />
  );
}
