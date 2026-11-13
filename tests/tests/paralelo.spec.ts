import { test } from '@playwright/test';

for (let i = 1; i <= 6; i++) {
  test(`test ${i}`, async ({ page }) => {
    console.log(`test ${i} → worker ${test.info().workerIndex}`);
    await page.goto('/');
    await page.waitForTimeout(1000); // SOLO para este experimento, para que se note el tiempo
  });
}