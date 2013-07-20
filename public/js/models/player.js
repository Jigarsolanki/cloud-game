define(['backbone'], function (Backbone) {
  var Player;

  Player = Backbone.Model.extend({
    defaults: {
      money: 0
    },
    addMoney: function (money) {
      var newMoney;

      newMoney = this.get('money') + money;
      this.set('money', newMoney);
    }
  });

  return Player;
});
