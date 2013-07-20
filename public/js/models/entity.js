define(['backbone', 'underscore'], function (Backbone, Un) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0,
      priority: 0,
      type: '',
      cost: 0,
      currentCapacity: 0,
      throughputCapacity: 20
    },
    requestsLastMinute: [],
    getNextDestination: function () {
      throw ('Not Implemented!');
    },
    processRequest: function (request) {
      request.setDestination(this.getNextDestination());
      this.requestsLastMinute.push({req: request, time: new Date().getTime()});
    },
    updateCapacity: function () {
      var indexOfTooOld = -1;
      var currentTime = new Date().getTime();

      for (var i = 0; i < this.requestsLastMinute.length; i++) {
        if (currentTime - this.requestsLastMinute[i].time > 5000) {
          indexOfTooOld = i;
        }
      };

      if (indexOfTooOld > -1) {
        this.requestsLastMinute.splice(0, indexOfTooOld);
      }

      this.set('currentCapacity', this.requestsLastMinute.length);
    },
    start: function () {
      setInterval(_.bind(function(){
        this.updateCapacity();
        console.log(this.requestsLastMinute);
      }, this), 1000);
      
    }
  });

  return Entity;
});
