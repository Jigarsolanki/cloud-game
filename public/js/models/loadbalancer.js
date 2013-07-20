define(['./entity'], function (Entity) {
  var Loadbalancer;

  Loadbalancer = Entity.extend({
    defaults: {
      timeDrain: 0,
      capacity: 0,
      entityType: undefined,
      cost: 0,
      endpoints: []
    }
  });

  return Loadbalancer;
});
