
import { test, expect } from "@playwright/test";
//let page: Page;

test.describe("FUDGE e2e Test - Render all Meshes", () => {
    let page: Page;
    test.beforeAll(async ({ browser}) => {
        page = await browser.newPage();
        await page.goto("/"); 
        await page.waitForFunction(() => window.testUtils);
        await page.evaluate(async () => {
            const F = window.testUtils.FudgeCore;
            const scene = window.testUtils.createNode("Scene");
            const material = new F.Material(
                "ShaderLitTest",
                F.ShaderLitTextured,
                new F.CoatTextured()
            );
            let subclass: typeof F.Mesh[] = F.Mesh.subclasses;
            for (let i: number = 0; i < subclass.length; i++) {
                let node = window.testUtils.createNode(subclass[i].name.replace("Mesh", ""));
                let mesh;
                switch (subclass[i].name) {
                    case F.MeshOBJ.name:
                        mesh = await new F.MeshOBJ("Icosphere").load("../dependencies/objects/Icosphere.obj");
                    break;
                    default:
                        mesh = new subclass[i]();
                    break;
                    };

                

                const cmpMesh = new F.ComponentMesh(mesh);
                const cmpMaterial = new F.ComponentMaterial(material);
                cmpMaterial.sortForAlpha = true;
                node.addComponent(cmpMesh);
                node.addComponent(cmpMaterial);
                node.mtxLocal.translation = new F.Vector3(i * 2.5 - 10, 0, 0);
                scene.appendChild(node);
                };


            //Create new camera-node, add transform and camera cmponents, move camera,
            //make it look at center of scene, set background color for camera and append to scene
            const cameraNode = new F.Node("Camera");
            const cmpCamTrans = new F.ComponentTransform();
            cameraNode.addComponent(cmpCamTrans);
            const cmpCamera = new F.ComponentCamera();
            cameraNode.addComponent(cmpCamera);
            cmpCamTrans.mtxLocal.translation = new F.Vector3(0, 0, 15);
            cmpCamTrans.mtxLocal.lookAt(F.Vector3.ZERO());
            cmpCamera.clrBackground = F.Color.CSS("rgb(80, 80, 120)");
            scene.appendChild(cameraNode);
            //get canves from html-page and set height and width
            const canvas = document.getElementById("renderCanvas");
            canvas.width = 800;
            canvas.height = 600;
            canvas.style.width = "800px";
            canvas.style.height = "600px";
            //create new viewport and initialize it
            const viewport = new F.Viewport();
            viewport.initialize("MeshTestViewport", scene, cmpCamera, canvas);
            viewport.backgroundColor = F.Color.CSS("gray");
            //update viewport
            viewport.draw();
            window.TestData = {cmpCamTrans, viewport, F};
        });    
    });

    test.afterAll(async () => {
        await page.close();
    });

    test("Front View", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, F} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new F.Vector3(0, 0, 40);
            cmpCamTrans.mtxLocal.lookAt(F.Vector3.ZERO());
            viewport.draw();      
        });
        const canvas = page.locator("#renderCanvas");
        await expect(canvas).toHaveScreenshot("meshes-test-e2e-1.png", {
            maxDiffPixelRatio: 0.01
        });          
    });
    test("Isometric Top Front", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, F} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new F.Vector3(20, 20, 20);
            cmpCamTrans.mtxLocal.lookAt(F.Vector3.ZERO());   
            viewport.draw();        
        });  
        const canvas = page.locator("#renderCanvas");   
        await expect(canvas).toHaveScreenshot("meshes-test-e2e-2.png", {
            maxDiffPixelRatio: 0.01
        });  
    });
    test("Isometric Back Below", async () => {
        //await page.goto("/"); 
        //await page.waitForFunction(() => window.testUtils);
        await page.evaluate(() => {
            const {cmpCamTrans, viewport, F} = window.TestData;
            cmpCamTrans.mtxLocal.translation = new F.Vector3(20, -20, -20); 
            cmpCamTrans.mtxLocal.lookAt(F.Vector3.ZERO());
            viewport.draw();
        });    
        const canvas = page.locator("#renderCanvas");
        await expect(canvas).toHaveScreenshot("meshes-test-e2e-3.png", {
            maxDiffPixelRatio: 0.01
        });    
    });
});