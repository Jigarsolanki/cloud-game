define(['./entity'], function (Entity) {
  var Gtm;

  Gtm = Entity.extend({
    defaults: {
      timeDrain: 0,
      capacity: 0,
      entityType: undefined,
      cost: 0
    }
  });

  return Gtm;
});
