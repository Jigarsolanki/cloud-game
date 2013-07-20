define([
  'backbone',
  './player',
  ], function (Backbone, Player) {
  var Game;

  Game = Backbone.Model.extend({
    defaults: {
      stage: 0,
      player: null
    },
    initialize: function () {
      // var level;
      this.get('player') = new Player();
      this.get('stage') += 1;
      // level = new Level({'stage': stage});
    }
  });

  return Game;
});
