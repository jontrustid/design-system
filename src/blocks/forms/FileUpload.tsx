import { useState } from 'react';
import type { ComponentPropsWithRef, DragEvent } from 'react';

export interface FileUploadProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'onChange'> {
  label?: string;
  hint?: string;
  /** Fires with the selected/dropped files. */
  onFiles?: (files: File[]) => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function FileUpload({
  label = 'Drop files here or click to browse',
  hint,
  onFiles,
  className,
  ref,
  ...rest
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length) onFiles?.(files);
  }

  return (
    <label
      className={cx(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-box border-2 border-dashed border-base-300 bg-base-100 p-8 text-center transition-colors',
        dragging && 'border-primary bg-primary/5',
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <svg
        className="h-8 w-8 text-base-content/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
      </svg>
      <span className="text-sm font-medium">{label}</span>
      {hint && <span className="text-xs text-base-content/60">{hint}</span>}
      <input
        ref={ref}
        type="file"
        className="hidden"
        {...rest}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles?.(files);
          e.target.value = '';
        }}
      />
    </label>
  );
}
