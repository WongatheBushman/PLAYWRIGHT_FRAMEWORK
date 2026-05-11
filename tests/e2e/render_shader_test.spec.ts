import { test, expect } from "@playwright/test";

test.describe("FUDGE e2e Test - Shaders Test", () => {
    let page: Page;
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto("/"); 
        await page.waitForFunction(() => window.testUtils);
        await page.evaluate(async () => {
            const ƒ = window.testUtils.FudgeCore;
            let graphId: string = "Graph|2023-11-30T11:08:19.277Z|94880";
            // load resources referenced in the link-tag
            await ƒ.Project.loadResources("https://raw.githubusercontent.com/WongatheBushman/PLAYWRIGHT_FRAMEWORK/ed7d5a5c1aa1ea9c8d5b0e2452a03313c93185f9/tests/dependencies/graphs/ShaderTestGraph.json");
            // pick the graph to show
            let graph = ƒ.Project.resources[graphId];
                      

            const cameraNode = new ƒ.Node("Camera");
            const cmpCamTrans = new ƒ.ComponentTransform();
            cameraNode.addComponent(cmpCamTrans);
            const cmpCamera = new ƒ.ComponentCamera();
            cameraNode.addComponent(cmpCamera);
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(0, 0, 15);
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO());
            cmpCamera.clrBackground = ƒ.Color.CSS("rgb(0, 0, 0)");
            graph.appendChild(cameraNode);
            //get canves from html-page and set height and width
            const canvas = document.getElementById("renderCanvas");
            canvas.width = 1920;
            canvas.height = 1080;
            canvas.style.width = "1920px";
            canvas.style.height = "1080px";
            //create new viewport and initialize it
            const viewport = new ƒ.Viewport();
            viewport.initialize("ShaderTestViewport", graph, cmpCamera, canvas);
            viewport.backgroundColor = ƒ.Color.CSS("black");
            //update viewport
            viewport.draw();
            window.TestData = {cmpCamTrans, viewport, ƒ};
        });    
    });

    test.afterAll(async () => {
        await page.close();
    });

   /*test.afterEach(async () => {
        await page.evaluate(async () => {
            const {cmpCamTrans, ƒ} = window.TestData;
            cmpCamTrans.mtxLocal.set(ƒ.Matrix4x4.IDENTITY());
        });
    });*/

    test("Front View", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, ƒ} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(0, 0, 20);
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO(), new ƒ.Vector3(0, 1, 0));
            viewport.draw();
   
        });
        const canvas = page.locator("#renderCanvas");
        await expect(canvas).toHaveScreenshot("shader-test-e2e-1.png", {
            maxDiffPixelRatio: 0.01
        });          
    });
    test("Isometric Top Front", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, ƒ} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(10, 10, 10);
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO(), new ƒ.Vector3(0, 1, 0));   
            viewport.draw(); 
       
        });  
        const canvas = page.locator("#renderCanvas");   
        await expect(canvas).toHaveScreenshot("shader-test-e2e-2.png", {
            maxDiffPixelRatio: 0.01
        });  
    });
    test("Isometric Back Below", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, ƒ} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(10, 10, -10); 
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO(), new ƒ.Vector3(0, 1, 0));
            viewport.draw();
 
        });    
        const canvas = page.locator("#renderCanvas");
        await expect(canvas).toHaveScreenshot("shader-test-e2e-3.png", {
            maxDiffPixelRatio: 0.01
        });    
    });
});