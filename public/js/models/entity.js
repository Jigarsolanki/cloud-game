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
      return this.time_drain * this.capacity;
    },
    reduceTime: function (request) {
      this.request.timeTaken += this.timeDrain;
    }
  });

  return Entity;
});
