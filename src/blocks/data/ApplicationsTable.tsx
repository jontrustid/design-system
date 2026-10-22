import StatusBadge from '../feedback/StatusBadge';
import type { ApplicationStatus } from '../feedback/StatusBadge';

export interface ApplicationRow {
  id: string;
  applicant: string;
  documentType: string;
  status: ApplicationStatus;
  pool: string;
  /** Operator currently holding the application, if locked. */
  lockedBy?: string;
  receivedAt: string;
}

export interface ApplicationsTableProps {
  rows: ApplicationRow[];
  selectedId?: string;
  /** Single click on a row. */
  onSelect?: (row: ApplicationRow) => void;
  /** Double click on a row (open the application). */
  onOpen?: (row: ApplicationRow) => void;
}

function LockIcon() {
  return (
    <svg
      className="inline h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

export default function ApplicationsTable({
  rows,
  selectedId,
  onSelect,
  onOpen,
}: ApplicationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Document</th>
            <th>Status</th>
            <th>Pool</th>
            <th>Locked by</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`cursor-pointer ${row.id === selectedId ? 'bg-primary/10' : ''}`}
              onClick={() => onSelect?.(row)}
              onDoubleClick={() => onOpen?.(row)}
            >
              <td className="font-medium">{row.applicant}</td>
              <td>{row.documentType}</td>
              <td>
                <StatusBadge status={row.status} size="sm" />
              </td>
              <td>{row.pool}</td>
              <td>
                {row.lockedBy ? (
                  <span className="inline-flex items-center gap-1.5 text-base-content/70">
                    <LockIcon />
                    {row.lockedBy}
                  </span>
                ) : (
                  <span className="text-base-content/40">-</span>
                )}
              </td>
              <td className="whitespace-nowrap">{row.receivedAt}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-base-content/60">
                No applications in this queue.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
