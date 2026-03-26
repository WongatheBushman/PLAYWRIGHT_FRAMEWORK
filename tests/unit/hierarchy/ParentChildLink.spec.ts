//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe('FUDGE Node Hierarchy Test Parent Child Link', () => {
//Test
//Function: Tests if getParent() works
//Testing: creates two parent nodes and three child nodes, then apppends one child to the first parent
// and the other two to the second parent. Then calls getParent() on all children and checks if the correct
// parents get named
//Expected Result: result1 should be Parent1, result2 and result3 should be Parent2
  test('Parent Child Link', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const parent1 = window.testUtils.createNode("Parent1");
      const child1 = window.testUtils.createNode("Child1");
      const parent2 = window.testUtils.createNode("Parent2");
      const child2 = window.testUtils.createNode("Child2");
      const child3 = window.testUtils.createNode("Child3");
      parent1.addChild(child1);
      parent2.addChild(child2);
      parent2.addChild(child3);
      const result1 = child1.getParent().name
      const result2 = child2.getParent().name
      const result3 = child3.getParent().name
      return {result1, result2, result3};
    });
    expect(result.result1).toBe("Parent1");
    expect(result.result2).toBe("Parent2");
    expect(result.result3).toBe("Parent2");
  });
});

