define(['backbone', 'underscore'], function (Backbone, Un) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0,
      priority: 0,
      type: '',
      cost: 0
    },
    queue: [],
    getNextDestination: function () {
      throw ('Not Implemented!');
    },
    processRequest: function (request) {
      this.enqueue(request);
      request.setDestination(this);
    },
    enqueue: function (request) {
      this.queue.push(request);
    },
    dequeue: function () {
      var request;

      request = this.queue.shift();
      if(request) {
        request.setDestination(this.getNextDestination());
      }
    },
    start: function () {
      setTimeout(_.bind(function() {
        this.dequeue();
      }, this), 200);
    }
  });

  return Entity;
});
