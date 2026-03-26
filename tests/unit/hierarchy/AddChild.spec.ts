//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe('FUDGE Node Hierarchy Test AddChild', () => {
//Test
//Function: Tests if a child node is correctly appended to a parent node
//Testing: Adds a child node to a parent, then checks if length of array containing children of parent is equal to 1
//Expected Result: Lenght of array should be 1
  test('AddChild', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.testUtils !== undefined);
    const count = await page.evaluate(() => {
      const parent = window.testUtils.createNode("Parent");
      const child = window.testUtils.createNode("Child");
      parent.addChild(child);
      return parent.getChildren().length;
    });
    expect(count).toBe(1);
  });
});

