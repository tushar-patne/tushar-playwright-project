const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { users, products } = require('../helpers/testData');

test.describe('Sauce Demo cart scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('add product to cart and verify cart content', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.expectCartBadgeCount(1);
    await inventoryPage.goToCart();
    await cartPage.expectProductInCart(products.backpack);
  });

  test('multiple items update the cart badge correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.expectCartBadgeCount(2);
  });

  test('remove product from cart and verify it disappears', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.goToCart();
    await cartPage.expectProductInCart(products.backpack);
    await cartPage.removeProduct(products.backpack);
    await cartPage.expectProductNotInCart(products.backpack);
  });
});
