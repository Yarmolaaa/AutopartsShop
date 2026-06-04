import { test, expect } from '@playwright/test';

const DEMO = { email: 'demo@shop.dev', password: 'password123' };

test.describe('Автентифікація', () => {
  test('показує помилки валідації для порожньої форми входу', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Увійти' }).click();
    await expect(page.getByText("Обов'язкове поле").first()).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('вхід, а потім вихід', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Електронна пошта').fill(DEMO.email);
    await page.getByLabel('Пароль').fill(DEMO.password);
    await page.getByRole('button', { name: 'Увійти' }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(
      page.getByRole('link', { name: 'Демо користувач' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Вийти' }).click();
    await expect(page.getByRole('link', { name: 'Увійти' })).toBeVisible();
  });

  test('перенаправляє неавторизованих із /profile', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('реєстрація нового акаунта', async ({ page }) => {
    const email = 'newuser@shop.dev';
    await page.goto('/register');
    await page.getByLabel("Ім'я").fill('Новий користувач');
    await page.getByLabel('Електронна пошта').fill(email);
    await page.getByLabel('Пароль', { exact: true }).fill('password123');
    await page.getByLabel('Підтвердьте пароль').fill('password123');
    await page.getByRole('button', { name: 'Створити акаунт' }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(
      page.getByRole('link', { name: 'Новий користувач' }),
    ).toBeVisible();
  });
});
