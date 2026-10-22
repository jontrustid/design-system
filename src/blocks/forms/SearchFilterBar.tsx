import { useState } from 'react';

export interface SearchFilterOption {
  value: string;
  label: string;
}

export interface SearchFilter {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date';
  /** Required when type is "select". */
  options?: SearchFilterOption[];
  placeholder?: string;
}

export interface SearchFilterBarProps {
  filters: SearchFilter[];
  searchPlaceholder?: string;
  /** Fired with the query plus every filter value when Apply is clicked. */
  onApply?: (criteria: Record<string, string>) => void;
  onClear?: () => void;
}

export default function SearchFilterBar({
  filters,
  searchPlaceholder = 'Search applications...',
  onApply,
  onClear,
}: SearchFilterBarProps) {
  const [query, setQuery] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});

  function apply() {
    onApply?.({ query, ...values });
  }

  function clear() {
    setQuery('');
    setValues({});
    onClear?.();
  }

  return (
    <div className="flex w-full flex-wrap items-end gap-3 rounded-box border border-base-300 bg-base-100 p-4">
      <fieldset className="fieldset min-w-52 flex-1">
        <legend className="fieldset-legend">Search</legend>
        <input
          type="search"
          className="input w-full"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
        />
      </fieldset>

      {filters.map((filter) => (
        <fieldset key={filter.key} className="fieldset w-44">
          <legend className="fieldset-legend">{filter.label}</legend>
          {filter.type === 'select' ? (
            <select
              className="select w-full"
              value={values[filter.key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [filter.key]: e.target.value }))}
            >
              <option value="">All</option>
              {filter.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type === 'date' ? 'date' : 'text'}
              className="input w-full"
              placeholder={filter.placeholder}
              value={values[filter.key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [filter.key]: e.target.value }))}
            />
          )}
        </fieldset>
      ))}

      <div className="flex gap-2">
        <button type="button" className="btn btn-ghost" onClick={clear}>
          Clear
        </button>
        <button type="button" className="btn btn-primary" onClick={apply}>
          Apply
        </button>
      </div>
    </div>
  );
}
