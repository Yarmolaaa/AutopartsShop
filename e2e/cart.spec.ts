import { test, expect } from '@playwright/test';

const DEMO = { email: 'demo@shop.dev', password: 'password123' };

test.describe('Кошик і оформлення', () => {
  test('додає товар, оформлює замовлення та показує підтвердження', async ({
    page,
  }) => {
    // Checkout is protected, so log in first.
    await page.goto('/login');
    await page.getByLabel('Електронна пошта').fill(DEMO.email);
    await page.getByLabel('Пароль').fill(DEMO.password);
    await page.getByRole('button', { name: 'Увійти' }).click();
    await expect(page).toHaveURL(/\/products$/);

    // Add the first product to the cart; the navbar badge updates.
    await page
      .getByRole('button', { name: /до кошика/i })
      .first()
      .click();
    await expect(page.getByTestId('cart-count')).toHaveText('1');

    // Open the cart.
    await page.getByRole('link', { name: 'Кошик' }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByTestId('cart-item')).toHaveCount(1);

    // Proceed to checkout.
    await page.getByRole('link', { name: 'Оформити замовлення' }).click();
    await expect(page).toHaveURL(/\/checkout$/);

    // Fill the checkout form.
    await page.getByLabel("Ім'я та прізвище").fill('Іван Петренко');
    await page.getByLabel('Адреса доставки').fill('вул. Хрещатик 1');
    await page.getByLabel('Місто').fill('Київ');
    await page.getByLabel('Поштовий індекс').fill('01001');
    await page.getByLabel('Номер картки').fill('4111 1111 1111 1111');
    await page.getByRole('button', { name: 'Підтвердити замовлення' }).click();

    // Confirmation with an order number.
    await expect(page.getByText('Дякуємо за замовлення!')).toBeVisible();
    await expect(page.getByText(/UA-\d+/)).toBeVisible();
  });

  test('перенаправляє неавторизованих із /checkout на вхід', async ({
    page,
  }) => {
    await page.goto('/checkout');
    await expect(page).toHaveURL(/\/login$/);
  });
});
