const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectProductInCart(productName) {
    await expect(this.page.locator(`.cart_item:has-text("${productName}")`)).toBeVisible();
  }

  async expectProductNotInCart(productName) {
    await expect(this.page.locator(`.cart_item:has-text("${productName}")`)).toHaveCount(0);
  }

  async removeProduct(productName) {
    await this.page.locator(`.cart_item:has-text("${productName}") button:has-text("Remove")`).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async expectItemCount(count) {
    await expect(this.cartItems).toHaveCount(count);
  }
}

module.exports = { CartPage };
