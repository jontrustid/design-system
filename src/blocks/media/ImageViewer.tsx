import { useState } from 'react';

export interface ImageChannel {
  id: string;
  label: string;
  src: string;
}

export interface ImageViewerProps {
  /** Imaging channels captured by the scanner, e.g. colour / IR / UV. */
  channels: ImageChannel[];
  /** Reference image (e.g. template or previous capture) for side-by-side compare. */
  referenceSrc?: string;
  referenceLabel?: string;
  initialChannelId?: string;
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.5, 2, 3, 4];

export default function ImageViewer({
  channels,
  referenceSrc,
  referenceLabel = 'Reference',
  initialChannelId,
}: ImageViewerProps) {
  const [channelId, setChannelId] = useState(initialChannelId ?? channels[0]?.id);
  const [zoomIndex, setZoomIndex] = useState(ZOOM_STEPS.indexOf(1));
  const [rotation, setRotation] = useState(0);
  const [sideBySide, setSideBySide] = useState(false);

  const channel = channels.find((c) => c.id === channelId) ?? channels[0];
  const zoom = ZOOM_STEPS[zoomIndex];

  function zoomBy(delta: number) {
    setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, Math.max(0, i + delta)));
  }

  function renderPane(src: string | undefined, label: string, interactive: boolean) {
    return (
      <figure className="flex min-w-0 flex-1 flex-col gap-2">
        <figcaption className="text-center text-sm font-medium text-base-content/70">
          {label}
        </figcaption>
        <div className="flex h-80 items-center justify-center overflow-hidden rounded-box bg-neutral">
          {src ? (
            <img
              src={src}
              alt={label}
              className="max-h-full max-w-full object-contain transition-transform"
              style={
                interactive
                  ? { transform: `scale(${zoom}) rotate(${rotation}deg)` }
                  : undefined
              }
            />
          ) : (
            <span className="text-sm text-neutral-content/60">No image</span>
          )}
        </div>
      </figure>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3 rounded-box border border-base-300 bg-base-100 p-2">
        <div className="join">
          {channels.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`btn btn-sm join-item ${c.id === channel?.id ? 'btn-primary' : ''}`}
              onClick={() => setChannelId(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="join">
          <button
            type="button"
            className="btn btn-sm join-item"
            onClick={() => zoomBy(-1)}
            disabled={zoomIndex === 0}
            aria-label="Zoom out"
          >
            -
          </button>
          <span className="join-item flex items-center px-3 text-sm tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            className="btn btn-sm join-item"
            onClick={() => zoomBy(1)}
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="btn btn-sm"
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          Rotate
        </button>

        {referenceSrc && (
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="toggle toggle-sm"
              checked={sideBySide}
              onChange={(e) => setSideBySide(e.target.checked)}
            />
            <span className="label-text">Side by side</span>
          </label>
        )}

        <button
          type="button"
          className="btn btn-sm btn-ghost ms-auto"
          onClick={() => {
            setZoomIndex(ZOOM_STEPS.indexOf(1));
            setRotation(0);
          }}
        >
          Reset view
        </button>
      </div>

      <div className="flex gap-4">
        {renderPane(channel?.src, channel?.label ?? 'Image', true)}
        {sideBySide && renderPane(referenceSrc, referenceLabel, false)}
      </div>
    </div>
  );
}
