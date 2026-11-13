// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/user.json';

setup('login', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);       // asegura que sí entró
  await page.context().storageState({ path: authFile });
});