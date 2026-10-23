import type { ComponentPropsWithRef, ReactNode } from 'react';
import EmptyState from '../feedback/EmptyState';

export interface DataTableColumn<Row> {
  /** Key into the row when `cell` is not provided. */
  key: string;
  header?: ReactNode;
  /** Classes applied to the td/th for this column (e.g. text-right, font-mono). */
  className?: string;
  /** Custom cell renderer; falls back to String(row[key]). */
  cell?: (row: Row, index: number) => ReactNode;
}

export interface DataTableProps<Row> extends ComponentPropsWithRef<'div'> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey?: (row: Row, index: number) => string | number;
  onRowClick?: (row: Row) => void;
  /** EmptyState title when rows is empty; omit to render an empty table. */
  emptyTitle?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Prevent cell wrapping for dense data grids. */
  nowrap?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyTitle,
  size = 'sm',
  nowrap = false,
  className,
  ref,
  ...rest
}: DataTableProps<Row>) {
  if (rows.length === 0 && emptyTitle) {
    return <EmptyState title={emptyTitle} className={className} />;
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={cx('overflow-x-auto rounded-box border border-base-300', className)}
    >
      <table className={cx('table', size !== 'md' && `table-${size}`, nowrap && 'whitespace-nowrap')}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={rowKey ? rowKey(row, i) : i}
              className={onRowClick ? 'cursor-pointer hover:bg-base-200/50' : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className={col.className}>
                  {col.cell
                    ? col.cell(row, i)
                    : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
