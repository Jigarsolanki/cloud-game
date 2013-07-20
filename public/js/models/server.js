define(['./entity'], function (Entity) {
  var Server;

  Server = Entity.extend({
    getNextDestination: function () {
      return null;
    }
  });

  return Server;
});
