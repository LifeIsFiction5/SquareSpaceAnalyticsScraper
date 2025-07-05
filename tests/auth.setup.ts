import {test as setup, expect} from "@playwright/test";

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('login to squarespace', { tag: ["@login", "@dependency"] }, async ({ page }) => {
  await page.goto("https://squarespace.com");
  await page.getByRole("link", {name: "Log In"}).click();
  await page.getByPlaceholder("name@example.com").fill('jake.barrett@udcusa.com');
  await page.getByPlaceholder('Password').fill('Bloodborne5$');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL("https://account.squarespace.com/");
  await page.context().storageState({ path: authFile });
});