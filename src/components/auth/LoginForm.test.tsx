import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/test-utils';
import { LoginForm } from './LoginForm';

describe('LoginForm (redux-form integration)', () => {
  it('blocks submission and shows the required error for empty fields', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<LoginForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    expect(await screen.findAllByText("Обов'язкове поле")).toHaveLength(2);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with the entered credentials when valid', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    renderWithProviders(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(
      screen.getByLabelText('Електронна пошта'),
      'demo@shop.dev',
    );
    await userEvent.type(screen.getByLabelText('Пароль'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Увійти' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      email: 'demo@shop.dev',
      password: 'password123',
    });
  });
});
