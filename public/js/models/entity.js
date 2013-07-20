define(['backbone'], function (Backbone) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      timeDrain: 0,
      capacity: 0,
      entityType: undefined,
      cost: 0
    },
    getCost: function () {
      return this.get('time_drain') * this.get('capacity');
    },
    reduceTime: function (request) {
      request.timeTaken += this.get('timeDrain');
    },
    getNextEntity: function () {
      //TODO
      return null;
    }
  });

  return Entity;
});
