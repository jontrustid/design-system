import type { ComponentPropsWithRef } from 'react';
import ImageCompare from './ImageCompare';

export interface FaceMatchViewProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  /** Photo captured from the document page. */
  capturedSrc?: string;
  /** Reference photo, e.g. from the RFID chip. */
  referenceSrc?: string;
  capturedLabel?: string;
  referenceLabel?: string;
  /** Similarity score 0-1 from the matching engine. */
  similarityScore?: number;
  /** Threshold used to colour the score. */
  matchThreshold?: number;
  question?: string;
  /** Answer options; defaults to Yes/No. Pass disabled options for read-only review. */
  options?: { value: string; label: string; disabled?: boolean }[];
  answer?: string;
  onAnswer?: (value: string) => void;
  /** Fired when the operator wants the enlarged comparison (host shows a modal). */
  onZoom?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function FaceMatchView({
  capturedSrc,
  capturedLabel = 'Captured face',
  referenceSrc,
  referenceLabel = 'Chip photo',
  similarityScore,
  matchThreshold = 0.8,
  question = 'Are these images the same person?',
  options,
  answer,
  onAnswer,
  onZoom,
  className,
  ref,
  ...rest
}: FaceMatchViewProps) {
  const percent =
    similarityScore !== undefined ? Math.round(similarityScore * 100) : undefined;
  const matched = similarityScore !== undefined && similarityScore >= matchThreshold;

  return (
    <div ref={ref} {...rest} className={cx('flex w-full flex-col gap-4', className)}>
      {percent !== undefined && (
        <div className="flex items-center gap-3 rounded-box border border-base-300 bg-base-100 px-4 py-2">
          <span className="text-sm font-medium">Similarity</span>
          <progress
            className={cx('progress w-full flex-1', matched ? 'progress-success' : 'progress-warning')}
            value={percent}
            max={100}
          />
          <span
            className={cx(
              'badge',
              matched ? 'badge-success' : 'badge-warning',
            )}
          >
            {percent}%
          </span>
          {onZoom && (
            <button type="button" className="btn btn-sm btn-outline" onClick={onZoom}>
              Zoom in
            </button>
          )}
        </div>
      )}

      <ImageCompare
        images={[
          { label: capturedLabel, src: capturedSrc },
          { label: referenceLabel, src: referenceSrc },
        ]}
        question={question}
        options={options}
        answer={answer}
        onAnswer={onAnswer}
      />
    </div>
  );
}
