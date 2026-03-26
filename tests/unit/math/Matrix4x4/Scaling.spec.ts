//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Matrix4X4 Scaling Test", async () => {
  //Test
  //Function: Tests if a matrix is correctly scaled by a vector
  //Testing: creates an identity matrix and a vector, then scales the matrix by the vector
  //Expected Result: the x,y and z scales of the matrix should be 2,3 and 4
  test("Matrix4x4 Scaling", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const matrix = F.Matrix4x4.IDENTITY();
      const vector = new F.Vector3(2, 3, 4);
      matrix.scale(vector);
      return matrix.scaling;
    });
    expect(result).toStrictEqual({"x": 2, "y": 3, "z": 4});
  });
});