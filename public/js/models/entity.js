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
    },
    enqueue: function (request) {
      console.log('adkjfafadljf');
      if(this.queue.indexOf(request) === -1) {
        this.queue.push(request);
        request.setDestination(this);
      }
    },
    dequeue: function () {
      var request;

      if (this.queue.length >= 0) {
        request = this.queue.shift();
        if(request) {
          request.setDestination(this.getNextDestination());
        }
      }
    },
    start: function () {
      console.log('started');
      setInterval(_.bind(function() {
        this.dequeue();
      }, this), 50);
    }
  });

  return Entity;
});
