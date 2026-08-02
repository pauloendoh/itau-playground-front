import { Page, Request, expect, test } from '@playwright/test';
import { localStorageKeys } from '../../../app/utils/constants/local-storage-keys';
import { urls } from '../../../app/utils/constants/urls';
import { applyMswHandlers } from '../../utils/apply-msw-handlers';
import { authHandlers, imocks } from '../../utils/handlers/auth.handlers';

test.describe('Authentication flow', () => {
  test.describe('WHEN user is logged', () => {
    test.describe.configure({ mode: 'serial' });

    let page: Page;
    let loginRequestPromise: Promise<Request> | null = null;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      await page.addInitScript(
        (key) => localStorage.removeItem(key),
        localStorageKeys.user,
      );
      await applyMswHandlers(page, authHandlers);

      // ARRANGE
      await page.goto('/');
      await expect(page.getByLabel('Username')).toBeVisible();
      await page.getByLabel('Username').fill(imocks.loggedUser.username);
      await page.getByLabel('Password').fill('anypassword');

      await page.getByRole('button', { name: 'Login' }).click();
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('SHOULD go the correct page', async () => {
      await expect(page).toHaveURL(urls.pages.index);
      const url = page.url();
      console.log('Current URL:', url);
    });

    test('SHOULD show logout icon', async () => {
      await expect(page.getByTestId('logout-icon')).toBeVisible();
    });
  });
});
