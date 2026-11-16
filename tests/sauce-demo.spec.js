const {test, expect} = require('@playwright/test');
// const { test, expect } = require('@playwright/test');

test('Sauce demo test', async ({page})=>{

    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginBtn = page.locator("#login-button");

    await page.goto("https://www.saucedemo.com/");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await loginBtn.click();
    
    // await expect(page).toHaveTitle('Swag Labs');

    const pageTitle = await page.title();
    // console.log(await pageTitle);
    console.log(`The title of the page is ${await pageTitle}`);
    await expect(pageTitle).toBe("Swag Labs");

    const itemsTitle = await page.locator(".inventory_item_name ").allTextContents();
    console.log(`The list of items are ${itemsTitle}`);
    console.log("##########");
    console.log(`The first item name is ${itemsTitle[0]}`);

})

test('Sauce demo test-2', async ({page})=>{

    const username = page.locator("#user-name");
    const password = page.locator("#password");
    const loginBtn = page.locator("#login-button");

    await page.goto("https://www.saucedemo.com/");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await loginBtn.click();
    
    // await expect(page).toHaveTitle('Swag Labs');

    const pageTitle = await page.title();
    console.log(await pageTitle);
    await expect(pageTitle).toBe("Swag Labs");

    const itemsTitle = await page.locator(".inventory_item_name ").allTextContents();
    console.log(itemsTitle);
    console.log("##########");
    console.log(itemsTitle[0]);

})

test('Sauce demo test-3 add one item to cart', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    const firstItemName = await page.locator(".inventory_item_name").first().textContent();

    await page.locator("[data-test^='add-to-cart']").first().click();

    // cart badge shows 1 item
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // cart page contains the added item
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator(".inventory_item_name")).toHaveText(firstItemName);
})

test('Sauce demo test-4 add most expensive item to cart', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // find the most expensive item
    const items = page.locator(".inventory_item");
    const count = await items.count();
    let maxPrice = -1;
    let maxIndex = 0;
    for (let i = 0; i < count; i++) {
        const priceText = await items.nth(i).locator(".inventory_item_price").textContent();
        const price = parseFloat(priceText.replace("$", ""));
        if (price > maxPrice) {
            maxPrice = price;
            maxIndex = i;
        }
    }
    const expensiveItem = items.nth(maxIndex);
    const expensiveName = await expensiveItem.locator(".inventory_item_name").textContent();

    await expensiveItem.locator("[data-test^='add-to-cart']").click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // cart contains the most expensive item with the right price
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator(".inventory_item_name")).toHaveText(expensiveName);
    await expect(page.locator(".inventory_item_price")).toHaveText("$" + maxPrice.toFixed(2));
})
//