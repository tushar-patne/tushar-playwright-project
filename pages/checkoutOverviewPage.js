const { expect } = require('@playwright/test');

class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async expectTotalContains(value) {
    await expect(this.summaryTotal).toContainText(value);
  }

  async finish() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutOverviewPage };
