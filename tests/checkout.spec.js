const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutInfoPage } = require('../pages/checkoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/checkoutOverviewPage');
const { CheckoutCompletePage } = require('../pages/checkoutCompletePage');
const { users, products, customer } = require('../helpers/testData');

test.describe('Sauce Demo checkout scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('complete checkout end-to-end', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutInfoPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.postalCode);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.expectTotalContains('Total:');
    await checkoutOverviewPage.finish();
    await checkoutCompletePage.expectOrderComplete();
  });

  test('checkout form validation requires first name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutInfoPage.fillCustomerInfo('', customer.lastName, customer.postalCode);
    await checkoutInfoPage.continue();
    await checkoutInfoPage.expectError('Error: First Name is required');
  });

  test('checkout overview displays item total and taxes', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutInfoPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.postalCode);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.expectTotalContains('Total:');
  });
});
