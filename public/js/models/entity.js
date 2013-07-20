define(['backbone'], function (Backbone) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0
    },
    processRequest: function (request) {
      //Do something
    }
  });

  return Entity;
});
