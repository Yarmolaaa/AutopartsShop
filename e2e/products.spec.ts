import { test, expect } from '@playwright/test';

test.describe('Перегляд товарів', () => {
  test('кореневий шлях перенаправляє на список товарів', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/products$/);
    await expect(
      page.getByRole('heading', { name: 'Товари', level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Бездротові навушники')).toBeVisible();
  });

  test('живий пошук фільтрує каталог під час набору', async ({ page }) => {
    await page.goto('/products');
    await expect(page.getByText('Бездротові навушники')).toBeVisible();

    await page.getByLabel('Пошук товарів').fill('клавіатура');

    // After debounce + mock latency only the matching product remains.
    await expect(
      page.getByRole('heading', { name: 'Механічна клавіатура' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Бездротові навушники' }),
    ).toHaveCount(0);
  });

  test('відкриває сторінку деталей товару (React Query)', async ({ page }) => {
    await page.goto('/products');
    await page
      .getByRole('link', { name: /детальніше/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/products\/\d+$/);
    await expect(
      page.getByRole('button', { name: /до кошика/i }),
    ).toBeVisible();
  });
});
