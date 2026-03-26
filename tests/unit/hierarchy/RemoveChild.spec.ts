//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe('FUDGE Node Hierarchy Tests, Remove Child', () => {
//Test
//Function: Tests if a child nodes can be succefully removed from parent nodes
//Testing: Appends three children nodes to a parent node, then removes one of them again and checks against 
// the length of the array containing the children of parent 
//Expected Result: Length of array should be 2 (two children remaining, one removed)
   test('Remove Child', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const parent = window.testUtils.createNode("Parent");
      const child1 = window.testUtils.createNode("Child1");
      const child2 = window.testUtils.createNode("Child2");
      const child3 = window.testUtils.createNode("Child3");
      parent.addChild(child1);
      parent.addChild(child2);
      parent.addChild(child3);
      parent.removeChild(child2);
      return parent.getChildren().length;
    });
    expect(result).toBe(2);
  });
});
