const { expect } = require('@playwright/test');

class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText('Your order has been dispatched');
  }
}

module.exports = { CheckoutCompletePage };
