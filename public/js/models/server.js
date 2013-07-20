define(['./entity'], function (Entity) {
  var Server;

  Server = Entity.extend({
    initialize: function () {
      this.set('priority', 0);
      this.set('type', 'SERVER');
    },
    getNextDestination: function () {
      return null;
    }
  });

  return Server;
});
