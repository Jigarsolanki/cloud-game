define(['backbone'], function (Backbone) {
  var Player;

  Player = Backbone.Model.extend({
    defaults: {
      money: 0
    },
    addMoney: function (money) {
      this.money += money;
    }
  });

  return Player;
});
