//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Vector3 Difference Test", () => {
  //Test
  //Function: Tests if the difference between two vectos is computed correctly
  //Testing: creates three vectors then computes the difference between them in order and stores the result in three new vectors
  //Expected Result: vtest1(-3, -3, -3 ), vtest2(-2, 1, -2), vtest3(5, 2, 5), the original thre vectors should remain unchanged
  test("Vector3 Difference using numeric comparison", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const results = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const v1 = new F.Vector3(1, 2, 3);
      const v2 = new F.Vector3(4, 5, 6);
      const v3 = new F.Vector3(6, 4, 8);
      const vtest1 = F.Vector3.DIFFERENCE(v1, v2);
      const vtest2 = F.Vector3.DIFFERENCE(v2, v3); 
      const vtest3 = F.Vector3.DIFFERENCE(v3, v1); 
      return {
        vtest1: { x: vtest1.x, y: vtest1.y, z: vtest1.z },
        vtest2: { x: vtest2.x, y: vtest2.y, z: vtest2.z },
        vtest3: { x: vtest3.x, y: vtest3.y, z: vtest3.z },
        v1: { x: v1.x, y: v1.y, z: v1.z },
        v2: { x: v2.x, y: v2.y, z: v2.z },
        v3: { x: v3.x, y: v3.y, z: v3.z }
      };
    });
    expect(results.vtest1).toEqual({ x: -3, y: -3, z: -3 });
    expect(results.vtest2).toEqual({ x: -2, y: 1, z: -2 });
    expect(results.vtest3).toEqual({ x: 5, y: 2, z: 5 });
    expect(results.v1).toEqual({ x: 1, y: 2, z: 3 });
    expect(results.v2).toEqual({ x: 4, y: 5, z: 6 });
    expect(results.v3).toEqual({ x: 6, y: 4, z: 8 });
  });
});