define(
  [
    'backbone'
  ],
  function(Backbone) {
    View = Backbone.Model.extend({

      timeout: 0,
      timeTaken: 0,
      requestType: undefined,

      initialize: function() {
        this.render();
        this.timeout = this.options.timeout;
        this.timeTaken = this.options.timeTaken;
        this.requestType = this.options.requestType;
      },

      render: function() {
        this.$el.html('Hi there!');
      },

      value: function () {
        var time;

        time = this.timeTaken - this.timeout;
        if (time < 0) {
            return 0;
        }
        return time * 100;
      },

      completeRequest: function () {
        Player1.money += this.value();
      }
    });
    return View;
  }
);

RequestType = {

};

