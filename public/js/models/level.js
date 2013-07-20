define([
  'backbone',
  './request'
  ], function (Backbone) {
  var Level;

  Level = Backbone.Model.extend({
    defaults: {
      stage: 0,
      timer: 0
    },
    generateRequests: function () {
      var amt, requests;

      amt = this.get('stage') * 10;
      for (var x=0; x<amt; x++) {
        var request;

        request = new Request({
          timeout: 5,
          color: '#FFF'
        });
        requests.push(request);
      }
      return requests;
    }
  });

  return Level;
});
