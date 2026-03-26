//imports from Playwright Library
import { test, expect } from "@playwright/test";
//create page
let page: Page;
//Test Description
test.describe("FUDGE Integration Test – Parent-Child Transform Propagation", () => {
    //BeforeEach-Hook
    //Setup for all following test, run before each Test is started.
    //Creates all necessary Nodes, sets up a Camera and a Viewport and saves them all
    //on the window so the following test can access them.
    test.beforeEach(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto("/");
        await page.waitForFunction(() => window.testUtils !== undefined);
        await page.evaluate(() => {
            const F = window.testUtils.FudgeCore;
            const scene = window.testUtils.createNode("Scene");
            const root = window.testUtils.createNode("Root");
            const parent = window.testUtils.createNode("Parent");
            const childA = window.testUtils.createNode("ChildA");
            const childB = window.testUtils.createNode("ChildB");
            let canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
            canvas.width = 800;
            canvas.height = 600;
            const cameraNode = window.testUtils.createNode("Camera");
            const cmpCamera = new F.ComponentCamera();
            cameraNode.addComponent(cmpCamera);
            scene.appendChild(cameraNode);
            const viewport = new F.Viewport();
            viewport.initialize("IntegrationViewport", scene, cmpCamera, canvas);
            window.__integrationTestData = {scene, root, parent, childA, childB, cmpCamera, canvas, viewport, F};
        });    
    });
    //afterEach-Hook
    //Cleans up after each test by destroying the page
    test.afterEach(async () => {
        await page.close();
    });
    //Test 1
    //Function: Tests if translations to a parent propagate to its child
    //Testing: creates a parent, adds a child, then translates the parent and checks if the child is affected by the translation
    //Expected: The childs world coordinates should be equal to the parents coordinates
    test("single parent translation propagates to child", async () => {
        const result = await page.evaluate(() => {
            const {scene, parent, childA, cmpCamera, canvas, viewport, F} = window.__integrationTestData;
            scene.appendChild(parent);
            parent.appendChild(childA);
            const translation = new F.Vector3(3, 4, 0);
            parent.mtxLocal.translation = translation;
            viewport.initialize("ViewportTest1", scene, cmpCamera, canvas);
            viewport.draw();
            const world = childA.mtxWorld.translation;
            return { x: world.x, y: world.y, z: world.z };
        });    
        //Assertions:
        //check the coordinates of ChildA for expected transform
        expect(result.x).toBe(3);
        expect(result.y).toBe(4);
        expect(result.z).toBe(0);    
    });
    //Test 2
    //Function: tests if changes in a multi-level hierarchy propagate to a child node
    //Testing: creates a root, parent and child node, appends them in order and then translates each node separately. Then checks
    // if all changes propagate correctly to the child node
    //Expected: The childs world coordinates are the sum of all single translations to each node
    test("multi-level hierarchy propagates transformations", async () => {
        const result = await page.evaluate(() => {
            const {scene, root, parent, childA, cmpCamera, canvas, viewport, F} = window.__integrationTestData;
            scene.appendChild(root);
            root.appendChild(parent);
            parent.appendChild(childA);
            root.mtxLocal.translation = new F.Vector3(1, 0, 0);
            parent.mtxLocal.translation = new F.Vector3(0, 2, 0);
            childA.mtxLocal.translation = new F.Vector3(0, 0, 3);
            viewport.initialize("ViewportTest2", scene, cmpCamera, canvas);
            viewport.draw();
            const world = childA.mtxWorld.translation;
            return { x: world.x, y: world.y, z: world.z };
        });    
        expect(result.x).toBe(1);
        expect(result.y).toBe(2);
        expect(result.z).toBe(3);   
    });
    //Test 3
    //Function: tests if changes to a child affect its siblings from the same parent
    //Testing: creates a pant and two child nodes, appends the children, then translates the parent and only one child. 
    // Then checks how both children were affected by the translations
    //Expected: ChildA is affected by both translations, ChildB only by the one done to Parent
    test("sibling nodes inherit only from common parent", async () => {
        const result = await page.evaluate(() => {
            const {scene, parent, childA, childB, cmpCamera, canvas, viewport, F} = window.__integrationTestData;
            scene.appendChild(parent);
            parent.appendChild(childA);
            parent.appendChild(childB);
            parent.mtxLocal.translation = new F.Vector3(2, 2, 0);
            childA.mtxLocal.translation = new F.Vector3(1, 0, 0);
            viewport.initialize("ViewportTest3", scene, cmpCamera, canvas);
            viewport.draw();
            const worldA = childA.mtxWorld.translation;
            const worldB = childB.mtxWorld.translation;
            return {
                a: { x: worldA.x, y: worldA.y, z: worldA.z },
                b: { x: worldB.x, y: worldB.y, z: worldB.z }
            };
        });    
        expect(result.a.x).toBe(3);
        expect(result.a.y).toBe(2);
        expect(result.b.x).toBe(2);
        expect(result.b.y).toBe(2);   
    }); 
});



