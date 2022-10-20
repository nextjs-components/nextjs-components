import { expect, test } from "@playwright/test";

test.describe("basic behavior", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("input props are forwarded", async ({ page }) => {
    const input = page.locator(`input[placeholder="Search…"]`);
    await expect(input).toHaveCount(1);
  });
});
