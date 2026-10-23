import { useRef, useState } from 'react';
import type {
  ComponentPropsWithRef,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';

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
  /** Fires while dragging and on release with the current rect; undefined when cleared. */
  onCropChange?: (rect: CropRect | undefined) => void;
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
    onCropChange?.(next);
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
    if (rect && (rect.width < MIN_SIZE || rect.height < MIN_SIZE)) update(undefined);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && rect) {
      update(undefined);
      return;
    }
    const dx = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    const dy = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
    if (dx === 0 && dy === 0) return;
    event.preventDefault();
    const step = event.altKey ? 10 : 1;
    const current = rect ?? { x: 10, y: 10, width: 80, height: 80 };
    if (event.shiftKey) {
      update({
        ...current,
        width: clamp(current.width + dx * step, MIN_SIZE, 100 - current.x),
        height: clamp(current.height + dy * step, MIN_SIZE, 100 - current.y),
      });
    } else {
      update({
        ...current,
        x: clamp(current.x + dx * step, 0, 100 - current.width),
        y: clamp(current.y + dy * step, 0, 100 - current.height),
      });
    }
  }

  return (
    <div ref={ref} {...rest} className={cx('flex flex-col gap-2', className)}>
      <div
        ref={containerRef}
        tabIndex={0}
        role="application"
        aria-label="Crop region. Arrow keys move, Shift plus arrow keys resize, Escape clears."
        className="relative inline-block touch-none select-none overflow-hidden rounded-box bg-neutral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
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
          : 'Drag on the image to select a region (or use arrow keys)'}
      </p>
    </div>
  );
}
