define(['backbone'], function (Backbone) {
  var Game;

  Game = Backbone.Model.extend({
    defaults: {
      money: 150,
      totalRequests: 0,
      totalDropped: 0
    },
    spend: function (amount) {
      if (amount <= this.get('money')) {
        this.set({'money': this.get('money') - amount});
        return true;
      }
      return false;
    }
  });

  return Game;
});
