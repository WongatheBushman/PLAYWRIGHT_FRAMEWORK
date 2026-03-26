//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Vector3 Subtraction Test", () => {
  //Test
  //Function: creates three vector3 objects and subtracts them from one another, then checks result
  //Testing: checks if the two resulting vectors are of correct length, also checks if the original vectors are subtracted correctly
  //Expected Result: vtest1/vtest2 should have correct length, v1 after test should be v1-v2, v2 after test should be v2-v3
  // v3 should remain unchanged
  test("Vector3 Subtraction", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const results: string[] = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const v1 = new F.Vector3(1, 2, 3);
      const v2 = new F.Vector3(4, 5, 6);
      const v3 = new F.Vector3(6, 4, 8);
      const vtest1 = v1.subtract(v2);
      const vtest2 = v2.subtract(v3);       
      return {
        vtest1: { x: vtest1.x, y: vtest1.y, z: vtest1.z },
        vtest2: { x: vtest2.x, y: vtest2.y, z: vtest2.z },
        v1: { x: v1.x, y: v1.y, z: v1.z },
        v2: { x: v2.x, y: v2.y, z: v2.z },
        v3: { x: v3.x, y: v3.y, z: v3.z }
      };
    });
    expect(results.vtest1).toEqual({ x: -3, y: -3, z: -3 });
    expect(results.vtest2).toEqual({ x: -2, y: 1, z: -2 });
    expect(results.v1).toEqual({ x: -3, y: -3, z: -3 });
    expect(results.v2).toEqual({ x: -2, y: 1, z: -2 });
    expect(results.v3).toEqual({ x: 6, y: 4, z: 8 });
  });
});