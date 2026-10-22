import ProgressIndicator from '../../blocks/feedback/ProgressIndicator';

export default function ProgressIndicatorDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ProgressIndicator label="Importing applications" value={68} showPercent />
      <ProgressIndicator label="Running verification checks" indeterminate color="info" />
      <ProgressIndicator label="Upload cancelled" value={34} showPercent color="error" />
    </div>
  );
}
