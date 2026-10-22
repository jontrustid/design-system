import LoadingSpinner from '../../blocks/feedback/LoadingSpinner';

export default function LoadingSpinnerDemo() {
  return (
    <div className="flex w-full items-start gap-8">
      <LoadingSpinner size="sm" text="Loading queue..." />
      <div className="relative h-40 flex-1 overflow-hidden rounded-box border border-base-300">
        <LoadingSpinner overlay text="Waiting for verification service..." />
      </div>
    </div>
  );
}
