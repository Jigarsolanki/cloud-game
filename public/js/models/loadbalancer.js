define(['./entity'], function (Entity) {
  var Loadbalancer;

  Loadbalancer = Entity.extend({
    nodes: null,
    initialize: function () {
      this.nodes = [];
    },
    getNextDestination: function () {
      return this.nodes[Math.round(Math.random() * this.nodes.length)];
    },
    addNode: function (newNode) {
      this.nodes.push(newNode);
    }
  });

  return Loadbalancer;
});
