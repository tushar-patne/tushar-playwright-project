const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { users } = require('../helpers/testData');

test.describe('Sauce Demo login scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectOnInventoryPage();
  });

  test('locked out user sees an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('problem user can access inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.login(users.problem.username, users.problem.password);
    await inventoryPage.expectOnInventoryPage();
    await page.locator('.inventory_item').first().waitFor();
  });
});
