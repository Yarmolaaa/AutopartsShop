import { Field, reduxForm, type InjectedFormProps } from 'redux-form';
import { TextField } from './form-fields';
import { email, required } from './validators';
import { Button } from '@/components/ui/button';
import type { UpdateProfilePayload } from '@/types';

function ProfileFormBase({
  handleSubmit,
  submitting,
  pristine,
  error,
}: InjectedFormProps<UpdateProfilePayload>) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        name="name"
        component={TextField}
        label="Ім'я"
        autoComplete="name"
        validate={[required]}
      />
      <Field
        name="email"
        component={TextField}
        label="Електронна пошта"
        type="email"
        autoComplete="email"
        validate={[required, email]}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" disabled={submitting || pristine}>
        {submitting ? 'Збереження…' : 'Зберегти зміни'}
      </Button>
    </form>
  );
}

// `enableReinitialize` lets the form pick up `initialValues` once the user loads.
export const ProfileForm = reduxForm<UpdateProfilePayload>({
  form: 'profile',
  enableReinitialize: true,
})(ProfileFormBase);
