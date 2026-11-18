
const { test, expect } = require('@playwright/test');

const website = 'https://www.saucedemo.com/';

// Common login setup for each scenario
test.beforeEach(async ({ page }) => {
    await page.goto(website);

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
});

// TC_CART_001 - Add product to cart
test('TC_CART_001 - Add product to shopping cart', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');
});

// TC_CART_002 - Remove product from cart
test('TC_CART_002 - Remove product from shopping cart', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.cart_item')).toHaveCount(0);
});

// TC_CHECKOUT_001 - Complete purchase
test('TC_CHECKOUT_001 - Complete shopping checkout', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await page.locator('.shopping_cart_link').click();

    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('QA');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('600001');

    await page.locator('[data-test="continue"]').click();

    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('[data-test="complete-header"]'))
        .toHaveText('Thank you for your order!');
});
