const FudgeCore = window.FudgeCore;

if (!FudgeCore) {
  throw new Error("FudgeCore nicht gefunden! Stelle sicher, dass fudgecore.js korrekt geladen wurde.");
}
//creates global object window.testUtils that can be accessed by Playwright
window.testUtils = {
  FudgeCore:FudgeCore,
  //Central Helper Functions are collected here for all tests to use

  //creates a new node and adds a componentTransform
  createNode: function(name) {
    const node = new FudgeCore.Node(name);
    node.addComponent(new FudgeCore.ComponentTransform());
    return node;
  },

  //calculates spatial distance between two given nodes
  calculateDistance: function(nodeA, nodeB) {
    return nodeA.mtxLocal.translation.subtract(nodeB.mtxLocal.translation).magnitude;
  }
};
