define(
  [
    'backbone'
  ],
  function(Backbone) {
    var Request;

    Request = Backbone.Model.extend({
      defaults: {
        timeout: 0,
        timeTaken: 0,
        requestType: undefined
      },
      value: function () {
        var time;

        time = this.timeTaken - this.timeout;
        if (time < 0) {
            return 0;
        }
        return time * 100;
      },
      complete: function () {
        Player1.money += this.value();
      }
    });

    return Request;
  }
);
