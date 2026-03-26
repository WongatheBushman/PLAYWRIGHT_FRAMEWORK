//import necessary test-functions from playwright library
import { test, expect } from '@playwright/test';
//Test Description
test.describe('FUDGE Node Test - Add Component', () => {
    //Test
    //Function: Tests if components are added to a node
    //Testing: creates a node, then adds two components to it, then checks if the list of components of the node has the
    // correct length
    //Expected Result: Lenght of array should be 2
    test('Add Component', async ({ page }) => {
        await page.goto('/');
        await page.waitForFunction(() => window.testUtils !== undefined);
        const result = await page.evaluate(() => {
            const F = window.testUtils.FudgeCore;
            const node = new F.Node("Node");
            node.addComponent(new F.ComponentTransform());
            node.addComponent(new F.ComponentCamera());
            return node.getAllComponents();
        });
        expect(result).toHaveLength(2);
    });
});