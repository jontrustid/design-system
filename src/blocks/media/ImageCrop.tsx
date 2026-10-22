import { useRef, useState } from 'react';
import type { ComponentPropsWithRef, PointerEvent as ReactPointerEvent } from 'react';

/** Crop rectangle as percentages (0-100) of the image bounds. */
export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCropProps
  extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
  src: string;
  alt?: string;
  /** Fires while dragging and on release with the current rect. */
  onCropChange?: (rect: CropRect) => void;
  defaultRect?: CropRect;
}

const MIN_SIZE = 5; // percent

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ImageCrop({
  src,
  alt = 'Document to crop',
  onCropChange,
  defaultRect,
  className,
  ref,
  ...rest
}: ImageCropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<CropRect | undefined>(defaultRect);
  const dragOrigin = useRef<{ x: number; y: number } | undefined>(undefined);

  function toPercent(event: ReactPointerEvent) {
    const bounds = containerRef.current!.getBoundingClientRect();
    return {
      x: clamp(((event.clientX - bounds.left) / bounds.width) * 100, 0, 100),
      y: clamp(((event.clientY - bounds.top) / bounds.height) * 100, 0, 100),
    };
  }

  function update(next: CropRect | undefined) {
    setRect(next);
    if (next) onCropChange?.(next);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = toPercent(event);
    dragOrigin.current = point;
    update({ x: point.x, y: point.y, width: 0, height: 0 });
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragOrigin.current) return;
    const point = toPercent(event);
    update({
      x: Math.min(dragOrigin.current.x, point.x),
      y: Math.min(dragOrigin.current.y, point.y),
      width: Math.abs(point.x - dragOrigin.current.x),
      height: Math.abs(point.y - dragOrigin.current.y),
    });
  }

  function handlePointerUp() {
    dragOrigin.current = undefined;
    setRect((r) => (r && (r.width < MIN_SIZE || r.height < MIN_SIZE) ? undefined : r));
  }

  return (
    <div ref={ref} {...rest} className={cx('flex flex-col gap-2', className)}>
      <div
        ref={containerRef}
        className="relative inline-block touch-none select-none overflow-hidden rounded-box bg-neutral"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img src={src} alt={alt} className="block max-h-96 w-full object-contain" draggable={false} />
        {rect && (
          <div
            className="absolute border-2 border-primary"
            style={{
              left: `${rect.x}%`,
              top: `${rect.y}%`,
              width: `${rect.width}%`,
              height: `${rect.height}%`,
              boxShadow: '0 0 0 9999px rgb(0 0 0 / 0.45)',
            }}
          >
            {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map(
              (pos) => (
                <span key={pos} className={`absolute ${pos} h-2 w-2 rounded-full bg-primary`} />
              ),
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-base-content/50">
        {rect
          ? `x ${Math.round(rect.x)}%, y ${Math.round(rect.y)}% - ${Math.round(rect.width)}% x ${Math.round(rect.height)}%`
          : 'Drag on the image to select a region'}
      </p>
    </div>
  );
}
