import { useState } from 'react';

export interface DocumentField {
  key: string;
  label: string;
  value: string;
  /** OCR confidence between 0 and 1. Below confidenceThreshold the field is flagged. */
  confidence: number;
  type?: 'text' | 'date' | 'number';
}

export interface DocumentFieldsFormProps {
  fields: DocumentField[];
  /** Fields scoring below this are highlighted for operator review. */
  confidenceThreshold?: number;
  onConfirm?: (fields: DocumentField[]) => void;
  onReset?: () => void;
}

export default function DocumentFieldsForm({
  fields,
  confidenceThreshold = 0.85,
  onConfirm,
  onReset,
}: DocumentFieldsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );

  function handleConfirm() {
    onConfirm?.(fields.map((f) => ({ ...f, value: values[f.key] ?? f.value })));
  }

  function handleReset() {
    setValues(Object.fromEntries(fields.map((f) => [f.key, f.value])));
    onReset?.();
  }

  const flaggedCount = fields.filter((f) => f.confidence < confidenceThreshold).length;

  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-md">
      <div className="card-body gap-4">
        <div className="flex items-center justify-between">
          <h2 className="card-title">Extracted fields</h2>
          {flaggedCount > 0 && (
            <span className="badge badge-warning">{flaggedCount} to review</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const lowConfidence = field.confidence < confidenceThreshold;
            return (
              <fieldset key={field.key} className="fieldset">
                <legend className="fieldset-legend flex w-full items-center justify-between">
                  <span>{field.label}</span>
                  {lowConfidence && (
                    <span className="badge badge-warning badge-sm">
                      {Math.round(field.confidence * 100)}% - check
                    </span>
                  )}
                </legend>
                <input
                  type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                  className={`input w-full ${lowConfidence ? 'input-warning' : ''}`}
                  value={values[field.key] ?? ''}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [field.key]: e.target.value }))
                  }
                />
              </fieldset>
            );
          })}
        </div>

        <div className="card-actions justify-end">
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Reset to OCR values
          </button>
          <button type="button" className="btn btn-primary" onClick={handleConfirm}>
            Confirm fields
          </button>
        </div>
      </div>
    </div>
  );
}
