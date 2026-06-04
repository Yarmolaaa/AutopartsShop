import { Field, reduxForm, type InjectedFormProps } from 'redux-form';
import { TextField } from '@/components/auth/form-fields';
import { cardNumber, required } from '@/components/auth/validators';
import { Button } from '@/components/ui/button';
import type { ShippingDetails } from '@/types';

function CheckoutFormBase({
  handleSubmit,
  submitting,
  error,
}: InjectedFormProps<ShippingDetails>) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Field
        name="fullName"
        component={TextField}
        label="Ім'я та прізвище"
        autoComplete="name"
        validate={[required]}
      />
      <Field
        name="address"
        component={TextField}
        label="Адреса доставки"
        autoComplete="street-address"
        validate={[required]}
      />
      <div className="grid grid-cols-2 gap-4">
        <Field
          name="city"
          component={TextField}
          label="Місто"
          autoComplete="address-level2"
          validate={[required]}
        />
        <Field
          name="postalCode"
          component={TextField}
          label="Поштовий індекс"
          autoComplete="postal-code"
          validate={[required]}
        />
      </div>
      <Field
        name="cardNumber"
        component={TextField}
        label="Номер картки"
        placeholder="0000 0000 0000 0000"
        autoComplete="cc-number"
        validate={[required, cardNumber]}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Оформлення…' : 'Підтвердити замовлення'}
      </Button>
    </form>
  );
}

export const CheckoutForm = reduxForm<ShippingDetails>({ form: 'checkout' })(
  CheckoutFormBase,
);
