const {test, expect} = require('@playwright/test');
// const { test, expect } = require('@playwright/test');

test('Sauce demo test-1 login and verify page title, item list and first item', async ({page})=>{

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

    // wait for the inventory to render before reading it
    await expect(page.locator(".inventory_item_name")).toHaveCount(6);

    const itemsTitle = await page.locator(".inventory_item_name ").allTextContents();
    console.log(`The list of items are ${itemsTitle}`);
    console.log("##########");
    console.log(`The first item name is ${itemsTitle[0]}`);

    expect(itemsTitle).toEqual([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
    ]);
    expect(itemsTitle[0]).toBe('Sauce Labs Backpack');

})

test('Sauce demo test-2 add one item to cart', async ({page})=>{

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

test('Sauce demo test-3 add most expensive item to cart', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    // find the most expensive item
    const items = page.locator(".inventory_item");
    await expect(items).toHaveCount(6);
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

test('Sauce demo test-4 invalid login shows error', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("wrong_password");
    await page.locator("#login-button").click();

    await expect(page.locator("[data-test='error']")).toContainText("Username and password do not match");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
})

test('Sauce demo test-5 locked out user and empty credentials', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");

    // empty submit
    await page.locator("#login-button").click();
    await expect(page.locator("[data-test='error']")).toContainText("Username is required");

    // locked out user
    await page.locator("#user-name").fill("locked_out_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page.locator("[data-test='error']")).toContainText("locked out");
})

test('Sauce demo test-6 logout', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("#react-burger-menu-btn").click();
    await page.locator("#logout_sidebar_link").click();

    await expect(page.locator("#login-button")).toBeVisible();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
})

test('Sauce demo test-7 sort by price low to high', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("[data-test='product-sort-container']").selectOption("lohi");

    await expect(page.locator(".inventory_item_price").first()).toHaveText("$7.99");
    const priceTexts = await page.locator(".inventory_item_price").allTextContents();
    const prices = priceTexts.map(p => parseFloat(p.replace("$", "")));
    expect(prices.length).toBe(6);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
})

test('Sauce demo test-8 remove item from cart', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("[data-test^='add-to-cart']").first().click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".cart_item")).toHaveCount(1);

    await page.locator("[data-test^='remove']").click();
    await expect(page.locator(".cart_item")).toHaveCount(0);
    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
})

test('Sauce demo test-9 checkout flow', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("[data-test^='add-to-cart']").first().click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("[data-test='checkout']").click();

    await page.locator("[data-test='firstName']").fill("Test");
    await page.locator("[data-test='lastName']").fill("User");
    await page.locator("[data-test='postalCode']").fill("12345");
    await page.locator("[data-test='continue']").click();

    await expect(page.locator(".cart_item")).toHaveCount(1);
    await page.locator("[data-test='finish']").click();

    await expect(page.locator("[data-test='complete-header']")).toHaveText("Thank you for your order!");
})

test('Sauce demo test-10 checkout requires first name', async ({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await page.locator("[data-test^='add-to-cart']").first().click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("[data-test='checkout']").click();
    await page.locator("[data-test='continue']").click();

    await expect(page.locator("[data-test='error']")).toContainText("First Name is required");
})