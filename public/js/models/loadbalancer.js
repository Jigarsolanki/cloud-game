define(['./entity'], function (Entity) {
  var Loadbalancer;

  Loadbalancer = Entity.extend({
    nodes: null,
    initialize: function () {
      this.nodes = [];
      this.set('priority', 1);
      this.set('type', 'LOADBALANCER');
    },
    getNextDestination: function () {
      return this.nodes[Math.round(Math.random() * this.nodes.length)];
    },
    addNode: function (newNode) {
      this.nodes.push(newNode);
    },
    addNodes: function (nodes) {
      var currentNodes;
      currentNodes = this.nodes;

      nodes.forEach(function (node) {
        currentNodes.push(node);
      });

      debugger;
    }
  });

  return Loadbalancer;
});
