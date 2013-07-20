define([
  'backbone',
  './player',
  ], function (Backbone, Player) {
  var Game;

  Game = Backbone.Model.extend({
    stage: 0,
    player: null,
    initialize: function () {
      // var level;
      player = new Player();
      this.stage += 1;
      // level = new Level({'stage': stage});
    }
  });

  return Game;
});
