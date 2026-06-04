import { cardNumber, email, maxLength, minLength, required } from './validators';

describe('required', () => {
  it('rejects empty / whitespace values', () => {
    expect(required('')).toBe("Обов'язкове поле");
    expect(required('   ')).toBe("Обов'язкове поле");
    expect(required(undefined)).toBe("Обов'язкове поле");
  });
  it('accepts non-empty values', () => {
    expect(required('привіт')).toBeUndefined();
  });
});

describe('email', () => {
  it('rejects malformed addresses', () => {
    expect(email('not-an-email')).toBe('Введіть коректну електронну пошту');
    expect(email('foo@bar')).toBe('Введіть коректну електронну пошту');
  });
  it('accepts valid addresses (and empty — required handles emptiness)', () => {
    expect(email('user@example.com')).toBeUndefined();
    expect(email('')).toBeUndefined();
  });
});

describe('minLength / maxLength', () => {
  it('enforces a minimum length', () => {
    expect(minLength(6)('12345')).toBe('Мінімум 6 символів');
    expect(minLength(6)('123456')).toBeUndefined();
  });
  it('enforces a maximum length', () => {
    expect(maxLength(3)('1234')).toBe('Максимум 3 символів');
    expect(maxLength(3)('123')).toBeUndefined();
  });
});

describe('cardNumber', () => {
  it('accepts 13–19 digits with optional spaces', () => {
    expect(cardNumber('4111 1111 1111 1111')).toBeUndefined();
    expect(cardNumber('4111111111111')).toBeUndefined();
  });
  it('rejects too-short or non-numeric values', () => {
    expect(cardNumber('123')).toBe('Введіть коректний номер картки');
    expect(cardNumber('abcd efgh')).toBe('Введіть коректний номер картки');
  });
});
