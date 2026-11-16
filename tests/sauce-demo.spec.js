const {test, expect} = require('@playwright/test');
// const { test, expect } = require('@playwright/test');

test.only('Sauce demo test', async ({page})=>{

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
//