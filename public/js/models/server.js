define(['./entity'], function (Entity) {
  var Server;

  Server = Entity.extend({
    defaults: {
      timeDrain: 0,
      capacity: 0,
      entityType: undefined,
      cost: 0
    }
  });

  return Server;
});
