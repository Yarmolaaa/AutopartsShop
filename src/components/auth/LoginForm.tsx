import { Field, reduxForm, type InjectedFormProps } from 'redux-form';
import { TextField } from './form-fields';
import { email, minLength, required } from './validators';
import { Button } from '@/components/ui/button';
import type { Credentials } from '@/types';

const minLength6 = minLength(6);

function LoginFormBase({
  handleSubmit,
  submitting,
  error,
}: InjectedFormProps<Credentials>) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
        autoComplete="current-password"
        validate={[required, minLength6]}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Вхід…' : 'Увійти'}
      </Button>
    </form>
  );
}

export const LoginForm = reduxForm<Credentials>({ form: 'login' })(
  LoginFormBase,
);
