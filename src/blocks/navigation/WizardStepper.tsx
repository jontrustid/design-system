import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface WizardStep {
  id: string;
  label: string;
  /** Rendered as a hint under the label; does not affect navigation. */
  optional?: boolean;
}

export interface WizardStepperProps extends ComponentPropsWithRef<'div'> {
  steps: WizardStep[];
  currentIndex: number;
  /** Step content rendered between the strip and the Back/Next row. */
  children?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  /** Clicking any step other than the current one jumps to it. */
  onStepClick?: (index: number) => void;
  backLabel?: string;
  nextLabel?: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function WizardStepper({
  steps,
  currentIndex,
  children,
  onBack,
  onNext,
  onStepClick,
  backLabel = 'Back',
  nextLabel = 'Next',
  backDisabled,
  nextDisabled,
  className,
  ref,
  ...rest
}: WizardStepperProps) {
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= steps.length - 1;

  return (
    <div ref={ref} {...rest} className={cx('flex w-full flex-col gap-6', className)}>
      <ul className="steps w-full">
        {steps.map((step, index) => {
          const reached = index <= currentIndex;
          const clickable = index !== currentIndex && onStepClick !== undefined;
          return (
            <li
              key={step.id}
              aria-current={index === currentIndex ? 'step' : undefined}
              className={cx('step', reached && 'step-primary', clickable && 'cursor-pointer')}
              onClick={clickable ? () => onStepClick(index) : undefined}
            >
              <span className="mt-1 inline-flex items-baseline gap-1.5">
                {step.label}
                {step.optional && (
                  <span className="text-xs text-base-content/50">(optional)</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {children}

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onBack}
          disabled={isFirst || backDisabled}
        >
          {backLabel}
        </button>
        <span className="text-sm text-base-content/60">
          Step {currentIndex + 1} of {steps.length}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={isLast || nextDisabled}
        >
          {isLast ? 'Finish' : nextLabel}
        </button>
      </div>
    </div>
  );
}
