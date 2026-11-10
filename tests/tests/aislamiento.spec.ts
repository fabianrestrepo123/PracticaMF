import { test, expect } from '@playwright/test';

test('A: inicia sesión', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
});

test('B: ¿sigo logueado?', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL(/inventory/);
});



test('strict mode', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByTestId('inventory-item-description').
  filter({ hasText : 'Sauce Labs Bike Light'}).getByRole('button', { name :'Add to cart'}).click();
});

test('usuario demorado', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/, {timeout : 8000});
});

test('agregar dos productos', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('#password').first().fill('secret_sauce');
  await page.getByRole('button', {name : 'Login'}).click();

  await page.locator('.inventory_item').nth(0).getByRole('button', {name :'Add to cart'}).click();
  await page.locator('.inventory_item').nth(1).getByRole('button', {name :'Add to cart'}).click();
  const badge = await page.locator('.shopping_cart_badge').textContent();
  expect(badge).toBe('2');
  expect(await page.locator('.inventory_item').count()).toBe(6);
});
