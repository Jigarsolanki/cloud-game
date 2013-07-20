define([
  'backbone',
  './player',
  './level'
  ], function (Backbone, Player) {
  var Game;

  Game = Backbone.Model.extend({
    requests: null,

    defaults: {
      stage: 0,
      player: null,
      level: null,
      timeSinceUpdate: 0,
      maxDiff: 0.5,
      requests: null
    },
    initialize: function () {
      this.set({
        'player': new Player(),
        'stage': 1,
        'level': new Level({'stage': stage}),
        'requests': level.generateRequests()
      });
    },
    update: function (timedelta) {
      timeSinceUpdate += timedelta;

      if (timeSinceUpdate > this.get('maxDiff')) {
        maxRequestsToActOn = timeSinceUpdate % this.get('maxDiff');
        requestsToUpdate = this.get('requests').slice(0, maxRequestsToActOn);

        for (var r in requestsToUpdate) {
          r.update();
        }

        timeSinceUpdate = 0;
      }
    }
  });

  return Game;
});
