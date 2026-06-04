import {
  Field,
  reduxForm,
  type InjectedFormProps,
  type FormErrors,
} from 'redux-form';
import { TextField } from './form-fields';
import { email, minLength, required } from './validators';
import { Button } from '@/components/ui/button';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const minLength2 = minLength(2);
const minLength6 = minLength(6);

// Form-level (record) validation — cross-field check that code can do trivially,
// so no reason to reach for anything fancier (deterministic rule).
function validate(values: RegisterFormValues): FormErrors<RegisterFormValues> {
  const errors: FormErrors<RegisterFormValues> = {};
  if (values.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Паролі не збігаються';
  }
  return errors;
}

function RegisterFormBase({
  handleSubmit,
  submitting,
  error,
}: InjectedFormProps<RegisterFormValues>) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        name="name"
        component={TextField}
        label="Ім'я"
        placeholder="Іван Петренко"
        autoComplete="name"
        validate={[required, minLength2]}
      />
      <Field
        name="email"
        component={TextField}
        label="Електронна пошта"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        validate={[required, email]}
      />
      <Field
        name="password"
        component={TextField}
        label="Пароль"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        validate={[required, minLength6]}
      />
      <Field
        name="confirmPassword"
        component={TextField}
        label="Підтвердьте пароль"
        type="password"
        placeholder="••••••••"
        autoComplete="new-password"
        validate={[required]}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Створення…' : 'Створити акаунт'}
      </Button>
    </form>
  );
}

export const RegisterForm = reduxForm<RegisterFormValues>({
  form: 'register',
  validate,
})(RegisterFormBase);
