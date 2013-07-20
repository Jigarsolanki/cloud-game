define(['backbone', 'underscore'], function (Backbone, Un) {
  var Entity;

  Entity = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0,
      priority: 0,
      type: '',
      cost: 0,
      throughputCapacity: 20,
      percentCapacity: 0,
      game: null
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

      var percentCapacity = parseInt(this.requestsLastMinute.length / this.get('throughputCapacity') * 100);
      this.set('percentCapacity', (percentCapacity > 100 ? 100 : percentCapacity));
    },
    start: function () {
      setInterval(_.bind(function(){
        this.updateCapacity();
      }, this), 1000);
      
    }
  });

  return Entity;
});
