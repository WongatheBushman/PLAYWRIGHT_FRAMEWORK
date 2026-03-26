//Imports from Playwright Library
import { test, expect } from "@playwright/test";
//Test Description
test.describe("FUDGE Vector3 Addition Test", () => {
  //Test
  //Function: creates three vector3 objects and adds them together, then checks result
  //Testing: checks if the two resulting vectors are of correct lenght, also checks if the original vectors are added correctly
  //Expected Result: vtest1/vtest2 should have correct length, v1 after test should be v1+v2, v2 after test should be v1+v2+v3
  // v3 should remain unchanged
  test("Vector3 Addition using numeric comparison", async ({ page }) => {
    //Go to page on test server and wait for window.testUtils
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    //access page and run test when ready
    const results = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      //crate new vector3 objects
      const v1 = new F.Vector3(1, 2, 3);
      const v2 = new F.Vector3(4, 5, 6);
      const v3 = new F.Vector3(6, 4, 8);
      //addition
      const vtest1 = v1.add(v2);
      const vtest2 = v2.add(v3);
      //return object with results
      return {
        vtest1: { x: vtest1.x, y: vtest1.y, z: vtest1.z },
        vtest2: { x: vtest2.x, y: vtest2.y, z: vtest2.z },
        v1: { x: v1.x, y: v1.y, z: v1.z },
        v2: { x: v2.x, y: v2.y, z: v2.z },
        v3: { x: v3.x, y: v3.y, z: v3.z }
      };
    });
    //Assertions
    expect(results.vtest1).toEqual({ x: 5, y: 7, z: 9 });
    expect(results.vtest2).toEqual({ x: 10, y: 9, z: 14 });
    expect(results.v1).toEqual({ x: 5, y: 7, z: 9 });
    expect(results.v2).toEqual({ x: 10, y: 9, z: 14 });
    expect(results.v3).toEqual({ x: 6, y: 4, z: 8 });
  });
});