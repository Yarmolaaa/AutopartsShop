import { type WrappedFieldProps } from 'redux-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface TextFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

/**
 * Bridge between redux-form's <Field> and the shadcn <Input>.
 * redux-form injects `input` (value/onChange/onBlur…) and `meta` (error/touched).
 */
export function TextField({
  input,
  meta,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: WrappedFieldProps & TextFieldProps) {
  const showError = meta.touched && Boolean(meta.error);
  return (
    <div className="space-y-2">
      <Label htmlFor={input.name}>{label}</Label>
      <Input
        {...input}
        id={input.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={showError}
      />
      {showError && (
        <p className="text-sm text-destructive" role="alert">
          {meta.error}
        </p>
      )}
    </div>
  );
}
