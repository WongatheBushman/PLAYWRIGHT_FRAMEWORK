//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Matrix4X4 Rotation Test", async () => {
  //Test
  //Function: Tests if a matrix is correctly rotated by a vector
  //Testing: creates an identity matrix and a vector, then rotates the matrix by the vector
  //Expected Result: X rotation of the matrix should be 90
  test("Matrix4x4 Rotation", async ({ page }) => {
    await page.goto("");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const matrix = F.Matrix4x4.IDENTITY();
      const vector = new F.Vector3(90, 0, 0);
      matrix.rotate(vector);
      return matrix.rotation;
    });
    expect(result).toStrictEqual({"x": 90, "y": -0, "z": 0});
  });
});