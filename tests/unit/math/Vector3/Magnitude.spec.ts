//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Vector3 Magnitude Test", () => {
  //Test
  //Function: creates three vector3 objects and gives back their magnitude
  //Testing: checks if the magnitude of the given vectors is correct
  //Expected Result: magnitude of vectors should be: v1 = 5, v2 = -7, v3 = 15
  test('Vector3 Magnitude', async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const results: int[] = await page.evaluate(() => {
        const F = window.testUtils.FudgeCore;
        const v1 = new F.Vector3(3,4,0);
        const v2 = new F.Vector3(2,-3,6);
        const v3 = new F.Vector3(10,10,5);
        const results: int[] = [];
        results[0] = v1.magnitude;
        results[1] = v2.magnitude;
        results[2] = v3.magnitude;

      return results;
    });
    expect(results[0]).toBe(5);
    expect(results[1]).toBe(7);
    expect(results[2]).toBe(15);
  });
});


