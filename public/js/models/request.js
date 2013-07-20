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
        color: null,
        entity: null,
      },
      value: function () {
        var time;

        time = this.get('timeTaken') - this.get('timeout');
        if (time < 0) {
            return 0;
        }
        return time * 100;
      },
      complete: function () {
        Player1.money += this.value();
      },
      update: function () {
        //Called only when a request should hit a new entity
        var nextEntity;

        this.set('timeTaken', this.get('timeTaken') + this.get('entity').get('timeDrain'))
        nextEntity = this.get('entity').getNextEntity()
      }
    });

    return Request;
  }
);
