
const { test, expect } = require('@playwright/test');

const website = 'https://www.saucedemo.com/';

// TC_LOGIN_001: Successful login
test('TC_LOGIN_001 - Valid user login', async ({ page }) => {

    await page.goto(website);

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);

    console.log('Valid login successful');
});

// TC_INV_001: Verify product inventory
test('TC_INV_001 - Verify six products are displayed', async ({ page }) => {

    await page.goto(website);

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    console.log('Product inventory verified');
});

// TC_LOGIN_002: Locked user login
test('TC_LOGIN_002 - Locked user cannot login', async ({ page }) => {

    await page.goto(website);

    await page.locator('[data-test="username"]').fill('locked_out_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Sorry, this user has been locked out');

    console.log('Locked user validation successful');
});
