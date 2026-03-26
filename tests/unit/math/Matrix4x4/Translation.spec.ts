//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe("FUDGE Matrix4X4 Translation Test", async () => {
  //Test
  //Function: Tests if a matrix is correctly translated by a vector
  //Testing: creates an identity matrix and a vector, then translates the matrix by the vector
  //Expected Result: the x,y and z translation of the matrix should be 3,4 and 5
  test("Matrix4x4 Translation", async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => window.testUtils !== undefined);
    const result = await page.evaluate(() => {
      const F = window.testUtils.FudgeCore;
      const matrix = F.Matrix4x4.IDENTITY();
      const vector = new F.Vector3(3, 4, 5);
      matrix.translate(vector);
      return matrix.translation;
    });
    expect(result).toStrictEqual({"x": 3, "y": 4, "z": 5});
  });
});