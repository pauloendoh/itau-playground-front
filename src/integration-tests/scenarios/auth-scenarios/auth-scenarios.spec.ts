import { expect, test } from '@playwright/test';
import { localStorageKeys } from '../../../app/utils/constants/local-storage-keys';
import { urls } from '../../../app/utils/constants/urls';
import { authHandlers, imocks } from '../../handlers/auth.handlers';
import { applyMswHandlers } from '../../support/apply-msw-handlers';

test.describe('Authentication flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      (key) => localStorage.removeItem(key),
      localStorageKeys.user,
    );
    await applyMswHandlers(page, authHandlers);
  });

  test('Auth scenarios', async ({ page }) => {
    // ARRANGE
    await page.goto('/');
    await expect(page.getByLabel('Username')).toBeVisible();
    await page.getByLabel('Username').fill(imocks.loggedUser.username);
    await page.getByLabel('Password').fill('anypassword');
    const loginRequestPromise = page.waitForRequest(urls.api.authLogin);

    // ACT
    await page.getByRole('button', { name: 'Login' }).click();

    // ASSERT
    const loginRequest = await loginRequestPromise;
    expect(JSON.parse(loginRequest.postData() ?? '{}')).toEqual({
      username: imocks.loggedUser.username,
      password: 'anypassword',
    });
    await expect(
      page.getByText(`Welcome, ${imocks.loggedUser.username}!`),
    ).toBeVisible();
    await expect(page.getByText(imocks.loggedUser.email)).toBeVisible();
    await expect(page.getByText(imocks.loggedUser.id)).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByLabel('Username')).toBeVisible();
  });
});
