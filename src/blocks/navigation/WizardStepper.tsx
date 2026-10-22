export interface WizardStep {
  id: string;
  label: string;
  /** Rendered as a hint under the label; does not affect navigation. */
  optional?: boolean;
}

export interface WizardStepperProps {
  steps: WizardStep[];
  currentIndex: number;
  onBack?: () => void;
  onNext?: () => void;
  /** Clicking a completed step jumps back to it. */
  onStepClick?: (index: number) => void;
  backLabel?: string;
  nextLabel?: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
}

export default function WizardStepper({
  steps,
  currentIndex,
  onBack,
  onNext,
  onStepClick,
  backLabel = 'Back',
  nextLabel = 'Next',
  backDisabled,
  nextDisabled,
}: WizardStepperProps) {
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= steps.length - 1;

  return (
    <div className="flex w-full flex-col gap-6">
      <ul className="steps w-full">
        {steps.map((step, index) => {
          const reached = index <= currentIndex;
          const clickable = index < currentIndex && onStepClick !== undefined;
          return (
            <li
              key={step.id}
              className={`step ${reached ? 'step-primary' : ''} ${clickable ? 'cursor-pointer' : ''}`}
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
