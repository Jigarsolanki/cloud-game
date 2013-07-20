define(['backbone'], function (Backbone) {
  var Level;

  Level = Backbone.Model.extend({
    defaults: {
      stage: 0
    },
    initialize: function () {
      this.amountOfRequests = this.generateRequests();
    },
    generateRequests: function () {
      return this.stage * 10;
    }
  });

  return Level;
});
