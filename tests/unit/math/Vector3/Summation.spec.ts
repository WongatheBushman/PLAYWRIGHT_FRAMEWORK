//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Vector3 Summation Test", () => {
  //Test
  //Function: creates three vector3 objects and sums two of them together in every permutation
  //Testing: checks if the three resulting vectors are of correct length, also checks if the original vectors are unchanged
  //Expected Result: vtest1/vtest2/vtest3 should have correct length, v1/v2/v3 should remain unchanged
  // v3 should remain unchanged
  test("Vector3 Summation", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const results: string[] = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const v1 = new F.Vector3(1, 2, 3);
      const v2 = new F.Vector3(4, 5, 6);
      const v3 = new F.Vector3(6, 4, 8);
      const vtest1 = F.Vector3.SUM(v1, v2);
      const vtest2 = F.Vector3.SUM(v2, v3);
      const vtest3 = F.Vector3.SUM(v3, v1);
      return {
        vtest1: { x: vtest1.x, y: vtest1.y, z: vtest1.z },
        vtest2: { x: vtest2.x, y: vtest2.y, z: vtest2.z },
        vtest3: { x: vtest3.x, y: vtest3.y, z: vtest3.z },
        v1: { x: v1.x, y: v1.y, z: v1.z },
        v2: { x: v2.x, y: v2.y, z: v2.z },
        v3: { x: v3.x, y: v3.y, z: v3.z }
      };
    });
    expect(results.vtest1).toEqual({ x: 5, y: 7, z: 9 });
    expect(results.vtest2).toEqual({ x: 10, y: 9, z: 14 });
    expect(results.vtest3).toEqual({ x: 7, y: 6, z: 11 });
    expect(results.v1).toEqual({ x: 1, y: 2, z: 3 });
    expect(results.v2).toEqual({ x: 4, y: 5, z: 6 });
    expect(results.v3).toEqual({ x: 6, y: 4, z: 8 });
  });
});