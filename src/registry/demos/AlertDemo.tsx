import { useState } from 'react';
import Alert from '../../blocks/feedback/Alert';

export default function AlertDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert severity="warning" title="Verification service degraded">
        VPE responses are taking longer than usual. Scanning may be slow.
      </Alert>
      {visible && (
        <Alert severity="success" title="Application verified" onDismiss={() => setVisible(false)}>
          All checks passed. The application has been moved to the completed pool.
        </Alert>
      )}
      <Alert severity="error">RFID chip could not be read - try rescanning the document.</Alert>
    </div>
  );
}
