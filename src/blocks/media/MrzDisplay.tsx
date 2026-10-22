import type { ComponentPropsWithRef } from 'react';

export interface MrzHighlight {
  /** 0-based MRZ line index. */
  line: number;
  /** Start (inclusive) and end (exclusive) character offsets. */
  start: number;
  end: number;
}

export interface MrzDisplayProps extends ComponentPropsWithRef<'div'> {
  /** Raw MRZ lines (typically 2-3 lines of A-Z0-9< characters). */
  lines: string[];
  /** Character ranges to mark, e.g. check digits under review. */
  highlights?: MrzHighlight[];
  /** Show character index ruler under each line. */
  showRuler?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function MrzDisplay({
  lines,
  highlights = [],
  showRuler = false,
  className,
  ref,
  ...rest
}: MrzDisplayProps) {
  function isHighlighted(line: number, charIndex: number) {
    return highlights.some((h) => h.line === line && charIndex >= h.start && charIndex < h.end);
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'inline-flex flex-col gap-1 rounded-box border border-base-300 bg-neutral px-4 py-3',
        className,
      )}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          <div className="font-mono text-lg tracking-wider text-neutral-content" aria-label={line}>
            {line.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                aria-hidden="true"
                className={cx(
                  char === '<' && 'text-neutral-content/50',
                  isHighlighted(lineIndex, charIndex) && 'rounded-xs bg-warning/40 text-warning-content',
                )}
              >
                {char}
              </span>
            ))}
          </div>
          {showRuler && (
            <div className="font-mono text-[9px] tracking-wider text-neutral-content/40" aria-hidden="true">
              {line.split('').map((_, i) => (
                <span key={i}>{i % 10}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
