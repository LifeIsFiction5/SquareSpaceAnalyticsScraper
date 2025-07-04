import { test, expect } from "@playwright/test";

//https://account.squarespace.com/

test("Gather analytics for traffic: Past Two Weeks",{ tag:["@gather-analytics"] }, async ( {page} ) => {
await page.goto("/");
await page.locator('[data-test="product-row"]').getByRole('link', { name: 'Website' }).click();
await page.locator('[data-test="menuItem-analytics"]').click();
await page.getByRole('button', { name: 'Last 30 Days' }).click();
await page.locator('[data-test="screen-wrapper"]').getByText('Custom').click();
//TODO: Make the date selector the past 2 weeks dynamically

await page.getByRole('group').filter({ hasText: 'June' }).locator('[data-test="month-nav-previous"]').click();
await page.getByRole('button', { name: '5/22/' }).click();
await page.getByRole('button', { name: '7/3/' }).click();
await page.locator('[data-test="screen-wrapper"]').getByRole('button', { name: 'Custom' }).click();
await page.waitForLoadState("networkidle");
const visits = await page.locator('.react-charts-tab:has(.react-charts-tab-label:has-text("Visits")) .react-charts-tab-value').textContent();
const uniqueVisitors = await page.locator('.react-charts-tab:has(.react-charts-tab-label:has-text("Unique Visitors")) .react-charts-tab-value').textContent();
const pageViews = await page.locator('.react-charts-tab:has(.react-charts-tab-label:has-text("Pageviews")) .react-charts-tab-value').textContent();


//TODO: Modularize this test to be separate from other analytics tests
//Tab over to Traffic Sources

await page.getByRole("tab", {name: "Traffic Sources"}).click();
const searchValueTest = await page.getByRole("button").locator("span[text=earch]").allTextContents();
const allValuesTrafficSources = await page.locator(".css-160wa40").allTextContents();
console.log("SEARCH:", searchValueTest);
console.log("ALL VALUES:", allValuesTrafficSources)
if (!searchValueTest) {
    console.log("I'M GAY");
    console.log("F")
}
console.log(`Visitors: ${visits},  Unique Visitors: ${uniqueVisitors}, Page Views: ${pageViews}`);
});