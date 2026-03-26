//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe('FUDGE Node Test - Create Node', () => {
  //Test
  //Function: Tests if a node is created
  //Testing: creates a node, then checks if it exists
  //Expected Result: Name of the node should be "NodeA"
  test('Create Node', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const node = new F.Node("NodeA");
      return node.name;
    });
    expect(result).toBe("NodeA");
  });
});