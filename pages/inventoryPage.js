const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.productItems = page.locator('.inventory_item');
  }

  async expectOnInventoryPage() {
    await expect(this.title).toHaveText('Products');
  }

  async addToCart(productName) {
    await this.page.locator(`.inventory_item:has-text("${productName}") button:has-text("Add to cart")`).click();
  }

  async expectCartBadgeCount(count) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
