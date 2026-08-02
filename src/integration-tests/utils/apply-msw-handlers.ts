import { Page } from '@playwright/test';
import { RequestHandler } from 'msw';

export async function applyMswHandlers(
  page: Page,
  handlers: RequestHandler[],
): Promise<void> {
  await page.route('http://localhost:5079/**', async (route) => {
    const pwReq = route.request();
    const method = pwReq.method();
    const postData = pwReq.postData();

    const request = new Request(pwReq.url(), {
      method,
      headers: pwReq.headers(),
      body: ['GET', 'HEAD'].includes(method)
        ? undefined
        : (postData ?? undefined),
    });

    for (const handler of handlers) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (handler as any).run({
        request: request.clone(),
        requestId: crypto.randomUUID(),
      });

      if (result?.response) {
        const body = await result.response.text();
        await route.fulfill({
          status: result.response.status,
          headers: Object.fromEntries(result.response.headers.entries()),
          body,
        });
        return;
      }
    }

    await route.abort();
  });
}
