import type { ComponentPropsWithRef } from 'react';
import RadioGroup from '../forms/RadioGroup';

export interface CompareImage {
  label: string;
  src?: string;
}

export interface ImageCompareProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  /** Typically two panes: captured vs. reference. */
  images: CompareImage[];
  /** The verification question, e.g. "Are these images the same?" */
  question: string;
  /** Answer options; defaults to Yes/No. */
  options?: { value: string; label: string }[];
  answer?: string;
  onAnswer?: (value: string) => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ImageCompare({
  images,
  question,
  options = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
  answer,
  onAnswer,
  className,
  ref,
  ...rest
}: ImageCompareProps) {
  return (
    <div ref={ref} {...rest} className={cx('flex w-full flex-col gap-4', className)}>
      <div className="flex gap-4">
        {images.map((img) => (
          <figure key={img.label} className="flex min-w-0 flex-1 flex-col gap-2">
            <figcaption className="text-center text-sm font-medium text-base-content/70">
              {img.label}
            </figcaption>
            <div className="flex h-72 items-center justify-center overflow-hidden rounded-box bg-neutral">
              {img.src ? (
                <img src={img.src} alt={img.label} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-sm text-neutral-content/60">No image</span>
              )}
            </div>
          </figure>
        ))}
      </div>

      <RadioGroup
        label={question}
        options={options}
        value={answer}
        onChange={onAnswer}
        orientation="horizontal"
      />
    </div>
  );
}
