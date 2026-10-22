import StatusBadge from '../../blocks/feedback/StatusBadge';
import { ALL_STATUSES } from './fixtures';

export default function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ALL_STATUSES.map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>
  );
}
