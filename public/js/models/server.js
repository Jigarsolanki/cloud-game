define(['./entity'], function (Entity) {
  var Server;

  Server = Entity.extend({
    initialize: function () {
      this.set('priority', 0);
      this.set('type', 'SERVER');
    },
    getNextDestination: function () {
      return null;
    },
    processRequest: function (request) {
      var currentMoney;

      Entity.prototype.processRequest.call(this, request);

      currentMoney = this.get('game').get('money');
      this.get('game').set('money', currentMoney + 1 );
    },
  });

  return Server;
});
