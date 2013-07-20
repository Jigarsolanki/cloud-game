define(['./entity'], function (Entity) {
  var Server;

  Server = Entity.extend({
    getNextDestination: function () {
      return null;
    },
    processRequest: function (request) {
      request.setDestination(this.getNextDestination());
    }
  });

  return Server;
});
