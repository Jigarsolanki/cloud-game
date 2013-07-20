define(['backbone'], function (Backbone) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0
    },
    getNextDestination: function () {
      throw ('Not Implemented!');
    },
    processRequest: function (request) {
      request.setDestination(this.getNextDestination());
    }
  });

  return Entity;
});
