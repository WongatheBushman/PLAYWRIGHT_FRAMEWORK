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
            await ƒ.Project.loadResources("https://github.com/WongatheBushman/PLAYWRIGHT_FRAMEWORK/blob/6405b765721debddcbd98ab194a68a53c0c7e0a0/tests/dependencies/graphs/ShaderTestGraph.json");
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
            canvas.width = 800;
            canvas.height = 600;
            canvas.style.width = "800px";
            canvas.style.height = "600px";
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

    test("Front View", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, ƒ} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(0, 0, 40);
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO());
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
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(20, 20, 20);
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO());   
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
            cmpCamTrans.mtxLocal.translation = new ƒ.Vector3(20, -20, -20); 
            cmpCamTrans.mtxLocal.lookAt(ƒ.Vector3.ZERO());
            viewport.draw();
        });    
        const canvas = page.locator("#renderCanvas");
        await expect(canvas).toHaveScreenshot("shader-test-e2e-3.png", {
            maxDiffPixelRatio: 0.01
        });    
    });
});