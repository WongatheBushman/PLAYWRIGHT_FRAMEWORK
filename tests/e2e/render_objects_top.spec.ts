////////////////////////////////////////////////////7
//NOTE: As the Test is right now it will fail as the rendered snapshot and the reference picture will have a different
//background color. 
//change line 66 to: cmpCamera.clrBackground = F.Color.CSS("rgb(0, 0, 0)");
//to let the test pass
////////////////////////////////////////////////////

//imports from Playwright Library
import { test, expect } from "@playwright/test";
//Test Description
test.describe("FUDGE Mesh Rendering E2E", () => {
  //Test
  //Function: Tests if a number of standad meshes can be rendered correctly
  //Testing: Creates five simple meshes, moves the camera to an isometric view and renders to the canvas
  //Expected: rendered result is equal to Reference screenshot in "tests\e2e\render_objects_top.spec.ts-snapshots"
  test("renders all core meshes with ShaderLitTextured", async ({ page }) => {
    //Go to page on test server and wait for window.testUtils
    await page.goto("/"); 
    await page.waitForFunction(() => window.testUtils);
    //access page and run test when ready
    await page.evaluate(async () => {
      const F = window.testUtils.FudgeCore;
      //create new node named "Scene"
      const scene = window.testUtils.createNode("Scene");
      //Create new Material
      const material = new F.Material(
        "ShaderLitTest",
        F.ShaderLitTextured,
        new F.CoatTextured()
      );
      //Array with the basic mesh types
      const meshClasses = [
        F.MeshCube,
        F.MeshQuad,
        F.MeshPyramid,
        F.MeshSphere,
        F.MeshTorus
      ];
      //loop which iterates over every member of array meshClasses
      meshClasses.forEach((MeshClass, i) => {
        //create new node
        const node = window.testUtils.createNode(MeshClass.name.replace("Mesh", ""));
        //create new mesh-component
        const cmpMesh = new F.ComponentMesh(new MeshClass());
        //create new material-component from eralier created material
        const cmpMaterial = new F.ComponentMaterial(material);
        //enable alpha-channel on material-component
        cmpMaterial.sortForAlpha = true;
        //Add mesh- and material-components to node
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        //move node to new position
        node.mtxLocal.translation = new F.Vector3(i * 3 - 6, 0, 0);
        //make node child of scene
        scene.appendChild(node);
      });
      //Create new camera-node, add transform and camera cmponents, move camera,
      //make it look at center of scene, set background color for camera and append to scene
      const cameraNode = new F.Node("Camera");
      const cmpCamTrans = new F.ComponentTransform();
      cameraNode.addComponent(cmpCamTrans);
      const cmpCamera = new F.ComponentCamera();
      cameraNode.addComponent(cmpCamera);
      cmpCamTrans.mtxLocal.translation = new F.Vector3(15, 15, 15);
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
    });
    const canvas = page.locator("#renderCanvas");
    //check rendered canvas against reference-screenshot with an allowed
    //Pixel-difference of 0.01 (1%)
    await expect(canvas).toHaveScreenshot("mesh-e2e.png", {
      maxDiffPixelRatio: 0.01
    });
  });
});


