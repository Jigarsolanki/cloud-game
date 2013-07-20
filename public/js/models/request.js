define(
  [
    'backbone'
  ],
  function(Backbone) {
    var Request;

    Request = Backbone.Model.extend({
      defaults: {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        startTime:  0
      },
      destination: null,
      setDestination: function (newDestination) {
        this.destination = newDestination;

        if (newDestination) {
          this.set('speedX', (newDestination.get('x') - this.get('x')) / 30);
          this.set('speedY', (newDestination.get('y') - this.get('y')) / 30);
        }
      },
      getDestination: function () {
        return this.destination;
      },
      move: function () {
        newX = this.get('speedX') + this.get('x');
        newY = this.get('speedY') + this.get('y');
        this.set('x', newX);
        this.set('y', newY);
      },
      isExpired: function () {
        var currentTime;

        currentTime = new Date().getTime();
        return ((currentTime - this.get('startTime')) > 10000);
      },
      complete: function () {

      }
    });

    return Request;
  }
);
