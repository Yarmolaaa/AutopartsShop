// Sync validators for redux-form (section 3.5).
// Each returns `undefined` when valid, or an error string when invalid.

export type Validator = (value: string | undefined) => string | undefined;

export const required: Validator = (value) =>
  value && value.trim() ? undefined : "Обов'язкове поле";

export const email: Validator = (value) =>
  value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
    ? 'Введіть коректну електронну пошту'
    : undefined;

export const minLength =
  (min: number): Validator =>
  (value) =>
    value && value.length < min ? `Мінімум ${min} символів` : undefined;

export const maxLength =
  (max: number): Validator =>
  (value) =>
    value && value.length > max ? `Максимум ${max} символів` : undefined;

/** Card number: 13–19 digits, spaces allowed. */
export const cardNumber: Validator = (value) => {
  if (!value) return undefined;
  const digits = value.replace(/\s/g, '');
  return /^\d{13,19}$/.test(digits)
    ? undefined
    : 'Введіть коректний номер картки';
};
