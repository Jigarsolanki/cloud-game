define(['backbone'], function (Backbone) {
  var Level;

  Level = Backbone.Model.extend({
    defaults: {
      stage: 0
      amountOfRequests: 0
    },
    initialize: function () {
      this.set('amountOfRequests', this.generateRequests());
    },
    generateRequests: function () {
      return this.get('stage') * 10;
    }
  });

  return Level;
});
