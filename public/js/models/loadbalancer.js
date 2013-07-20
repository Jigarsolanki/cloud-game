define(['./entity'], function (Entity) {
  var Loadbalancer;

  Loadbalancer = Entity.extend({
    nodes: null,
    initialize: function () {
      nodes = [];
    }
  });

  return Loadbalancer;
});
